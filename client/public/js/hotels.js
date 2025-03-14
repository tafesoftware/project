window.editHotel = editHotel;
window.deleteHotel = deleteHotel;
window.showAddHotelForm = showAddHotelForm;
window.closeModal = closeModal;

window.onerror = function(message, source, lineno, colno, error) {
    console.error('JavaScript error:', message, 'at', source, 'line', lineno);
    alert('JavaScript error: ' + message);
    return true;
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    loadHotels();
    initEventListeners();
    debugDomElements();
});

async function loadHotels() {
    try {
        console.log('Fetching hotels from:', `${API_URL}/hotels`);
        
        const response = await fetch(`${API_URL}/hotels`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('API endpoint not found. Check server routes.');
            } else if (response.status === 500) {
                throw new Error('Server error. Check server logs.');
            } else {
                const errorText = await response.text();
                console.error('Error response text:', errorText);
                
                let errorMessage;
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.message || 'Unknown error occurred';
                } catch (e) {
                    errorMessage = 'Failed to load hotels. Server returned an invalid response.';
                }
                
                throw new Error(errorMessage);
            }
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid response format. Expected JSON.');
        }
        
        const hotels = await response.json();
        console.log('Hotels loaded:', hotels);
        
        const hotelGrid = document.getElementById('hotelGrid');
        if (!hotelGrid) return;

        if (hotels.length === 0) {
            hotelGrid.innerHTML = `
                <div class="empty-state">
                    <p>No hotels found. Add your first hotel!</p>
                </div>
            `;
            return;
        }

        // Clear existing content
        hotelGrid.innerHTML = '';
        
        // Create and append hotel cards
        hotels.forEach(hotel => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${hotel.images && hotel.images.length > 0 ? hotel.images[0] : 'images/default-hotel.jpg'}" alt="${hotel.name}">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${hotel.name}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
                    <p class="price-range">${hotel.priceRange}</p>
                    <div class="rating">${generateStarRating(hotel.rating)}</div>
                </div>
                <div class="card-footer">
                    <button class="btn-small edit-btn">Edit</button>
                    <button class="btn-small delete-btn">Delete</button>
                </div>
            `;
            
            // Add event listeners to buttons
            const editBtn = card.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => editHotel(hotel._id));
            
            const deleteBtn = card.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteHotel(hotel._id));
            
            hotelGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading hotels:', error);
        
        // Show a more user-friendly error
        if (error.message === 'Failed to fetch') {
            showAlert('Cannot connect to the server. Please check your internet connection or server status.', 'error');
        } else {
            showAlert(error.message, 'error');
        }
        
        // Display empty state with error
        const hotelGrid = document.getElementById('hotelGrid');
        if (hotelGrid) {
            hotelGrid.innerHTML = `
                <div class="empty-state error">
                    <p>Error loading hotels</p>
                    <p class="error-details">${error.message}</p>
                    <button class="btn" onclick="loadHotels()">Try Again</button>
                </div>
            `;
        }
    }
}

async function createHotel(hotelData) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            showAlert('You must be logged in to add a hotel', 'error');
            return;
        }
        
        console.log('Creating hotel with data:', hotelData);
        console.log('Using token:', token);
        
        const response = await fetch(`${API_URL}/hotels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(hotelData)
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to create hotel');
        }

        showAlert('Hotel added successfully!', 'success');
        loadHotels();
        return data;
    } catch (error) {
        console.error('Error creating hotel:', error);
        showAlert(error.message, 'error');
    }
}

async function editHotel(hotelId) {
    // First, check if user is logged in
    if (!isLoggedIn()) {
        showAlert('You must be logged in to edit a hotel', 'error');
        return;
    }
    
    try {
        // Fetch the hotel data
        const response = await fetch(`${API_URL}/hotels/${hotelId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch hotel data');
        }
        
        const hotel = await response.json();
        
        // Remove any existing edit modal
        const existingModal = document.getElementById('editHotelModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create and show the edit form modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'editHotelModal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Edit Hotel</h2>
                <form id="editHotelForm">
                    <div class="form-group">
                        <label for="editHotelName">Hotel Name</label>
                        <input type="text" id="editHotelName" value="${hotel.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="editHotelLocation">Location</label>
                        <input type="text" id="editHotelLocation" value="${hotel.location}" required>
                    </div>
                    <div class="form-group">
                        <label for="editHotelRating">Rating (1-5)</label>
                        <input type="number" id="editHotelRating" min="1" max="5" step="0.1" value="${hotel.rating}" required>
                    </div>
                    <div class="form-group">
                        <label for="editHotelPrice">Price Range</label>
                        <select id="editHotelPrice" required>
                            <option value="$" ${hotel.priceRange === '$' ? 'selected' : ''}>$ (Budget)</option>
                            <option value="$$" ${hotel.priceRange === '$$' ? 'selected' : ''}>$$ (Moderate)</option>
                            <option value="$$$" ${hotel.priceRange === '$$$' ? 'selected' : ''}>$$$ (Luxury)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="editHotelRooms">Total Rooms</label>
                        <input type="number" id="editHotelRooms" min="1" value="${hotel.totalRooms}" required>
                    </div>
                    <div class="form-group">
                        <label for="editHotelDescription">Description</label>
                        <textarea id="editHotelDescription" rows="3" required>${hotel.description || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label for="editHotelAmenities">Amenities (comma separated)</label>
                        <input type="text" id="editHotelAmenities" value="${hotel.amenities ? hotel.amenities.join(', ') : ''}">
                    </div>
                    <div class="form-group">
                        <label for="editHotelImage">Image URL</label>
                        <input type="text" id="editHotelImage" value="${hotel.images && hotel.images.length > 0 ? hotel.images[0] : ''}">
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" id="cancelEditHotel">Cancel</button>
                        <button type="submit" class="btn btn-primary">Update Hotel</button>
                    </div>
                </form>
                <button class="modal-close" id="closeEditHotelModal">&times;</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener to the form
        const form = document.getElementById('editHotelForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const hotelData = {
                name: document.getElementById('editHotelName').value,
                location: document.getElementById('editHotelLocation').value,
                rating: parseFloat(document.getElementById('editHotelRating').value),
                priceRange: document.getElementById('editHotelPrice').value,
                totalRooms: parseInt(document.getElementById('editHotelRooms').value),
                description: document.getElementById('editHotelDescription').value,
                amenities: document.getElementById('editHotelAmenities').value.split(',').map(item => item.trim()).filter(item => item),
                images: [document.getElementById('editHotelImage').value || 'images/default-hotel.jpg']
            };
            
            updateHotel(hotelId, hotelData);
            closeModal('editHotelModal');
        });
        
        // Add event listeners for cancel and close buttons
        document.getElementById('cancelEditHotel').addEventListener('click', function() {
            closeModal('editHotelModal');
        });
        
        document.getElementById('closeEditHotelModal').addEventListener('click', function() {
            closeModal('editHotelModal');
        });
        
    } catch (error) {
        console.error('Error editing hotel:', error);
        showAlert('Failed to load hotel data for editing', 'error');
    }
}

async function updateHotel(hotelId, hotelData) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            showAlert('You must be logged in to update a hotel', 'error');
            return;
        }
        
        const response = await fetch(`${API_URL}/hotels/${hotelId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(hotelData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update hotel');
        }

        showAlert('Hotel updated successfully', 'success');
        loadHotels();
    } catch (error) {
        console.error('Error updating hotel:', error);
        showAlert(error.message, 'error');
    }
}

async function deleteHotel(hotelId) {
    console.log('Delete hotel function called with ID:', hotelId);
    
    // First, check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert('You must be logged in to delete a hotel', 'error');
        return;
    }
    
    // Confirm deletion
    if (confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
        try {
            console.log('Sending delete request for hotel ID:', hotelId);
            
            const response = await fetch(`${API_URL}/hotels/${hotelId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log('Delete response:', response);
            
            if (!response.ok) {
                let errorMessage = 'Failed to delete hotel';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    console.error('Error parsing error response:', e);
                }
                throw new Error(errorMessage);
            }
            
            showAlert('Hotel deleted successfully', 'success');
            loadHotels(); // Reload the hotels list
        } catch (error) {
            console.error('Error deleting hotel:', error);
            showAlert(error.message, 'error');
        }
    }
}

function generateStarRating(rating) {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

function showAddHotelForm() {
    console.log('Show add hotel form called');
    
    // First, check if user is logged in
    if (!isLoggedIn()) {
        showAlert('You must be logged in to add a hotel', 'error');
        return;
    }
    
    // Remove any existing modals
    const existingModal = document.getElementById('addHotelModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'addHotelModal';
    
    // Create the modal content
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Add New Hotel</h2>
            <form id="addHotelForm">
                <div class="form-group">
                    <label for="hotelName">Hotel Name</label>
                    <input type="text" id="hotelName" required>
                </div>
                <div class="form-group">
                    <label for="hotelLocation">Location</label>
                    <input type="text" id="hotelLocation" required>
                </div>
                <div class="form-group">
                    <label for="hotelRating">Rating (1-5)</label>
                    <input type="number" id="hotelRating" min="1" max="5" step="0.1" required>
                </div>
                <div class="form-group">
                    <label for="hotelPrice">Price Range</label>
                    <select id="hotelPrice" required>
                        <option value="$">$ (Budget)</option>
                        <option value="$$">$$ (Moderate)</option>
                        <option value="$$$">$$$ (Luxury)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="hotelRooms">Total Rooms</label>
                    <input type="number" id="hotelRooms" min="1" required>
                </div>
                <div class="form-group">
                    <label for="hotelDescription">Description</label>
                    <textarea id="hotelDescription" rows="3" required></textarea>
                </div>
                <div class="form-group">
                    <label for="hotelAmenities">Amenities (comma separated)</label>
                    <input type="text" id="hotelAmenities">
                </div>
                <div class="form-group">
                    <label for="hotelImage">Image URL</label>
                    <input type="text" id="hotelImage">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary" id="cancelAddHotel">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Hotel</button>
                </div>
            </form>
            <button class="modal-close" id="closeAddHotelModal">&times;</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    console.log('Modal added to DOM');
    
    // Add event listeners
    const form = document.getElementById('addHotelForm');
    if (form) {
        console.log('Form found, adding submit listener');
        form.addEventListener('submit', function(e) {
            console.log('Form submitted');
            handleAddHotelSubmit(e);
        });
    } else {
        console.warn('Form not found in the DOM');
    }
    
    const cancelBtn = document.getElementById('cancelAddHotel');
    if (cancelBtn) {
        console.log('Cancel button found, adding click listener');
        cancelBtn.addEventListener('click', function() {
            console.log('Cancel button clicked');
            closeModal('addHotelModal');
        });
    }
    
    const closeBtn = document.getElementById('closeAddHotelModal');
    if (closeBtn) {
        console.log('Close button found, adding click listener');
        closeBtn.addEventListener('click', function() {
            console.log('Close button clicked');
            closeModal('addHotelModal');
        });
    }
}

// Separate the form submission handler
async function handleAddHotelSubmit(e) {
    e.preventDefault();
    
    const hotelData = {
        name: document.getElementById('hotelName').value,
        location: document.getElementById('hotelLocation').value,
        rating: parseFloat(document.getElementById('hotelRating').value),
        priceRange: document.getElementById('hotelPrice').value,
        totalRooms: parseInt(document.getElementById('hotelRooms').value),
        description: document.getElementById('hotelDescription').value,
        amenities: document.getElementById('hotelAmenities').value.split(',').map(item => item.trim()).filter(item => item),
        images: [document.getElementById('hotelImage').value || 'images/default-hotel.jpg']
    };
    
    try {
        await createHotel(hotelData);
        closeModal('addHotelModal');
    } catch (error) {
        console.error('Error in form submission:', error);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Remove event listeners before removing the modal
        const form = modal.querySelector('form');
        if (form) {
            const newForm = form.cloneNode(true);
            form.parentNode.replaceChild(newForm, form);
        }
        
        // Remove the modal from the DOM
        modal.remove();
        console.log(`Modal ${modalId} closed and removed from DOM`);
    } else {
        console.warn(`Modal with ID ${modalId} not found`);
    }
}

function initEventListeners() {
    console.log('Initializing event listeners');
    
    const addHotelButton = document.getElementById('addHotelBtn');
    if (addHotelButton) {
        console.log('Add hotel button found, adding event listener');
        addHotelButton.addEventListener('click', function() {
            console.log('Add hotel button clicked');
            showAddHotelForm();
        });
    } else {
        console.warn('Add hotel button not found in the DOM');
    }
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

function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}

// Add this function to help debug delete operations
function debugDeleteOperation(hotelId, response) {
    if (DEBUG) {
        console.log('Delete operation for hotel ID:', hotelId);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        console.log('Response OK:', response.ok);
    }
}

// Add this function to help debug DOM elements
function debugDomElements() {
    console.log('Debugging DOM elements:');
    console.log('Add Hotel Button:', document.getElementById('addHotelBtn'));
    console.log('Hotel Grid:', document.getElementById('hotelGrid'));
    
    const editButtons = document.querySelectorAll('.edit-btn');
    console.log('Edit Buttons:', editButtons.length);
    
    const deleteButtons = document.querySelectorAll('.delete-btn');
    console.log('Delete Buttons:', deleteButtons.length);
} 