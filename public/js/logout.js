document.addEventListener('DOMContentLoaded', function() {
  const logoutButton = document.getElementById('logout-button');
  const logoutForm = document.getElementById('logout-form');

  logoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    logoutForm.submit();
  });
});