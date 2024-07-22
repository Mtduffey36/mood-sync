const logout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);