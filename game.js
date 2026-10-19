const gameArea =
    document.getElementById(
        "gameArea"
    );

const target =
    document.getElementById(
        "target"
    );

const scoreElement =
    document.getElementById(
        "score"
    );

const timeElement =
    document.getElementById(
        "time"
    );

const bestElement =
    document.getElementById(
        "best"
    );

const startButton =
    document.getElementById(
        "startButton"
    );

const gameMessage =
    document.getElementById(
        "gameMessage"
    );


let score = 0;

let timeLeft = 30;

let gameRunning = false;

let timer = null;


let bestScore =
    Number(
        localStorage.getItem(
            "targetGameBest"
        )
    ) || 0;


bestElement.textContent =
    bestScore;


function moveTarget() {

    const areaWidth =
        gameArea.clientWidth;

    const areaHeight =
        gameArea.clientHeight;

    const targetWidth =
        target.offsetWidth;

    const targetHeight =
        target.offsetHeight;


    const minX =
        targetWidth / 2;

    const maxX =
        areaWidth -
        targetWidth / 2;


    const minY =
        targetHeight / 2;

    const maxY =
        areaHeight -
        targetHeight / 2;


    const x =
        minX +
        Math.random() *
        (maxX - minX);


    const y =
        minY +
        Math.random() *
        (maxY - minY);


    target.style.left =
        `${x}px`;

    target.style.top =
        `${y}px`;
}


function updateDisplay() {

    scoreElement.textContent =
        score;

    timeElement.textContent =
        timeLeft;

}


function startGame() {

    clearInterval(timer);


    score = 0;

    timeLeft = 30;

    gameRunning = true;


    updateDisplay();

    gameMessage.textContent =
        "";

    startButton.textContent =
        "🔄 إعادة اللعبة";


    moveTarget();


    timer =
        setInterval(
            () => {

                timeLeft--;

                updateDisplay();


                if (
                    timeLeft <= 0
                ) {

                    endGame();

                }

            },
            1000
        );
}


function endGame() {

    clearInterval(timer);

    timer = null;

    gameRunning = false;


    if (
        score > bestScore
    ) {

        bestScore =
            score;


        bestElement.textContent =
            bestScore;


        localStorage.setItem(
            "targetGameBest",
            bestScore
        );

        gameMessage.textContent =
            `🏆 رقم قياسي جديد! ${score}`;

    }
    else {

        gameMessage.textContent =
            `انتهى الوقت! نقاطك: ${score}`;

    }


    startButton.textContent =
        "▶ العب مرة أخرى";
}


target.addEventListener(
    "click",
    () => {

        if (!gameRunning) {
            return;
        }


        score++;

        updateDisplay();

        moveTarget();

    }
);


startButton.addEventListener(
    "click",
    startGame
);


window.addEventListener(
    "resize",
    () => {

        if (gameRunning) {

            moveTarget();

        }

    }
);


moveTarget();

updateDisplay();