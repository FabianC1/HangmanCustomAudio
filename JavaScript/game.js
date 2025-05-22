//Initial References
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");
const gameOver = document.getElementById("game-over");
const timeRunOut = document.getElementById("timeRunOut");
const gameWin = document.getElementById("game-win");
const loggedInUsername = sessionStorage.getItem("loggedInUsername");




let isNewGamePopupVisible = false;
let isGameFinished = true;
let timeLimit = 60;
let score = 0;
let isOptionSelected = false;
let isTimerRunning = false;
let timerInterval;
let timer = 60;
let selectedCategory = null;
let selectedDifficulty = null;





//Options values for buttons
let options = {
    fruits: [
        "Plum",
        "Fig",
        "Guava",
        "Lime",
        "Apple",
        "Blueberry",
        "Mandarin",
        "Pineapple",
        "Pomegranate",
        "Watermelon",
        "Banana",
        "Cherry",
        "Strawberry",
        "Mango",
        "Grapefruit",
        "Kiwi",
        "Grapes",
        "Peach",
        "Lemon",
        "Coconut",
        "Starfruit",
        "Cranberry",
        "Dragonfruit",
        "Nectarine",
        "Passionfruit",
        "Cantaloupe",
    ],

    animals: [
        "Fox",
        "Rat",
        "Bat",
        "Cat",
        "Dog",
        "Rat",
        "Pig",
        "Cow",
        "Ant",
        "Bee",
        "Hedgehog",
        "Rhinoceros",
        "Squirrel",
        "Panther",
        "Walrus",
        "Zebra",
        "Elephant",
        "Giraffe",
        "Kangaroo",
        "Penguin",
        "Tiger",
        "Lion",
        "Koala",
        "Hippopotamus",
        "Gorilla",
        "Koala",
        "Chimpanzee",
        "Porcupine",
        "Armadillo",
        "Kangaroo",
        "Hippopotamus",
        "Alligator",
        "Cheetah",
        "Chameleon",
        "Flamingo",
        "Albatross",
        "Hummingbird",
        "Platypus",
        "Caterpillar",
        "Dragonfly",
        "Butterfly",
        "Ostrich",
        "Pelican",
        "Salamander",
        "Scorpion",
        "Toucan",
        "Woodpecker",
    ],

    countries: [
        "Peru",
        "Cuba",
        "Fiji",
        "Iran",
        "Iraq",
        "Peru",
        "India",
        "Hungary",
        "Argentina",
        "Australia",
        "Bangladesh",
        "Cameroon",
        "Colombia",
        "Ecuador",
        "Guatemala",
        "Indonesia",
        "Mozambique",
        "Netherlands",
        "Philippines",
        "Singapore",
        "Switzerland",,
        "Venezuela",
        "Afghanistan",
        "Bangladesh",
        "Netherlands",
        "Philippines",
        "Seychelles",
        "Slovenia",
        "Turkmenistan",
        "Uzbekistan",
        "Switzerland",
        "Zimbabwe",
        "Dominica",
        "Canada",
        "Brazil",
        "Thailand",
        "Spain",
        "Australia",
        "Portugal",
        "Mexico",
        "Greece",
        "Egypt",
        "Russia",
        "Estonia",
        "Libia",
        "Morocco",
        "Pakistan",
        "Egypt",
        "Romania",
        "Russia",
        "Japan",
        "Indonesia",
        "Vietnam",
    ],
};




// Display option buttons with difficulty levels
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3 id="category-text">Please Select a Category</h3>`;

    // Display category buttons
    let categoryButtonCon = document.createElement("div");
    for (let value in options) {
        categoryButtonCon.innerHTML += `<button class="options" onclick="selectCategory('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(categoryButtonCon);

    // Display difficulty buttons (hidden initially)
    let difficultyButtonCon = document.createElement("div");
    difficultyButtonCon.classList.add("hide");
    difficultyButtonCon.innerHTML = `
        <h3 id="difficulty-text">Please Select a Difficulty</h3>
        <button class="difficulty" onclick="selectDifficulty('Easy')">Easy</button>
        <button class="difficulty" onclick="selectDifficulty('Medium')">Medium</button>
        <button class="difficulty" onclick="selectDifficulty('Hard')">Hard</button>
    `;
    optionsContainer.appendChild(difficultyButtonCon);
};

// Function to go back to options
const goBackToOptions = () => {
    optionsContainer.innerHTML = ""; // Clear the content
    displayOptions(); // Display options again
    letterContainer.classList.add("hide"); // Hide the letter container
    newGameContainer.classList.add("hide"); // Hide the new game container
    resultText.innerHTML = ""; // Clear the result text

    // Hide the time display when going back to options
    toggleTimeDisplay(false);
};

// Function to handle category selection
const selectCategory = (category) => {
    selectedCategory = category;

    // Hide category buttons and text
    document.getElementById('category-text').classList.add('hide');
    document.querySelectorAll('.options').forEach(button => {
        button.disabled = true;
        button.classList.add("hide");
    });

    // Show difficulty buttons
    document.querySelectorAll('.difficulty').forEach(button => {
        button.classList.remove("hide");
    });
};

// Function to handle difficulty selection
const selectDifficulty = (difficulty) => {
    // Check if a category has been selected
    if (!selectedCategory) {
        // Display the message in the HTML content
        document.getElementById('difficulty-text').textContent = 'Please select a category first!';
        document.getElementById('difficulty-text').classList.remove('hide');
        return;
    }

    selectedDifficulty = difficulty;

    // Hide difficulty buttons and text
    document.getElementById('difficulty-text').classList.add('hide');
    document.querySelectorAll('.difficulty').forEach(button => {
        button.disabled = true;
        button.classList.add("hide");
    });

    // Now that both category and difficulty are selected, proceed to start the round
    startRound();
};



// Function to start the round (you can modify this according to your logic)
const startRound = () => {
    console.log("Category:", selectedCategory);
    console.log("Difficulty:", selectedDifficulty);
    generateWord(selectedCategory, selectDifficulty);

    // Display the countdown message
    showCountdownMessage();
};


// Function to display the countdown message
const showCountdownMessage = () => {
    // Hide category and difficulty texts
    document.getElementById('category-text').classList.add('hide');
    document.getElementById('difficulty-text').classList.add('hide');

    // Display the countdown message at the top and in the middle
    let countdownMessage = document.createElement("div");
    countdownMessage.innerHTML = `
        <h3 class="countdown-message">You have 60 seconds to guess ${selectedDifficulty} ${selectedCategory}, GO!!!</h3>
    `;
    countdownMessage.classList.add("countdown-message-container");
    optionsContainer.appendChild(countdownMessage);
};


//adds difficulty scores
const difficultyScores = {
    Easy: 120,
    Medium: 130,
    Hard: 140
};


//Blocks all the Buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");
    muteButton.classList.add("hide");
    unmuteButton.classList.add("hide");

    //disable all options
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    //disable all letters
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

// Word Generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");

    // If optionValue matches the button innerText, then highlight the button
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
            isOptionSelected = true;
        }
        button.disabled = true;
    });

    // Start the timer only if it's not already running
    if (!isTimerRunning) {
        startTimer(60);
    }

    // Log the timer value after startTimer
    console.log("Timer value in generateWord after startTimer:", timer);

    // Initially hide letters, clear previous word
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];

    // Filter words based on difficulty level
    let filteredOptions = optionArray.filter(word => {
        if (selectedDifficulty === 'Easy') {
            score += 0;
            return word.length >= 1 && word.length <= 5;
        } else if (selectedDifficulty === 'Medium') {
            score += 1;
            return word.length >= 6 && word.length <= 8;
        } else if (selectedDifficulty === 'Hard') {
            score += 2;
            return word.length > 8;
        }
    });

    // Choose a random word from the filtered options
    chosenWord = filteredOptions[Math.floor(Math.random() * filteredOptions.length)];
    chosenWord = chosenWord.toUpperCase();

    // Replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

    // Display each element as span
    userInputSection.innerHTML = displayItem;

    // Start the timer when the user selects an option
    startTimer(60);

    // Shows most buttons, timer and canvas for the game
    musicSlider.classList.remove("hide");
    muteButton.classList.remove("hide");
    unmuteButton.classList.remove("hide");
    canvas.classList.remove("hide");
};


//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
    winCount = 0;
    count = 0;
    isOptionSelected = false;
    isGameFinished = false;

    //Initially erase all content and hide letteres and new game button
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";


    score = difficultyScores[selectDifficulty] || 120;
    timeLimit = 60;

    // Hide the time, canvas, and slider
    canvas.classList.add("hide");
    musicSlider.classList.add("hide");


    //For creating letter buttons
    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        //Number to ASCII[A-Z]
        button.innerText = String.fromCharCode(i);
        //character button click
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            //if array contains clciked value replace the matched dash with letter else dram on canvas
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    // if character in array is the same as the clicked button
                    if (char === button.innerText) {
                        playCorrectSound();
                        // replace dash with letter
                        dashes[index].innerText = char;
                        // increment counter
                        winCount += 1;
                        // if winCount equals word length
                        if (winCount == charArray.length) {
                            // Adjust the win message based on whether the user is logged in
                            if (loggedInUsername) {
                                resultText.innerHTML = `<h2 class='win-msg'>You Win, ${loggedInUsername}!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${score}</p>`;
                            } else {
                                resultText.innerHTML = `<h2 class='win-msg'>You Win!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${score}</p>`;
                            }
                            console.log("The score was changed to:", score);
                            updateScore(score);
                            playGameWinSound();
                            isGameFinished = true; // Set isGameFinished to true
                            // block all buttons
                            clearInterval(timerInterval); // Stop the timer 
                            blocker();
                        }
                    }
                });
            } else {
                playIncorrectSound();
                //lose count
                count += 1;
                //for drawing man
                drawMan(count);
                //Count==6 because head,body,left arm, right arm,left leg,right leg
                if (count == 6) {
                    // Adjust the win message based on whether the user is logged in
                    if (loggedInUsername) {
                        resultText.innerHTML = `<h2 class='lose-msg'>You Lose, ${loggedInUsername}!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${0}</p>`;
                    } else {
                        resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${0}</p>`;
                    }
                    playGameOverSound();
                    isGameFinished = true; // Set isGameFinished to true
                    clearInterval(timerInterval); // Stop the timer
                    hideAudioControls(); // Hide the mute and unmute buttons
                    blocker();
                }
            }
            //disable clicked button
            button.disabled = true;
        });
        letterContainer.append(button);
    }

    displayOptions();
    //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
    let { initialDrawing } = canvasCreator();
    //initialDrawing would draw the frame
    initialDrawing();

};



//Canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame
    const initialDrawing = () => {
        //clear canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        //bottom line
        drawLine(10, 130, 130, 130);
        //left line
        drawLine(10, 10, 10, 131);
        //top line
        drawLine(10, 10, 70, 10);
        //small top line
        drawLine(70, 10, 70, 20);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};
// Function to hide the mute and unmute buttons
function hideAudioControls() {
    muteButton.classList.add("hide");
    unmuteButton.classList.add("hide");
}


function updateTimerDisplay(timeLimit) {
    const timerElement = document.getElementById("time-left");
    timerElement.textContent = timeLimit;
}


// Function to start the timer
function startTimer(timeLimit) {
    isTimerRunning = true;
    let timerElement = document.getElementById("time-left");
    let timer = timeLimit;

    // Clear any existing interval before starting a new one
    clearInterval(timerInterval);


    // Display the initial time before the first second elapses
    updateTimerDisplay(timer);

    timerInterval = setInterval(function () {
        if (isNaN(timer)) {
            console.error("Timer became NaN!");
            clearInterval(timerInterval); // Stop the timer
            return;
        }

        if (timer <= 0 || isGameFinished) {
            clearInterval(timerInterval);

            if (isGameFinished) {
                handleGameOver(false);
            } else {
                handleGameOver(true);
            }
        } else {
            timer--;
            updateTimerDisplay(timer);

            // Deduct 2 points for every second elapsed
            score -= 2;
        }
    }, 1000);
}




//this function handles what happens when the game is over, more specifically, when the time runs out for the user.
function handleGameOver(isTimeUp) {
    isTimerRunning = false;

    if (isTimeUp || score <= 0) {
        // If time is up or the score is less than or equal to zero, the user loses
        if (loggedInUsername) {
            resultText.innerHTML = `<h2 class='lose-msg'>You Lose, ${loggedInUsername}!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${0}</p>`;
        } else {
            resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${0}</p>`;
        }
        playGameOverSound();
    } else if (timer <= 0) {
        // If the time is up and the user still has a positive score, the user loses
        if (loggedInUsername) {
            resultText.innerHTML = `<h2 class='lose-msg'>You Lose, ${loggedInUsername}!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${0}</p>`;
        } else {
            resultText.innerHTML = `<h2 class='lose-msg'>You Lose!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${0}</p>`;
        }
        playGameOverSound();
    } else {
        // If the user still has time left and the score is greater than zero, the user wins
        if (loggedInUsername) {
            resultText.innerHTML = `<h2 class='win-msg'>You Win, ${loggedInUsername}!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${score}</p>`;
        } else {
            resultText.innerHTML = `<h2 class='win-msg'>You Win!!!</h2><p>The word was <span>${chosenWord}</span></p><p>Your Score: ${score}</p>`;
        }
        playGameWinSound();
    }

    isGameFinished = true; // Set isGameFinished to true
    blocker();
}




//this function makes it so that when the user finishes their game, and they receive their score, their new score is updated in the local storage.
function updateScore(finalScore) {
    // Retrieve the user's email from sessionStorage
    const userEmail = sessionStorage.loggedInUsrEmail;

    // Check if the user is logged in
    if (userEmail) {
        // Retrieve the user object from local storage
        const userObjectString = localStorage.getItem(userEmail);

        // Check if the user object is found in local storage
        if (userObjectString) {
            // Parse the user object from the string
            const userObject = JSON.parse(userObjectString);

            // Update the user's score
            userObject.score = finalScore;

            // Save the updated user object back to local storage
            localStorage.setItem(userEmail, JSON.stringify(userObject));

            // Update the score in sessionStorage
            sessionStorage.userScore = finalScore;

            // You can also display a message or perform any other necessary actions
            console.log("User score updated successfully.");
        } else {
            console.log("User object not found in local storage.");
        }
    } else {
        console.log("User not logged in.");
    }
}











//Function to tell the user how much time they have left for each round.
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds

    // Display the elapsed time in the timer element
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Time: ${elapsedTime} seconds`;
}


// New Game Button Keyboard Event Listener (Enter key)
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && isGameFinished) {
        newGameButton.click(); // Simulate a click event
    }
});

// Function to show the New Game popup
const showNewGamePopup = () => {
    const loggedInUsername = sessionStorage.getItem("loggedInUsername");
    const welcomeMessage = document.getElementById("welcome-message");
    const newGameButton = document.getElementById("new-game-button");
    const scoresButton = document.getElementById("scores-button");

    if (loggedInUsername) {
        welcomeMessage.textContent = `Welcome, ${loggedInUsername}!`; // Display the username
        newGameButton.style.display = "block"; // Show the New Game button
        scoresButton.style.display = "block"; // Show the Scores button
    } else {
        welcomeMessage.textContent = "You are not logged in. Please log in.";
        newGameButton.style.display = "none"; // Hide the New Game button
        scoresButton.style.display = "none"; // Hide the Scores button

        // Create a login button with an ID
        const loginButton = document.createElement("button");
        loginButton.textContent = "Log In";
        loginButton.id = "custom-login-button"; // Set the ID for customization
        loginButton.addEventListener("click", () => {
            // Redirect to the login page (replace 'login.html' with the actual login page)
            window.location.href = "Login Page.html";
        });

        // Append the login button to the new game container
        newGameContainer.appendChild(loginButton);
    }

    welcomeMessage.style.display = "block"; // Show the welcome message
    newGameContainer.classList.remove("hide");
    isNewGamePopupVisible = true;
};



// Function to hide the New Game popup
const hideNewGamePopup = () => {
    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.style.display = "none"; // Hide the welcome message
    newGameContainer.classList.add("hide");
    isNewGamePopupVisible = false;
};





function navigateToScoresPage() {
    window.location.href = "Scores Page.html";
}


// Function to play the correct sound effect
function playCorrectSound() {
    correctSound.currentTime = 0;
    correctSound.play();
}

// Function to play the incorrect sound effect
function playIncorrectSound() {
    incorrectSound.currentTime = 0;
    incorrectSound.play();
}

// Function to play the game over sound effect
function playGameOverSound() {
    gameOver.play();
}

// Function to play the game win sound effect
function playGameWinSound() {
    gameWin.play();
}

// Function to play the time run out sound effect
function playTimeRunOutSound() {
    timeRunOut.play();
}






//New Game
newGameButton.addEventListener("click", () => {
    isGameFinished = false; // Reset game status
    hideNewGamePopup(); // Hide the New Game popup when a new game is started
    initializer(); // Start a new game
    playBackgroundMusic(); // Start playing background music
    timeLimit = 60;
    startTimer();
});

// Keyboard Input Event Listener (for the keys)
document.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase(); // Convert the pressed key to uppercase

    // Check if the pressed key is a valid letter (A-Z), an option has been selected, the new game popup is not visible, and the game is not finished
    if (/^[A-Z]$/.test(key) && isOptionSelected && !isNewGamePopupVisible && !isGameFinished) {
        // Find the corresponding letter button and click it
        const letterButtons = document.querySelectorAll(".letters");
        letterButtons.forEach((button) => {
            if (button.innerText === key) {
                button.click(); // Simulate a click event
            }
        });
    }
});



// Function to hide or show the time display
function toggleTimeDisplay(isVisible) {
    const timerElement = document.getElementById("time-left");
    timerElement.style.display = isVisible ? "block" : "none";
}


window.onload = showNewGamePopup;