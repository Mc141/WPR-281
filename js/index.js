
// URL to the JSON file
const jsonFilePath = './data/courses.json';




let data = {}; // Global variable to store fetched data




let enrolledInCourses = {
  'Bachelor of Computing': {
    id: 0,
    status: false
  },
  'Bachelor of Information Technology': {
    id: 1,
    status: false
  },
  'Diploma in Information Technology': {
    id: 2,
    status: false
  },
  'Diploma for Deaf Students': {
    id: 3,
    status: false
  },
  'Certificate: IT (Database Development)': {
    id: 4,
    status: false
  },
  'National Certificate: IT (Systems Development)': {
    id: 5,
    status: false
  }
};




// Function to create course cards dynamically
function displayCourses(data) {
  const courseSection = document.getElementById('course-section');
  
  data.courses.forEach(course => {
    // Create a new article element
    const article = document.createElement('article');
    article.classList.add('course-card');
    
    // Create and append the image
    const img = document.createElement('img');
    img.src = `assets/images/course-${course.id}.jpg`;
    img.alt = course.title;
    img.classList.add('course-image');
    article.appendChild(img);
    
    // Create and append the course info div
    const courseInfo = document.createElement('div');
    courseInfo.classList.add('course-info');
    
    // Create and append the title
    const title = document.createElement('h2');
    title.classList.add('course-title');
    title.textContent = course.title;
    courseInfo.appendChild(title);
    
    // Create and append the course code
    const code = document.createElement('p');
    code.classList.add('course-code');
    code.textContent = `Course Code: ${course.code}`;
    courseInfo.appendChild(code);
    
    // Create and append the duration
    const duration = document.createElement('p');
    duration.classList.add('course-duration');
    duration.textContent = `Duration: ${course.duration}`;
    courseInfo.appendChild(duration);
    
    // Create and append the description
    const description = document.createElement('p');
    description.classList.add('course-description');
    description.textContent = course.description;
    courseInfo.appendChild(description);
    
    // Create and append the status section
    const status = document.createElement('div');
    status.classList.add('course-status');
    const hrStatus = document.createElement('hr');
    status.appendChild(hrStatus);
    

    const enrollmentStatusElement = document.createElement("p");
    enrollmentStatusElement.setAttribute("id", `status-${course.id}`);
    status.appendChild(enrollmentStatusElement);
    // Add the enroll button


      enrollmentStatusElement.textContent = "Status: Not Enrolled";
      
    
      courseInfo.appendChild(status);
      
      // Create and append the view details button
      const viewDetailsBtn = document.createElement('button');
      viewDetailsBtn.classList.add('view-details-btn');
      viewDetailsBtn.classList.add(course.id.toString()); // Ensure class is a string
      viewDetailsBtn.textContent = 'View Details';
      courseInfo.appendChild(viewDetailsBtn);
      
      // Append the course info to the article
      article.appendChild(courseInfo);
      
      // Append the article to the section
      courseSection.appendChild(article);


  });
}

// Fetch JSON data and initialize
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(fetchedData => {
    data = fetchedData; // Assign fetched data to global variable
    displayCourses(data);

    // Attach event listeners
    const allDetailButtons = document.querySelectorAll(".view-details-btn");
    allDetailButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const chosenCourse = button.className.match(/\d+/)[0];
        console.log(chosenCourse); // For debugging purposes
        createCourseInfo(); 
        displayHeading(data, chosenCourse);
        displayYears(data, chosenCourse);
        blurBackground();
        scrollToPosition(300);
      });
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });







  let currentlyOpenDropdown = null;


  





// Function to create and append the exit button
function createExitButton(targetId, buttonId) {
  // Create the exit button
  const exitButton = document.createElement('button');
  exitButton.id = buttonId;
  exitButton.innerHTML = '&#10006;'; // Cross symbol

  // Add click event to remove the target container
  exitButton.addEventListener('click', () => {
    const targetContainer = document.getElementById(targetId);
    if (targetContainer) {
      targetContainer.remove(); // Remove the target container
      removeBackgroundBlur()
    }
  });

  // Append the exit button to the target container
  const targetContainer = document.getElementById(targetId);
  if (targetContainer) {
    targetContainer.appendChild(exitButton);
  }
}






  
  // Function to create and append the course info section
  function createCourseInfo() {
    // Check if the card container already exists
    let cardContainer = document.getElementById('card-container');
    
    if (!cardContainer) {
      // Create the card container if it doesn't exist
      cardContainer = document.createElement('div');
      cardContainer.id = 'card-container';
      document.body.appendChild(cardContainer);
    }
    
    // Clear the container before adding new content
    cardContainer.innerHTML = '';
  
    const courseInfo = document.createElement('div');
    courseInfo.classList.add('course-info-popup');
  
    // Create and append the course title
    const heading = document.createElement('h1');
    heading.id = 'course-title';
    courseInfo.appendChild(heading);
  
    // Create and append the course image
    const img = document.createElement('img');
    img.id = 'course-image-popup';
    img.classList.add('course-image-popup');
    img.alt = 'Course Image';
    courseInfo.appendChild(img);
  
    // Create and append the course description
    const description = document.createElement('p');
    description.id = 'course-description';
    description.classList.add('course-description-popup');
    courseInfo.appendChild(description);
  
    // Create and append the button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container'); // Create container for buttons
  
    // Enroll Button
    const enrollButton = document.createElement('button');
    enrollButton.textContent = 'Enroll in Course';
    enrollButton.classList.add('enroll-btn');
    enrollButton.addEventListener('click', () => {







      createEnrollForm(rows);

      

      const moreInfoContainer = document.querySelector("#card-container");
      moreInfoContainer.remove();


      scrollToPosition(230);








    });
    buttonContainer.appendChild(enrollButton);
  
    // Print Button
    const printButton = document.createElement('button');
    printButton.textContent = 'Print';
    printButton.classList.add('print-btn');

    printButton.addEventListener('click', () => {


      prepareAndPrint();
    });

    buttonContainer.appendChild(printButton);
  
    courseInfo.appendChild(buttonContainer);
  
    // Append the course info to the card container
    cardContainer.appendChild(courseInfo);
  
      // Create and append the exit button
      createExitButton('card-container', 'more-info-exit-button');
  }
  





// Function to prepare and print the course information
function prepareAndPrint() {
  const printContainer = document.createElement('div');
  printContainer.id = 'print-container';

  // Clone content to be printed
  const courseTitle = document.getElementById('course-title').cloneNode(true);
  const courseImage = document.getElementById('course-image-popup').cloneNode(true);
  const courseDescription = document.getElementById('course-description').cloneNode(true);

  // Append content to print container
  printContainer.appendChild(courseTitle);
  printContainer.appendChild(courseImage);
  printContainer.appendChild(courseDescription);

  // Clone and append modules container
  const modulesContainer = document.querySelector('.container').cloneNode(true);
  printContainer.appendChild(modulesContainer);

  // Open a new window for printing
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  
  // Write the HTML content and include stylesheets for printing
  printWindow.document.write('<html><head><title>Print Course Information</title>');
  printWindow.document.write('<link rel="stylesheet" href="./css/reset.css">');
  printWindow.document.write('<link rel="stylesheet" href="./css/print.css">');
  printWindow.document.write('</head><body>');
  printWindow.document.write(printContainer.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  // Ensure the print dialog opens and then close the window after printing
  printWindow.onload = function() {
    printWindow.focus(); // Focus on the print window to ensure it is in view
    printWindow.print(); // Open print dialog
  };

  printWindow.onafterprint = function() {
    printWindow.close(); // Close the window after printing
  };
}

  









  // Function to display the course heading, image, and long description
  function displayHeading(data, chosenCourse) {
    const heading = document.getElementById('course-title');
    heading.textContent = data.courses[chosenCourse].title;
  
    // Display the course image
    const img = document.getElementById('course-image-popup');
    img.src = `assets/images/course-${data.courses[chosenCourse].id}.jpg`; // Use course ID to fetch image
    img.alt = data.courses[chosenCourse].title;
  
    // Display the course long description
    const description = document.getElementById('course-description');
    description.textContent = data.courses[chosenCourse].longDescription;
  }
  
  // Function to display years with dropdown buttons for each year
  function displayYears(data, chosenCourse) {
    const container = document.createElement('div');
    container.classList.add('container');
  
    // Loop through each year/module and create a dropdown button
    data.courses[chosenCourse].modules.forEach((value, yearIndex) => {
      const dropdown = document.createElement('div');
      dropdown.classList.add('dropdown');
  
      const button = document.createElement('button');
      button.textContent = `Year ${value.year}`;
      button.classList.add('dropdown-btn');
  
      // Add event listener to toggle module visibility on button click
      button.addEventListener('click', () => toggleModules(data, yearIndex, dropdown, button, chosenCourse));
  
      dropdown.appendChild(button);
      container.appendChild(dropdown);
    });
  
    // Append container to the card container
    const cardContainer = document.getElementById('card-container');
    cardContainer.appendChild(container);
  }
  
  
  












 // Object to keep track of completed modules per course
let completedCourses = {};









// Function to toggle modules dropdown and manage checkboxes
function toggleModules(data, year, dropdown, button, chosenCourse) {
  // Check if a dropdown is currently open
  if (currentlyOpenDropdown && currentlyOpenDropdown !== dropdown) {
    // Close the currently open dropdown
    const openDropdownContent = currentlyOpenDropdown.querySelector('.dropdown-content');
    const openDropdownButton = currentlyOpenDropdown.querySelector('.dropdown-btn');
    if (openDropdownContent) {
      openDropdownContent.remove();
    }
    // Reset the button icon for the currently open dropdown
    openDropdownButton.classList.remove('open');
  }

  // Check if the current dropdown content is already open
  let dropdownContent = dropdown.querySelector('.dropdown-content');

  // If it exists, remove it (i.e., close the dropdown)
  if (dropdownContent) {
    dropdownContent.remove();
    button.classList.remove('open'); // Reset the button icon
    currentlyOpenDropdown = null; // Reset the currently open dropdown
  } else {
    // Create the table container if it doesn't exist
    dropdownContent = document.createElement('div');
    dropdownContent.classList.add('dropdown-content');

    // Create the filter button and add it to the dropdownContent before the table
    const filterButton = document.createElement('button');
    filterButton.classList.add('filter-button');
    filterButton.textContent = 'Filter Completed';
    filterButton.addEventListener('click', () => toggleFilterCompleted(filterButton, dropdownContent));
    dropdownContent.appendChild(filterButton);

    // Create table and table body
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Create the table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headings = ['Name', 'Lecturer', 'Venue', 'Study Guide', 'Video Link', 'Complete'];

    // Loop through headings to create table header cells
    headings.forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create and populate the cells for each subject
    data.courses[chosenCourse].modules[year].subjects.forEach(subject => {
      const row = document.createElement('tr');

      // Create and populate the cells for each subject
      Object.entries(subject).forEach(([key, value]) => {
        const cell = document.createElement('td');

        if (key === 'studyGuide') {
          // Create a download link for the study guide
          const link = document.createElement('a');
          link.href = value;
          link.textContent = 'Download';
          link.target = '_blank'; // Open link in a new tab
          cell.appendChild(link);
        } else if (key === 'videoLink') {
          // Create a clickable link for the video
          const link = document.createElement('a');
          link.href = value;
          link.textContent = 'Watch';
          link.target = '_blank';
          cell.appendChild(link);
        } else {
          cell.textContent = value; // Regular text content
        }

        row.appendChild(cell);
      });

      // Create checkbox cell and move it to the end
      const checkboxCell = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style.cursor = "pointer";
      checkbox.classList.add('completion-checkbox');
      checkboxCell.appendChild(checkbox);
      row.appendChild(checkboxCell);

      // Add event listener to handle checkbox changes
      checkbox.addEventListener('change', () => {
        updateCompletionStatus(chosenCourse, subject.name, checkbox.checked);
        applyStrikethroughToRow(row, checkbox.checked);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody); // Append tbody to the table
    dropdownContent.appendChild(table); // Append the table to dropdownContent

    // Append dropdownContent to the dropdown
    dropdown.appendChild(dropdownContent);

    // Update the currently open dropdown
    currentlyOpenDropdown = dropdown;

    // Add class to button to indicate open state
    button.classList.add('open');
    
    // Restore checkbox states
    restoreCheckboxStates(chosenCourse);
  }
}







// Function to toggle the visibility of completed modules
function toggleFilterCompleted(button, dropdownContent) {
  const isFiltering = button.textContent === 'Filter Completed';

  // Update the button text
  button.textContent = isFiltering ? 'Remove Filter' : 'Filter Completed';

  // Toggle visibility of rows based on completion status
  dropdownContent.querySelectorAll('tbody tr').forEach(row => {
    const checkbox = row.querySelector('.completion-checkbox');
    if (isFiltering) {
      // Hide uncompleted modules
      if (!checkbox.checked) {
        row.classList.add('hidden');
      }
    } else {
      // Show all modules
      row.classList.remove('hidden');
    }
  });
}







// Function to update the progress bar and percentage
function updateProgressBar(courseId) {
  const progressElement = document.getElementById(`progress-${courseId}`);
  const percentageElement = document.querySelector(`#progress-${courseId} + .progress-percentage`);

  if (!data.courses[courseId]) {
    console.error(`Course ID ${courseId} not found in data.`);
    return;
  }

  const totalModules = data.courses[courseId].modules.flatMap(module => module.subjects).length; // Total modules for the course
  const completedModules = completedCourses[courseId] ? completedCourses[courseId].length : 0; // Completed modules count

  // Calculate percentage
  const percentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  // Update progress bar and percentage display
  if (progressElement) {
    progressElement.value = percentage;
  }
  if (percentageElement) {
    percentageElement.textContent = `${Math.round(percentage)}%`;
  }
}








// Function to apply completion styles
function applyCompletionStyles(courseCard) {
  if (!courseCard) return;

  // Create and add the "Completed" note
  let completedNote = courseCard.querySelector('.completed-note');
  if (!completedNote) {
    completedNote = document.createElement('div');
    completedNote.className = 'completed-note';
    completedNote.textContent = 'Completed';
    courseCard.appendChild(completedNote);
  }

  // Apply styles and animations
  courseCard.style.border = '3px solid green';
  courseCard.style.position = 'relative'; // Needed for absolute positioning of note

  // Change colors
  courseCard.querySelectorAll('hr').forEach(hr => hr.style.backgroundColor = 'green');
  const courseTitle = courseCard.querySelector('.course-title');
  if (courseTitle) {
    courseTitle.style.color = 'green';
  }

  // Animation (you can adjust the animation as needed)
  courseCard.classList.add('completed-animation');
}













// Function to update completion status of modules for a specific course
function updateCompletionStatus(courseId, moduleName, isChecked) {
  if (!completedCourses[courseId]) {
    completedCourses[courseId] = [];
  }

  if (isChecked) {
    // Add module to the list of completed modules
    if (!completedCourses[courseId].includes(moduleName)) {
      completedCourses[courseId].push(moduleName);
    }
  } else {
    // Remove module from the list of completed modules
    completedCourses[courseId] = completedCourses[courseId].filter(module => module !== moduleName);
  }

  // Log the updated completedCourses object
  console.log('Updated completed courses:', completedCourses);

  // Update the total number of completed modules and progress bar
  updateCompletedCoursesCount(courseId);
  updateProgressBar(courseId);
}






// Function to apply or remove strikethrough on the table row
function applyStrikethroughToRow(row, isChecked) {
  // Toggle strikethrough class based on the checkbox state
  if (isChecked) {
    row.classList.add('strikethrough');
  } else {
    row.classList.remove('strikethrough');
  }
}


// Function to update the count of completed modules and progress bar
function updateCompletedCoursesCount(courseId) {
  if (!data.courses[courseId]) {
    console.error(`Course ID ${courseId} not found in data.`);
    return;
  }

  // Get the total number of modules for the course
  const totalModules = data.courses[courseId].modules.flatMap(module => module.subjects).length;
  const completedModules = completedCourses[courseId]?.length || 0;

  // Calculate the percentage completion
  const percentage = (totalModules > 0) ? (completedModules / totalModules) * 100 : 0;

  // Update the progress bar and percentage display
  const progressBar = document.getElementById(`progress-${courseId}`);
  const progressPercentage = document.querySelector(`#progress-${courseId} + .progress-percentage`);
  const courseCard = document.querySelector(`.course-card img[src*="course-${courseId}"]`).closest('.course-card'); // Select the course card

  if (progressBar) {
    progressBar.value = percentage;
  }

  if (progressPercentage) {
    progressPercentage.textContent = `${Math.round(percentage)}%`;
  }

  // Check if the course is completed and apply styles if it is
  if (percentage === 100) {
    // Add "Completed" tag
    let completedTag = document.createElement('div');
    completedTag.className = 'completed-tag';
    completedTag.textContent = 'Completed';
    courseCard.appendChild(completedTag);

    // Apply completed styling
    courseCard.classList.add('completed-course');
    const courseTitle = courseCard.querySelector('.course-title');
    const hrElements = courseCard.querySelectorAll('hr');

    // Apply styles
    if (courseTitle) {
      courseTitle.style.color = 'green';
    }
    hrElements.forEach(hr => hr.style.backgroundColor = 'green');
    courseCard.style.border = '2px solid green';

    // Apply any additional animations if desired
    courseCard.classList.add('completed-animation');
  }

  console.log(`Total completed modules: ${completedModules}`);
  console.log(`Progress: ${Math.round(percentage)}%`);
}








// Function to add a filter button to the course card
function addFilterButton(courseCard, courseId) {
  const buttonContainer = courseCard.querySelector('.button-container');

  // Create filter button
  const filterButton = document.createElement('button');
  filterButton.textContent = 'Filter Completed';
  filterButton.classList.add('filter-button');
  
  // Add click event listener for filtering
  filterButton.addEventListener('click', () => {
    toggleFilterCompleted(filterButton, courseId);
  });

  // Append the button to the button container
  buttonContainer.appendChild(filterButton);
}











// Function to restore the checkbox states based on the completedCourses object
function restoreCheckboxStates(courseId) {
  document.querySelectorAll('.completion-checkbox').forEach(checkbox => {
    const moduleName = checkbox.closest('tr').querySelector('td').textContent;
    const isChecked = completedCourses[courseId] && completedCourses[courseId].includes(moduleName);

    // Update the checkbox checked state and strikethrough class
    checkbox.checked = isChecked;
    applyStrikethroughToRow(checkbox.closest('tr'), isChecked);
  });

  // Update progress bar after restoring checkbox states
  updateProgressBar(courseId);
}






  function scrollToPosition(targetY) {
    const scrollDuration = 300; // Duration in milliseconds
    const startY = window.scrollY; // Starting position
    const distance = targetY - startY; // Distance to scroll
    const scrollStep = distance / (scrollDuration / 15); // Calculate the scroll step

    const scrollInterval = setInterval(() => {
        const currentY = window.scrollY;
        const nextY = Math.round(currentY + scrollStep);

        // Check if we've reached or passed the target position
        if ((distance > 0 && nextY >= targetY) || (distance < 0 && nextY <= targetY)) {
            window.scrollTo(0, targetY); // Ensure it stops exactly at targetY
            clearInterval(scrollInterval); // Clear the interval once the target is reached
        } else {
            window.scrollBy(0, scrollStep); // Move by the scroll step
        }
    }, 15); // Repeat every 15ms for smoothness
}



function blurBackground() {
  const searchbar = document.querySelector("#search-bar");
  searchbar.style.filter = "blur(10px)";

  const courseBackground = document.querySelector("#course-section");
  courseBackground.style.filter = "blur(10px)";

  const searchButton = document.querySelector("#search-button");
  searchButton.style.filter = "blur(10px)";
}


function removeBackgroundBlur() {

    const searchbar = document.querySelector("#search-bar");
    searchbar.style.filter = "";
  
    const courseBackground = document.querySelector("#course-section");
    courseBackground.style.filter = "";
  
    const searchButton = document.querySelector("#search-button");
    searchButton.style.filter = "";
}















// Wait for the DOM to fully load before executing the script
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











let enrolledCourses = [];

// When a user enrolls for a course, update the enrolledCourses array
function enrollCourse(courseId) {
  if (!enrolledCourses.includes(courseId)) {
    enrolledCourses.push(courseId);
    console.log(enrolledCourses);
  }
}

function createEnrollForm(rows) {
  // Create the container for the enrollment form
  const container = document.createElement('div');
  container.id = 'enrollment-container';

  // Create and add the form heading
  const heading = document.createElement('h1');
  heading.textContent = 'Course Enrollment Form';
  heading.classList.add('enroll-form-h1');
  container.appendChild(heading);

  // Create the form element
  const form = document.createElement('form');
  form.id = 'enrollment-form';

  // Define form rows and their elements
  // Generate form rows based on the defined structure
  rows.forEach((row) => {
    const formRow = document.createElement('div');
    formRow.className = 'form-row';

    row.elements.forEach((element) => {
      const formGroup = document.createElement('div');
      formGroup.className = 'form-group';

      // Create and add label for each form element
      const label = document.createElement('label');
      label.classList.add('enroll-form-labels');
      label.setAttribute('for', element.id);
      label.textContent = element.label;
      formGroup.appendChild(label);

      // Handle different types of form elements
      if (element.type === 'select') {
        const select = document.createElement('select');
        select.id = element.id;
        select.required = true;
        select.name = element.name;
        // Create and add options to the select element
        if (element.options) {
          element.options.forEach((option) => {
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
        element.options.forEach((option) => {
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
        input.classList.add('enroll-input');
        input.required = true;
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
  submitButton.type = 'button';
  submitButton.className = 'submit-btn';
  submitButton.textContent = 'Enroll Now';
  submitRow.appendChild(submitButton);
  form.appendChild(submitRow);

  // Append form to the container
  container.appendChild(form);

  // Append the container to the body of the document
  document.body.appendChild(container);

  // Create the exit button
  createExitButton('enrollment-container', 'enroll-exit-button');



// Attach event listener for form submission
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent the default form submission

  if (validateFormInputs()) {
    const selectedCourse = document.getElementById('course').value;
    console.log('Selected Course:', selectedCourse);

    if (selectedCourse) {
      if (enrolledInCourses[selectedCourse] && enrolledInCourses[selectedCourse].status) {
        // If the course is already enrolled in, show an alert
        alert('You have already enrolled in this course.');
        return; // Exit the function to prevent further processing
      }

      if (courseStartDates[selectedCourse]) {
        // Remove the enrollment container
        const container = document.getElementById('enrollment-container');
        if (container) {
          container.remove();
        }

        // Create and display a new container for the countdown timer
        const countdownContainer = document.createElement('div');
        countdownContainer.id = 'countdown-container';
        countdownContainer.classList.add('countdown-container');

        const countdownPopup = document.createElement('div');
        countdownPopup.id = 'countdown-popup';
        countdownPopup.classList.add('countdown-popup');
        countdownContainer.appendChild(countdownPopup);

        // Append the countdown container to the body
        document.body.appendChild(countdownContainer);

        const startDate = courseStartDates[selectedCourse];
        startCountdown(startDate, countdownPopup); // Pass countdownPopup to the function

        // Update enrolledInCourses structure
        if (enrolledInCourses[selectedCourse] !== undefined) {
          enrolledInCourses[selectedCourse].status = true;
        }

        // Update the enrollment status and progress container for each course
        Object.keys(enrolledInCourses).forEach(courseName => {
          const course = enrolledInCourses[courseName];
          const courseId = course.id;
          const courseCard = document.querySelector(`#course-section > article:nth-child(${courseId + 1})`);
          const enrollmentStatusElement = courseCard.querySelector(`#status-${courseId}`);
          const courseInfo = courseCard.querySelector('.course-info');

          if (course.status) {
            if (enrollmentStatusElement) {
              enrollmentStatusElement.textContent = "Status: Enrolled";
            }

            // Check if the progress container already exists
            let existingProgressContainer = courseInfo.querySelector('.progress-container');
            if (!existingProgressContainer) {
              // Create and append the progress container
              const progressContainer = document.createElement('div');
              progressContainer.classList.add('progress-container');
              const hrProgress = document.createElement('hr');
              progressContainer.appendChild(hrProgress);

              const progressLabel = document.createElement('label');
              progressLabel.htmlFor = `progress-${courseId}`;
              progressLabel.textContent = 'Completion Progress:';
              progressContainer.appendChild(progressLabel);

              const progress = document.createElement('progress');
              progress.id = `progress-${courseId}`;
              progress.value = 0;
              progress.max = 100;
              progressContainer.appendChild(progress);

              const progressPercentage = document.createElement('span');
              progressPercentage.classList.add('progress-percentage');
              progressPercentage.textContent = '0%';
              progressContainer.appendChild(progressPercentage);

              // Add a <br> for separation
              const countdownBr = document.createElement('br');
              progressContainer.appendChild(countdownBr);

              // Add a <hr> for separation
              const countdownHr = document.createElement('hr');
              progressContainer.appendChild(countdownHr);

              const countdownTimer = document.createElement('span');
              countdownTimer.id = `countdown-${courseId}`;
              countdownTimer.classList.add('countdown-timer');
              progressContainer.appendChild(countdownTimer);

              // Append the progress container to courseInfo
              courseInfo.appendChild(progressContainer);

              // Initialize the countdown timer
              startCountdown(courseStartDates[courseName], countdownTimer); // Pass countdownTimer to the function

              progressContainer.style.marginTop = "1rem";
            }
          } else {
            if (enrollmentStatusElement) {
              enrollmentStatusElement.textContent = "Status: Not Enrolled";
            }
          }
        });

        // Log the updated enrolledInCourses object for debugging
        console.log('Updated Enrolled Courses:', enrolledInCourses);

        enrollCourse(selectedCourse); // Ensure this function reflects the updated status if needed

        // Set timeout to hide the countdown container and remove the background blur
        setTimeout(() => {
          const countdownPopupElement = document.getElementById('countdown-popup');
          if (countdownPopupElement) {
            countdownPopupElement.remove();
            removeBackgroundBlur(); // Call function to remove blur
          }
        }, 3000);

      } else {
        const errorPopup = document.createElement('div');
        errorPopup.id = 'error-popup';
        errorPopup.classList.add('error-popup');
        errorPopup.textContent = 'Please select a valid course.';
        document.body.appendChild(errorPopup);

        setTimeout(() => {
          errorPopup.style.display = 'none';
          removeBackgroundBlur(); // Call function to remove blur
        }, 3000);
      }
    }
  }
});





// Function to start the countdown timer
function startCountdown(startDate, countdownPopupElement) {
  countdownPopupElement.style.display = 'block'; // Show the countdown element

  function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = startDate - currentDate;

    if (timeDifference > 0) {
      // Calculate days, hours, minutes, and seconds remaining
      const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesRemaining = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownPopupElement.textContent = `Time remaining until the course starts: ${daysRemaining} days, ${hoursRemaining} hours, ${minutesRemaining} minutes, and ${secondsRemaining} seconds.`;
    } else {
      clearInterval(timerInterval);
      countdownPopupElement.textContent =
        'The course has already started or the date is invalid.';
    }
  }

  updateCountdown(); // Initial call to set the countdown immediately
  let timerInterval = setInterval(updateCountdown, 1000); // Update every second
};




// Define start dates for courses
const courseStartDates = {
  'Bachelor of Computing': new Date('2024-12-01'),
  'Bachelor of Information Technology': new Date('2024-11-01'),
  'Diploma in Information Technology': new Date('2024-10-01'),
  'Diploma for Deaf Students': new Date('2024-10-01'),
  'Certificate: IT (Database Development)': new Date('2024-09-01'),
  'National Certificate: IT (Systems Development)': new Date('2024-09-01'),
};

// Function to start the countdown timer
function startCountdown(startDate, countdownPopupElement) {
  countdownPopupElement.style.display = 'block'; // Show the popup

  function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = startDate - currentDate;

    if (timeDifference > 0) {
      // Calculate days, hours, minutes, and seconds remaining
      const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursRemaining = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesRemaining = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownPopupElement.textContent = `Time remaining until the course starts: ${daysRemaining} days, ${hoursRemaining} hours, ${minutesRemaining} minutes, and ${secondsRemaining} seconds.`;
    } else {
      countdownPopupElement.textContent =
        'The course has already started or the date is invalid.';
    }
  }

  updateCountdown(); // Initial call to set the countdown immediately
  let timerInterval = setInterval(updateCountdown, 1000); // Update every second
}
  
}

















// Function to perform extra validations on form inputs
function validateFormInputs() {
  const form = document.getElementById('enrollment-form');
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const idNumber = document.getElementById('id').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const dob = document.getElementById('dob').value;
  const streetAddress = document.getElementById('street-address').value.trim();
  const suburb = document.getElementById('suburb').value.trim();
  const city = document.getElementById('city').value.trim();
  const province = document.getElementById('province').value;
  const course = document.getElementById('course').value;
  const genderRadios = document.getElementsByName('gender');

  // Helper function to check if a field is empty
  function isEmpty(value) {
    return value === '';
  }

  // Validate name fields
  const namePattern = /^[A-Za-z]+$/;
  if (isEmpty(firstName) || !namePattern.test(firstName)) {
    alert('Please enter a valid first name containing only letters.');
    return false;
  }
  if (isEmpty(lastName) || !namePattern.test(lastName)) {
    alert('Please enter a valid last name containing only letters.');
    return false;
  }

  // Validate ID number
  const idPattern = /^\d{13}$/;
  if (!idPattern.test(idNumber)) {
    alert('Please enter a valid 13-digit ID number.');
    return false;
  }

  // Validate email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  // Validate phone number format
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone)) {
    alert('Please enter a valid 10-digit phone number.');
    return false;
  }

  // Validate date of birth (must be at least 18 years old)
  if (dob) {
    let birthDate = new Date(dob);
    let age = new Date().getFullYear() - birthDate.getFullYear();
    let m = new Date().getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      alert('You must be at least 18 years old to enroll.');
      return false;
    }
  } else {
    alert('Please enter your date of birth.');
    return false;
  }

  // Validate address fields
  if (isEmpty(streetAddress)) {
    alert('Please enter your street address.');
    return false;
  }
  if (isEmpty(suburb)) {
    alert('Please enter your suburb.');
    return false;
  }
  if (isEmpty(city)) {
    alert('Please enter your city.');
    return false;
  }
  if (province === '') {
    alert('Please select your province.');
    return false;
  }

  // Validate course selection
  if (course === '') {
    alert('Please select a course.');
    return false;
  }

  // Validate gender selection
  const genderSelected = Array.from(genderRadios).some(radio => radio.checked);
  if (!genderSelected) {
    alert('Please select your gender.');
    return false;
  }

  return true;
}
