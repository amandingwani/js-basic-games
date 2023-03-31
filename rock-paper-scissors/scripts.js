document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    let player = document.getElementById('player');
    let computer = document.getElementById('computer');
    let result = document.getElementById('result');
    let buttons = document.querySelectorAll('.Button');

    let choices = ['ROCK', 'PAPER', 'SCISSORS'];

    buttons.forEach(button => button.addEventListener('click', () => {
        player.childNodes[1].textContent = button.textContent;
        play(button.textContent);
    }))

    function play(choice) {
        // generate random choice for computer
        let computer_choice = choices[Math.floor(Math.random() * 3)];
        computer.childNodes[1].textContent = computer_choice;
        if (choice === computer_choice) {
            result.childNodes[1].textContent = 'Draw!';
        }
        else if (choice === 'ROCK') {
            if (computer_choice === 'PAPER') {
                // lose
                result.childNodes[1].textContent = 'You Lose!';
            }
            else {
                // win
                result.childNodes[1].textContent = 'You Win!';
            }
        }
        else if (choice === 'PAPER') {
            if (computer_choice === 'ROCK') {
                // win
                result.childNodes[1].textContent = 'You Win!';
            }
            else {
                // lose
                result.childNodes[1].textContent = 'You Lose!';

            }
        }
        else {
            if (computer_choice === 'PAPER') {
                // win
                result.childNodes[1].textContent = 'You Win!';
            }
            else {
                // lose
                result.childNodes[1].textContent = 'You Lose!';

            }
        }
    }
}
