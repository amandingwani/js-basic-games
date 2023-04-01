document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    const gameBoard = document.getElementById('gameBoard');
    const ctx = gameBoard.getContext("2d");
    const rstBtn = document.getElementById('rstBtn');
    const boardBackgroud = 'green';

    const MAX_SCORE = 5;
    
    class Player {
        constructor(scoreText, score, color, x, y, yVel, width, height) {
            this.scoreText = scoreText;
            this.score = score;
            this.color = color;
            this.x = x;
            this.y = y;
            this.yVel = yVel;
            this.width = width;
            this.height = height;
        }

        updateScore(score) {
            this.score = score;
            this.scoreText.textContent = this.score;
        }
    }

    const gameWidth = gameBoard.width;
    const gameHeight = gameBoard.height;
    const gameTickTimeInterval = 17; //ms
    let gameTimerId;

    let ballColor = 'yellow';
    let ballRadius = 10;
    let ballX = (gameWidth / 2);
    let ballY = (gameHeight / 2);
    let ballXVel;
    let ballYVel;
    let ballBaseVel = 3;
    let ballVelAdder = 0.0003 * gameTickTimeInterval;

    p1 = new Player(document.getElementById('p1Score'), 0, 'skyblue', 0, gameHeight / 2 - 50, 0, 25, 100);
    p2 = new Player(document.getElementById('p2Score'), 0, 'red', gameWidth-25, gameHeight / 2 - 50, 0, 25, 100);
    
    let pBaseVel = 10;
    let running = false;

    window.addEventListener('keydown', keyDownEventHandler);
    window.addEventListener('keyup', keyUpEventHandler);
    rstBtn.addEventListener('click', resetGame);

    //##############################################################
    
    
    
    
    
    gameStart();
    
    





    //##############################################################

    function gameStart() {
        running = true;
        p1.updateScore(0);
        p2.updateScore(0);
        resetBall();
        renderBall();
        renderPlayer(p1);
        renderPlayer(p2);

        gameTimerId = setInterval(update, gameTickTimeInterval);
    }

    function update() {
        // console.log(arguments.callee.name);
        if (running) {
            clearBoard();
            updateBall();
            renderBall();
            updatePlayer(p1);
            updatePlayer(p2);
            renderPlayer(p1);
            renderPlayer(p2);
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

    function renderBall() {
        // ctx.arc(ballX,ballY, ballRadius, 0, 2 * Math.PI);
        // ctx.fillStyle = ballColor
        // ctx.fill();
        // ctx.stroke();

        ctx.fillStyle = ballColor;
        ctx.fillRect(ballX,ballY, 10, 10);
    }

    function renderPlayer(p) {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.width, p.height);
        ctx.lineWidth = 2;
        ctx.strokeRect(p.x, p.y, p.width, p.height);
    }

    function updateBall() {
        ballX = ballX + ballXVel;
        ballY = ballY + ballYVel;

        // top and bottom bounce
        if (ballY - ballRadius < 0 || ballY + ballRadius > gameHeight) {
            // reverse the y speed
            ballYVel = -ballYVel;
        }

        // player hit check
        // p1 hit check
        if (ballX - ballRadius < p1.width && ballY + ballRadius > p1.y && ballY - ballRadius< p1.y + p1.height) {
            // bounce to right
            ballXVel = -ballXVel;
        }
        //p2 hit check
        else if (ballX + ballRadius > gameWidth - p2.width && ballY + ballRadius > p2.y && ballY - ballRadius< p2.y + p2.height) {
            // bounce to right
            ballXVel = -ballXVel;
        }

        // left and right score 
        if (ballX - ballRadius < 0) {
            // p2 scores
            p2.updateScore(p2.score + 1);
            resetBall();
        }
        else if(ballX + ballRadius > gameWidth) {
            // p1 scores
            p1.updateScore(p1.score + 1);
            resetBall();
        }

        ballXVel = ballXVel + ballVelAdder * ballXVel / Math.abs(ballXVel);
    }

    function resetBall() {
        ballX = (gameWidth / 2);
        ballY = (gameHeight / 2);
        ballXVel = ballBaseVel * ((Math.round(Math.random()) * 2) - 1);
        ballYVel = ballBaseVel * ((Math.round(Math.random()) * 2) - 1)*Math.random();
    }

    function updatePlayer(p) {
        p.y = p.y + p.yVel;

        // top and bottom hit
        if (p.y < 0) {
            p.y = 0;
        }
        else if (p.y + p.height > gameHeight) {
            p.y = gameHeight - p.height;
            p.yVel = 0;
        }
    }

    function keyDownEventHandler(event) {
        const keyPressed = event.key;
        // console.log(keyPressed);

        if (keyPressed === 'w' || keyPressed === 'W') {
            p1.yVel = -pBaseVel;
        }
        else if (keyPressed === 's' || keyPressed === 'S') {
            p1.yVel = pBaseVel;
        }
        else if (keyPressed === 'ArrowUp') {
            p2.yVel = -pBaseVel;
        }
        else if (keyPressed === 'ArrowDown') {
            p2.yVel = pBaseVel;
        }
    }

    function keyUpEventHandler(event) {
        const keyPressed = event.key;
        // console.log(keyPressed);

        if (keyPressed === 'w' || keyPressed === 's' || keyPressed === 'W' || keyPressed === 'S') {
            p1.yVel = 0;
        }
        else if (keyPressed === 'ArrowUp' || keyPressed === 'ArrowDown') {
            p2.yVel = 0;
        }
    }

    function checkGameOver() {
        if (p1.score > MAX_SCORE || p2.score > MAX_SCORE) {
            running = false;
        }
    }

    function displayGameOver() {
        ctx.font = '50px MV Boli';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(`${(p1.score > p2.score) ? "Blue" : "Red"} wins!`, gameWidth/2, gameHeight/2);
    }

    function resetGame() {
        // // stop the current game, if running
        // if (running) {
        //     clearInterval(gameTimerId);
        // }

        // score = 0;
        // xVel = 1;
        // yVel = 0;
        // snake = [
        //     {x:4, y:0},
        //     {x:3, y:0},
        //     {x:2, y:0},
        //     {x:1, y:0},
        //     {x:0, y:0}
        // ];
        // gameStart();
    }
}