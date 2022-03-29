const inputContainer = document.getElementById('input-container')
const countdownFOrm = document.getElementById('countdownForm')
const dateEL = document.getElementById('date-picker')

// set date min with todays date
const today = new Date().toISOString().split('T')[0]
console.log(today)