document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Load user data
    loadUserData();
    
    // Load upcoming bookings
    loadUpcomingBookings();
    
    // Load recent activity
    loadRecentActivity();
});

// Check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
}

// Load user data
function loadUserData() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('userName').textContent = user.name;
        if (user.avatar) {
            document.getElementById('userAvatar').src = user.avatar;
        }
    }
}

// Load upcoming bookings
function loadUpcomingBookings() {
    const bookingsList = document.getElementById('upcomingBookings');
    if (!bookingsList) return;

    // Mock data - replace with API call
    const upcomingBookings = [
        {
            id: 1,
            type: 'hotel',
            name: 'Sheraton Addis',
            date: '2024-05-20',
            status: 'confirmed'
        },
        {
            id: 2,
            type: 'tour',
            name: 'Lalibela Rock Churches Tour',
            date: '2024-05-22',
            status: 'pending'
        }
    ];

    bookingsList.innerHTML = upcomingBookings.map(booking => `
        <div class="booking-item">
            <div class="booking-icon">
                <i class="fas fa-${booking.type === 'hotel' ? 'hotel' : 'map-marked-alt'}"></i>
            </div>
            <div class="booking-info">
                <h3>${booking.name}</h3>
                <p>${formatDate(booking.date)}</p>
                <span class="status-badge status-${booking.status}">${capitalizeFirst(booking.status)}</span>
            </div>
        </div>
    `).join('');
}

// Load recent activity
function loadRecentActivity() {
    const activityList = document.getElementById('recentActivity');
    if (!activityList) return;

    // Mock data - replace with API call
    const recentActivity = [
        {
            type: 'review',
            item: 'Sheraton Addis',
            date: '2024-05-10',
            details: 'You left a 5-star review'
        },
        {
            type: 'booking',
            item: 'Lalibela Rock Churches Tour',
            date: '2024-05-09',
            details: 'Tour booking confirmed'
        }
    ];

    activityList.innerHTML = recentActivity.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="fas fa-${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-info">
                <h4>${activity.item}</h4>
                <p>${activity.details}</p>
                <small>${formatDate(activity.date)}</small>
            </div>
        </div>
    `).join('');
}

// Helper functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getActivityIcon(type) {
    const icons = {
        review: 'star',
        booking: 'calendar-check',
        tour: 'map-marked-alt',
        hotel: 'hotel'
    };
    return icons[type] || 'circle';
}

// Add these functions to handle bookings
async function createBooking(bookingData) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
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

async function updateBooking(bookingId, updateData) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateData)
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

async function deleteBooking(bookingId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
            method: 'DELETE',
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