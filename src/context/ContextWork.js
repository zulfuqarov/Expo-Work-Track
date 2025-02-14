import React, { createContext, useContext, useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from '@firebase/auth';
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import { MyDb, auth } from './../../connection/firebaseConfig';
import Toast from 'react-native-toast-message';


export const WorkContext = createContext();

const ContextWork = ({ children }) => {

    const navigation = useNavigation()

    const signUp = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential

            await updateProfile(user, {
                displayName: name,
            });

            const newOwner = doc(collection(MyDb, "Owners"), user.uid)

            await setDoc(newOwner, {
                name: "Nebi",
                email: "nebi@example.com",
                department: "NebiDev"
            });

            Toast.show({
                type: "success",
                text1: "Qeydiyyat uğurlu!",
                text2: "Qeydiyyat uğurlu tamamlandı ��",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
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
            Toast.show({
                type: "success",
                text1: "Xoş gəldiniz!",
                text2: "Giriş uğurla tamamlandı 🎉",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });
            navigation.navigate("HomePage")
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
        finally {
        }
    };

    const logoutUser = async () => {
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

            navigation.navigate("Login");
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

    const [user, setUser] = useState({
        name: null,
        email: null,
        id: null,
    });


    // add workers
    const [addingWorkers, setAddingWorkers] = useState()
    const addWorkersFunc = async (ownerId, workerData) => {
        try {
            const ordersRef = collection(MyDb, "Owners", ownerId, "workers");

            await addDoc(ordersRef, workerData)
            console.log("ok")
        } catch (error) {
            console.error("Xəta baş verdi:", error);
        }
    }


    useEffect(() => {
        navigation.navigate("Loading")
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    name: currentUser.displayName,
                    email: currentUser.email,
                    id: currentUser.uid,
                });
                navigation.navigate("HomePage")
            } else {
                setUser(null);
                navigation.navigate("Login")
            }
        });

        return unsubscribe;

    }, [])


    return (
        <WorkContext.Provider value={{
            signUp,
            loginUser,
            logoutUser,
            user,
            addWorkersFunc
        }}>
            {children}
        </WorkContext.Provider>
    );
}

export default ContextWork;




