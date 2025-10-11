**Question 2: What does this line do, and how is it used in the game?**

**"""** let sumEl = document.getElementById("sum-el") """



Since I already established that I know variables and their Camel naming, I will proceed to the value:



document.getElementById("sum-el"):



'document' references the HTML, CSS, etc. documents, which is shortened by DOC manipulation or management. We use 'document' to modify, add, or delete elements or their attributes.



'getElementByID' searches for the ID name and selects it.



("sum-el") is the ID of an HTML element that displays the sum that the game player has reached so far. If it is less than 21, it means he still doesn't have blackjack, and can draw more cards. In that case, the isAlive should be valued as true.



How did I do? 🥺



---



**Question 3: What is the purpose of this line, and where in the game flow does it play a role?**

"""cards = \[firstCard, secondCard]"""



'cards' is a variable that is being reassigned with an array.

The square brackets indicates that this data type is an array. In simple terms, An array is list of multiple items that we use instead of declaring multiple variables.

'firstCard' is a variable which retrieve the value of the first card the player got.
'secondCard' is a variable which retrieve the value of the second card card the player got.



The comma ',' between the two variables is key to JavaScript between items in the array but not the last item.

---



**Question 4: What does this line do, and how might it help the player during the game?**

"""playerEl.textContent = player.name + ": $" + player.chips"""



'playerEl' is a variable.

'textContent' is a DOM manipulation that changes the text of an HTML element to the declared value.

'player.name' is another variable.
'+' is an operator which concatenate the values.

": $" the double quotes indicate that this is a string. Strings are another data type that store text values. Other data types include and not limited to: numbers, objects, arrays, Boolean, etc.

'player.chips' is another variable that retrieves the amount of chips the player still has. If he will have enough chips, he can continue playing, otherwise, we can't.

The likely output of line:
Mike: $100



---



**Question 5: What does this block accomplish inside the game, and why is it important?**

"""for (let i = 0; i < cards.length; i++) {

    cardsEl.textContent += cards\[i] + " "

}

"""



This block is called For Loops. For Loops can declare values and expressions. We use it to avoid repeating multiple variables and values for a simple count. What this block do:

1. Declare a variable named 'i' and initiate its value to '0'.
2. Checks using the '<' operator if the variable 'cards' length is less than 'i' count variable.

3\. If the comparison is true, it incriminate '1' to the variable 'i' using the 'i++'.

4\. Concatenate the results to the 'cards' using the array square brackets for the '\[i]'.

5\. The empty string with a space at the end is to put a space between the values of firstCard and secondCard.

