// The Rest Parameter syntax allows a function to accept an indefinite number of arguments as an array.
// It is represented by three dots (...) followed by the name of the array that will hold the arguments.

function setPermissionLevel(permissionLevel, ...names) {
    // Since the rest parameter output is an array, we can use array methods (like forEach) to iterate over the names.
    names.forEach((name)=> console.log(`${name} now has ${permissionLevel} level access.`))
    
}

// The first argument is assigned to permissionLevel, and the rest are collected into the names array.
// We can call the function with any number of name arguments.
// Here are some example calls to the function:
setPermissionLevel('editor', 'Dave', 'Sally', 'Mike')
setPermissionLevel('admin', 'Jen', 'Tom')