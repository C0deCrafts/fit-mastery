import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import auth, {FirebaseAuthTypes, deleteUser} from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import {router} from "expo-router";
import {getAuthErrorMessage} from "@/utils/authErrors";
import {Alert} from "react-native";
import {DEFAULT_PROFILE_IMAGE_URL} from "@/utils/common";
import {addUserToFirestore, deleteUserPhoto, uploadImageToFirebase} from "@/utils/firebaseUtils";

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
    uploadImage: (pathToFile: string) => Promise<void>;
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

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(user => {
            setUser(user);
            if (initializing) setInitializing(false);
        });
        return () => subscriber(); // Abonniere bei unmount
    }, [initializing]);

    // register a new user
    const signUp = async (email: string, password: string, username: string) => {
        await performAsyncTask(async () => {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            await user.updateProfile({
                displayName: username,
                photoURL: DEFAULT_PROFILE_IMAGE_URL,
            });
            setUser(auth().currentUser);
            await addUserToFirestore(user.uid, email, username, DEFAULT_PROFILE_IMAGE_URL);
            router.replace("/");
            console.log("User account created & signed in!");
        });
    };

    // sign in an existing user
    const signIn = async (email: string, password: string) => {
        await performAsyncTask(async () => {
            await auth().signInWithEmailAndPassword(email, password);
            router.replace("/");
            console.log("User signed in!");
        });
    };

    // sign out the current user (evtl. kein loading - dauert nicht lang)
    const signOut = async () => {
        await performAsyncTask(async () => {
            await auth().signOut();
            setUser(null);
            console.log("User signed out!");
        });
    }

    // delete the user account and all associated data
    const deleteUserData = async (email: string, password: string) => {
        const user: FirebaseAuthTypes.User | null = auth().currentUser;
        if(!user) return;

        await performAsyncTask(async () => {
            // Erneute Authentifizierung des Benutzers
            const credential = auth.EmailAuthProvider.credential(email, password);
            await user.reauthenticateWithCredential(credential);
            // Löscht das Benutzerfoto aus Firebase Storage, falls es existiert
            await deleteUserPhoto(user.uid);
            // Löscht Benutzer-Dokument aus Firestore
            await firestore().collection("Users").doc(user.uid).delete()
            // Danach das Benutzerkonto aus Firebase Authentication löschen
            await deleteUser(user);
            console.log("User deleted from Firebase!");
        });
    };

    // send a password reset email to the user
    const resetPassword = async (email: string) => {
        await performAsyncTask(async () => {
            await auth().sendPasswordResetEmail(email);
            Alert.alert("Geschafft!", "Eine E-Mail zum Zurücksetzen deines Passworts ist unterwegs! Schau in deinem Posteingang nach.");
        });
    }

    // upload an image to Firebase Storage and update the user's profile image
    const uploadImage = async (pathToFile: string
    ) => {
        if(!user) return;
        await performAsyncTask(async () => {
            const downloadURL = await uploadImageToFirebase(pathToFile, user?.uid!);
            await user.updateProfile({
                photoURL: downloadURL,
            });
            const updatedUser = auth().currentUser;
            setUser(updatedUser);
            console.log("User profile image updated!");
        });
    };

    // perform an async task and handle loading state and errors
    const performAsyncTask = async (task: () => Promise<void>) => {
        setIsLoading(true);
        try {
            await task();
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    // handle an error by displaying an alert and logging
    const handleError = (error: any) => {
        const [title, message] = getAuthErrorMessage(error.code);
        Alert.alert(title, message);
        console.error(error);
    };

    return (
        <AuthContext.Provider value={{user,initializing, isLoading, setIsLoading, signUp, signIn, signOut, deleteUserData, resetPassword, uploadImage}}>
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
