const jsonFilePath = './data/courses.json';

// Variable to keep track of the currently open dropdown
let currentlyOpenDropdown = null;

// Function to create and append the course info section
function createCourseInfo() {
  const courseInfo = document.createElement('div');
  courseInfo.classList.add('course-info');

  // Create and append the course title
  const heading = document.createElement('h1');
  heading.id = 'course-title';
  courseInfo.appendChild(heading);

  // Create and append the course image
  const img = document.createElement('img');
  img.id = 'course-image';
  img.classList.add('course-image');
  img.alt = 'Course Image';
  courseInfo.appendChild(img);

  // Create and append the course description
  const description = document.createElement('p');
  description.id = 'course-description';
  description.classList.add('course-description');
  courseInfo.appendChild(description);

  // Create and append the button container
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container'); // Create container for buttons

  // Enroll Button
  const enrollButton = document.createElement('button');
  enrollButton.textContent = 'Enroll in Course';
  enrollButton.classList.add('enroll-btn');
  enrollButton.addEventListener('click', () => {
    alert('You are now enrolled in the course!');
  });
  buttonContainer.appendChild(enrollButton);

  // Print Button
  const printButton = document.createElement('button');
  printButton.textContent = 'Print';
  printButton.classList.add('print-btn');
  printButton.addEventListener('click', () => {
    window.print(); // Trigger the print dialog
  });
  buttonContainer.appendChild(printButton);

  courseInfo.appendChild(buttonContainer);

  // Append the course info to the body
  document.body.appendChild(courseInfo);
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

  // Append container to the body
  document.body.appendChild(container);
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

      tbody.appendChild(row);
    });

    table.appendChild(tbody); // Append tbody to the table
    dropdownContent.appendChild(table); // Append the table to dropdownContent
    dropdown.appendChild(dropdownContent); // Append dropdownContent to the dropdown

    // Update the currently open dropdown
    currentlyOpenDropdown = dropdown;

    // Add class to button to indicate open state
    button.classList.add('open');
  }
}



////////////////////////// parse chosen course to this variable
let chosenCourse = 5;



// Fetch the JSON file and initialize the display functions
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
    displayYears(data, chosenCourse); // Display the year dropdowns
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error); // Log any fetch errors
  });
