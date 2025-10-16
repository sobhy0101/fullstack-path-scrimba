// 1. Read bill amount from `#bill` and tip % from the selected radio input.
// 2. Compute tip amount and total; render into `#tip-amount` and `#total`.
// 3. Disable the **Calculate** button unless the bill is a positive number.
// 4. When input changes, clear previous results.
// 5. Add a keyboard shortcut: Enter triggers calculate.

let billInput = document.querySelector('#bill');
let tipInputs = document.querySelectorAll('input[name="tip"]');

let tipAmountSpan = document.querySelector('#tip-amount');
let totalSpan = document.querySelector('#total');

function calculate() {
    console.log('calculate clicked'); 
}

function onBillInput() {
    let billValue = parseFloat(billInput.value);
    if (billValue > 0) {
        document.querySelector('#calc').disabled = false;
    } else {
        document.querySelector('#calc').disabled = true;
    }
    document.getElementById('tip-amount').textContent = '—';
    document.getElementById('total').textContent = '—';
}