import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Save an email address to the mailing list collection
 * @param {string} email - User's email address
 * @param {string} name - User's name (optional)
 * @param {string} source - Source of signup ('auth' or 'newsletter')
 * @returns {Promise<string>} - Document ID of the saved record
 */
export const saveMailingListSignup = async (email, name = "", source = "auth") => {
    try {
        const docRef = await addDoc(collection(db, "mailingList"), {
            email,
            name,
            source,
            signupDate: serverTimestamp(),
        });
        console.log("Mailing list signup saved:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving mailing list signup:", error);
        throw error;
    }
};

/**
 * Log a user login event
 * @param {string} userId - Firebase Auth user ID
 * @param {string} email - User's email address
 * @returns {Promise<string>} - Document ID of the logged event
 */
export const logLoginEvent = async (userId, email) => {
    try {
        const docRef = await addDoc(collection(db, "loginEvents"), {
            userId,
            email,
            loginTime: serverTimestamp(),
            userAgent: navigator.userAgent,
        });
        console.log("Login event logged:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error logging login event:", error);
        throw error;
    }
};

/**
 * Log a user logout event
 * @param {string} userId - Firebase Auth user ID
 * @param {string} email - User's email address
 * @param {number} sessionDuration - Session duration in seconds
 * @returns {Promise<string>} - Document ID of the logged event
 */
export const logLogoutEvent = async (userId, email, sessionDuration = 0) => {
    try {
        const docRef = await addDoc(collection(db, "logoutEvents"), {
            userId,
            email,
            logoutTime: serverTimestamp(),
            sessionDuration,
        });
        console.log("Logout event logged:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error logging logout event:", error);
        throw error;
    }
};

/**
 * Log a failed login attempt
 * @param {string} email - Email used in the failed attempt
 * @param {string} errorCode - Firebase auth error code
 * @param {string} errorMessage - Error message
 * @param {string} attemptType - Type of attempt ('login' or 'signup')
 * @returns {Promise<string>} - Document ID of the logged event
 */
export const logFailedLoginAttempt = async (email, errorCode, errorMessage, attemptType = "login") => {
    try {
        const docRef = await addDoc(collection(db, "failedLoginAttempts"), {
            email,
            errorCode,
            errorMessage,
            attemptType,
            attemptTime: serverTimestamp(),
            userAgent: navigator.userAgent,
            ipAddress: null, // Would need server-side implementation for real IP
        });
        console.log("Failed login attempt logged:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error logging failed login attempt:", error);
        // Don't throw - we don't want to break the flow if logging fails
    }
};
