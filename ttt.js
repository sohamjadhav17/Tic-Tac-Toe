let boxes = document.querySelectorAll(".box");
let rst_btn = document.querySelector("#reset_btn");
let new_game = document.querySelector("#new_game");
let message_cont = document.querySelector(".message_cont");
let para = document.querySelector("#msg");
let scoreO = document.querySelector("#scoreO");
let scoreX = document.querySelector("#scoreX");

/* Audio elements */
let clickSound = document.querySelector("#clickSound");
let winSound = document.querySelector("#winSound");
let drawSound = document.querySelector("#drawSound");

let turnO = true;   /*player O*/
let count = 0;      // To track number of moves for draw check
let O_wins = 0;
let X_wins = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play();  // Play click sound on move

        if (turnO) {  // player O
            box.innerText = "O";
            turnO = false;
        } else {      // player X
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;  // freeze box after selection
        box.classList.add("scale");  // add click animation

        // remove animation class after 200ms
        setTimeout(() => box.classList.remove("scale"), 200);

        count++;  // increment move counter
        checkWinner();  // check for win/draw
    });
});

const disableBtns = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const enableBtns = () => {      // for new game
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
    count = 0;
};

const resetGame = () => {
    turnO = true;
    enableBtns();
    message_cont.classList.add("hide");
};

const showWinner = (winner) => {
    para.innerText = `Congratulations!! Winner is ${winner}`;
    message_cont.classList.remove("hide");
    message_cont.classList.add("fade-in");
    winSound.play();  // Play win sound
    disableBtns();

    // update scoreboard
    if (winner === "O") {
        O_wins++;
        scoreO.innerText = O_wins;
    } else {
        X_wins++;
        scoreX.innerText = X_wins;
    }
};

const showDraw = () => {
    para.innerText = "It's a Draw!";
    message_cont.classList.remove("hide");
    message_cont.classList.add("fade-in");
    drawSound.play();  // Play draw sound
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;    //pos1
        let pos2Val = boxes[pattern[1]].innerText;    //pos2
        let pos3Val = boxes[pattern[2]].innerText;    //pos3

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    // If all boxes filled and no winner => draw
    if (count === 9) {
        showDraw();
    }
};

new_game.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);
