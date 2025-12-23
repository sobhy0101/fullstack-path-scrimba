/**
 * Firebase Authentication Module
 * Handles user authentication with Google Sign-In
 */

import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { auth } from './config.js';
import { showToast } from '../toast.js';

const provider = new GoogleAuthProvider();

/**
 * Sign in with Google
 * @returns {Promise<Object>} User credentials
 */
export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        showToast(`Welcome, ${user.displayName}! 👋`, 'success');
        
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        };
    } catch (error) {
        console.error('Error signing in with Google:', error);
        
        // Handle specific errors
        if (error.code === 'auth/popup-closed-by-user') {
            showToast('Sign-in cancelled', 'info');
        } else if (error.code === 'auth/popup-blocked') {
            showToast('Please allow popups for this site', 'error');
        } else {
            showToast('Failed to sign in. Please try again.', 'error');
        }
        
        throw error;
    }
}

/**
 * Sign out current user
 * @returns {Promise<void>}
 */
export async function signOutUser() {
    try {
        await signOut(auth);
        showToast('Signed out successfully', 'success');
    } catch (error) {
        console.error('Error signing out:', error);
        showToast('Failed to sign out', 'error');
        throw error;
    }
}

/**
 * Get current user info
 * @returns {Object|null} User info or null
 */
export function getCurrentUserInfo() {
    const user = auth.currentUser;
    
    if (!user) return null;
    
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
    };
}

/**
 * Get current user (alias for getCurrentUserInfo)
 * @returns {Object|null} User info or null
 */
export function getCurrentUser() {
    return getCurrentUserInfo();
}

/**
 * Listen to authentication state changes
 * @param {Function} callback - Function to call on auth state change
 * @returns {Function} Unsubscribe function
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            callback({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                isSignedIn: true
            });
        } else {
            callback({
                isSignedIn: false
            });
        }
    });
}

/**
 * Initialize authentication and listen for auth state changes
 * @param {Function} callback - Function to call on auth state change
 * @returns {Function} Unsubscribe function
 */
export function initAuth(callback) {
    return onAuthChange(callback);
}

/**
 * Check if user is signed in
 * @returns {boolean}
 */
export function isUserSignedIn() {
    return !!auth.currentUser;
}
