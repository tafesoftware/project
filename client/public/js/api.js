// Update the mock data to include arrays of images
const mockHotels = [
    {
        id: 1,
        name: "Sheraton Addis",
        location: "Addis Ababa",
        rating: 4.8,
        reviewCount: 245,
        price: 150,
        images: [
            "images/hotels/sheraton1.jpg",
            "images/hotels/sheraton2.jpg",
            "images/hotels/sheraton3.jpg",
            "images/hotels/sheraton4.jpg"
        ],
        amenities: ["wifi", "pool", "spa", "restaurant", "gym"]
    },
    {
        id: 2,
        name: "Hilton Hawassa",
        location: "Hawassa",
        rating: 4.5,
        reviewCount: 187,
        price: 120,
        images: [
            "images/hotels/hilton1.jpg",
            "images/hotels/hilton2.jpg",
            "images/hotels/hilton3.jpg"
        ],
        amenities: ["wifi", "pool", "restaurant", "parking"]
    },
    // Add more hotels with multiple images
];

const mockRestaurants = [
    {
        id: 1,
        name: "Yod Abyssinia",
        location: "Addis Ababa",
        cuisine: "Traditional Ethiopian",
        rating: 4.7,
        reviewCount: 320,
        priceRange: 3,
        images: [
            "images/restaurants/yod1.jpg",
            "images/restaurants/yod2.jpg",
            "images/restaurants/yod3.jpg"
        ]
    },
    {
        id: 2,
        name: "Kategna Restaurant",
        location: "Addis Ababa",
        cuisine: "Ethiopian Fusion",
        rating: 4.5,
        reviewCount: 210,
        priceRange: 2,
        images: [
            "images/restaurants/kategna1.jpg",
            "images/restaurants/kategna2.jpg",
            "images/restaurants/kategna3.jpg"
        ]
    },
    // Add more restaurants with multiple images
];

const API_URL = 'http://localhost:5000/api';

// Register user
async function registerUser(userData) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));

        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

// Login user
async function loginUser(credentials) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));

        return data;
    } catch (error) {
        throw error;
    }
}

// Get user bookings
async function getUserBookings() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/bookings`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw error;
    }
} 