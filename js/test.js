

fetch('./data/courses.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {

    let courseTitle = data.courses[0].title;
    let courseDuration = data.courses[0].duration;
    



    console.log(
        //data.courses[0].modules[0].subjects[3].videoLink
  /*      courseTitle + "\n" + courseDuration
        + "\n" */

    );

    let details = data.courses[0].modules;

    details.forEach(courseYear => {

        console.log('Year', courseYear.year);




       let subjectInfo = courseYear.subjects;

       subjectInfo.forEach(subject => {
        console.log(subject.name);
        console.log(subject.lecturer);
        console.log(subject.venue);
        console.log(subject.studyGuide);
        console.log(subject.videoLink);
        console.log("");
       });


        
    });





  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });



  