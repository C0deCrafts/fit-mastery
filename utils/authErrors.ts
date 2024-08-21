/**
 * Returns a user-friendly error message based on the provided authentication error code.
 *
 * @param {string} errorCode - The error code received during authentication.
 * @returns {[string, string]} A tuple containing two strings:
 *                              1. A title for the error message.
 *                              2. A detailed error message explaining the issue and suggesting a next step.
 *
 * The following error codes are handled:
 * - "auth/invalid-credential": Returned when the user provides invalid credentials (e.g., wrong password).
 * - "auth/invalid-email": Returned when the user provides an invalid email address.
 * - "auth/user-disabled": Returned when the user's account has been disabled.
 * - "auth/too-many-requests": Returned when the user has made too many failed login attempts in a short period.
 * - "auth/email-already-in-use": Returned when the email address is already associated with another account.
 * - "auth/weak-password": Returned when the user provides a password that is too weak.
 *
 * If the provided error code does not match any of the predefined cases, a default message is returned.
 */
export const getAuthErrorMessage = (errorCode: string): [string, string] => {
    switch (errorCode) {
        case "auth/invalid-credential":
            return ["Hoppla!", "Bist du schon registriert? Wenn ja, dann scheint dein Passwort falsch zu sein. Versuch's nochmal!"]; // funkt
        case "auth/invalid-email":
            return ["Hoppla!", "Deine Email ist ungültig. Versuch's nochmal!"]; // funkt
        case "auth/user-disabled":
            return ["Oh nein!", "Dein Konto wurde deaktiviert. Wenn das ein Fehler ist, melde dich bei uns!"];
        case "auth/too-many-requests":
            return ["Beruhige dich!", "Du hast es ein paar Mal zu oft probiert. Nimm dir eine kurze Pause und dann versuchen wir es nochmal!"];
        case "auth/email-already-in-use":
            return ["Hoppla!", "Diese Email existiert bereits. Logge dich damit ein!"];
        case"auth/weak-password":
            return ["Hoppla!", "Dein Passwort ist zu schwach. Versuch's nochmal!"];
        default:
            return ["Uups!", `Irgendwas lief schief: ${errorCode}. Keine Panik, wir kriegen das zusammen hin!`];
    }
};
