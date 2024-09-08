import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export interface ExerciseProps {
    id: string;
    name: string;
    bodyPart: string;
    description: string[];
    equipment: string;
    gifUrl: string;
    imageUrl: string;
    videoUrl: string;
    secondaryMuscles: string[];
}

interface ExerciseContextType {
    exercises: ExerciseProps[];
    loading: boolean;
    fetchExercises: (bodyPart: string) => Promise<void>;
}

interface ExerciseProviderProps {
    children: ReactNode;
}

const ExercisesContext = createContext<ExerciseContextType | null>(null);

/**
 * ExercisesProvider is responsible for fetching and providing exercise data.
 * It fetches exercises from Firestore based on a body part and retrieves the GIF URLs
 * from Firebase Storage.
 *
 * @param {ExerciseProviderProps} props - The properties for configuring the ExercisesProvider component.
 * @param {ReactNode} props.children - The child components that will have access to the exercises context.
 *
 * @example
 * <ExercisesProvider>
 *    <SomeChildComponent />
 * </ExercisesProvider>
 */
export const ExercisesProvider = ({ children }: ExerciseProviderProps) => {
    const [exercises, setExercises] = useState<ExerciseProps[]>([]);
    const [loading, setLoading] = useState(false);

    /**
     * Fetches exercises from Firestore based on the provided body part and
     * retrieves the full GIF URL from Firebase Storage.
     *
     * @param {string} bodyPart - The body part to fetch exercises for.
     */
    const fetchExercises = async (bodyPart: string) => {
        setLoading(true);
        try {
            const snapshot = await firestore()
                .collection('Exercises')
                .where('bodyPart', '==', bodyPart)
                .get();

            const exerciseList = await Promise.all(snapshot.docs.map(async (doc) => {
                const data = doc.data();

                // Retrieve the filename from Firestore (e.g., gifUrl)
                const gifFileName = data.gifUrl;

                // Fetch the full URL with token from Firebase Storage
                let gifUrl = '';
                if (gifFileName) {
                    try {
                        gifUrl = await storage().ref(`images/exercises/chest/${gifFileName}`).getDownloadURL();
                    } catch (error) {
                        console.error(`Error fetching GIF URL for ${gifFileName}:`, error);
                    }
                }

                return {
                    id: doc.id,
                    name: data.name || '',
                    bodyPart: data.bodyPart || '',
                    description: data.description || [],
                    equipment: data.equipment || '',
                    gifUrl,
                    imageUrl: data.imageUrl || '',
                    videoUrl: data.videoUrl || '',
                    secondaryMuscles: data.secondaryMuscles || []
                };
            }));

            setExercises(exerciseList);
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch 'Brust' exercises on app start
    useEffect(() => {
        fetchExercises('Brust').then(() =>
            console.log("Exercises fetched successfully."));
    }, []);

    return (
        <ExercisesContext.Provider value={{ exercises, loading, fetchExercises }}>
            {children}
        </ExercisesContext.Provider>
    );
};

/**
 * Custom hook to access the ExercisesContext.
 * Throws an error if used outside the ExercisesProvider.
 *
 * @returns {ExerciseContextType} The context containing exercise data and loading state.
 */
export const useExercises = (): ExerciseContextType => {
    const context = useContext(ExercisesContext);
    if (!context) {
        throw new Error("useExercises must be used within an ExercisesProvider");
    }
    return context;
};
