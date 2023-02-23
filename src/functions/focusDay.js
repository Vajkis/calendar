function focusDay(date) {
    const lastDate = localStorage.getItem('lastDate');

    if (lastDate) {
        const lastDateDOM = document.getElementById(lastDate);
        lastDateDOM?.classList.remove('focus');
    }

    const currentDayDOM = document.getElementById(date);
    currentDayDOM?.classList.add('focus');

    localStorage.setItem('lastDate', date);
}

export default focusDay;