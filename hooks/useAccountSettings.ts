import {useAuth} from "@/context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import {useState} from "react";

interface AccountSettingsHook {
    selectImage: () => Promise<void>,
    localPhotoURL: string | undefined | null
}
/**
 * useAccountSettings is a custom hook that provides functionality for managing
 * user account settings, specifically for selecting and uploading profile images.
 * It includes image resizing, local UI updates, and background uploading to Firebase.
 *
 * @returns {object} - Returns an object containing `selectImage` function for selecting an image
 * and `localPhotoURL` which is the locally stored photo URL used to immediately update the UI.
 */
const useAccountSettings = (): AccountSettingsHook => {
    const {user, uploadImage} = useAuth();
    const [localPhotoURL, setLocalPhotoURL] = useState(user?.photoURL); // Lokales state für sofortige UI-Aktualisierung

    /**
     * Resizes the selected image to a width of 800 pixels, compresses it, and converts it to JPEG format.
     *
     * @param {string} uri - The URI of the image to be resized.
     * @returns {Promise<string>} - Returns a promise that resolves to the URI of the resized image.
     */
    const resizeImage = async (uri: string): Promise<string> => {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{resize: {width: 800}}],
            {compress: 0.7, format: ImageManipulator.SaveFormat.JPEG}
        );
        return manipulatedImage.uri;
    };
    /**
     * Launches the image picker to allow the user to select an image from their gallery.
     * Once an image is selected, it resizes the image, updates the UI with the local photo,
     * and uploads the image in the background to Firebase.
     *
     * @returns {Promise<void>} - Returns a promise that resolves when the image selection and upload process is complete.
     */
    const selectImage = async (): Promise<void> => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImage = await resizeImage(result.assets[0].uri);
            //console.log("Selected image: ", selectedImage);

            // Update local state to immediately reflect the selected image in the UI
            setLocalPhotoURL(selectedImage);
            // Start uploading the image in the background
            await uploadImage(selectedImage);
        }
    };
    return {selectImage, localPhotoURL};
}

export default useAccountSettings;