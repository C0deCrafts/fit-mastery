import {Redirect, Slot} from 'expo-router';
import {useAuth} from "@/context/AuthContext";
import {useEffect} from "react";
import {Loading} from "@/components/Loading";

export default function AppLayout() {
    // Access user authentication state and loading flags
    const {user, initializing} = useAuth();

    useEffect(() => {
        console.log("Session in layout: ", user);
    }, [initializing]);

    // Show loading screen while app is initializing
    if (initializing) {
        console.log("Initialisiere... Warte auf Abschluss.");
        return <Loading/>; // Ladebildschirm (evtl. umbauen und splashscreen einbauen)
    }

    // Redirect to the sign-in screen if the user is not authenticated
    if (!user) {
        return <Redirect href="/signIn"/>;
    }

    // Render the main application layout once the user is authenticated
    return <Slot/>
}
