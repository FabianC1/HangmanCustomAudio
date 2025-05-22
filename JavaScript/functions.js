//function to validate and authenticate when user logs in. Added sound effects for login success or failure.
//if user login is successful,stores username and email in session storage
function login() {
    let emailInput = document.getElementById("emailInput");
    let passwordInput = document.getElementById("passwordInput");

    let email = emailInput.value;
    let password = passwordInput.value;

    if (email.trim() === "" || password.trim() === "") {
        document.getElementById("LoginFailure").innerHTML = "Please fill in both email and password fields.";
        LoginSoundEffectFail()
        return;
    }

    if (localStorage[email] === undefined) {
        document.getElementById("LoginFailure").innerHTML = "No such email found. Please make an account.";
    } else {
        let usrObject = JSON.parse(localStorage[email]);
        if (password === usrObject.password) {
            document.getElementById("LoginParagraph").innerHTML = usrObject.email + " logged in.";

            // Stores the logged-in user's email and username in sessionStorage
            sessionStorage.loggedInUsrEmail = usrObject.email;
            sessionStorage.loggedInUsername = usrObject.username;

            // Plays the sound effect
            LoginCorrectSound.play();

        } else {
            document.getElementById("LoginFailure").innerHTML = "Password does not match. Please try again.";
        }
    }
}







//stores the user in json format, in the local html storage (registration), with data validation.
function storeUser() {
    var usrObject = {};
    usrObject.email = document.getElementById("emailInput").value;
    usrObject.password = document.getElementById("passwordInput").value;
    usrObject.username = document.getElementById("usernameInput").value;
    usrObject.date = document.getElementById("dateInput").value;

    // Initializes the score in the user object
    usrObject.score = 0;

    if (usrObject.email.trim() !== "" && usrObject.password.trim() !== "" && usrObject.username.trim() !== "" && usrObject.date.trim() !== "") {
        // Save the user object in local storage
        localStorage.setItem(usrObject.email, JSON.stringify(usrObject));

        // Clears the form fields to prevent form resubmission
        document.getElementById("emailInput").value = "";
        document.getElementById("passwordInput").value = "";
        document.getElementById("usernameInput").value = "";
        document.getElementById("dateInput").value = "";

        // Redirects to the Login Page using JavaScript
        window.location.href = "Login Page.html";
        // Sound effect for successful registration
        RegisterSoundEffectSuccess();
        updatePlayerName();
        // Saves the user's score in sessionStorage
        sessionStorage.userScore = usrObject.score;
    } else {
        document.getElementById("LoginFailure").innerHTML = "Please fill in all the fields properly.";
        RegisterSoundEffectFail();
    }
}



//function to play sound effect for login failure
function LoginSoundEffectFail() {
    const LoginFailSound = document.getElementById("LoginFailSound");
    LoginFailSound.currentTime = 0;
    LoginFailSound.play();
}

//function to play sound effect for login success
function LoginSoundEffectSuccess() {
    const LoginCorrectSound = document.getElementById("LoginCorrectSound");
    LoginCorrectSound.play();
}

//function to play sound effect for registration failure
function RegisterSoundEffectFail() {
    const RegisterFail = document.getElementById("RegisterFail");
    RegisterFail.currentTime = 0;
    RegisterFail.play();
}

//function to play sound effect for registration scuccess
function RegisterSoundEffectSuccess() {
    const RegisterSuccess = document.getElementById("RegisterSuccess");
    RegisterSuccess.play();
}










document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        "Life is really simple, but we insist on making it complicated. - Confucius",
        "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
        "In the middle of every difficulty lies opportunity. - Albert Einstein",
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer",
        "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Success is walking from failure to failure with no loss of enthusiasm. - Winston S. Churchill",
        "The harder I work, the luckier I get. - Samuel Goldwyn",
        "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
        "Believe you can, and you're halfway there. - Theodore Roosevelt",
        "The only thing we have to fear is fear itself. - Franklin D. Roosevelt",
        "Do what you can, with what you have, where you are. - Theodore Roosevelt",
        "The best way to predict the future is to create it. - Peter Drucker",
        "To succeed in life, you need two things: ignorance and confidence. - Mark Twain",
        "The secret of getting ahead is getting started. - Mark Twain",
        "You miss 100% of the shots you don't take. - Wayne Gretzky",
        "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
        "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
        "Dream big and dare to fail. - Norman Vaughan",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    ];


    function displayRandomQuote() {
        const quoteContainer = document.getElementById("quote-text");
        if (quoteContainer) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteContainer.textContent = quotes[randomIndex];
        }
    }

    displayRandomQuote();
});

document.addEventListener("DOMContentLoaded", function () {
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "How do you organize a space party? You 'planet'!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "What do you call a bear with no teeth? A gummy bear!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "Why don't skeletons fight each other? They don't have the guts.",
        "Parallel lines have so much in common. It's a shame they'll never meet.",
        "What do you get when you cross a snowman with a vampire? Frostbite.",
        "I'm reading a book on anti-gravity. It's impossible to put down.",
        "I used to play piano by ear, but now I use my hands.",
    ];

    function displayRandomJoke() {
        const jokeContainer = document.getElementById("joke-text");
        if (jokeContainer) {
            const randomIndex = Math.floor(Math.random() * jokes.length);
            jokeContainer.textContent = jokes[randomIndex];
        }
    }

    displayRandomJoke();
});
