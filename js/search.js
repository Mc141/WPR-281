const jsonFilePath = './data/courses.json';

// Fetch course data from JSON file
fetch(jsonFilePath)
  .then((response) => {
    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Parse the response as JSON
    return response.json();
  })
  .then((courseData) => {
    // Call the searchCourses function with the course data
    searchCourses(courseData);
  })
  .catch((error) => {
    // Handle fetch errors
    console.error("There was a problem with the fetch operation:", error);
  });





function searchCourses(courseData) {
  // Extract course titles from the data
  const courseTitles = courseData.courses.map((element) => element.title);

  let filtered = false; // Track whether the courses are currently filtered
  let titlesToKeep = []; // Initialize the array to hold matching titles

  // Get the course section and course cards
  const courseSection = document.getElementById("course-section");
  const courseCards = courseSection.querySelectorAll(".course-card");

  const searchButton = document.getElementById("search-button");
  const searchButtonIcon = document.querySelector("#search-button i");

  const searchBar = document.getElementById("search-bar");

  // Add event listener for the search button
  searchButton.addEventListener("click", () => {
    const subString = searchBar.value.trim(); // Get the trimmed search input

    if (!filtered) { // If courses are not filtered
      if (subString !== "") { // Check if the search input is not empty

        // Escape special characters in the search substring for regex
        const escapedSubString = subString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        // Regular expression for case-insensitive matching
        const regex = new RegExp(escapedSubString, "i");

        // Find titles that match the search substring
        titlesToKeep = courseTitles.filter((str) => regex.test(str));

        // Hide course cards with titles not in titlesToKeep
        courseCards.forEach((courseCard) => {
          const titleElement = courseCard.querySelector("h2");
          const courseTitle = titleElement.textContent;

          // Display the course card if the title is in the titlesToKeep array
          courseCard.style.display = titlesToKeep.includes(courseTitle) ? "" : "none";
        });

        const searchButtonIcon = document.querySelector("#search-button i");
        searchButtonIcon.classList.add("icon-transition"); // Add transition class

        // Use a timeout to allow the transition to start
        setTimeout(() => {
          searchButtonIcon.classList.remove("fa-search"); // Change icon to 'times'
          searchButtonIcon.classList.add("fa-times");
          searchButtonIcon.classList.remove("icon-transition");
          searchButtonIcon.classList.add("icon-");
        }, 300);

        // Reset animations
        searchButtonIcon.classList.add("icon-transition");
        searchButtonIcon.classList.remove("icon-visible");

        filtered = true; // Update the filtered state
      } else {
        alert("You can't have an empty search!"); // Alert user if the search input is empty
      }
    } else { // If courses are already filtered
      // Show all course cards
      courseCards.forEach((courseCard) => {
        courseCard.style.display = ""; // Reset the display property
      });

      searchButtonIcon.classList.add("icon-transition"); // Add transition class

      // Use a timeout to allow the transition to start
      setTimeout(() => {
        searchButtonIcon.classList.remove("fa-times"); // Change icon back to 'search'
        searchButtonIcon.classList.add("fa-search");
        searchButtonIcon.classList.remove("icon-transition");
        searchButtonIcon.classList.add("icon-visible");
      }, 300);

      // Reset search bar
      searchBar.value = ""; // Clear the search input

      filtered = false; // Update the filtered state

      // Reset animations
      searchButtonIcon.classList.add("icon-transition");
      searchButtonIcon.classList.remove("icon-visible");
    }
  });
}