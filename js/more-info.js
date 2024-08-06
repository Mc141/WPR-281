// URL to the JSON file
const jsonFilePath = './data/courses.json';


    // Variable to keep track of the currently open dropdown
let currentlyOpenDropdown = null;

// Object to keep track of completed courses
const completedCourses = {};


// Function to create and append the exit button
function createExitButton() {
  // Create the exit button
  const exitButton = document.createElement('button');
  exitButton.id = 'exit-button';
  exitButton.innerHTML = '&#10006;'; // Cross symbol
  exitButton.classList.add('exit-btn');

  // Add click event to remove the card container
  exitButton.addEventListener('click', () => {
    const cardContainer = document.getElementById('card-container');
    if (cardContainer) {
      cardContainer.remove(); // Remove the card container
      document.body.style.backgroundColor = 'white'; // Set the background to white
    }
  });

  // Append the exit button to the card container
  const cardContainer = document.getElementById('card-container');
  if (cardContainer) {
    cardContainer.appendChild(exitButton);
  }
}



// Function to create and append the course info section
function createCourseInfo() {
  let cardContainer = document.getElementById('card-container');
  
  if (!cardContainer) {
    cardContainer = document.createElement('div');
    cardContainer.id = 'card-container';
    document.body.appendChild(cardContainer);
  }
  
  cardContainer.innerHTML = '';

  const courseInfo = document.createElement('div');
  courseInfo.classList.add('course-info-popup');

  const heading = document.createElement('h1');
  heading.id = 'course-title';
  courseInfo.appendChild(heading);

  const img = document.createElement('img');
  img.id = 'course-image';
  img.classList.add('course-image-popup');
  img.alt = 'Course Image';
  courseInfo.appendChild(img);

  const description = document.createElement('p');
  description.id = 'course-description';
  description.classList.add('course-description-popup');
  courseInfo.appendChild(description);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const enrollButton = document.createElement('button');
  enrollButton.textContent = 'Enroll in Course';
  enrollButton.classList.add('enroll-btn');
  enrollButton.addEventListener('click', () => {
    alert('You are now enrolled in the course!');
  });
  buttonContainer.appendChild(enrollButton);

  const printButton = document.createElement('button');
  printButton.textContent = 'Print';
  printButton.classList.add('print-btn');
  printButton.addEventListener('click', () => {
    prepareAndPrint(); // Use the new print function
  });
  buttonContainer.appendChild(printButton);

  courseInfo.appendChild(buttonContainer);
  cardContainer.appendChild(courseInfo);
  createExitButton();
}

// Function to prepare and print the course information
function prepareAndPrint() {
  const printContainer = document.createElement('div');
  printContainer.id = 'print-container';

  const courseTitle = document.getElementById('course-title').cloneNode(true);
  const courseImage = document.getElementById('course-image').cloneNode(true);
  const courseDescription = document.getElementById('course-description').cloneNode(true);

  printContainer.appendChild(courseTitle);
  printContainer.appendChild(courseImage);
  printContainer.appendChild(courseDescription);

  const modulesContainer = document.querySelector('.container').cloneNode(true);
  printContainer.appendChild(modulesContainer);

  const printWindow = window.open('', '_blank');
  printWindow.document.write('<html><head><title>Print Course Information</title>');
  printWindow.document.write('<link rel="stylesheet" href="css/reset.css">');
  printWindow.document.write('<link rel="stylesheet" href="css/print.css">');
  printWindow.document.write('</head><body>');
  printWindow.document.write(printContainer.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

// Function to display the course heading, image, and long description
function displayHeading(data, chosenCourse) {
  const heading = document.getElementById('course-title');
  heading.textContent = data.courses[chosenCourse].title;

  // Display the course image
  const img = document.getElementById('course-image');
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



// Function to toggle the display of modules in a table format for a given year
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
      checkbox.classList.add('completion-checkbox');
      checkboxCell.appendChild(checkbox);
      row.appendChild(checkboxCell);

      // Add event listener to handle checkbox changes
      checkbox.addEventListener('change', () => updateCompletionStatus(subject.name, checkbox.checked));

      tbody.appendChild(row);
    });

    table.appendChild(tbody); // Append tbody to the table
    dropdownContent.appendChild(table); // Append the table to dropdownContent
    dropdown.appendChild(dropdownContent); // Append dropdownContent to the dropdown

    // Update the currently open dropdown
    currentlyOpenDropdown = dropdown;

    // Add class to button to indicate open state
    button.classList.add('open');
    
    // Restore checkbox states
    restoreCheckboxStates();
  }




// Function to update completion status of a course
function updateCompletionStatus(courseName, isChecked) {
  // Update the completion status in the completedCourses object
  if (isChecked) {
    completedCourses[courseName] = true;
  } else {
    delete completedCourses[courseName];
  }

  // Log the updated completedCourses object
  console.log('Updated completed courses:', completedCourses);

  // Update the total number of completed courses
  updateCompletedCoursesCount();
}

// Function to update the count of completed courses
function updateCompletedCoursesCount() {
  let count = Object.keys(completedCourses).length;
  console.log(`Total completed courses: ${count}`);
}

// Function to restore the checkbox states based on the completedCourses object
function restoreCheckboxStates() {
  document.querySelectorAll('.completion-checkbox').forEach(checkbox => {
    const courseName = checkbox.closest('tr').querySelector('td').textContent;
    checkbox.checked = completedCourses[courseName] || false;
  });
}

};











let chosenCourse = 0;



// Fetch the JSON data and initialize the courses
document.addEventListener('DOMContentLoaded', () => {
  fetch(jsonFilePath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse JSON if the response is OK
    })
    .then(data => {
      createCourseInfo(); // Create and append the course info section
      displayHeading(data, chosenCourse); // Display the course heading, image, and description
      displayYears(data, chosenCourse); // Display years with dropdown buttons
    })
    .catch(error => console.error('Error fetching JSON data:', error));
});

