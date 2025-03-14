document.addEventListener('DOMContentLoaded', function() {
    // Load data for each section
    loadDestinations();
    loadHotels();
    loadRestaurants();
    loadTourGuides();
    
    // Set current date as minimum for date inputs
    setMinDates();
});

// Set minimum dates for date inputs
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const checkInDate = document.getElementById('checkInDate');
    const checkOutDate = document.getElementById('checkOutDate');
    
    if (checkInDate && checkOutDate) {
        checkInDate.min = today;
        checkOutDate.min = today;
        
        // Set checkout date min to check-in date when check-in changes
        checkInDate.addEventListener('change', function() {
            checkOutDate.min = this.value;
            
            // If checkout date is before check-in date, update it
            if (checkOutDate.value < checkInDate.value) {
                checkOutDate.value = checkInDate.value;
            }
        });
    }
}

// Load destinations
function loadDestinations() {
    const destinationGrid = document.getElementById('destinationGrid');
    if (!destinationGrid) return;
    
    let destinationHTML = '';
    
    sampleData.destinations.forEach(destination => {
        destinationHTML += `
            <div class="card">
                <div class="card-image">
                    <img src="${destination.image}" alt="${destination.name}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${destination.name}</h3>
                    <p class="card-text">${destination.description}</p>
                </div>
                <div class="card-footer">
                    <div class="rating">
                        <i class="fas fa-star"></i> ${destination.rating}
                        <span class="reviews">(${destination.reviews} reviews)</span>
                    </div>
                    <a href="#" class="btn-small">Explore</a>
                </div>
            </div>
        `;
    });
    
    destinationGrid.innerHTML = destinationHTML;
}

// Load hotels
function loadHotels() {
    const hotelGrid = document.getElementById('hotelGrid');
    if (!hotelGrid) return;
    
    let hotelHTML = '';
    
    sampleData.hotels.forEach(hotel => {
        hotelHTML += `
            <div class="card">
                <div class="card-image">
                    <img src="${hotel.image}" alt="${hotel.name}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${hotel.name}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
                    <p class="card-text">${hotel.description}</p>
                    <p class="price">From ${hotel.price} per night</p>
                </div>
                <div class="card-footer">
                    <div class="rating">
                        <i class="fas fa-star"></i> ${hotel.rating}
                        <span class="reviews">(${hotel.reviews} reviews)</span>
                    </div>
                    <a href="#" class="btn-small">Book Now</a>
                </div>
            </div>
        `;
    });
    
    hotelGrid.innerHTML = hotelHTML;
}

// Load restaurants
function loadRestaurants() {
    const restaurantGrid = document.getElementById('restaurantGrid');
    if (!restaurantGrid) return;
    
    let restaurantHTML = '';
    
    sampleData.restaurants.forEach(restaurant => {
        restaurantHTML += `
            <div class="card">
                <div class="card-image">
                    <img src="${restaurant.image}" alt="${restaurant.name}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${restaurant.name}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${restaurant.location}</p>
                    <p class="cuisine"><i class="fas fa-utensils"></i> ${restaurant.cuisine} • ${restaurant.price}</p>
                    <p class="card-text">${restaurant.description}</p>
                </div>
                <div class="card-footer">
                    <div class="rating">
                        <i class="fas fa-star"></i> ${restaurant.rating}
                        <span class="reviews">(${restaurant.reviews} reviews)</span>
                    </div>
                    <a href="#" class="btn-small">Reserve</a>
                </div>
            </div>
        `;
    });
    
    restaurantGrid.innerHTML = restaurantHTML;
}

// Load tour guides
function loadTourGuides() {
    const guideGrid = document.getElementById('guideGrid');
    if (!guideGrid) return;
    
    let guideHTML = '';
    
    sampleData.tourGuides.forEach(guide => {
        guideHTML += `
            <div class="card">
                <div class="card-image guide-image">
                    <img src="${guide.image}" alt="${guide.name}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${guide.name}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${guide.location}</p>
                    <p class="specialization"><i class="fas fa-certificate"></i> ${guide.specialization}</p>
                    <p class="languages"><i class="fas fa-language"></i> ${guide.languages.join(', ')}</p>
                    <p class="experience"><i class="fas fa-clock"></i> ${guide.experience} experience</p>
                </div>
                <div class="card-footer">
                    <div class="rating">
                        <i class="fas fa-star"></i> ${guide.rating}
                        <span class="reviews">(${guide.reviews} reviews)</span>
                    </div>
                    <a href="#" class="btn-small">Contact</a>
                </div>
            </div>
        `;
    });
    
    guideGrid.innerHTML = guideHTML;
}

// Initialize image galleries after content is loaded
function initImageGalleries() {
    const galleries = document.querySelectorAll('.image-gallery');
    
    galleries.forEach(gallery => {
        // Only add navigation if there are multiple images
        if (gallery.children.length > 1) {
            const navDiv = document.createElement('div');
            navDiv.className = 'gallery-nav';
            
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.addEventListener('click', () => {
                gallery.scrollBy({ left: -300, behavior: 'smooth' });
            });
            
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.addEventListener('click', () => {
                gallery.scrollBy({ left: 300, behavior: 'smooth' });
            });
            
            navDiv.appendChild(prevBtn);
            navDiv.appendChild(nextBtn);
            
            // Insert after the gallery
            gallery.parentNode.insertBefore(navDiv, gallery.nextSibling);
        }
    });
}

// Call this function after loading hotels or restaurants
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
    // If on hotels page
    if (window.location.pathname.includes('hotels.html')) {
        loadHotels().then(() => {
            initImageGalleries();
        });
    }
    
    // If on restaurants page
    if (window.location.pathname.includes('restaurants.html')) {
        loadRestaurants().then(() => {
            initImageGalleries();
        });
    }
    
    // ... existing code ...
}); 