const game = () => {
    let currentScore = 0;
    let currentSprite = 0;
    let lettersFound = 0;

    // Populate parent div with buttons for each letter in the alphabet
    const alphabetDisplay = (word) => {
        const parent = document.querySelector(".letters");
        for (let i = 0; i < 26; i++) {
            let letter = document.createElement("button");
            letter.innerHTML = String.fromCharCode(i + 65); // ASCII code for capital letters

            // Listen for one click on each letter and check if the guess is correct
            letter.addEventListener("click", () => {
                let guess = letter.innerHTML.toLowerCase();
                letter.style.backgroundColor = checkGuess(word, guess) ? "lawngreen" : "indianred";
                checkGameOver(word);
            }, { once: true });

            letter.classList.add("letter");
            parent.appendChild(letter);
        }
    };
    
    // Populate parent div with dashes for each letter in the word
    const dashesDisplay = (word) => {
        const parent = document.querySelector(".dashes");
        for (let i = 0, length = word.length; i < length; i++) {
            let dash = document.createElement("h1");
            dash.innerText = "_";
            dash.classList.add("dash");
            parent.appendChild(dash);
        }
    };
    
    const checkGameOver = (word) => {
        if (currentSprite == 6) { // Player ran out of guesses
            console.log("Você perdeu");
        } else if (lettersFound == word.length) { // Player guessed the entire word
            console.log("Você ganhou!");
        }
    };

    const playMatch = () => {
        const dictionary = ["banana", "cenoura", "batata", "hamburguer"];
        
        // Choose word from the dictionary at random
        let word = dictionary[Math.floor(Math.random() * dictionary.length)];
        
        dashesDisplay(word);
        alphabetDisplay(word);
    };

    const scoreUpdate = () => {
        const score = document.querySelector(".score p");
        score.textContent = currentScore;
    };

    // Replace all occurrences of guessed letter and return number of occurrences
    const dashesUpdate = (word, letter) => {
        const dashes = document.querySelectorAll(".dash");
        let count = 0;
        let i = -1;
        while ((i = word.indexOf(letter, i+1)) != -1) {
            dashes[i].innerText = letter;
            count++;
        }
        return count;
    };

    // Updates game status with sprites numbered from 0 to 6
    const hangmanChangeSprite = (sprite) => {
        const hangman = document.querySelector(".hangman");
        if (sprite >= 0 && sprite <= 6) {
            hangman.src = `./assets/${sprite}.png`
        }
    };

    const checkGuess = (word, letter) => {
        if (word.includes(letter)) {
            for (let i = 0, times = dashesUpdate(word, letter); i < times; i++) {
                lettersFound++;
                currentScore += 10;
            }
            scoreUpdate();
            return true;
        } else {
            hangmanChangeSprite(++currentSprite);
            currentScore -= 5;
            scoreUpdate();
            return false;
        }
    };

    playMatch();
};

game();