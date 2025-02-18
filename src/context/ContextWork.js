import React, { createContext, useState, useEffect, cloneElement } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from '@firebase/auth';
import { collection, doc, setDoc, getDoc, addDoc, getDocs, deleteDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { MyDb, auth } from './../../connection/firebaseConfig';
import Toast from 'react-native-toast-message';

import { AppState } from 'react-native';

export const WorkContext = createContext();

const ContextWork = ({ children }) => {
    const navigation = useNavigation()

    const [user, setUser] = useState({
        name: null,
        email: null,
        department: null,
        id: null,
    });
    const [workers, setWorkers] = useState([])

    const getUserData = async (userId) => {
        const userDocRef = doc(collection(MyDb, "Owners"), userId);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            return {
                ...userSnapshot.data(),
                id: userSnapshot.id // id-ni data ilə birləşdiririk
            };
        }
        return null;
    }
    const getWorkers = async (userId) => {
        try {
            const workRef = doc(MyDb, "Owners", userId)
            const workRefCollection = collection(workRef, "workers")
            const querySnapshot = await getDocs(workRefCollection);

            if (querySnapshot.empty) {
                return [];
            }
            return querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "Yüklenən məlumatların yenilənməsi səhv oldu!",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });
        }
    }


    const signUp = async (email, password, data) => {
        navigation.navigate("Loading")
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential

            await updateProfile(user, {
                displayName: data.name,
            });

            Toast.show({
                type: "success",
                text1: "Qeydiyyat uğurlu!",
                text2: "Qeydiyyat uğurlu tamamlandı ��",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });


            const newOwner = doc(collection(MyDb, "Owners"), user.uid)

            await setDoc(newOwner, {
                name: data.name,
                email: email,
                department: data.department
            });



        } catch (error) {
            let errorMessage = "Qeydiyyat uğursuz oldu, yenidən yoxlayın!";
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: errorMessage,
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            })
        }
    };

    const loginUser = async (email, password) => {
        navigation.navigate("Loading")
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            const userData = await getUserData(userCredential.user.uid)
            const userWorkdata = await getWorkers(userData.uid)

            if (userData) {
                setUser({
                    name: userData.name,
                    email: userData.email,
                    department: userData.department,
                    id: userData.id,
                });
                setWorkers(userWorkdata)
                navigation.navigate("HomePage")
            }
            Toast.show({
                type: "success",
                text1: "Xoş gəldiniz!",
                text2: "Giriş uğurla tamamlandı 🎉",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });

        } catch (error) {
            let errorMessage = "Giriş uğursuz oldu, yenidən yoxlayın!";

            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: errorMessage,
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
            navigation.navigate("Login")
        }
    };

    const logoutUser = async () => {
        navigation.navigate("Loading")
        try {
            await signOut(auth);

            Toast.show({
                type: "success",
                text1: "Çıxış edildi!",
                text2: "Hesabdan uğurla çıxış etdiniz. 👋",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "Çıxış zamanı problem yarandı, yenidən yoxlayın!",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
        }
    };


    // add workers
    const [addingWorkers, setAddingWorkers] = useState()
    const addWorkersFunc = async (ownerId, workerData) => {
        navigation.navigate("Loading")

        try {
            const ordersRef = collection(MyDb, "Owners", ownerId, "workers");

            await addDoc(ordersRef, {
                ...workerData,
                workerDay: []
            })

            navigation.goBack()

            Toast.show({
                type: "success",
                text1: "İşçi Əlavə Edildi!",
                text2: "Yeni işçi uğurla əlavə olundu.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });



        } catch (error) {
            navigation.goBack()

            Toast.show({
                type: "error",
                text1: "Əməliyyat Xətası",
                text2: "İşçi əlavə edilərkən bir xəta baş verdi.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });
        }
    }

    // delete workers
    const deleteWorkerFunc = async (workerId) => {
        try {
            const ordersRef = doc(MyDb, "Owners", user.id, "workers", workerId);
            await deleteDoc(ordersRef);
            Toast.show({
                type: "success",
                text1: "Əməliyyat Uğurlu",
                text2: "İşçi uğurla sistemdən silindi.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "İşçi silinən zamanı problem yarandı, yenidən yoxlayın!",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
        }
    }

    // update workers
    const updateWorkerFunc = async (workerId, updatedWorkerData) => {
        try {
            const ordersRef = doc(MyDb, "Owners", user.id, "workers", workerId);
            await updateDoc(ordersRef, updatedWorkerData);
            Toast.show({
                type: "success",
                text1: "məliyyat Uğurlu",
                text2: "İşçi uğurla dəyişdirildi.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "İşçi dəyişdirilən zamanı problem yarandı, yenidən yoxlayın!",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
        }
    }

    const updateWorkerDay = async (workerId, updateDate) => {
        try {
            const ordersRef = doc(MyDb, "Owners", user.id, "workers", workerId);

            const workerDoc = await getDoc(ordersRef);
            if (workerDoc.exists()) {
                const workerData = workerDoc.data();
                let workerDays = workerData.workerDay;

                if (!workerDays) {
                    workerDays = [];
                }

                const existingDateIndex = workerDays.findIndex(item => item.date === updateDate.date);

                if (existingDateIndex > -1) {
                    workerDays[existingDateIndex].status = updateDate.status;
                    workerDays[existingDateIndex].dailyEarnings = updateDate.dailyEarnings;
                    workerDays[existingDateIndex].workHoursSalary = updateDate.workHoursSalary;
                    workerDays[existingDateIndex].workHours = updateDate.workHours;
                } else {
                    workerDays.push(
                        {
                            date: updateDate.date,
                            status: updateDate.status,
                            dailyEarnings: updateDate.dailyEarnings,
                            workHoursSalary: updateDate.workHoursSalary,
                            workHours: updateDate.workHours
                        }
                    );
                }

                await updateDoc(ordersRef, {
                    workerDay: workerDays
                });

                Toast.show({
                    type: "success",
                    text1: "Əməliyyat uğurla başa çatdı",
                    text2: "İşçi günləri uğurla dəyişdirildi.",
                    position: "top",
                    visibilityTime: 3000,
                    autoHide: true
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Xəta!",
                    text2: "İşçi tapılmadı, yenidən yoxlayın!",
                    position: "top",
                    visibilityTime: 4000,
                    autoHide: true
                });
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "İşçi günləri dəyişdirilən zamanı problem yarandı, yenidən yoxlayın!",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
        }
    };

    const updateWorkerHours = async (workerId, updateDate) => {
        try {
            const ordersRef = doc(MyDb, "Owners", user.id, "workers", workerId);

            const workerDoc = await getDoc(ordersRef);
            if (workerDoc.exists()) {
                const workerData = workerDoc.data();
                let workerDays = workerData.workerDay;

                const existingDateIndex = workerDays.findIndex(item => item.date === updateDate.date && item.status === "Gəldi");

                if (existingDateIndex > -1) {
                    workerDays[existingDateIndex].workHours = updateDate.workHours;
                    workerDays[existingDateIndex].workHoursSalary = workerData.workHoursSalary;
                }

                await updateDoc(ordersRef, {
                    workerDay: workerDays
                });

                Toast.show({
                    type: "success",
                    text1: "Mesai saatı uğurla qeyd edildi",
                    text2: "İşçinin mesai saatı uğurla yeniləndi.",
                    position: "top",
                    visibilityTime: 3000,
                    autoHide: true
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Xəta!",
                    text2: "İşçi tapılmadı, yenidən yoxlayın!",
                    position: "top",
                    visibilityTime: 4000,
                    autoHide: true
                });
            }
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "İşçi günləri dəyişdirilən zamanı problem yarandı, yenidən yoxlayın!",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
        }
    };

    useEffect(() => {
        navigation.navigate("Loading")
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {

                if (currentUser.metadata.creationTime === currentUser.metadata.lastSignInTime) {
                    navigation.navigate("Login")
                } else {

                    const userData = await getUserData(currentUser.uid);
                    const userWorkdata = await getWorkers(currentUser.uid)
                    if (userData) {
                        setUser({
                            name: userData.name,
                            email: userData.email,
                            department: userData.department,
                            id: userData.id,
                        });
                        setWorkers(userWorkdata)
                        navigation.navigate("HomePage")
                    }

                }

            } else {
                setUser(null);
                setWorkers([])
                navigation.navigate("Login")
            }
        });

        return unsubscribe;

    }, [])

    useEffect(() => {
        if (user && user.id) {
            const userRef = doc(MyDb, "Owners", user.id);
            const workersCollection = collection(userRef, "workers");

            const unsubscribe = onSnapshot(workersCollection, (snapshot) => {
                const changeWorkers = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                })
                setWorkers(changeWorkers);
            });

            return () => unsubscribe();
        }
    }, [user?.id])



    // date start
    const [appState, setAppState] = useState(AppState.currentState);
    const [date, setDate] = useState(new Date().toLocaleDateString('en-GB').replace(/\//g, '-'));
    useEffect(() => {
        const subscription = AppState.addEventListener('change', async nextAppState => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                setDate(new Date().toLocaleDateString('en-GB').replace(/\//g, '-'))
            } else if (nextAppState === 'background') {

            }
            setAppState(nextAppState);
        });

        return () => subscription.remove();
    }, [appState]);


    return (
        <WorkContext.Provider value={{
            date,
            signUp,
            loginUser,
            logoutUser,
            user,
            workers,
            addWorkersFunc,
            deleteWorkerFunc,
            updateWorkerFunc,
            updateWorkerDay,
            updateWorkerHours
        }}>
            {children}
        </WorkContext.Provider>
    );
}

export default ContextWork;




