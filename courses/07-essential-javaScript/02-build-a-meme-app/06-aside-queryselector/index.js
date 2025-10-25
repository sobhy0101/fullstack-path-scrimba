// We can much more easily target pseudo elements like :checked
const submitBtn = document.getElementById('submit-btn')

submitBtn.addEventListener('click', function(){
    const checkedRadio = document.querySelector('input[type="radio"]:checked') // selects the checked radio input
    console.log(checkedRadio.value) // logs the value of the checked radio input
})