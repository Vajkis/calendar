import renderCalendar from "./renderCalendar.js";

function renderTitle() {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const titleDOM = document.querySelector('#title');

    const date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth();

    function updateTitle() {
        titleDOM.textContent = `${year} ${months[month]}`;
    }

    updateTitle();
    renderCalendar(year, month);

    function backMonth() {
        month--;
        fixDate();

        renderCalendar(year, month);
        date.setMonth(month);

        updateTitle();
    }

    function nextMonth() {
        month++;
        fixDate();

        renderCalendar(year, month);
        date.setMonth(month);

        updateTitle();
    }

    function fixDate() {
        year = year + Math.floor((month / 12));

        if (month > 11) month -= 12;
        if (month < 0) month += 12;
    }

    const buttonBackDOM = document.querySelector('#backMonth');
    buttonBackDOM.addEventListener('click', backMonth);

    const buttonNextDOM = document.querySelector('#nextMonth');
    buttonNextDOM.addEventListener('click', nextMonth);
}

export default renderTitle;