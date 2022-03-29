const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEL = document.getElementById('date-picker')

const countdownEL = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

let countdownTitle = ' '
let countdownDate = ' '
let countdownValue = Date
let countdownActive
let savedCountdown

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24 

const completeEl = document.getElementById('complete')
const completeElInfo = document.getElementById('complete-info')
const completeBtn = document.getElementById('complete-button')

// set date min with todays date
const today = new Date().toISOString().split('T')[0]
dateEL.setAttribute('min', today)

// Ppopulate countdown / complete ui
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = (countdownValue - now)
        // console.log('distance', distance)

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour) / minute)
        const seconds = Math.floor((distance % minute) / second)
        // console.log(days, hours, minutes, seconds)

        // hide input container
        inputContainer.hidden = true

        // if countdown ended show complete
        if (distance < 0) {
            countdownEL.hidden = true
            clearInterval(countdownActive)
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false
        } else {
            // show the countdown in progress & populate countdown
            countdownElTitle.textContent = `${countdownTitle}`
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`
            completeEl.hidden = true
            countdownEL.hidden = false
        }
    }, second)
}

// take values from Form input
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    console.log(savedCountDown)
    localStorage.setItem('countdown', JSON.stringify(savedCountDown))

    // console.log(countdownTitle, countdownDate)
    // check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.')
    } else {
        // get number version for current date
        countdownValue = new Date(countdownDate).getTime()
        // console.log('countdown value:', countdownValue)
        updateDOM() 
    }
}

// reset all values
function reset() {
    // hide countdowns, show input
    countdownEL.hidden = true
    completeEl.hidden = true
    inputContainer.hidden = false 
    // stop countdown
    clearInterval(countdownActive)
    // reset values
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown')
}

function restorePrevCountdown() {
    // get countdown from local storage if available
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// event listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)
completeBtn.addEventListener('click', reset)

// on load
restorePrevCountdown()