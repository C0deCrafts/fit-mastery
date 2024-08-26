import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

/**
 * Uploads an image file to Firebase Storage and returns the download URL.
 *
 * @param {string} pathToFile - The local file path of the image to be uploaded.
 * @param {string} uid - The user ID to associate the uploaded image with.
 * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded image.
 * @throws err Will throw an error if the upload fails.
 */
export const uploadImageToFirebase = async (pathToFile: string, uid: string): Promise<string> => {
    //console.log(utils.FilePath.PICTURES_DIRECTORY); // Path to the pictures directory
    const reference = storage().ref(`images/avatars/${uid}`);
    try {
        await reference.putFile(pathToFile);
        return await reference.getDownloadURL();
    } catch (err) {
        console.error('Error uploading image: ', err);
        throw err;
    }
};
/**
 * Deletes a user's profile photo from Firebase Storage if it exists.
 *
 * @param {string} uid - The user ID associated with the photo to be deleted.
 * @returns {Promise<void>} - A promise that resolves when the photo is deleted or if no photo exists.
 */
export const deleteUserPhoto = async (uid: string): Promise<void> => {
    const photoRef = storage().ref(`images/avatars/${uid}`);
    await photoRef.delete().catch(err => {
        console.log("Kein Foto zum löschen vorhanden!");
    });
};
/**
 * Adds a new user document to Firestore with the provided details.
 *
 * @param {string} uid - The user ID to associate with the document.
 * @param {string} email - The user's email address.
 * @param {string} username - The user's chosen username.
 * @param {string} profilePicture - The URL of the user's profile picture.
 * @returns {Promise<void>} - A promise that resolves when the document is successfully added.
 * @throws err Will throw an error if adding the document to Firestore fails.
 */
export const addUserToFirestore = async (
    uid: string,
    email: string,
    username: string,
    profilePicture: string
): Promise<void> => {
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
        throw err;
    }
};
