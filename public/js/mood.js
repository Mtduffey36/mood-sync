const mainMoodSelect = document.getElementById('main-mood');
    const subMoodSelect = document.getElementById('sub-mood');
    const subMoodOptions = subMoodSelect.querySelectorAll('option');

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