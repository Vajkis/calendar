import handleFocus from "./functions/handleFocus.js";
import renderHeader from "./functions/renderHeader.js";
import renderTitle from "./functions/renderTitle.js";

const tbodyDOM = document.querySelector('#tbody');
tbodyDOM.addEventListener('click', handleFocus);

localStorage.removeItem('lastDate');
localStorage.removeItem('currentDate');
localStorage.setItem('currentList', 'Main');

renderHeader();
renderTitle();
