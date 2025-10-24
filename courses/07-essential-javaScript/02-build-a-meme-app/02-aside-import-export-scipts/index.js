import { dinnerPartyGuests } from './data.js'

const guestList = document.getElementById('guest-list')

dinnerPartyGuests.forEach(guest => {
	const label = document.createElement('label')
	const checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.ariaLabel = `checkbox for ${guest}`
	const span = document.createElement('span')
	span.textContent = guest
	label.appendChild(checkbox)
	label.appendChild(span)
	guestList.appendChild(label)
})

console.log(dinnerPartyGuests)