import React, { createContext, useContext, useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from '@firebase/auth';
import { MyDb, auth } from './../../connection/firebaseConfig';


export const WorkContext = createContext();

const ContextWork = ({ children }) => {

    const navigation = useNavigation()

    const [authLoading, setauthLoading] = useState(false)
    const signUp = async (email, password, name) => {
        setauthLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential

            await updateProfile(user, {
                displayName: name,
            });

            alert("succes")

        } catch (error) {
            alert(error.message);
        }
        finally {
            setauthLoading(false)
        }
    };


    const loginUser = async (email, password) => {
        navigation.navigate("Loading")
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            navigation.navigate("HomePage")
        } catch (error) {
            navigation.navigate("Login")
        }
        finally {
        }
    };





    return (
        <WorkContext.Provider value={{
            authLoading,
            signUp,
            loginUser
        }}>
            {children}
        </WorkContext.Provider>
    );
}

export default ContextWork;




// const [unsubscribeLoading, setUnsubscribeLoading] = useState(true)
// const [user, setUser] = useState(null);
// const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//     if (currentUser) {
//         setUser(currentUser.displayName);
//         navigation.navigate("HomePage")
//         false
//     } else {
//         setUser(null);
//         console.log("User signed out");
//         false
//     }
// });