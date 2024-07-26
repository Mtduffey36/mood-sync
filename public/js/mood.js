const mainMoodSelect = document.getElementById('main-mood');
const subMoodSelect = document.getElementById('sub-mood');
const subMoodOptions = subMoodSelect.querySelectorAll('option');
const submitButton = document.getElementById('submit-mood');
const form = document.getElementById('moods');

mainMoodSelect.addEventListener('change', function() {
    const selectedMainMoodId = this.value;
    
    subMoodOptions.forEach(option => {
        if (option.value === "" || option.dataset.mainMood === selectedMainMoodId) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });

    subMoodSelect.value = ''; 
    subMoodSelect.disabled = !selectedMainMoodId; 
});

mainMoodSelect.dispatchEvent(new Event('change'));

// Form submission logic
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    if (form.checkValidity()) {
        // Form is valid, proceed with submission
        
        // Disable the submit button to prevent multiple submissions
        submitButton.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        console.log('Sending data:', data);

        // Send the form data to the server
        fetch('/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Mood logged successfully!');
                updateUI(data.entries, data.averageMoodScore);
            } else {
                throw new Error(data.error || 'Unknown error occurred');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem submitting your mood. Please try again.');
        })
        .finally(() => {
            submitButton.disabled = false;
        });
    } else {
        form.reportValidity();
    }
});

function updateUI(entries, averageMoodScore) {
   
    console.log('New entries:', entries);
    console.log('New average mood score:', averageMoodScore);
    location.reload();
}