require('dotenv').config();
const fetch = require('node-fetch');

const API_URL = `http://localhost:${process.env.PORT || 5000}/api`;

// Test user registration
async function testRegistration() {
    try {
        console.log('Testing user registration...');
        
        // Generate a unique email
        const email = `test${Date.now()}@example.com`;
        
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Test User',
                email: email,
                password: 'Test1234!',
                role: 'traveler'
            })
        });
        
        console.log('Registration status:', response.status);
        
        const data = await response.json();
        console.log('Registration response:', data);
        
        if (data.token) {
            console.log('Registration successful, token received');
            return data.token;
        } else {
            console.log('Registration failed, no token received');
            return null;
        }
    } catch (error) {
        console.error('Error testing registration:', error);
        return null;
    }
}

// Test user login
async function testLogin(email = 'test@example.com', password = 'Test1234!') {
    try {
        console.log(`Testing login with ${email}...`);
        
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        console.log('Login status:', response.status);
        
        const data = await response.json();
        console.log('Login response:', data);
        
        if (data.token) {
            console.log('Login successful, token received');
            return data.token;
        } else {
            console.log('Login failed, no token received');
            return null;
        }
    } catch (error) {
        console.error('Error testing login:', error);
        return null;
    }
}

// Test protected route
async function testProtectedRoute(token) {
    try {
        console.log('Testing protected route...');
        
        if (!token) {
            console.log('No token provided, skipping test');
            return;
        }
        
        const response = await fetch(`${API_URL}/auth/test`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('Protected route status:', response.status);
        
        const data = await response.json();
        console.log('Protected route response:', data);
    } catch (error) {
        console.error('Error testing protected route:', error);
    }
}

// Run all tests
async function runTests() {
    console.log('=== AUTHENTICATION API TESTS ===');
    
    // Test registration
    const registrationToken = await testRegistration();
    console.log('-------------------');
    
    // Test login with new user
    let loginToken = null;
    if (registrationToken) {
        // If registration worked, try logging in with the same credentials
        loginToken = await testLogin('test@example.com', 'Test1234!');
    } else {
        // Try with default credentials
        loginToken = await testLogin();
    }
    console.log('-------------------');
    
    // Test protected route
    await testProtectedRoute(loginToken || registrationToken);
    console.log('-------------------');
    
    console.log('=== TESTS COMPLETED ===');
}

runTests(); 