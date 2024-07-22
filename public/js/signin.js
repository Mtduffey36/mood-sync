const loginFormHandler = async (event) => {event
  event.preventDefault();
  
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      document.location.replace('/profile');
    }
     else {
      alert (response.statusText);
     }
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault ();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const phone = document.querySelector('#phone-signup').value.trim();

    if (name && email && password && phone) {
      const response = await fetch('/api/users', {
      method: 'POST' ,
      body: JSON.stringify({ name, email, password, phone})
      
      })
    };

    if (response.ok) {
      document.location.replace ('profile');
    } else {
      alert(response.statusText);
    }
  };

  document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

  document
  .querySelector('.signup-form')
  .addEventListener('submit', loginFormHandler);