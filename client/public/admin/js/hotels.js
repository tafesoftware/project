document.addEventListener('DOMContentLoaded', function() {
    // Load hotels data
    loadHotels();
    
    // Initialize event listeners
    initEventListeners();
});

// Mock hotels data for demonstration
const mockHotels = [
    {
        id: 1,
        name: "Sheraton Addis",
        city: "Addis Ababa",
        rating: 5,
        priceRange: "$$$",
        totalRooms: 295,
        activeBookings: 156,
        status: "active",
        image: "../images/hotels/sheraton.jpg",
        description: "Luxury hotel in the heart of Addis Ababa",
        amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Gym"]
    },
    // Add more mock hotel data...
];

// Load hotels data
function loadHotels() {
    const tableBody = document.getElementById('hotelsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    mockHotels.forEach(hotel => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${hotel.id}</td>
            <td>
                <div class="hotel-info">
                    <img src="${hotel.image}" alt="${hotel.name}" class="hotel-thumbnail">
                    <div>
                        <div class="hotel-name">${hotel.name}</div>
                        <div class="hotel-description">${hotel.description}</div>
                    </div>
                </div>
            </td>
            <td>${hotel.city}</td>
            <td>
                <div class="rating">
                    ${generateStarRating(hotel.rating)}
                </div>
            </td>
            <td>${hotel.priceRange}</td>
            <td>${hotel.totalRooms}</td>
            <td>${hotel.activeBookings}</td>
            <td>
                <span class="status-badge status-${hotel.status.toLowerCase()}">${capitalizeFirst(hotel.status)}</span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-view" onclick="viewHotel(${hotel.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-edit" onclick="editHotel(${hotel.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteHotel(${hotel.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize event listeners
function initEventListeners() {
    // Add hotel button
    const addHotelBtn = document.getElementById('addHotelBtn');
    if (addHotelBtn) {
        addHotelBtn.addEventListener('click', () => openHotelModal());
    }
    
    // Form submission
    const hotelForm = document.getElementById('hotelForm');
    if (hotelForm) {
        hotelForm.addEventListener('submit', handleHotelSubmit);
    }
    
    // Filters
    const filters = document.querySelectorAll('.admin-filters select');
    filters.forEach(filter => {
        filter.addEventListener('change', loadHotels);
    });
}

// Helper functions
function generateStarRating(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// More functions for handling hotel operations... 