
const calendarTitle = document.querySelectorAll('.calendar-header div');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const calendarBody = document.querySelector('.calendar-body tbody');

let currentDate = new Date();
let selectedDate = new Date();

// Render the calendar with the given date
function renderCalendar(date) {
  // Clear the calendar
  calendarBody.innerHTML = '';

  // Set the title of the calendar
  calendarTitle[0].textContent = getMonthName(date.getMonth());
  calendarTitle[1].textContent=date.getFullYear();

  // Get the first day of the month
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  // Get the day of the week of the first day of the month (0-6, 0=Sunday, 6=Saturday)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // Get the number of days in the month
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // Fill the calendar with the dates of the month
  let dateCount = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDayOfWeek) {
        // Empty cell before the first day of the month
        cell.innerHTML = '';
      } else if (dateCount > daysInMonth) {
        // Empty cell after the last day of the month
        cell.innerHTML = '';
      } else {
        // Cell with a date
    cell.textContent = dateCount;
    if (isSameDay(selectedDate, new Date(date.getFullYear(), date.getMonth(), dateCount))) {
      // Add the "selected" class to the cell if it is the selected date
      cell.classList.add('selected');
    }
    if (isSameDay(currentDate, new Date(date.getFullYear(), date.getMonth(), dateCount))) {
      // Add the "today" class to the cell if it is the current date
      cell.classList.add('today');
    }
    cell.addEventListener('click', () => {
      // Select the clicked date and re-render the calendar
      selectedDate = new Date(date.getFullYear(), date.getMonth(), dateCount);
      renderCalendar(date);
    });
    dateCount++;
  }
  row.appendChild(cell);
}
calendarBody.appendChild(row);
}
}
// Get the name of the month
function getMonthName(month) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
}
// Check if two dates are the same day
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}
// Render the initial calendar
renderCalendar(currentDate);

// Add event listeners to the previous and next buttons
prevButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});
nextButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});


