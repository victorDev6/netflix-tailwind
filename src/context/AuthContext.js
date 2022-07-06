import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    // registro
    const signUp = (email, password) => {
        try {
            createUserWithEmailAndPassword(auth, email, password);
            setDoc(doc(db, 'users', email), {
                savedShows: []
            });
        } catch (error) {
            console.log(error);
        }
    }

    // iniciar sesion
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // cerrar sesion
    const logOut = () => {
        return signOut(auth);
    }

    // inicializar el usuario
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut,  }}>
            {
                children
            }
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;

export function UserAuth() {
    return useContext(AuthContext);
}
