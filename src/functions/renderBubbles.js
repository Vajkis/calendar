function renderBubbles(year, month) {

    const currentList = localStorage.getItem('currentList');
    const data = JSON.parse(localStorage.getItem(currentList + '-list')) || [];

    month = (++month).toString().padStart(2, '0');

    const newData = data.filter(d => d.date.includes(`${year}-${month}`));

    newData.forEach(item => {
        const dayDOM = document.getElementById(item.date);

        const bubbleDOM = document.createElement('div');
        bubbleDOM.classList.add('bubble');

        dayDOM.appendChild(bubbleDOM);
    });
}

export default renderBubbles;