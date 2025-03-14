// Sample data for the website with Ethiopian context
const sampleData = {
    destinations: [
        {
            id: 1,
            name: "Lalibela, Ethiopia",
            image: "images/destinations/lalibela.jpg",
            description: "Home to ancient rock-hewn churches, a UNESCO World Heritage site and spiritual center.",
            rating: 4.8,
            reviews: 1245
        },
        {
            id: 2,
            name: "Simien Mountains, Ethiopia",
            image: "images/destinations/simien.jpg",
            description: "Breathtaking mountain range with dramatic landscapes and rare wildlife like Gelada baboons.",
            rating: 4.7,
            reviews: 982
        },
        {
            id: 3,
            name: "Danakil Depression, Ethiopia",
            image: "images/destinations/danakil.jpg",
            description: "One of the hottest places on Earth with colorful sulfur springs and salt flats.",
            rating: 4.9,
            reviews: 1567
        },
        {
            id: 4,
            name: "Omo Valley, Ethiopia",
            image: "images/destinations/omo.jpg",
            description: "Cultural treasure with diverse indigenous tribes maintaining ancient traditions.",
            rating: 4.6,
            reviews: 876
        }
    ],
    hotels: [
        {
            id: 1,
            name: "Sheraton Addis",
            image: "images/hotels/sheraton-addis.jpg",
            location: "Addis Ababa, Ethiopia",
            description: "Luxury hotel in the heart of Ethiopia's capital with beautiful gardens and pools.",
            price: "$250",
            rating: 4.7,
            reviews: 532
        },
        {
            id: 2,
            name: "Kuriftu Resort & Spa",
            image: "images/hotels/kuriftu.jpg",
            location: "Bahir Dar, Ethiopia",
            description: "Beautiful lakeside resort with traditional architecture and modern amenities.",
            price: "$180",
            rating: 4.9,
            reviews: 748
        },
        {
            id: 3,
            name: "Haile Resort",
            image: "images/hotels/haile-resort.jpg",
            location: "Hawassa, Ethiopia",
            description: "Scenic lakefront resort founded by the legendary athlete Haile Gebrselassie.",
            price: "$150",
            rating: 4.6,
            reviews: 412
        },
        {
            id: 4,
            name: "Bale Mountain Lodge",
            image: "images/hotels/bale-mountain.jpg",
            location: "Bale Mountains, Ethiopia",
            description: "Eco-friendly lodge nestled in the Bale Mountains National Park with wildlife viewing.",
            price: "$220",
            rating: 4.8,
            reviews: 623
        }
    ],
    restaurants: [
        {
            id: 1,
            name: "Yod Abyssinia",
            image: "images/restaurants/yod-abyssinia.jpg",
            location: "Addis Ababa, Ethiopia",
            cuisine: "Ethiopian",
            description: "Traditional Ethiopian cuisine with cultural performances and coffee ceremonies.",
            price: "$$$",
            rating: 4.8,
            reviews: 342
        },
        {
            id: 2,
            name: "Kategna Restaurant",
            image: "images/restaurants/kategna.jpg",
            location: "Addis Ababa, Ethiopia",
            cuisine: "Ethiopian",
            description: "Authentic Ethiopian dishes served in a cozy setting with traditional décor.",
            price: "$$",
            rating: 4.9,
            reviews: 567
        },
        {
            id: 3,
            name: "Dashen Traditional Restaurant",
            image: "images/restaurants/dashen.jpg",
            location: "Gondar, Ethiopia",
            cuisine: "Ethiopian",
            description: "Famous for its doro wat (chicken stew) and regional specialties from northern Ethiopia.",
            price: "$$",
            rating: 4.7,
            reviews: 289
        },
        {
            id: 4,
            name: "Totot Traditional Restaurant",
            image: "images/restaurants/totot.jpg",
            location: "Bahir Dar, Ethiopia",
            cuisine: "Ethiopian",
            description: "Lakeside dining with fresh fish from Lake Tana and traditional Ethiopian injera platters.",
            price: "$$",
            rating: 4.6,
            reviews: 412
        }
    ],
    tourGuides: [
        {
            id: 1,
            name: "Abebe Bikila",
            image: "images/guides/abebe.jpg",
            location: "Addis Ababa, Ethiopia",
            specialization: "Historical Tours",
            languages: ["Amharic", "English", "Italian"],
            experience: "12 years",
            rating: 4.9,
            reviews: 187
        },
        {
            id: 2,
            name: "Tigist Haile",
            image: "images/guides/tigist.jpg",
            location: "Lalibela, Ethiopia",
            specialization: "Religious & Cultural Tours",
            languages: ["Amharic", "English", "French"],
            experience: "8 years",
            rating: 4.8,
            reviews: 156
        },
        {
            id: 3,
            name: "Solomon Gebru",
            image: "images/guides/solomon.jpg",
            location: "Simien Mountains, Ethiopia",
            specialization: "Trekking & Wildlife Tours",
            languages: ["Amharic", "English", "German"],
            experience: "15 years",
            rating: 4.7,
            reviews: 203
        },
        {
            id: 4,
            name: "Hiwot Tadesse",
            image: "images/guides/hiwot.jpg",
            location: "Omo Valley, Ethiopia",
            specialization: "Cultural & Tribal Tours",
            languages: ["Amharic", "English", "Oromo"],
            experience: "10 years",
            rating: 4.9,
            reviews: 178
        }
    ]
};

// Function to create hotel cards with multiple images
function createHotelCard(hotel) {
    const card = document.createElement('div');
    card.className = 'hotel-card';
    
    // Create image gallery
    const imageGallery = document.createElement('div');
    imageGallery.className = 'image-gallery';
    
    // Add multiple images
    if (hotel.images && hotel.images.length > 0) {
        hotel.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = hotel.name;
            imageGallery.appendChild(img);
        });
    } else {
        // Fallback to single image if no array is provided
        const img = document.createElement('img');
        img.src = hotel.image || 'images/default-hotel.jpg';
        img.alt = hotel.name;
        imageGallery.appendChild(img);
    }
    
    // Rest of the hotel card content
    card.innerHTML += `
        <div class="hotel-info">
            <h3>${hotel.name}</h3>
            <div class="rating">
                ${generateStarRating(hotel.rating)}
                <span class="review-count">(${hotel.reviewCount} reviews)</span>
            </div>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
            <p class="price">From $${hotel.price} per night</p>
            <div class="amenities">
                ${generateAmenities(hotel.amenities)}
            </div>
            <a href="hotel-details.html?id=${hotel.id}" class="btn view-details-btn">View Details</a>
        </div>
    `;
    
    // Insert the image gallery at the beginning of the card
    card.insertBefore(imageGallery, card.firstChild);
    
    return card;
}

// Function to create restaurant cards with multiple images
function createRestaurantCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    
    // Create image gallery
    const imageGallery = document.createElement('div');
    imageGallery.className = 'image-gallery';
    
    // Add multiple images
    if (restaurant.images && restaurant.images.length > 0) {
        restaurant.images.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = restaurant.name;
            imageGallery.appendChild(img);
        });
    } else {
        // Fallback to single image if no array is provided
        const img = document.createElement('img');
        img.src = restaurant.image || 'images/default-restaurant.jpg';
        img.alt = restaurant.name;
        imageGallery.appendChild(img);
    }
    
    // Rest of the restaurant card content
    card.innerHTML += `
        <div class="restaurant-info">
            <h3>${restaurant.name}</h3>
            <div class="rating">
                ${generateStarRating(restaurant.rating)}
                <span class="review-count">(${restaurant.reviewCount} reviews)</span>
            </div>
            <p class="cuisine"><i class="fas fa-utensils"></i> ${restaurant.cuisine}</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${restaurant.location}</p>
            <p class="price-range">${generatePriceRange(restaurant.priceRange)}</p>
            <a href="restaurant-details.html?id=${restaurant.id}" class="btn view-details-btn">View Details</a>
        </div>
    `;
    
    // Insert the image gallery at the beginning of the card
    card.insertBefore(imageGallery, card.firstChild);
    
    return card;
} 