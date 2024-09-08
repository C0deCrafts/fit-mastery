import firestore from '@react-native-firebase/firestore';
import exercises from "@/data/exercises.json";

// Funktion zur Generierung des GIF-Dateinamens
const generateGifFileName = (exerciseName: string): string => {
    return exerciseName
            .toLowerCase()
            .replace(/\s+/g, '-') // Ersetzt Leerzeichen durch Bindestriche
            .replace(/ä/g, 'ae') // Ersetzt ä durch ae
            .replace(/ö/g, 'oe') // Ersetzt ö durch oe
            .replace(/ü/g, 'ue') // Ersetzt ü durch ue
            .replace(/ß/g, 'ss') // Ersetzt ß durch ss
            .replace(/[^\w-]+/g, '') // Entfernt alle anderen Sonderzeichen
        + '.gif'; // Fügt .gif als Endung hinzu
};

// Funktion zum Hochladen von Übungen in Firebase
export const uploadExercisesToFirebase = async (): Promise<void> => {
    let counter = 0;

    try {
        await Promise.all(exercises.map(async (exercise) => {
            await firestore()
                .collection("Exercises")
                .doc(exercise.name)  // Verwende den Namen als Dokument-ID
                .set({
                    name: exercise.name,
                    bodyPart: exercise.bodyPart,
                    equipment: "",
                    gifUrl: "",
                    imageUrl: "",
                    videoUrl: "",
                    secondaryMuscles: exercise.secondaryMuscles,
                    description: exercise.description,
                });

            counter++;
            console.log(`Successfully uploaded ${exercise.name}. Total uploaded: ${counter}`);
        }));
    } catch (error) {
        console.error('Failed to upload some exercises:', error);
    }
}

// Funktion zum Aktualisieren der gifUrl für alle Übungen eines Muskelbereichs
export const updateGifUrls = async (bodyPart: string): Promise<void> => {
    try {
        // Übungen basierend auf dem bodyPart abrufen
        const snapshot = await firestore()
            .collection('Exercises')
            .where('bodyPart', '==', bodyPart)
            .get();

        const exercises = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id, // ID des Dokuments für das Update
                ...data
            };
        });

        await Promise.all(exercises.map(async (exercise) => {
            const gifFileName = generateGifFileName(exercise.name);

            console.log(`Aktualisiere ${exercise.name} mit gifUrl: ${gifFileName}`);

            // Firebase Firestore-Dokument aktualisieren
            await firestore().collection('Exercises').doc(exercise.id).update({
                gifUrl: gifFileName
            });
        }));

        console.log('Alle GIF-URLs wurden erfolgreich aktualisiert.');
    } catch (error) {
        console.error('Fehler beim Abrufen oder Aktualisieren der Übungen:', error);
    }
};