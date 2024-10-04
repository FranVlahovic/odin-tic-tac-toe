document.addEventListener('DOMContentLoaded', () => {
    const SectionFactory = (containerSelector) => {
        const section = document.querySelector(containerSelector);

        return {
            show() {
                section.style.display = 'flex';
            },
            hide() {
                section.style.display = 'none';
            }
        };
    };

    const startupSection = SectionFactory('.startup-container');
    const playersSection = SectionFactory('.players-container');
    const gameSection = SectionFactory('.game-container');
    const scoreBoard = SectionFactory('.scoreboard');

    const playGameButton = document.querySelector('.startup-button');
    const startGameButton = document.querySelector('#start-game-button');

    startupSection.show();
    playersSection.hide();
    gameSection.hide();
    scoreBoard.hide();

    // Step 1: Select Player Input Elements
    // - Use document.querySelector to get the input elements for Player 1 and Player 2.
    const playerOneInput = document.querySelector('#player1-name');
    const playerTwoInput = document.querySelector('#player2-name');
    // - Make sure to reference the correct IDs or classes from your HTML.

    // Step 2: Select Scoreboard and Player Turn Display Elements
    // - Select the scoreboard element where you will display the player names.
    const scoreBoardPlayerOne = document.querySelector('.player1-score-title');
    const scoreBoardPlayerTwo = document.querySelector('.player2-score-title');
    const scoreBoardTies = document.querySelector('.tie-score-title');
    // - Select the element that will indicate whose turn it is.
    const turnPlayerDisplay = document.querySelector('.player-turn h3')
    

    // Step 3: Create Variables for Player Names and Markers
    // - Declare variables to hold Player 1's and Player 2's names.
    // - Assign a marker (e.g., 'X' for Player 1 and 'O' for Player 2) for each player.

    playGameButton.addEventListener('click', () => {
        startupSection.hide();
        playersSection.show();
    });

    startGameButton.addEventListener('click', () => {
        // Step 4: Add Event Listener for Start Game Button
        // - Select the button that starts the game and add an event listener for the 'click' event.

        // Step 5: Retrieve Input Values
        // - Inside the event listener, get the values from the Player 1 and Player 2 input fields.
        // - Assign these values to the player name variables.

        // Step 6: Update Scoreboard
        // - Update the scoreboard display to reflect Player 1's and Player 2's names.

        // Step 7: Set Initial Turn Display
        // - Update the display to indicate that it's Player 1's turn at the start of the game.

        playersSection.hide();
        gameSection.show();
        scoreBoard.show();
    });
});
