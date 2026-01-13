# Resolved promises quiz

1. What is a promise (in your own words)?

    - JS Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to write asynchronous code in a more manageable way by providing a way to handle success and failure cases.

2. Which part of the code we have so far is a promise?

    - The fetch function returns a promise. In the code, the line `fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")` is where the promise is created. This promise will resolve when the data is successfully fetched from the API or reject if there is an error during the fetch operation.

3. What are the three states a promise can be in?

    - Pending: The initial state of a promise, where the operation is still ongoing and has not yet completed.
    - Fulfilled (or Resolved): The state when the operation has completed successfully, and the promise has a resulting value.
    - Rejected: The state when the operation has failed, and the promise has a reason for the failure (usually an error).

4. What does it mean when a promise is "resolved" (or fulfilled)?

    - When a promise is "resolved" (or fulfilled), it means that the asynchronous operation has completed successfully, and the promise now has a resulting value that can be used in subsequent code. This allows you to handle the successful outcome of the operation, such as processing the fetched data.

5. How do we tell the code to do something only AFTER a
   promise is resolved?
    - We can use the `.then()` method to specify a callback function that will be executed only after the promise is resolved. The `.then()` method takes two arguments: a callback function for the fulfilled case and an optional callback function for the rejected case. The code inside the first callback function will run only after the promise has been successfully resolved.
