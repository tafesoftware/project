// Improved authentication handling
document.addEventListener('DOMContentLoaded', function() {
    debugLog('Auth module loaded');
    
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeSignupModal = document.getElementById('closeSignupModal');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    
    // Debug DOM elements
    debugLog('Login Form:', loginForm);
    debugLog('Signup Form:', signupForm);
    debugLog('Login Modal:', loginModal);
    debugLog('Signup Modal:', signupModal);
    
    // Event Listeners
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            debugLog('Login button clicked');
            showModal(loginModal);
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            debugLog('Signup button clicked');
            showModal(signupModal);
        });
    }
    
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            hideModal(loginModal);
            showModal(signupModal);
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            hideModal(signupModal);
            showModal(loginModal);
        });
    }
    
    if (closeLoginModal) {
        closeLoginModal.addEventListener('click', function() {
            hideModal(loginModal);
        });
    }
    
    if (closeSignupModal) {
        closeSignupModal.addEventListener('click', function() {
            hideModal(signupModal);
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
    
    // Form Submissions
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            debugLog('Login form submitted');
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            login(email, password);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            debugLog('Signup form submitted');
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const role = document.getElementById('userType').value;
            
            if (!validateEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            if (!validatePassword(password)) {
                showAlert('Password must be at least 8 characters with uppercase, lowercase, number and special character', 'error');
                return;
            }
            
            register(name, email, password, role);
        });
    }
    
    // Helper Functions
    function showModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            debugLog('Showing modal:', modal.id);
        }
    }
    
    function hideModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            debugLog('Hiding modal:', modal.id);
        }
    }
    
    // Authentication Functions
    async function login(email, password) {
        try {
            debugLog('Attempting login with:', email);
            
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            debugLog('Login successful, token stored');
            
            // Show success message
            showAlert('Login successful!', 'success');
            
            // Hide modal
            hideModal(loginModal);
            
            // Update UI
            updateAuthUI(true);
            
            // Refresh the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            
        } catch (error) {
            debugLog('Login error:', error);
            showAlert(error.message, 'error');
        }
    }
    
    async function register(name, email, password, role) {
        try {
            debugLog('Registering user:', { name, email, role });
            
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, role })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }
            
            // Store token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            debugLog('Registration successful, token stored');
            
            // Show success message
            showAlert('Registration successful! You are now logged in.', 'success');
            
            // Hide modal
            hideModal(signupModal);
            
            // Update UI
            updateAuthUI(true);
            
            // Refresh the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            
        } catch (error) {
            debugLog('Registration error:', error);
            showAlert(error.message, 'error');
        }
    }
    
    function logout() {
        debugLog('Logging out user');
        
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Update UI
        updateAuthUI(false);
        
        // Show message
        showAlert('You have been logged out', 'info');
        
        // Refresh the page after a short delay
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    }
    
    // Show Alert Message
    function showAlert(message, type) {
        debugLog('Showing alert:', message, type);
        // Remove any existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
    
    // Check auth status on page load
    const token = localStorage.getItem('token');
    if (token) {
        updateAuthUI(true);
    }
    
    // Update UI based on auth state
    function updateAuthUI(isLoggedIn) {
        debugLog('Updating UI for auth state:', isLoggedIn);
        if (isLoggedIn) {
            if (authButtons) authButtons.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            const user = JSON.parse(localStorage.getItem('user'));
            const userAvatar = document.querySelector('.user-avatar');
            if (userAvatar && user) {
                userAvatar.alt = user.name;
            }
        } else {
            if (authButtons) authButtons.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
        }
    }
});

// Validation functions
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Global functions for auth status
function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
}

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}