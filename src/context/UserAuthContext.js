import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {

    const [user, setUser] = useState("");

    function signUp(email,password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logIn(email,password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
    }

    function logInAsDemo() {
        return signInAnonymously(auth);
    }

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // disconnect firebase listener from database upon dismounting to prevent memory leak
        return () => {
            unsubscribe();
        }

    }, []);

    return (<userAuthContext.Provider value={ { user, logIn, signUp, logOut, logInAsDemo } }> {children} </userAuthContext.Provider>);
}

export function useUserAuth() {
    return useContext(userAuthContext);
}