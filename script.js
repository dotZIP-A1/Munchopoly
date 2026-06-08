let score = 0;

const scoreText = document.getElementById("scoreText");

const bread = document.getElementById("breadImage");
const knife = document.getElementById("knifeImage");
const chickenLeg = document.getElementById("chickenLegImage");

const clickSound = document.getElementById("clickSound");
const music = document.getElementById("backgroundMusic");


// --------------------
// SCORE SYSTEM
// --------------------
function updateScore() {
    scoreText.textContent = `Score: ${score}`;
}


// --------------------
// MOVEMENT SYSTEM
// --------------------
function moveFood(food) {
    const padding = 100;

    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    food.style.left = x + "px";
    food.style.top = y + "px";
}


// --------------------
// CLICK SYSTEM
// --------------------
function makeClickable(food, points) {
    food.addEventListener("click", () => {
        score += points;
        updateScore();
        moveFood(food);

        // sound effect
        clickSound.currentTime = 0;
        clickSound.play();
    });
}


// --------------------
// GAME SETUP
// --------------------
makeClickable(bread, 1);
makeClickable(knife, 5);
makeClickable(chickenLeg, 2);

moveFood(bread);
moveFood(knife);
moveFood(chickenLeg);


// --------------------
// BACKGROUND MUSIC (starts after first click)
// --------------------
document.body.addEventListener("click", () => {
    music.loop = true;
    music.volume = 0.3;
    music.play();
}, { once: true });