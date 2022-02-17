const game = () => {
    let score = 0;

    const playMatch = () => {
        const hangman = document.querySelector(".hangman");
        const dashes = document.querySelector(".dashes");
        const letters = document.querySelector(".letters");

        const dictionary = ["banana", "cenoura", "batata", "hamburguer"];

        // Populate parent div with buttons for each letter in the alphabet
        const alphabetDisplay = () => {
            for (let i = 0; i < 26; i++) {
                let letter = document.createElement("button");
                letter.innerHTML = String.fromCharCode(i + 65); // ASCII code for capital letters
                letter.classList.add("letter");
                letters.appendChild(letter);
            }
        };
        
        // Given a word, populate parent div with the right number of dashes
        const dashesDisplay = (word) => {
            for (let i = 0, length = word.length; i < length; i++) {
                let dash = document.createElement("h1");
                dash.innerText = "_";
                dash.classList.add("dash");
                dashes.appendChild(dash);
            }
        };
        
        // Choose word from the dictionary at random and display dashes
        let word = dictionary[Math.floor(Math.random() * dictionary.length)];
        dashesDisplay(word);
        const childDashes = dashes.childNodes;
        
        // Display buttons for each letter in the alphabet
        alphabetDisplay();
        const childLetters = letters.childNodes;
        
        // Searches word for all occurrences of a letter and replaces dashes with it
        const dashesReplace = (letter) => {
            let i = -1;
            while ((i = word.indexOf(letter, i+1)) != -1) {
                childDashes[i].innerText = letter;
            }
        };

        // Returns the number of letters yet to be found. If zero, the player wins
        const dashesCount = () => {
            let dashesNumber = 0;
            childDashes.forEach(dash => {
                if (dash.innerText === "_") {
                    dashesNumber++;
                }
            });
            return dashesNumber;
        };

        // Keeps track of which hangman sprite is being displayed. If the counter reaches 6, the game is over
        let spriteCounter = 0;

        // Updates game status with sprites numbered from 0 to 6
        const hangmanChangeSprite = (spriteNumber) => {
            if (spriteNumber >= 0 && spriteNumber <= 6) {
                hangman.src = "./assets/" + spriteNumber + ".png";
            }
        };

        // Checks if the game is over after every guess
        const checkGameOver = () => {
            if (spriteCounter == 6) { // Player ran out of guesses
                console.log("Você perdeu");
            } else if (dashesCount() == 0) { // Player guessed the entire word
                console.log("Você ganhou!");
            }
        };
        
        // Listen for a one-time click on each letter and update game status accordingly
        childLetters.forEach(letter => {
            letter.addEventListener("click", () => {
                let lowerCaseLetter = letter.innerHTML.toLowerCase();
                if (word.includes(lowerCaseLetter)) { // Correct guess
                    letter.style.backgroundColor = "lawngreen";
                    dashesReplace(lowerCaseLetter);
                } else { // Incorrect guess
                    letter.style.backgroundColor = "indianred";
                    hangmanChangeSprite(++spriteCounter);
                }
                checkGameOver();
            }, { once: true });
        });
    };

    playMatch();
};

game();