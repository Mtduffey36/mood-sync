// Global variables
const register = document.getElementById('register-button');


// Modal for user registration functionality
register.addEventListener('click', function() {
    const modal = document.getElementById('user-registration');
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  });
