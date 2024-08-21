import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
export const AuthContext = createContext(null);
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();

    const auth = getAuth(app)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfiles = (name, photoUrl) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoUrl: photoUrl,
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                //
                const userInfo = {
                    email: currentUser?.email,
                }
                axiosPublic.post("/jwt", userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem("access-token", res.data.token);
                            setLoading(false);

                        }
                    })
            } else {
                localStorage.removeItem("access-token");
                setLoading(false);

            }
            console.log("Current User ", currentUser);
        });
        return () => {
            return unsubscribe();
        }

    }, [auth, axiosPublic])

    const authInfo = { user, loading, createUser, signIn, logOut, updateUserProfiles, googleSignIn };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;