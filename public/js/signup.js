document.addEventListener('DOMContentLoaded', function() {
    console.log('Signup script loaded');
    const form = document.getElementById('signup-form');
    const errorMessageElement = document.getElementById('error-message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent the default form submission

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

            if (response.status === 201) {
                console.log('Signup successful:', data.message);
                alert(data.message); // 'User created successfully'
                form.reset(); // Clear the form
                window.location.href = '/dashboard'; // Redirect to dashboard or appropriate page
            } else if (response.status === 400) {
                if (data.errors && Array.isArray(data.errors)) {
                    errorMessageElement.innerHTML = data.errors.map(err => `<p>${err.msg}</p>`).join('');
                } else {
                    errorMessageElement.textContent = data.message || 'Signup failed. Please try again.';
                }
                errorMessageElement.classList.remove('d-none');
            } else {
                throw new Error('Unexpected error occurred');
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
