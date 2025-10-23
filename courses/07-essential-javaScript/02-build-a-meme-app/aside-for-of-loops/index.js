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

// To get all the powers of an array of characters using for...of loops nested inside each other:
for (let character of characters){ // Loop through each character in the characters array
    for (let power of character.powers){ // Loop through each power in the current character's powers array
        console.log(power)
    }
}

// To get strings from the titles and emojis since they are not arrays use for...of loops only once:
for (let char of characters){ // Loop through each string character in the characters array to get titles
        console.log(char.title) // Access the title property of the current character by using .title
    }

for (let symbol of characters){ // Loop through each string character in the characters array to get emojis
        console.log(symbol.emoji) // Access the emoji property of the current character by using .emoji
    }
