import renderTitle from "./renderTitle.js";

function renderHeader() {
    let data = JSON.parse(localStorage.getItem('lists')) || [];

    if (!data.length) {
        data = ['Main'];
        const dataJSON = JSON.stringify(data);
        localStorage.setItem('lists', dataJSON);
    }

    const headerDOM = document.querySelector('#header');
    headerDOM.innerHTML = null;

    const currentList = localStorage.getItem('currentList');

    // select
    const containerDOM = document.createElement('div');
    containerDOM.classList.add('container')

    const selectDOM = document.createElement('select');
    selectDOM.addEventListener('change', handleChange);

    data.forEach(list => {
        const optionDOM = document.createElement('option');
        optionDOM.value = list;
        optionDOM.innerText = list;

        selectDOM.appendChild(optionDOM);
    });

    selectDOM.value = currentList;
    containerDOM.appendChild(selectDOM);

    // remove current list if not Main
    if (currentList !== 'Main') {

        const btnDeleteDOM = document.createElement('button');
        btnDeleteDOM.addEventListener('click', handleDelete)
        btnDeleteDOM.textContent = '-';

        containerDOM.appendChild(btnDeleteDOM);
    }
    headerDOM.appendChild(containerDOM);

    // add list
    const formDOM = document.createElement('form');
    formDOM.addEventListener('submit', handleSubmit);

    const inputDOM = document.createElement('input');
    formDOM.appendChild(inputDOM);

    const btnAddDOM = document.createElement('button');
    btnAddDOM.textContent = '+';
    formDOM.appendChild(btnAddDOM);

    headerDOM.appendChild(formDOM);

    function handleChange(e) {
        const value = e.target.value;

        localStorage.setItem('currentList', value);

        renderHeader();
        renderTitle();
    }

    function handleDelete() {
        data = data.filter(list => list !== currentList);

        const dataJSON = JSON.stringify(data);
        localStorage.setItem('lists', dataJSON);

        localStorage.removeItem(currentList + '-list');
        localStorage.setItem('currentList', 'Main');

        renderHeader();
        renderTitle();
    }

    function handleSubmit(e) {
        e.preventDefault();

        const value = inputDOM.value.trim();

        if (!data.some(d => d === value) && value) {

            data = [...data, value];

            const dataJSON = JSON.stringify(data);
            localStorage.setItem('lists', dataJSON);

            localStorage.setItem('currentList', value);

            renderHeader();
            renderTitle();
        }
    }
}


export default renderHeader;