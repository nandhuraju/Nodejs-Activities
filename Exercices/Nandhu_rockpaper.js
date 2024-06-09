const readline = require('readline');

// Function to determine the winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!";
    }

    switch (userChoice) {
        case 'rock':
            if (computerChoice === 'scissors' || computerChoice === 'snake') {
                return 'You win!';
            } else {
                return 'You lose!';
            }
        case 'paper':
            if (computerChoice === 'rock' || computerChoice === 'water') {
                return 'You win!';
            } else {
                return 'You lose!';
            }
        case 'scissors':
            if (computerChoice === 'paper' || computerChoice === 'snake') {
                return 'You win!';
            } else {
                return 'You lose!';
            }
        case 'snake':
            if (computerChoice === 'water' || computerChoice === 'paper') {
                return 'You win!';
            } else {
                return 'You lose!';
            }
        case 'water':
            if (computerChoice === 'rock' || computerChoice === 'scissors') {
                return 'You win!';
            } else {
                return 'You lose!';
            }
        default:
            return 'Invalid choice!';
    }
}

// Function to get the computer's choice with a bias towards "rock"
function getComputerChoice() {
    var randomNum = Math.random();
    
    if (randomNum < 0.4) {
        return 'rock'; // 40% chance
    } else if (randomNum < 0.6) {
        return 'paper'; // 20% chance
    } else if (randomNum < 0.8) {
        return 'scissors'; // 20% chance
    } else if (randomNum < 0.9) {
        return 'snake'; // 10% chance
    } else {
        return 'water'; // 10% chance
    }
}

// Function to play the game
function playGame() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter your choice (rock, paper, scissors, snake, water): ", function(userChoice) {
        userChoice = userChoice.toLowerCase();
        let computerChoice = getComputerChoice();
        
        console.log("You chose: " + userChoice);
        console.log("The computer chose: " + computerChoice);
        
        let result = determineWinner(userChoice, computerChoice);
        console.log(result);
        
        rl.close();
    });
}

// Start the game
playGame();
