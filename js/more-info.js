const jsonFilePath = './data/courses.json';

// Variable to keep track of the currently open dropdown
let currentlyOpenDropdown = null;

// Function to display the course heading
function displayHeading(data) {
  const heading = document.createElement('h1');
  heading.textContent = data.courses[0].title;
  document.body.appendChild(heading);
}

// Function to display years with dropdown buttons for each year
function displayYears(data) {
  const container = document.createElement('div');
  container.classList.add('container');

  // Loop through each year/module and create a dropdown button
  data.courses[0].modules.forEach((value, yearIndex) => {
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    const button = document.createElement('button');
    button.textContent = `Year ${value.year}`;
    button.classList.add('dropdown-btn');

    // Add event listener to toggle module visibility on button click
    button.addEventListener('click', () => toggleModules(data, yearIndex, dropdown, button));

    dropdown.appendChild(button);
    container.appendChild(dropdown);
  });

  document.body.appendChild(container); // Append the container once
}

// Function to toggle the display of modules in a table format for a given year
function toggleModules(data, year, dropdown, button) {
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
    const headings = ['Name', 'Lecturer', 'Venue', 'Study Guide', 'Video Link'];

    // Loop through headings to create table header cells
    headings.forEach(heading => {
      const th = document.createElement('th');
      th.textContent = heading;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create and populate the cells for each subject
    data.courses[0].modules[year].subjects.forEach(subject => {
      const row = document.createElement('tr');

      // Iterate over subject details and create table cells
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

// Fetch the JSON file and initialize the display functions
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse JSON if the response is OK
  })
  .then(data => {
    displayHeading(data); // Display the course heading
    displayYears(data);   // Display the year dropdowns
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error); // Log any fetch errors
  });
