import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import auth, {FirebaseAuthTypes, getAuth, deleteUser} from "@react-native-firebase/auth";
import {router} from "expo-router";
import {getAuthErrorMessage} from "@/utils/authErrors";
import {Alert} from "react-native";

interface AuthContextType {
    user: FirebaseAuthTypes.User | null; // user
    initializing: boolean;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username: string) => Promise<void>;
    signOut: () => Promise<void>;
    deleteUserData: () => Promise<void>;
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
            .then(() => {
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

    // sign out the current user
    const signOut = async () => {
        await auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    const deleteUserData = async () => {
        const auth = getAuth();
        const user: FirebaseAuthTypes.User | null = auth.currentUser;

        if(user){
            await deleteUser(user).then(()=> {
                console.log("User deleted!")
            }).catch((err)=> {
                console.error("Error deleting user: ", err);
            })
        }
    }

    return (
        <AuthContext.Provider value={{user,initializing, isLoading, setIsLoading, signUp, signIn, signOut, deleteUserData}}>
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
