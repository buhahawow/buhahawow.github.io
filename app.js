document.addEventListener('DOMContentLoaded', () => {
    const loginView = document.getElementById('login-view');
    const profileView = document.getElementById('profile-view');
    const loginForm = document.getElementById('login-form');
    const changeProfileForm = document.getElementById('change-profile-form');
    const logoutButton = document.getElementById('logout-button');
    const messageDiv = document.getElementById('message');

    let currentUser = null;

    // Show login view by default
    loginView.style.display = 'block';
    profileView.style.display = 'none';

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        messageDiv.textContent = '';

        try {
            await api.login(email, password);
            currentUser = { email, password };
            loginView.style.display = 'none';
            profileView.style.display = 'block';
            messageDiv.textContent = 'Login successful!';
        } catch (error) {
            messageDiv.textContent = `Error: ${error.message}`;
        }
    });

    changeProfileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newEmail = document.getElementById('newEmail').value;
        const newPassword = document.getElementById('newPassword').value;
        messageDiv.textContent = '';

        if (!currentUser) {
            messageDiv.textContent = 'You must be logged in to change your profile.';
            return;
        }

        try {
            await api.changeProfile(currentUser.email, currentUser.password, newEmail, newPassword);
            // Update current user credentials for subsequent changes
            currentUser.email = newEmail || currentUser.email;
            currentUser.password = newPassword || currentUser.password;
            messageDiv.textContent = 'Profile updated successfully!';
            changeProfileForm.reset();
        } catch (error) {
            messageDiv.textContent = `Error: ${error.message}`;
        }
    });

    logoutButton.addEventListener('click', () => {
        currentUser = null;
        loginView.style.display = 'block';
        profileView.style.display = 'none';
        loginForm.reset();
        changeProfileForm.reset();
        messageDiv.textContent = 'You have been logged out.';
    });
});
