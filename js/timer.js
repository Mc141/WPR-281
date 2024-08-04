
// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function() {
  // Create the container for the enrollment form
  const container = document.createElement('div');
  container.className = 'enrollment-container';

  // Create and add the form heading
  const heading = document.createElement('h1');
  heading.textContent = 'Course Enrollment Form';
  container.appendChild(heading);

  // Create the form element
  const form = document.createElement('form');
  form.id = 'enrollment-form';
  form.action = '#'; // Action can be updated as needed

  // Define form rows and their elements
  const rows = [
    // First row with name and ID fields
    {
      elements: [
        { type: 'text', id: 'first-name', name: 'first-name', placeholder: 'e.g. John', label: 'First Name' },
        { type: 'text', id: 'last-name', name: 'last-name', placeholder: 'e.g. Doe', label: 'Last Name' },
        { type: 'text', id: 'id', name: 'id', placeholder: 'e.g. 1234567890123', label: 'ID Number' }
      ]
    },
    // Second row with email and phone number fields
    {
      elements: [
        { type: 'email', id: 'email', name: 'email', placeholder: 'e.g. john.doe@example.com', label: 'Email' },
        { type: 'tel', id: 'phone', name: 'phone', pattern: '[0-9]{10}', placeholder: 'e.g. 0123456789', label: 'Phone Number', note: 'Format: 0123456789' }
      ]
    },
    // Third row with course selection and date of birth
    {
      elements: [
        { type: 'select', id: 'course', name: 'course', options: [
          { value: '', text: 'Select a course', disabled: true, selected: true },
          { value: 'Bachelor of Computing', text: 'Bachelor of Computing' },
          { value: 'Bachelor of Information Technology', text: 'Bachelor of Information Technology' },
          { value: 'Diploma in Information Technology', text: 'Diploma in Information Technology' },
          { value: 'Diploma for Deaf Students', text: 'Diploma for Deaf Students' },
          { value: 'Certificate: IT (Database Development)', text: 'Certificate: IT (Database Development)' },
          { value: 'National Certificate: IT (Systems Development)', text: 'National Certificate: IT (Systems Development)' }
        ], label: 'Select Course' },
        { type: 'date', id: 'dob', name: 'dob', label: 'Date of Birth' }
      ]
    },
    // Fourth row with address fields
    {
      elements: [
        { type: 'text', id: 'street-address', name: 'street-address', placeholder: 'e.g. 123 Elm Street', label: 'Street Address' },
        { type: 'text', id: 'suburb', name: 'suburb', placeholder: 'e.g. Greenfield', label: 'Suburb' }
      ]
    },
    // Fifth row with city and province fields
    {
      elements: [
        { type: 'text', id: 'city', name: 'city', placeholder: 'e.g. Springfield', label: 'City' },
        { type: 'select', id: 'province', name: 'province', options: [
          { value: '', text: 'Select a province', disabled: true, selected: true },
          { value: 'Eastern Cape', text: 'Eastern Cape' },
          { value: 'Free State', text: 'Free State' },
          { value: 'Gauteng', text: 'Gauteng' },
          { value: 'KwaZulu-Natal', text: 'KwaZulu-Natal' },
          { value: 'Limpopo', text: 'Limpopo' },
          { value: 'Mpumalanga', text: 'Mpumalanga' },
          { value: 'Northern Cape', text: 'Northern Cape' },
          { value: 'North West', text: 'North West' },
          { value: 'Western Cape', text: 'Western Cape' }
        ], label: 'Province' }
      ]
    },
    // Sixth row with gender radio buttons
    {
      elements: [
        { type: 'radio', id: 'gender', name: 'gender', options: [
          { value: 'male', text: 'Male' },
          { value: 'female', text: 'Female' }
        ], label: 'Gender' }
      ]
    }
  ];

  // Generate form rows based on the defined structure
  rows.forEach(row => {
    const formRow = document.createElement('div');
    formRow.className = 'form-row';

    row.elements.forEach(element => {
      const formGroup = document.createElement('div');
      formGroup.className = 'form-group';

      // Create and add label for each form element
      const label = document.createElement('label');
      label.setAttribute('for', element.id);
      label.textContent = element.label;
      formGroup.appendChild(label);

      // Handle different types of form elements
      if (element.type === 'select') {
        const select = document.createElement('select');
        select.id = element.id;
        select.name = element.name;
        // Create and add options to the select element
        if (element.options) {
          element.options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.text;
            if (option.disabled) opt.disabled = true;
            if (option.selected) opt.selected = true;
            select.appendChild(opt);
          });
        }
        formGroup.appendChild(select);
      } else if (element.type === 'radio') {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'gender-options';
        // Create and add radio buttons
        element.options.forEach(option => {
          const radioLabel = document.createElement('label');
          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = element.name;
          radioInput.value = option.value;
          radioInput.required = true;
          radioLabel.appendChild(radioInput);
          radioLabel.appendChild(document.createTextNode(option.text));
          optionsDiv.appendChild(radioLabel);
        });
        formGroup.appendChild(optionsDiv);
      } else {
        // Create and add input fields
        const input = document.createElement('input');
        input.type = element.type;
        input.id = element.id;
        input.name = element.name;
        input.placeholder = element.placeholder;
        if (element.pattern) input.pattern = element.pattern;
        if (element.required) input.required = true;
        formGroup.appendChild(input);

        // Add a note if present
        if (element.note) {
          const small = document.createElement('small');
          small.textContent = element.note;
          formGroup.appendChild(small);
        }
      }

      formRow.appendChild(formGroup);
    });

    form.appendChild(formRow);
  });

  // Create and add the submit button
  const submitRow = document.createElement('div');
  submitRow.className = 'form-row';
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'submit-btn';
  submitButton.textContent = 'Enroll Now';
  submitRow.appendChild(submitButton);
  form.appendChild(submitRow);

  // Create and add the countdown timer
  const countdownTimer = document.createElement('div');
  countdownTimer.id = 'countdown-timer';

  // Append form and countdown timer to the container
  container.appendChild(form);
  container.appendChild(countdownTimer);

  // Append the container to the body of the document
  document.body.appendChild(container);
});

// Handle the form submission and countdown logic
document.addEventListener('DOMContentLoaded', function() {
  const enrollmentForm = document.getElementById('enrollment-form');
  const countdownTimer = document.getElementById('countdown-timer');

  // Define start dates for courses
  const courseStartDates = {
    'Bachelor of Computing': new Date('2024-12-01'),
    'Bachelor of Information Technology': new Date('2024-11-01'),
    'Diploma in Information Technology': new Date('2024-10-01'),
    'Diploma for Deaf Students': new Date('2024-10-01'),
    'Certificate: IT (Database Development)': new Date('2024-09-01'),
    'National Certificate: IT (Systems Development)': new Date('2024-09-01')
  };

  // Event listener for form submission
  enrollmentForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const selectedCourse = document.getElementById('course').value;

    if (selectedCourse && courseStartDates[selectedCourse]) {
      const startDate = courseStartDates[selectedCourse];
      startCountdown(startDate); // Start the countdown for the selected course
    } else {
      countdownTimer.style.display = 'block';
      countdownTimer.textContent = 'Please select a valid course.';
    }
  });

  // Function to start the countdown timer
  function startCountdown(startDate) {
    function updateCountdown() {
      const currentDate = new Date();
      const timeDifference = startDate - currentDate;

      if (timeDifference > 0) {
        // Calculate days, hours, minutes, and seconds remaining
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

    updateCountdown(); // Initial call to set the countdown immediately
    const timerInterval = setInterval(updateCountdown, 1000); // Update every second
  }
});