
const prompt = require("prompt-sync")();
const targetNumber = Math.floor(Math.random() * 1000001);
const maxAttempts = 20;
let attempts = 0;
let guessed = false;

while (attempts < maxAttempts && !guessed) {
    let userInput = prompt('Kérem, adjon meg egy számot (0 - 1 000 000):');
    let guess = parseInt(userInput);
    
   
    if (isNaN(guess)) {
        console.log("Érvénytelen bemenet! Kérem, számot adjon meg.");
        continue;
    }
    
    attempts++;
    
    if (guess === targetNumber) {
        console.log(`Gratulálok, ${attempts} lépésből eltaláltad!`);
        guessed = true;
    } else if (guess > targetNumber) {
        console.log(`${attempts}. tipp nem talált: A megoldás kisebb.`);
    } else {
        console.log(`${attempts}. tipp nem talált: A megoldás nagyobb.`);
    }
}

if (!guessed) {
    console.log("Sajnos ez most nem sikerült!");
}
