import {createContext, ReactNode, useContext, useState} from "react";

interface MuscleGroupContextType {
    activeMuscles: string[];
    toggleMuscle: (muscleId: string) => void;
    isActive: (muscleId: string) => boolean;
}

interface MuscleProviderProps {
    children: ReactNode;
}

const MuscleGroupContext = createContext<MuscleGroupContextType | null>(null);

export const MuscleGroupProvider = ({children}: MuscleProviderProps) => {
    const [activeMuscles, setActiveMuscles] = useState<string[]>([]);

    const toggleMuscle = (muscleId: string) => {
        setActiveMuscles((prevActiveMuscles) =>
            prevActiveMuscles.includes(muscleId)
                ? prevActiveMuscles.filter((id) => id !== muscleId)
                : [...prevActiveMuscles, muscleId]
        );
        console.log("Muscle Pressed: ", muscleId);
    };

    const isActive = (muscleId: string) => activeMuscles.includes(muscleId);

    return (
        <MuscleGroupContext.Provider value={{ activeMuscles, toggleMuscle, isActive }}>
            {children}
        </MuscleGroupContext.Provider>
    );
};

export const useMuscleGroup = () => {
    const context = useContext(MuscleGroupContext);
    if (!context) {
        throw new Error("useMuscleGroup must be used within a MuscleGroupProvider");
    }
    return context;
};