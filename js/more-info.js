const jsonFilePath = './data/courses.json';


function displayHeading(data){
    const heading = document.createElement('h1');
    heading.textContent = data.courses[0].title;
    document.body.appendChild(heading);
}

function displayYears(data){
    const container = document.createElement('div');
    container.classList.add('container');

    data.courses[0].modules.forEach(value => {
        const dropdown = document.createElement('div');
        dropdown.classList.add('dropdown');

        const button = document.createElement('button');
        button.textContent = `Year ${value.year}`;
        button.classList.add('dropdown-btn');

        dropdown.appendChild(button);
        container.appendChild(dropdown);

        document.body.appendChild(container);
    });
}

function displayModules(data){
    //Create table and table body
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    //Create the table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headings = ['Module', 'Study Guide', 'Video Link'];

    headings.forEach(heading => {
        const th = document.createElement('th');
        th.textContent = heading;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const row = document.createElement('tr');
    //Create the cells
    data.courses[0].modules[0].subjects[0].forEach(cellData => {
            const cell = document.createElement('td');
            cell.textContent = cellData;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    

    table.appendChild(tbody);

    // Append the table to the container
    document.body.appendChild(table);

}

fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayHeading(data);
    displayYears(data);
    displayModules(data)
    /*console.log(
        data.courses[0].modules[0].subjects[0].name
    ); */

    //iterate modules [] for different years
    //iterate subjects[] for different names

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });