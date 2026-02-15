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
// Using environment variables to avoid exposing keys in source code
// Copy .env.example to .env and fill in your values
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
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
