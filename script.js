const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEL = document.getElementById('date-picker')

let countdownTitle = ' '
let coutndownDate = ' '

// set date min with todays date
const today = new Date().toISOString().split('T')[0]
dateEL.setAttribute('min', today)

// take values from Form input
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    coutndownDate = e.srcElement[1].value

    console.log(countdownTitle, coutndownDate)
}

// event listeners
countdownForm.addEventListener('submit', updateCountdown)