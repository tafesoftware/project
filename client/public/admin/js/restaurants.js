document.addEventListener('DOMContentLoaded', function() {
    // Load restaurants data
    loadRestaurants();
    
    // Initialize event listeners
    initEventListeners();
});

// Mock restaurants data for demonstration
const mockRestaurants = [
    {
        id: 1,
        name: "Yod Abyssinia",
        city: "Addis Ababa",
        cuisine: "Ethiopian",
        rating: 4.8,
        priceRange: "$$$",
        status: "active",
        image: "../images/restaurants/yod.jpg",
        description: "Traditional Ethiopian cuisine with cultural performances",
        images: [
            "../images/restaurants/yod1.jpg",
            "../images/restaurants/yod2.jpg",
            "../images/restaurants/yod3.jpg"
        ]
    },
    // Add more mock restaurant data...
];

// Load restaurants data
function loadRestaurants() {
    const tableBody = document.getElementById('restaurantsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    mockRestaurants.forEach(restaurant => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${restaurant.id}</td>
            <td>
                <div class="restaurant-info">
                    <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-thumbnail">
                    <div>
                        <div class="restaurant-name">${restaurant.name}</div>
                        <div class="restaurant-description">${restaurant.description}</div>
                    </div>
                </div>
            </td>
            <td>${restaurant.city}</td>
            <td>${restaurant.cuisine}</td>
            <td>
                <div class="rating">
                    ${generateStarRating(restaurant.rating)}
                </div>
            </td>
            <td>${restaurant.priceRange}</td>
            <td>
                <span class="status-badge status-${restaurant.status.toLowerCase()}">${capitalizeFirst(restaurant.status)}</span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-view" onclick="viewRestaurant(${restaurant.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-edit" onclick="editRestaurant(${restaurant.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteRestaurant(${restaurant.id})" title="Delete">
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
    // Add restaurant button
    const addRestaurantBtn = document.getElementById('addRestaurantBtn');
    if (addRestaurantBtn) {
        addRestaurantBtn.addEventListener('click', () => openRestaurantModal());
    }
    
    // Form submission
    const restaurantForm = document.getElementById('restaurantForm');
    if (restaurantForm) {
        restaurantForm.addEventListener('submit', handleRestaurantSubmit);
    }
    
    // Filters
    const filters = document.querySelectorAll('.admin-filters select');
    filters.forEach(filter => {
        filter.addEventListener('change', loadRestaurants);
    });
}

// Helper functions
function generateStarRating(rating) {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// More functions for handling restaurant operations... 