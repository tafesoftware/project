document.addEventListener('DOMContentLoaded', function() {
    // Load users data
    loadUsers();
    
    // Initialize event listeners
    initEventListeners();
});

// Mock users data for demonstration
const mockUsers = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@travelinsight.com",
        phone: "+251 911 123 456",
        role: "admin",
        status: "active",
        image: "../images/admin-avatar.jpg",
        joinedDate: "2023-01-15",
        lastLogin: "2024-05-10 09:45:22"
    },
    {
        id: 2,
        name: "Abebe Kebede",
        email: "abebe@example.com",
        phone: "+251 922 234 567",
        role: "traveler",
        status: "active",
        image: "../images/users/user1.jpg",
        joinedDate: "2023-03-22",
        lastLogin: "2024-05-09 14:30:15"
    },
    {
        id: 3,
        name: "Tigist Haile",
        email: "tigist@example.com",
        phone: "+251 933 345 678",
        role: "guide",
        status: "active",
        image: "../images/guides/tigist.jpg",
        joinedDate: "2023-05-10",
        lastLogin: "2024-05-10 08:15:33"
    },
    {
        id: 4,
        name: "Solomon Gebru",
        email: "solomon@example.com",
        phone: "+251 944 456 789",
        role: "hotel",
        status: "active",
        image: "../images/users/user2.jpg",
        joinedDate: "2023-06-18",
        lastLogin: "2024-05-08 16:22:45"
    },
    {
        id: 5,
        name: "Hiwot Tadesse",
        email: "hiwot@example.com",
        phone: "+251 955 567 890",
        role: "restaurant",
        status: "active",
        image: "../images/users/user3.jpg",
        joinedDate: "2023-08-05",
        lastLogin: "2024-05-07 11:40:12"
    },
    {
        id: 6,
        name: "Dawit Mengistu",
        email: "dawit@example.com",
        phone: "+251 966 678 901",
        role: "traveler",
        status: "inactive",
        image: "../images/users/user4.jpg",
        joinedDate: "2023-09-12",
        lastLogin: "2024-04-20 09:15:30"
    },
    {
        id: 7,
        name: "Meron Alemu",
        email: "meron@example.com",
        phone: "+251 977 789 012",
        role: "traveler",
        status: "suspended",
        image: "../images/users/user5.jpg",
        joinedDate: "2023-11-08",
        lastLogin: "2024-03-15 14:50:22"
    }
];

// Load users data
function loadUsers() {
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = '';
    
    // Apply filters if any
    const roleFilter = document.getElementById('roleFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filteredUsers = [...mockUsers];
    
    if (roleFilter) {
        filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
    }
    
    if (statusFilter) {
        filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
    }
    
    // Populate table with filtered users
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        
        // Format joined date
        const joinedDate = new Date(user.joinedDate);
        const formattedJoinedDate = joinedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Create status badge based on user status
        let statusBadge = '';
        if (user.status === 'active') {
            statusBadge = '<span class="status-badge status-active">Active</span>';
        } else if (user.status === 'inactive') {
            statusBadge = '<span class="status-badge status-inactive">Inactive</span>';
        } else if (user.status === 'suspended') {
            statusBadge = '<span class="status-badge status-pending">Suspended</span>';
        }
        
        // Format role display
        let roleDisplay = '';
        switch(user.role) {
            case 'admin':
                roleDisplay = '<span class="role-badge role-admin">Admin</span>';
                break;
            case 'traveler':
                roleDisplay = '<span class="role-badge role-traveler">Traveler</span>';
                break;
            case 'hotel':
                roleDisplay = '<span class="role-badge role-hotel">Hotel Owner</span>';
                break;
            case 'restaurant':
                roleDisplay = '<span class="role-badge role-restaurant">Restaurant Owner</span>';
                break;
            case 'guide':
                roleDisplay = '<span class="role-badge role-guide">Tour Guide</span>';
                break;
            default:
                roleDisplay = '<span class="role-badge">Unknown</span>';
        }
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>
                <div class="user-info">
                    <img src="${user.image}" alt="${user.name}" class="user-avatar">
                    <div>
                        <p class="user-name">${user.name}</p>
                        <p class="user-email">${user.email}</p>
                    </div>
                </div>
            </td>
            <td>${roleDisplay}</td>
            <td>${formattedJoinedDate}</td>
            <td>${user.lastLogin}</td>
            <td>${statusBadge}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon btn-view view-user" data-id="${user.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-edit edit-user" data-id="${user.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete delete-user" data-id="${user.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Update event listeners for the new buttons
    attachActionButtonListeners();
}

// Initialize event listeners
function initEventListeners() {
    // Add new user button
    document.getElementById('addUserBtn').addEventListener('click', () => {
        openUserModal();
    });
    
    // Cancel user form button
    document.getElementById('cancelUserBtn').addEventListener('click', () => {
        closeUserModal();
    });
    
    // Close user modal button
    document.getElementById('closeUserModal').addEventListener('click', () => {
        closeUserModal();
    });
    
    // Close delete modal button
    document.getElementById('closeDeleteModal').addEventListener('click', () => {
        closeDeleteModal();
    });
    
    // Cancel delete button
    document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
        closeDeleteModal();
    });
    
    // Confirm delete button
    document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
        deleteUser();
    });
    
    // User form submission
    document.getElementById('userForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveUser();
    });
    
    // Filter change events
    document.getElementById('roleFilter').addEventListener('change', loadUsers);
    document.getElementById('statusFilter').addEventListener('change', loadUsers);
    
    // Photo preview
    document.getElementById('userPhoto').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('photoPreview');
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                preview.style.display = 'block';
            }
            reader.readAsDataURL(file);
        }
    });
}

// Attach event listeners to action buttons
function attachActionButtonListeners() {
    // View user buttons
    document.querySelectorAll('.view-user').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            viewUser(userId);
        });
    });
    
    // Edit user buttons
    document.querySelectorAll('.edit-user').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            editUser(userId);
        });
    });
    
    // Delete user buttons
    document.querySelectorAll('.delete-user').forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-id');
            confirmDeleteUser(userId);
        });
    });
}

// Open user modal for adding a new user
function openUserModal(userData = null) {
    const modal = document.getElementById('userModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('userForm');
    
    // Reset form
    form.reset();
    document.getElementById('photoPreview').innerHTML = '';
    document.getElementById('photoPreview').style.display = 'none';
    
    if (userData) {
        // Edit existing user
        modalTitle.textContent = 'Edit User';
        
        // Populate form with user data
        document.getElementById('userName').value = userData.name;
        document.getElementById('userEmail').value = userData.email;
        document.getElementById('userPhone').value = userData.phone || '';
        document.getElementById('userRole').value = userData.role;
        document.getElementById('userStatus').value = userData.status;
        
        // Clear password field for editing
        document.getElementById('userPassword').value = '';
        
        // Show photo preview if available
        if (userData.image) {
            const preview = document.getElementById('photoPreview');
            preview.innerHTML = `<img src="${userData.image}" alt="Preview">`;
            preview.style.display = 'block';
        }
        
        // Store user ID in form for update
        form.setAttribute('data-id', userData.id);
    } else {
        // Add new user
        modalTitle.textContent = 'Add New User';
        form.removeAttribute('data-id');
    }
    
    // Show modal
    modal.classList.add('active');
}

// Close user modal
function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
}

// View user details
function viewUser(userId) {
    const user = mockUsers.find(u => u.id == userId);
    if (user) {
        // For now, just open in edit mode but could create a view-only modal
        editUser(userId);
    }
}

// Edit user
function editUser(userId) {
    const user = mockUsers.find(u => u.id == userId);
    if (user) {
        openUserModal(user);
    }
}

// Confirm delete user
function confirmDeleteUser(userId) {
    const deleteModal = document.getElementById('deleteModal');
    const confirmBtn = document.getElementById('confirmDeleteBtn');
    
    // Store user ID for deletion
    confirmBtn.setAttribute('data-id', userId);
    
    // Show modal
    deleteModal.classList.add('active');
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
}

// Delete user
function deleteUser() {
    const userId = document.getElementById('confirmDeleteBtn').getAttribute('data-id');
    
    // In a real application, you would make an API call to delete the user
    // For this demo, we'll just filter out the user from our mock data
    const index = mockUsers.findIndex(u => u.id == userId);
    if (index !== -1) {
        mockUsers.splice(index, 1);
        
        // Reload users table
        loadUsers();
        
        // Close delete modal
        closeDeleteModal();
        
        // Show success message (in a real app)
        alert('User deleted successfully');
    }
}

// Save user (add or update)
function saveUser() {
    const form = document.getElementById('userForm');
    const userId = form.getAttribute('data-id');
    
    // Gather form data
    const userData = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value
    };
    
    // Handle password (only if provided)
    const password = document.getElementById('userPassword').value;
    if (password) {
        userData.password = password; // In a real app, this would be hashed
    }
    
    // Handle file upload (in a real app)
    const photoInput = document.getElementById('userPhoto');
    if (photoInput.files.length > 0) {
        // In a real app, you would upload the file to a server
        // For this demo, we'll just use a placeholder
        userData.image = URL.createObjectURL(photoInput.files[0]);
    } else if (userId) {
        // Keep existing image if editing and no new image is selected
        const existingUser = mockUsers.find(u => u.id == userId);
        if (existingUser) {
            userData.image = existingUser.image;
        }
    } else {
        // Default image for new users
        userData.image = "../images/default-avatar.png";
    }
    
    if (userId) {
        // Update existing user
        const index = mockUsers.findIndex(u => u.id == userId);
        if (index !== -1) {
            // Preserve joined date and last login
            userData.joinedDate = mockUsers[index].joinedDate;
            userData.lastLogin = mockUsers[index].lastLogin;
            userData.id = parseInt(userId);
            
            mockUsers[index] = userData;
            alert('User updated successfully');
        }
    } else {
        // Add new user
        userData.id = mockUsers.length > 0 ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1;
        
        // Set joined date to today
        const today = new Date();
        userData.joinedDate = today.toISOString().split('T')[0];
        
        // Set last login to now
        userData.lastLogin = formatDateTime(today);
        
        mockUsers.push(userData);
        alert('User added successfully');
    }
    
    // Reload users table
    loadUsers();
    
    // Close modal
    closeUserModal();
}

// Format date and time
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Add some additional CSS for the users page
document.head.insertAdjacentHTML('beforeend', `
<style>
    .role-badge {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
    }
    
    .role-admin {
        background-color: rgba(156, 39, 176, 0.1);
        color: #9C27B0;
    }
    
    .role-traveler {
        background-color: rgba(33, 150, 243, 0.1);
        color: #2196F3;
    }
    
    .role-hotel {
        background-color: rgba(76, 175, 80, 0.1);
        color: #4CAF50;
    }
    
    .role-restaurant {
        background-color: rgba(255, 152, 0, 0.1);
        color: #FF9800;
    }
    
    .role-guide {
        background-color: rgba(0, 188, 212, 0.1);
        color: #00BCD4;
    }
    
    .photo-preview {
        margin-top: 10px;
        display: none;
    }
    
    .photo-preview img {
        max-width: 100px;
        max-height: 100px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    .form-text {
        font-size: 0.8rem;
        color: var(--admin-gray);
        margin-top: 5px;
    }
    
    .stat-change.negative {
        color: var(--admin-danger);
    }
</style>
`); 