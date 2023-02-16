
const input = require('sync-input')

const words = ["python", "java", "swift", "javascript"];
function getRandomElement(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}
function errorInput(letter, inputLetter) {
    if (letter.length != 1) {
        console.log("Please, input a single letter");
        return false;
    }
    else if (!/[qwertyuiopasdfghjklzxcvbnm]/.test(letter)) {
        console.log("Please, enter a lowercase letter from the English alphabet.");
        return false;
    }
    else if (inputLetter.includes(letter)) {
        console.log("You've already guessed this letter.");
        return false;
    }
    else inputLetter.push(letter);
    return true;
}
function play() {
    let wordArr = getRandomElement(words).split('');
    let hintWordArr = Array(wordArr.length).fill('-');
    let i = 0;
    let inputLetter = new Array();
    while (i < 8) {
        console.log(`\n` + hintWordArr.join(''));
        let letter = input("Input a letter: ");
        if (errorInput(letter, inputLetter)) {
            if (wordArr.includes(letter) && hintWordArr.includes(letter)) {
                i++;
                console.log("No improvements.");
            }
            else if (wordArr.includes(letter)) {
                for (let i = 0; i < wordArr.length; i++) {
                    if (wordArr[i] == letter) {
                        hintWordArr[i] = letter;
                    }
                }
            } else {
                i++;
                console.log("That letter doesn't appear in the word.");
            }
            if (i == 8) {
                console.log("\nYou lost!");
                return false;
            }
            else if (!hintWordArr.includes('-')) {
                //i = 8;
                console.log(`\nYou guessed the word ${hintWordArr.join('')}!\nYou survived!`);
                return true;
            }
        }
    }
}
function mainMenu() {
    let flag = true;
    let won = 0;
    let lost = 0;
    while (flag) {
        let inp = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");
        switch (inp) {
            case "play":
                if(play()) won++;
                else lost++;
                break;
            case "results":
                console.log(`You won: ${won} times.\nYou lost: ${lost} times.`)
                break;
            case "exit":
                flag = false;
                break;
        }
    }

}
function allFunction() {
    console.log(`H A N G M A N`);
    mainMenu();
    console.log(`\nThanks for playing!`);
}

allFunction();