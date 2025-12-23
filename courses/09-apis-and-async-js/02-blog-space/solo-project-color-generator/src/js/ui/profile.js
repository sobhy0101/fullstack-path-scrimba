/**
 * Profile Modal - Google-style authentication UI
 */

let profileModal = null;
let profileBackdrop = null;
let isModalOpen = false;

/**
 * Create profile modal HTML
 */
function createProfileModal() {
    const modal = document.createElement('div');
    modal.id = 'profile-modal';
    modal.className = 'profile-modal';
    
    modal.innerHTML = `
        <!-- Sign In State (shown when not signed in) -->
        <div id="profile-signin" class="profile-signin">
            <p class="profile-signin__message">Sign in to save and manage your color palettes</p>
            <button id="profile-sign-in-btn" class="btn btn--google" type="button">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
            </button>
        </div>
        
        <!-- User Info State (shown when signed in) -->
        <div id="profile-userinfo" class="profile-userinfo" hidden>
            <div class="profile-header">
                <img id="profile-user-avatar" class="profile-avatar-large" src="./src/assets/avatar-placeholder.svg" alt="User avatar">
                <div class="profile-details">
                    <span id="profile-user-name" class="profile-name"></span>
                    <span id="profile-user-email" class="profile-email"></span>
                </div>
            </div>
            <div class="profile-actions">
                <button id="profile-sign-out-btn" class="profile-action-btn profile-action-btn--signout" type="button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 14H3.333A1.333 1.333 0 012 12.667V3.333A1.333 1.333 0 013.333 2H6M10.667 11.333L14 8l-3.333-3.333M14 8H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Sign out
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

/**
 * Create backdrop element
 */
function createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.id = 'profile-backdrop';
    backdrop.className = 'profile-backdrop';
    document.body.appendChild(backdrop);
    return backdrop;
}

/**
 * Initialize profile modal
 */
export function initProfileModal() {
    // Create modal and backdrop
    profileModal = createProfileModal();
    profileBackdrop = createBackdrop();
    
    // Setup profile button click
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', toggleProfileModal);
    }
    
    // Close on backdrop click
    profileBackdrop.addEventListener('click', closeProfileModal);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isModalOpen) {
            closeProfileModal();
        }
    });
}

/**
 * Open profile modal
 */
export function openProfileModal() {
    if (isModalOpen) return;
    
    isModalOpen = true;
    profileModal.classList.add('show');
    profileBackdrop.classList.add('show');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

/**
 * Close profile modal
 */
export function closeProfileModal() {
    if (!isModalOpen) return;
    
    isModalOpen = false;
    profileModal.classList.remove('show');
    profileBackdrop.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

/**
 * Toggle profile modal
 */
export function toggleProfileModal() {
    if (isModalOpen) {
        closeProfileModal();
    } else {
        openProfileModal();
    }
}

/**
 * Update profile UI based on authentication state
 * @param {Object|null} user - User object or null if signed out
 */
export function updateProfileUI(user) {
    const profileAvatar = document.getElementById('profile-avatar');
    const signInSection = document.getElementById('profile-signin');
    const userInfoSection = document.getElementById('profile-userinfo');
    const userAvatar = document.getElementById('profile-user-avatar');
    const userName = document.getElementById('profile-user-name');
    const userEmail = document.getElementById('profile-user-email');
    
    if (user && user.isSignedIn) {
        // Update profile button avatar
        if (profileAvatar && user.photoURL) {
            profileAvatar.src = user.photoURL;
        }
        
        // Show user info in modal
        if (signInSection) signInSection.hidden = true;
        if (userInfoSection) userInfoSection.hidden = false;
        
        // Update user details
        if (userAvatar) userAvatar.src = user.photoURL || './src/assets/avatar-placeholder.svg';
        if (userName) userName.textContent = user.displayName || user.email;
        if (userEmail) userEmail.textContent = user.email || '';
    } else {
        // Reset to default avatar
        if (profileAvatar) {
            profileAvatar.src = './src/assets/avatar-placeholder.svg';
        }
        
        // Show sign-in section in modal
        if (signInSection) signInSection.hidden = false;
        if (userInfoSection) userInfoSection.hidden = true;
    }
}

/**
 * Get sign-in button from modal
 */
export function getSignInButton() {
    return document.getElementById('profile-sign-in-btn');
}

/**
 * Get sign-out button from modal
 */
export function getSignOutButton() {
    return document.getElementById('profile-sign-out-btn');
}
