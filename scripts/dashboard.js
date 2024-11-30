
const timetableForm = document.getElementById('timetable-form');
const classNameInput = document.getElementById('class-name');
const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const timetableBody = document.querySelector('#timetable tbody');
const addPeriodBtn = document.getElementById('add-period-btn');
const downloadTimetableBtn = document.getElementById('download-timetable-btn');
let x=JSON.parse(localStorage.getItem('loggedInUser'));
document.getElementById('user-name').innerText='Welcome '+x.name+' !';

function addPeriod() {
    const className = classNameInput.value.trim();
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    if (className === '' || startTime === '' || endTime === '') {
        alert('Please fill out all fields.');
        return;
    }

    const row = document.createElement('tr');

    const classNameCell = document.createElement('td');
    classNameCell.textContent = className;

    const startTimeCell = document.createElement('td');
    startTimeCell.textContent = startTime;

    const endTimeCell = document.createElement('td');
    endTimeCell.textContent = endTime;

    const actionCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        row.remove();
    });

    actionCell.appendChild(deleteBtn);

    row.appendChild(classNameCell);
    row.appendChild(startTimeCell);
    row.appendChild(endTimeCell);
    row.appendChild(actionCell);

    timetableBody.appendChild(row);

    classNameInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';
}

addPeriodBtn.addEventListener('click', addPeriod);

document.getElementById('download-timetable-btn').addEventListener('click', () => {
    const timetable = document.querySelector('#timetable');
    
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];

    timetable.querySelectorAll('tr').forEach(row => {
        const rowData = [];
        row.querySelectorAll('th, td').forEach(cell => {
            if(cell.innerText=='Delete' || cell.innerText=='Action'){
                return;
            }
            rowData.push(cell.innerText);
        });
        worksheetData.push(rowData);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timetable');

    XLSX.writeFile(workbook, 'timetable.xlsx');
});

document.getElementById('header-logout').addEventListener('click', ()=>{
    localStorage.clear();
    alert('Logout successful...')
    window.location.href = 'home.html';
})


