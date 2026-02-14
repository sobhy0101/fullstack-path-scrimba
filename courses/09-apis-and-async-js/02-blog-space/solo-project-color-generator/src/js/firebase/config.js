/**
 * Firebase Configuration
 * Initialize Firebase app with Realtime Database and Authentication
 * 
 * Note: API keys in Firebase web apps are public and safe to expose
 * Security is enforced through Firebase Security Rules, not the API key
 */

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
// These values are safe to commit - they identify your project but don't grant access
// Security is enforced through Firebase Security Rules AND API key restrictions
const firebaseConfig = {
    apiKey: "AIzaSyDPCLO6S6T6x7SCyH-jNXjZ-MHAuYwxKpg",
    authDomain: "sobhy-color-generator-app.firebaseapp.com",
    databaseURL: "https://sobhy-color-generator-app-default-rtdb.firebaseio.com",
    projectId: "sobhy-color-generator-app",
    storageBucket: "sobhy-color-generator-app.firebasestorage.app",
    messagingSenderId: "145130207254",
    appId: "1:145130207254:web:5d65ac8827830fd7dc9d37",
    measurementId: "G-R45QD6TEHK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const database = getDatabase(app);
const auth = getAuth(app);

// Export initialized services
export { app, database, auth };

/**
 * Check if Firebase is initialized
 * @returns {boolean}
 */
export function isFirebaseInitialized() {
    return !!app;
}

/**
 * Get current Firebase user
 * @returns {Object|null} Current user or null if not signed in
 */
export function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
    return !!auth.currentUser;
}
