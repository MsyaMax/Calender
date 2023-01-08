document.addEventListener('DOMContentLoaded', () => {


    const monthDisplay = document.querySelector('.month');
    const yearDisplay = document.querySelector('.year');
    const daysDisplay = document.querySelector('.days');
    const monthLists = document.querySelector('.months-list');
    const yearInputBox = document.querySelector('.year-input-box');
    const yearInput = document.querySelector('.year-input');
    let monthNumber;
    getDate()


    //change month to its number
    function monthToNumber(e) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        for (let month of months) {
            if (month == e) {
                monthNumber = months.indexOf(month);
                break;
            }
        }
        return monthNumber;
    }

    //make a month of a year and show on screen
    function getDate(month, year) {
        let date = new Date();
        daysDisplay.innerHTML = '';

        //set month
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        (month == undefined) ? month = date.getMonth(): month;
        monthDisplay.innerHTML = months[month];


        //set year 
        (year == undefined) ? year = date.getFullYear(): year;
        yearDisplay.innerHTML = year;

        //set days number
        let daysNumber;
        let checkLoopYears;
        (year == undefined) ? checkLoopYears = date.getFullYear(): checkLoopYears = year;

        switch (month) {
            case 0:
                daysNumber = 31;
                break;
            case 1:
                (checkLoopYears % 4 == 0) ? daysNumber = 29: daysNumber = 28;
                break;
            case 2:
                daysNumber = 31;
                break;
            case 3:
                daysNumber = 30;
                break;
            case 4:
                daysNumber = 31;
                break;
            case 5:
                daysNumber = 30;
                break;
            case 6:
                daysNumber = 31;
                break;
            case 7:
                daysNumber = 31;
                break;
            case 8:
                daysNumber = 30;
                break;
            case 9:
                daysNumber = 31;
                break;
            case 10:
                daysNumber = 30;
                break;
            case 11:
                daysNumber = 31;
        }
        //set weekdays with days 
        let costumDate = new Date(year, month, 1)
        let weekDay = costumDate.getDay()

        switch (weekDay) {
            case 0:
                dayMaker()
                break;
            case 1:
                dayMaker(1)
                break;
            case 2:
                dayMaker(2)
                break;
            case 3:
                dayMaker(3)
                break;
            case 4:
                dayMaker(4)
                break;
            case 5:
                dayMaker(5)
                break;
            case 6:
                dayMaker(6)
        }
        // make spans that have days of a month and show them on screen

        function dayMaker(n = 0) {
            //add empty spans 
            let emptySpans = 0;
            while (emptySpans < n) {
                let day = document.createElement('span');
                day.classList.add('day');
                day.innerHTML = '';
                day.style.cursor = 'inherit';
                daysDisplay.appendChild(day)

                emptySpans++
            }
            // add days 
            for (let i = 1; i <= daysNumber; i++) {

                let day = document.createElement('span');
                day.classList.add('day');
                day.classList.add('full-day');
                day.innerHTML = i;
                daysDisplay.appendChild(day)
            }
            // put up days that are in sixth row
            let days = document.querySelectorAll('.day');
            let missing = days.length - 35;
            if (missing > 0) {
                let missingArray = [];
                for (let i = 0; i < missing; i++) {
                    daysDisplay.insertBefore(days[days.length - i - 1], days[missing - i - 1])
                    daysDisplay.removeChild(days[missing - i - 1])
                    missingArray[i] = days[days.length - i - 1]
                }
            }
            // set today 
            if (date.getFullYear() == year) {
                if (date.getMonth() == month) {
                    for (let day of days) {
                        if (day.innerHTML == date.getDate()) {
                            day.classList.add('active')
                            day.classList.remove('full-day')
                            break;
                        }
                    }

                }
            }

        }
    }


    //change months on screen
    monthDisplay.addEventListener('click', openMonthsLists);

    function openMonthsLists() {
        monthLists.classList.add('months-list-show')
        for (let month of monthLists.children) {
            month.addEventListener('click', goToMonth);

        }
    }

    function goToMonth() {
        for (let month of monthLists.children) {
            month.removeEventListener('click', goToMonth);
        }
        monthLists.classList.remove('months-list-show')
        getDate(monthToNumber(this.innerHTML), yearDisplay.innerHTML)
    }


    //change years on screen
    yearDisplay.addEventListener('click', changeYear);

    function changeYear() {
        yearInput.value = ''
        yearInputBox.style.right = '-100px';
        yearDisplay.style.display = '0'
        document.addEventListener('keyup', (event) => {
            if (event.keyCode == 13) {
                if ((yearInput.value > 1000) && (yearInput.value < 3000)) {
                    yearInputBox.style.right = '-300px';
                    yearDisplay.style.opacity = '1';
                    getDate(monthToNumber(monthDisplay.innerHTML), yearInput.value)

                }

            }

        })
    }





})