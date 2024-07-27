// Select all course cards and loop through each one
document.querySelectorAll('.course-card').forEach((card) => {
    // Get references to the checkbox, progress bar, progress percentage, and hr elements
    const checkbox = card.querySelector('.course-completed');
    const progressBar = card.querySelector('progress');
    const progressPercentage = card.querySelector('.progress-percentage');
    const hrElements = card.querySelectorAll('.course-status hr, .progress-container hr'); // Select all hr elements in the relevant sections

    // Add event listener for changes on the checkbox
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            // When checkbox is checked
            card.classList.add('completed'); // Add 'completed' class to the card
            progressBar.value = 100; // Set progress bar value to 100
            progressPercentage.textContent = '100%'; // Update progress percentage text
            hrElements.forEach((hr) => hr.style.backgroundColor = '#00ff00'); // Change hr color to green
        } else {
            // When checkbox is unchecked
            card.classList.remove('completed'); // Remove 'completed' class from the card
            progressBar.value = 0; // Set progress bar value to 0
            progressPercentage.textContent = '0%'; // Update progress percentage text
            hrElements.forEach((hr) => hr.style.backgroundColor = '#e0e0e0'); // Revert hr color to default
        }
    });
});
