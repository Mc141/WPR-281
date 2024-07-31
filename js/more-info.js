const jsonFilePath = './data/courses.json';

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

    //Create the rows
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            cell.textContent = `Row ${i + 1} Column ${j + 1}`;
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    // Append the table to the container
    document.getElementById('yearOne').appendChild(table);

}

fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    displayModules(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });