document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const errorMessageElement = document.getElementById('error-message');
  
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const userData = Object.fromEntries(formData);
      const submitButton = form.querySelector('button[type="submit"]');
    
      try {
        submitButton.disabled = true;
        errorMessageElement.classList.add('d-none');
        
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log('Signup successful:', data.message);
          window.location.href = '/';
        } else {
          console.error('Signup failed:', data.message || data.errors);
          errorMessageElement.textContent = data.message || 'Signup failed. Please try again.';
          errorMessageElement.classList.remove('d-none');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        errorMessageElement.textContent = 'An error occurred. Please try again later.';
        errorMessageElement.classList.remove('d-none');
      } finally {
        submitButton.disabled = false;
      }
    });
  });