document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/timetable');
        const timetable = await response.json();
        const fullTimetable = document.getElementById('full-timetable');
        fullTimetable.innerHTML = '';
        timetable.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.subject} - ${item.time}`;
            fullTimetable.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading timetable:', error);
    }
});
