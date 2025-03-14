// Add this file to check server connectivity
document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('server-status');
    
    // Test basic connectivity
    fetch(`${API_URL}/health-check`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Server health check failed');
        })
        .then(data => {
            console.log('Server health check:', data);
            if (statusElement) {
                statusElement.textContent = 'Connected';
                statusElement.className = 'status-connected';
            }
        })
        .catch(error => {
            console.error('Server connection error:', error);
            if (statusElement) {
                statusElement.textContent = 'Disconnected';
                statusElement.className = 'status-disconnected';
            }
        });
}); 