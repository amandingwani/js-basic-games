document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const gameBoard = document.getElementById('gameBoard');
    const ctx = gameBoard.getContext("2d");
    const scoreText = document.getElementById('scoreText');
    const rstBtn = document.getElementById('rstBtn');

    const gameWidth = gameBoard.width;
    const gameHeight = gameBoard.height;
    const boardBackgroud = '#d0f4f5';
    const snakeColor = 'lightgreen';
    const snakeBorder = 'black';
    const foodColor = 'red';
    const unitSize = 25;
    const gameUnitWidth = gameWidth / unitSize;
    const gameUnitHeight = gameHeight / unitSize;
    const gameTickTimeInterval = 75; //ms
    let gameTimerId;

    // console.log(gameUnitWidth, gameUnitHeight);

    let running = false;
    // velocites in unitsizes
    let xVel = 1;
    let yVel = 0;
    let foodX;
    let foodY;
    let score = 0;
    // snake parts coordinates in unitsizes
    let snake = [
        {x:4, y:0},
        {x:3, y:0},
        {x:2, y:0},
        {x:1, y:0},
        {x:0, y:0}
    ];

    window.addEventListener('keydown', changeDirection);
    rstBtn.addEventListener('click', resetGame);

    //##############################################################
    
    
    
    
    
    gameStart();
    





    //##############################################################

    function gameStart() {
        running = true;
        scoreText.textContent = score;
        createFood();
        drawFood();
        gameTimerId = setInterval(update, gameTickTimeInterval);
    }

    function update() {
        // console.log(arguments.callee.name);
        if (running) {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
        }
        else {
            clearInterval(gameTimerId);
            displayGameOver();
        }
    }

    function clearBoard() {
        ctx.fillStyle = boardBackgroud;
        ctx.fillRect(0,0,gameWidth, gameHeight);
    }

    function createFood() {
        function randomFood(min, max) {
            const randNum = Math.round(Math.random() * (max-min) + min)
            return randNum;
        }
        foodX = randomFood(0, gameUnitWidth-1);
        foodY = randomFood(0, gameUnitHeight-1);
    }

    function drawFood() {
        ctx.fillStyle = foodColor;
        ctx.fillRect(foodX * unitSize, foodY * unitSize, unitSize, unitSize);
    }

    function moveSnake() {
        const head = {x: snake[0].x + xVel,
                      y: snake[0].y + yVel};

        snake.unshift(head);
        // if food is eaten
        if (snake[0].x === foodX && snake[0].y === foodY) {
            score++;
            scoreText.textContent = score;
            createFood();
        }
        else {
            snake.pop();
        }
    }

    function drawSnake() {
        ctx.fillStyle = snakeColor;
        ctx.strokeStyle = snakeBorder;
        snake.forEach(snakePart => {
            ctx.fillRect(snakePart.x * unitSize, snakePart.y * unitSize, unitSize, unitSize);
            ctx.strokeRect(snakePart.x * unitSize, snakePart.y * unitSize, unitSize, unitSize);
        })
    }

    function changeDirection(event) {
        const keyPressed = event.keyCode;
        const left = 37;
        const up = 38;
        const right = 39;
        const down = 40;
        
        const goingLeft = (xVel === -1);
        const goingUp = (yVel === -1);
        const goingRight = (xVel === 1);
        const goingDown = (yVel === 1);

        if (keyPressed === left && !goingRight) {
            xVel = -1;
            yVel = 0;
        }
        else if (keyPressed === up && !goingDown) {
            xVel = 0;
            yVel = -1;
        }
        else if (keyPressed === right && !goingLeft) {
            xVel = 1;
            yVel = 0;
        }
        else if (keyPressed === down && !goingUp) {
            xVel = 0;
            yVel = 1;
        }
    }

    function checkGameOver() {
        if (snake[0].x < 0 || snake[0].x >= gameUnitWidth || snake[0].y < 0 || snake[0].y >= gameUnitHeight) {
            running = false;
        }
        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y ) {
                running = false;
            }
        }
    }

    function displayGameOver() {
        ctx.font = '50px MV Boli';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER!', gameWidth/2, gameHeight/2);
    }

    function resetGame() {
        score = 0;
        xVel = 1;
        yVel = 0;
        snake = [
            {x:4, y:0},
            {x:3, y:0},
            {x:2, y:0},
            {x:1, y:0},
            {x:0, y:0}
        ];
        gameStart();
    }
}
