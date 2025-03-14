document.addEventListener('DOMContentLoaded', function() {
    // Load reviews data
    loadReviews();
    
    // Initialize event listeners
    initEventListeners();
});

// Mock reviews data for demonstration
const mockReviews = [
    {
        id: 1,
        userId: 1,
        userName: "Abebe Kebede",
        userImage: "../images/users/user1.jpg",
        itemId: 1,
        itemName: "Lalibela",
        category: "destination",
        rating: 5,
        review: "Amazing historical site! The rock-hewn churches are breathtaking. Our guide was very knowledgeable.",
        date: "2024-03-15",
        status: "approved",
        images: ["../images/reviews/review1-1.jpg", "../images/reviews/review1-2.jpg"]
    },
    // Add more mock review data...
];

// Load reviews data
function loadReviews() {
    const tableBody = document.getElementById('reviewsTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    mockReviews.forEach(review => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${review.id}</td>
            <td>
                <div class="user-info">
                    <img src="${review.userImage}" alt="${review.userName}" class="user-thumbnail">
                    <span>${review.userName}</span>
                </div>
            </td>
            <td>${review.itemName}</td>
            <td>
                <span class="category-badge category-${review.category}">${capitalizeFirst(review.category)}</span>
            </td>
            <td>
                <div class="rating">
                    ${generateStarRating(review.rating)}
                </div>
            </td>
            <td>
                <div class="review-preview">${truncateText(review.review, 100)}</div>
            </td>
            <td>${formatDate(review.date)}</td>
            <td>
                <span class="status-badge status-${review.status.toLowerCase()}">${capitalizeFirst(review.status)}</span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-view" onclick="viewReview(${review.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-approve" onclick="approveReview(${review.id})" title="Approve">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-icon btn-flag" onclick="flagReview(${review.id})" title="Flag">
                        <i class="fas fa-flag"></i>
                    </button>
                    <button class="btn-icon btn-hide" onclick="hideReview(${review.id})" title="Hide">
                        <i class="fas fa-eye-slash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize event listeners
function initEventListeners() {
    // Filters
    const filters = document.querySelectorAll('.admin-filters select');
    filters.forEach(filter => {
        filter.addEventListener('change', loadReviews);
    });
    
    // Modal close button
    const closeModal = document.getElementById('closeReviewModal');
    if (closeModal) {
        closeModal.addEventListener('click', closeReviewModal);
    }
    
    // Review action buttons
    const approveBtn = document.getElementById('approveReviewBtn');
    const flagBtn = document.getElementById('flagReviewBtn');
    const hideBtn = document.getElementById('hideReviewBtn');
    
    if (approveBtn) approveBtn.addEventListener('click', handleApproveReview);
    if (flagBtn) flagBtn.addEventListener('click', handleFlagReview);
    if (hideBtn) hideBtn.addEventListener('click', handleHideReview);
}

// Helper functions
function generateStarRating(rating) {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Review actions
function viewReview(reviewId) {
    const review = mockReviews.find(r => r.id === reviewId);
    if (!review) return;
    
    const modalContent = document.getElementById('reviewDetails');
    if (!modalContent) return;
    
    modalContent.innerHTML = `
        <div class="review-header">
            <div class="user-info">
                <img src="${review.userImage}" alt="${review.userName}">
                <div>
                    <h3>${review.userName}</h3>
                    <p class="review-date">${formatDate(review.date)}</p>
                </div>
            </div>
            <div class="review-rating">
                ${generateStarRating(review.rating)}
            </div>
        </div>
        <div class="review-content">
            <p>${review.review}</p>
            ${review.images ? `
                <div class="review-images">
                    ${review.images.map(img => `
                        <img src="${img}" alt="Review image">
                    `).join('')}
                </div>
            ` : ''}
        </div>
        <div class="review-meta">
            <p><strong>Item:</strong> ${review.itemName}</p>
            <p><strong>Category:</strong> ${capitalizeFirst(review.category)}</p>
            <p><strong>Status:</strong> ${capitalizeFirst(review.status)}</p>
        </div>
    `;
    
    openReviewModal();
}

// More functions for handling review operations... 