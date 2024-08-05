// URL to the JSON file
const jsonFilePath = './data/courses.json';

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
    
    //add the enroll button here/////////////////////////////////////////////////////////////////////////////////////
    let enrolledStatus = course.enrolledStatus;

    if (!enrolledStatus) {
      let enrollmentStatusElement = document.createElement("p");
      enrollmentStatusElement.setAttribute("id", `.status-${course.id}`);
      enrollmentStatusElement.textContent = "Status: Not Enrolled";
      status.appendChild(enrollmentStatusElement);
    } else {
      let enrollmentStatusElement = document.querySelector(`#status-${course.id}`);

      if(enrollmentStatusElement) {
        enrollmentStatusElement.remove();
      }
      
      // Create and append the progress container
    const progressContainer = document.createElement('div');
    progressContainer.classList.add('progress-container');


    
    const hrProgress = document.createElement('hr');
    progressContainer.appendChild(hrProgress);
    
    courseInfo.appendChild(progressContainer);

      const progressLabel = document.createElement('label');
      progressLabel.htmlFor = `progress${course.id}`;
      progressLabel.textContent = 'Completion Progress:';
      progressContainer.appendChild(progressLabel);
      
      const progress = document.createElement('progress');  
      progress.id = `progress${course.id}`;
      progress.value = 0;
      progress.max = 100;
      progressContainer.appendChild(progress);
      
      const progressPercentage = document.createElement('span');
      progressPercentage.classList.add('progress-percentage');
      progressPercentage.textContent = '0%';
      progressContainer.appendChild(progressPercentage);

      progressContainer.style.marginTop = "1rem";
    }


    

    
    courseInfo.appendChild(status);
    
    
    
    // Create and append the view details button
    const viewDetailsBtn = document.createElement('button');
    viewDetailsBtn.classList.add('view-details-btn');

    viewDetailsBtn.classList.add(course.id);

    viewDetailsBtn.textContent = 'View Details';
    courseInfo.appendChild(viewDetailsBtn);
    
    // Append the course info to the article
    article.appendChild(courseInfo);
    
    // Append the article to the section
    courseSection.appendChild(article);
  });

  // After all course cards are added, set up event listeners
  // setupEventListeners();
}

// Function to set up event listeners for course status 
 /*
function setupEventListeners() {
  document.querySelectorAll('.course-card').forEach((card) => {
    // Get references to the checkbox, progress bar, progress percentage, and hr elements
    const checkbox = card.querySelector('.course-completed');
    const progressBar = card.querySelector('progress');
    const progressPercentage = card.querySelector('.progress-percentage');
    const hrElements = card.querySelectorAll('.course-status hr, .progress-container hr');

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
}

*/

// Fetch JSON data and call the display function
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayCourses(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });















 /*
TODO

create checkbox en label (add op more-info page vir elke module)

     const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('course-completed');
    checkbox.id = `course${course.id}`;
    status.appendChild(checkbox);
    
    const label = document.createElement('label');
    label.htmlFor = `course${course.id}`;
    label.textContent = 'Mark as Finished';
    status.appendChild(label);
 


create progress bar op main page, wanneer user klaar genroll het vir daai course. (Delete eers enrollmentStatus p, en dan add hierdie)
  
    const progressLabel = document.createElement('label');
    progressLabel.htmlFor = `progress${course.id}`;
    progressLabel.textContent = 'Completion Progress:';
    progressContainer.appendChild(progressLabel);
    
    const progress = document.createElement('progress');
    progress.id = `progress${course.id}`;
    progress.value = 0;
    progress.max = 100;
    progressContainer.appendChild(progress);
    
    const progressPercentage = document.createElement('span');
    progressPercentage.classList.add('progress-percentage');
    progressPercentage.textContent = '0%';
    progressContainer.appendChild(progressPercentage);

    progressContainer.style.marginTop = "1rem";













create enroll button:
    const enrollButton = document.createElement('button');
    enrollButton.classList.add("enroll-button");
    enrollButton.textContent = "Enroll";
    status.appendChild(enrollButton);
 */