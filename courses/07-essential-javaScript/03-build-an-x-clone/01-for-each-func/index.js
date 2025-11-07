const characters = [
    {
        title: 'Ninja',
        emoji: '🥷',
        powers: ['agility', 'stealth', 'aggression'],
    },
    {
        title: 'Sorcerer',
        emoji: '🧙',
        powers: ['magic', 'invisibility', 'necromancy'],
    },
    { 
        title: 'Ogre',
        emoji: '👹',
        powers: ['power', 'stamina', 'shapeshifting'],
    },  
    { 
        title: 'Unicorn',
        emoji: '🦄',
        powers: [ 'flight', 'power', 'purity'],
    }
]

// For of loop version
// for (let character of characters){
//     console.log(character)
// }

// forEach version
// We use the index parameter to get the index number of each character this helps when we need to know the position of the item in the array
characters.forEach(function(character, index){
    console.log(index, character.title)
})


characters.forEach(function(character){
    character.powers.forEach(function(power){
        console.log(power)
    })
/*
Challenge:
1. Nest a forEach to log out each individual
   power in each characters powers array.
*/
})

