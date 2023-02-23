import renderList from "./renderList.js";

function handleFocus(e) {
    const date = e.target.id;

    localStorage.setItem('currentDate', date);

    renderList();
}

export default handleFocus;