fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(courseData => {


    searchCourses(courseData);

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});









function searchCourses(courseData) {
    // Extract course titles from the data
    let courseTitles = courseData.courses.map((element) => element.title);

    const searchButton = document.getElementById("search-button");


    // Add event listener for the search button
    searchButton.addEventListener("click", () => {
        let subString = document.getElementById("search-bar").value.trim();

        // Regular expression for case-insensitive matching
        const regex = new RegExp(subString, 'i');

        // Find titles that match the search substring
        let titlesToKeep = courseTitles.filter(str => regex.test(str));

        // Extract titles to remove
        let titlesToRemove = courseData.courses.filter(course => !titlesToKeep.includes(course.title)).map(course => course.title);

        // Get the course section and course cards
        let courseSection = document.getElementById("course-section");
        let courseCards = courseSection.querySelectorAll(".course-card");

        // Remove course cards with titles in titlesToRemove
        courseCards.forEach(courseCard => {
            const titleElement = courseCard.querySelector('h2');
  
            const courseTitle = titleElement.textContent;

            if (titlesToRemove.includes(courseTitle)) {
                courseSection.removeChild(courseCard);
            }
        });
    });
}
