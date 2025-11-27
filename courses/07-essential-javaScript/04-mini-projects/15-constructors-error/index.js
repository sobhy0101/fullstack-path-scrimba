function checkUsername(userName) {
    if (userName) {
        console.log(userName)
    } else {
        console.log('I execute')
        // This line will not execute because the error is thrown above
        // The throw statement creates a new Error object and stops the function execution
        throw new Error('No username provided')
        console.log('I do not execute')
    }
}

checkUsername('admin')