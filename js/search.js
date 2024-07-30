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
    let courseTitles = courseData.courses.map((element, index) => {
        return element.title;
    });
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", ()=> {
        let subString = document.getElementById("search-bar").value;

        const regex = new RegExp(subString, 'i');

        let searchResults = courseTitles.filter(str => regex.test(str));


        
        let filteredCourses = courseData.courses.filter((course) => {
            return searchResults.includes(course.title);
        });

        console.log(filteredCourses);


    });


}
