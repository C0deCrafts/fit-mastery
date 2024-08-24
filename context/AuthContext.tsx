import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import auth, {FirebaseAuthTypes, deleteUser} from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import {router} from "expo-router";
import {getAuthErrorMessage} from "@/utils/authErrors";
import {Alert} from "react-native";
import {DEFAULT_PROFILE_IMAGE_URL} from "@/utils/common";

interface AuthContextType {
    user: FirebaseAuthTypes.User | null; // user
    initializing: boolean;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string) => Promise<void>;
    signOut: () => Promise<void>;
    deleteUserData: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Initialisiere den Authentifizierungskontext
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: AuthProviderProps) {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle user state changes
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
        console.log("onAuthStateChanged: ", user);
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return () => subscriber(); // Abonniere bei unmount
    }, [initializing]);

    // register a new user
    const signUp = async (email: string, password: string, username: string) => {
        setIsLoading(true);

        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await user.updateProfile({
                    displayName: username,
                    photoURL: DEFAULT_PROFILE_IMAGE_URL,
                })
                const updatedUser = auth().currentUser;
                setUser(updatedUser);
                await addUserToFirestore(user.uid, email, username, DEFAULT_PROFILE_IMAGE_URL);
                router.replace("/")
                console.log("User account created & signed in!");
            })
            .catch(err => {
                const [title, message] = getAuthErrorMessage(err.code);
                Alert.alert(title, message);
                console.error("Error registering: ", err);
            }).finally(() => {
            setIsLoading(false);
        });
    };

    // sign in an existing user
    const signIn = async (email: string, password: string) => {
        setIsLoading(true);

        await auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                router.replace("/")
                console.log("User signed in!");
            })
            .catch(err => {
                const [title, message] = getAuthErrorMessage(err.code);
                Alert.alert(title, message);
                console.error("Error signing in: ", err);
            }).finally(() => {
            setIsLoading(false);
        });
    };

    // sign out the current user (evtl. kein loading - dauert nicht lang)
    const signOut = async () => {
        setIsLoading(true);
        await auth()
            .signOut()
            .then(() => console.log('User signed out!'))
            .finally(() => {
                setIsLoading(false);
            });
    }

    const deleteUserData = async (email: string, password: string) => {
        const user: FirebaseAuthTypes.User | null = auth().currentUser;
        setIsLoading(true);

        if(user){
            // Erneute Authentifizierung des Benutzers
            const credential = auth.EmailAuthProvider.credential(email, password);
            await user.reauthenticateWithCredential(credential);
            // Zuerst das Benutzer-Dokument aus Firestore löschen
            await firestore()
                .collection("Users")
                .doc(user.uid)
                .delete()
                .then(() => {
                    console.log("User data deleted!");
                }).catch((err) => {
                    console.error("Error deleting user data:", err);
                });
            // Danach das Benutzerkonto aus Firebase Authentication löschen
            await deleteUser(user).then(()=> {
                console.log("User deleted from Firebase Authentication!");
            }).catch((err)=> {
                console.error("Error deleting user from Firebase Authentication: ", err);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    const resetPassword = async (email: string) => {
        setIsLoading(true);
        await auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Geschafft!", "Eine E-Mail zum Zurücksetzen deines Passworts ist unterwegs! Schau in deinem Posteingang nach.");
            })
            .catch(err => {
                const [title, message] = getAuthErrorMessage(err.code);
                Alert.alert(title, message);
                console.error("Error sending password reset email: ", err);
            }).finally(() => {
            setIsLoading(false);
        });
    }

    const addUserToFirestore = async (
        uid: string,
        email: string,
        username: string,
        profilePicture: string
    ) => {
        try {
            await firestore()
                .collection("Users")
                .doc(uid)
                .set({
                    email: email,
                    username: username,
                    profilePicture: profilePicture,
                    userId: uid,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });
            console.log("User added to Firestore!");
        } catch (err) {
            console.error("Error adding user to Firestore: ", err);
        }
    };

    return (
        <AuthContext.Provider value={{user,initializing, isLoading, setIsLoading, signUp, signIn, signOut, deleteUserData, resetPassword}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
