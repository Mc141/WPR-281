document.addEventListener('DOMContentLoaded', function() {
    const enrollmentForm = document.getElementById('enrollment-form');
    const countdownTimer = document.getElementById('countdown-timer');

    const courseStartDates = {
        'Higher Certificate': new Date('2024-09-01'),
        'Diploma': new Date('2024-10-01'),
        'BIT': new Date('2024-11-01'),
        'BCOM': new Date('2024-12-01')
    };

    enrollmentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting normally
        
        const selectedCourse = document.getElementById('course').value;

        if (selectedCourse && courseStartDates[selectedCourse]) {
            const startDate = courseStartDates[selectedCourse];
            startCountdown(startDate);
        }
    });

    function startCountdown(startDate) {
        function updateCountdown() {
            const currentDate = new Date();
            const timeDifference = startDate - currentDate;

            if (timeDifference > 0) {
                const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hoursRemaining = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutesRemaining = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

                countdownTimer.style.display = 'block';
                countdownTimer.textContent = `Time remaining until the course starts: ${daysRemaining} days, ${hoursRemaining} hours, ${minutesRemaining} minutes, and ${secondsRemaining} seconds.`;
            } else {
                clearInterval(timerInterval);
                countdownTimer.style.display = 'block';
                countdownTimer.textContent = 'The course has already started or the date is invalid.';
            }
        }

        updateCountdown();
        const timerInterval = setInterval(updateCountdown, 1000);
    }
});