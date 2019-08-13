var Word = require("./Word");
var inquirer = require("inquirer");




var letterArray = "abcdefghijklmnopqrstuvwxyz";

var unitedStates = [

    "alaska",
    "alabama",
    "arkansas",
    "arizona",
    "california",
    "colorado",
    "connecticut",
    "district of columbia",
    "delaware",
    "florida",
    "georgia",
    "guam",
    "hawaii",
    "iowa",
    "idaho",
    "illinois",
    "indiana",
    "kansas",
    "kentucky",
    "louisiana",
    "massachusetts",
    "maryland",
    "maine",
    "michigan",
    "minnesota",
    "missouri",
    "mississippi",
    "montana",
    "north carolina",
    "north dakota",
    "nebraska",
    "new hampshire",
    "new jersey",
    "new mexico",
    "nevada",
    "new york",
    "ohio",
    "oklahoma",
    "oregon",
    "pennsylvania",
    "puerto rico",
    "rhode island",
    "south carolina",
    "south dakota",
    "tennessee",
    "texas",
    "utah",
    "virginia",
    "virgin islands",
    "vermont",
    "washington",
    "wisconsin",
    "west virginia",
    "wyoming"

];
//Pick Random index from UnitedStates array
var randomIndex = Math.floor(Math.random() * unitedStates.length);

var randomWord = unitedStates[randomIndex];

//Pass Random Word through Word Constructor
var computerWord = new Word(randomWord);

var requireNewWord = false;

var incorrectLetters = [];

var correctLetters = [];

var guessesLeft = 10

function gameLogic() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * unitedStates.length);

        var randomWord = unitedStates[randomIndex];

        computerWord = new Word(randomWord);

        requireNewWord = false;

    }

    var wordComplete = [];
    computerWord.objectArray.forEach(completeCheck);


    if (wordComplete.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Select letter from a to z",
                name: "userinput"
            }
        ]).then(function (input) {
            if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                console.log("\nPlease try again!\n");
                gameLogic();
            } else {
                if (
                    incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === ""
                ) {
                    console.log("\nAlready Guessed or Nothing was Entered\n");
                    gameLogic();
                } else {

                    var wordCheckArray = [];

                    computerWord.userGuess(input.userinput);

                    computerWord.objectArray.forEach(wordCheck);
                    if (wordCheckArray.join("") === wordComplete.join("")) {
                        console.log("\nIncorrect\n");

                        incorrectLetters.push(input.userinput);
                        guessesLeft--;

                    } else {
                        console.log("\nCorrect\n");

                        correctLetters.push(input.userinput);
                    }

                    computerWord.log();

                    //Print Guesses Left 

                    console.log("Guesses Left: " + guessesLeft + "\n");

                    //Print letters user alread guessed
                    console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                    // Guesses Left
                    if (guessesLeft > 0) {
                        gameLogic();
                    } else {
                        console.log("Sorry you lose\n");
                    }
                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }

                }

            }


        });
    } else {
        console.log("You WIN!\n");

        restartGame();
    }
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }


}

function restartGame() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to",
            choices: ["Play Again", "Exit"],
            name: "restart"
        }
    ]).then(function (input) {
        if (input.restart === "Play Again") {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            gameLogic();
        } else {
            return;
        }
    });
}
gameLogic();

