document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('#status');
    const restartButton = document.querySelector('#restartButton');

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    let options = ["","","","","","","","",""];
    let currentPlayer = "X";
    let running = false;

    initGame();

    function initGame() {
        cells.forEach(cell => cell.addEventListener('click', cellClicked));
        restartButton.addEventListener('click', restartGame);
        status.textContent = `${currentPlayer}'s turn`;
        running = true;
    }

    function cellClicked() {
        const cellIndex = this.getAttribute("cellIndex");

        if (options[cellIndex] !== "" || !running) {
            return;
        }
        
        updateCell(this, cellIndex);
        checkWinner();
    }

    function updateCell(cell,cellIndex) {
        options[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
    }
    function changePlayer() {
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        status.textContent = `${currentPlayer}'s turn`;
    }
    function checkWinner() {
        let roundWon = false;
        for (let condition of winConditions) {
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];

            if (cellA === cellB && cellB === cellC && cellA !== "") {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            status.textContent = `${currentPlayer} wins!`;
            running = false;
        }
        else if (!options.includes("")) {
            status.textContent = `Draw!`;
            running = false;
        }
        else {
            changePlayer();
        }
    }
    function restartGame() {
        currentPlayer = "X";
        options = ["","","","","","","","",""];
        status.textContent = `${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
        running = true;
    }
}
