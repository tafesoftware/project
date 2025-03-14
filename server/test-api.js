require('dotenv').config();
const fetch = require('node-fetch');

const API_URL = `http://localhost:${process.env.PORT || 5000}/api`;

async function testEndpoint(endpoint) {
    try {
        console.log(`Testing ${endpoint}...`);
        const response = await fetch(`${API_URL}${endpoint}`);
        const status = response.status;
        
        console.log(`Status: ${status}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Response:', JSON.stringify(data, null, 2));
        } else {
            console.log('Error response:', await response.text());
        }
        
        console.log('-------------------');
    } catch (error) {
        console.error(`Error testing ${endpoint}:`, error.message);
        console.log('-------------------');
    }
}

async function runTests() {
    // Test health check
    await testEndpoint('/health-check');
    
    // Test hotels endpoint
    await testEndpoint('/hotels');
    
    // Test other endpoints
    await testEndpoint('/restaurants');
    await testEndpoint('/destinations');
}

runTests(); 