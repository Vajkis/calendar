import focusDay from "./focusDay.js";
import getId from "./getId.js";
import renderCalendar from "./renderCalendar.js";

function renderList() {

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    };

    const date = localStorage.getItem('currentDate') || new Date().toLocaleString('lt-LT', options);

    if (date) {
        const listDOM = document.querySelector('#list');
        listDOM.innerHTML = null;

        const currentList = localStorage.getItem('currentList');
        let data = JSON.parse(localStorage.getItem(currentList + '-list')) || [];

        // title
        const titleDOM = document.createElement('h2');
        titleDOM.textContent = `${date} ${currentList}:`;

        listDOM.appendChild(titleDOM);

        // input
        const formDOM = document.createElement('form');
        formDOM.addEventListener('submit', handleSubmit);

        const inputDOM = document.createElement('input');
        formDOM.appendChild(inputDOM);

        const buttonDOM = document.createElement('button');
        buttonDOM.textContent = '+';
        formDOM.appendChild(buttonDOM);

        listDOM.appendChild(formDOM);

        // list
        const olDOM = document.createElement('ol');
        listDOM.appendChild(olDOM);

        updateList();

        function handleSubmit(e) {
            e.preventDefault();

            const value = inputDOM.value.trim();
            if (value) {
                const item = {
                    id: getId(),
                    date,
                    value
                };
                data = [...data, item];

                const dataJSON = JSON.stringify(data);
                localStorage.setItem(currentList + '-list', dataJSON);

                updateList();
                updateCalendar();
            }
        }

        function updateList() {
            olDOM.innerHTML = null;

            data.filter(d => d.date === date).forEach(item => {

                const itemDOM = document.createElement('li');
                itemDOM.textContent = item.value;

                const buttonDOM = document.createElement('button');
                buttonDOM.addEventListener('click', () => handleClick(item.id));
                buttonDOM.textContent = '-';

                itemDOM.appendChild(buttonDOM);
                olDOM.appendChild(itemDOM);
            });

            focusDay(date);
        }

        function handleClick(id) {
            data = data.filter(d => d.id !== id);

            const dataJSON = JSON.stringify(data);
            localStorage.setItem(currentList + '-list', dataJSON);

            updateList();
            updateCalendar();
        }

        function updateCalendar() {
            const [year, month] = date.split('-');
            renderCalendar(year, month - 1);

        }
    }
}

export default renderList;