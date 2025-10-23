// Previously we used for loops to iterate over arrays, which can get a bit verbose and hard to read.
// The for...of loop is a newer syntax that is more concise and easier to understand.

// Here is an example of a for...of loop iterating over an array of characters:

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

for (let character of characters){
    console.log(character.powers)
/*
Challenge:
1. Nest a for of inside this for of to iterate over 
   the powers array for each character. Log out each 
   power.
*/
    for (let power of character.powers){
        console.log(power)
    }
}


