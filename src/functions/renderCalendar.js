import renderBubbles from "./renderBubbles.js";
import renderList from "./renderList.js";

function renderCalendar(year, month) {

    const tbodyDOM = document.querySelector('#tbody');

    tbodyDOM.innerHTML = null;

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let day = 0;

    const trDOM = document.createElement('tr');

    const today = new Date();
    const currentMonth = new Date(year, month);

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    };

    while (day + 1 < daysInMonth) {

        for (let weekDay = 0; weekDay < 7; weekDay++) {
            const tdDOM = document.createElement('td');

            if (today.getFullYear() === currentMonth.getFullYear()
                && today.getMonth() === currentMonth.getMonth()
                && today.getDate() === day + 1) {

                tdDOM.classList.add('today');
            }

            const currentWeekDay = new Date(year, month, day).getDay();
            const currentDay = new Date(year, month, day + 1);
            const id = currentDay.toLocaleString('lt-LT', options);

            if (currentWeekDay === weekDay && day < daysInMonth) {
                tdDOM.id = id;
                tdDOM.textContent = ++day;

                tdDOM.classList.add('day');
            } else if (day >= daysInMonth) {
                tdDOM.textContent = ++day - daysInMonth;
            } else {
                const prewMonth = new Date(year, month, 0);
                prewMonth.setDate(prewMonth.getDate() + weekDay - currentWeekDay + 1);

                tdDOM.textContent = prewMonth.getDate();
            }

            trDOM.appendChild(tdDOM);

            if (weekDay === 6) {
                const newTrDOM = document.createElement('tr');
                newTrDOM.innerHTML = trDOM.innerHTML;

                tbodyDOM.appendChild(document.adoptNode(newTrDOM));
            }
        }

        trDOM.innerHTML = null;
    }

    renderList();

    // const _month = currentMonth.toLocaleString('lt-LT', { month: "numeric" });
    // renderBubbles(_month % 12);


    renderBubbles(year, month);
}

export default renderCalendar;