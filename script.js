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

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24 

// set date min with todays date
const today = new Date().toISOString().split('T')[0]
dateEL.setAttribute('min', today)

// Ppopulate countdown / complete ui
function updateDOM() {
    const now = new Date().getTime()
    const distance = (countdownValue - now)
    console.log('distance', distance)

    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)
    console.log(days, hours, minutes, seconds)

    // populate countdown
    countdownElTitle.textContent = `${countdownTitle}`
    timeElements[0].textContent = `${days}`
    timeElements[1].textContent = `${hours}`
    timeElements[2].textContent = `${minutes}`
    timeElements[3].textContent = `${seconds}`

    // hide input container
    inputContainer.hidden = true
    // show countdown container
    countdownEL.hidden = false
}

// take values from Form input
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    console.log(countdownTitle, countdownDate)

    // get number version fo current date
    countdownValue = new Date(countdownDate).getTime()
    console.log('countdown value:', countdownValue)
    updateDOM()
}

// event listeners
countdownForm.addEventListener('submit', updateCountdown)