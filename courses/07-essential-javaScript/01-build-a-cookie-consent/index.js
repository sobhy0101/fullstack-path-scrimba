console.log('What is the capital of Peru?')

// setTimeout(function(){}, delay) // <- syntax for setTimeout
setTimeout(function(){ // An empty funcation like this is called anonymous function
    console.log('Lima')
}, 3000) // JS uses milliseconds for time, so 3000ms = 3s

setTimeout(function(){
    console.log('Ready for next question?')
}, 4000)

