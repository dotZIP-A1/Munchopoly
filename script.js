// --------------------
// CORE VARIABLES
// --------------------
let score = 0;
let pointsPerClick = 1;

const scoreText = document.getElementById("scoreText");

const bread = document.getElementById("breadImage");
const knife = document.getElementById("knifeImage");
const chickenLeg = document.getElementById("chickenLegImage");

const shopButton = document.getElementById("shopButtonImage");
const shopMenu = document.getElementById("shopMenu");
const upgradeClick = document.getElementById("upgradeClick");

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

    const x = Math.random() * (window.innerWidth - padding);
    const y = Math.random() * (window.innerHeight - padding);

    food.style.left = x + "px";
    food.style.top = y + "px";
}


// --------------------
// FLOATING TEXT
// --------------------
function showFloatingText(x, y, text) {
    const el = document.createElement("div");
    el.className = "floatingText";
    el.textContent = text;

    el.style.left = x + "px";
    el.style.top = y + "px";

    document.body.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 800);
}


// --------------------
// CLICK SYSTEM
// --------------------
function makeClickable(food, basePoints) {
    food.addEventListener("click", (e) => {
        const gained = pointsPerClick * basePoints;

        score += gained;
        updateScore();
        moveFood(food);

        clickSound.currentTime = 0;
        clickSound.play();

        showFloatingText(e.clientX, e.clientY, `+${gained}`);
    });
}


// --------------------
// SETUP FOOD
// --------------------
makeClickable(bread, 1);
makeClickable(knife, 5);
makeClickable(chickenLeg, 2);

moveFood(bread);
moveFood(knife);
moveFood(chickenLeg);


// --------------------
// SHOP TOGGLE
// --------------------
shopButton.addEventListener("click", () => {
    shopMenu.classList.toggle("hidden");
});


// --------------------
// UPGRADE SYSTEM
// --------------------
upgradeClick.addEventListener("click", () => {
    const cost = 20;

    if (score >= cost) {
        score -= cost;
        pointsPerClick += 1;

        updateScore();
        alert("Upgrade purchased! +1 click power");
    } else {
        alert("Not enough score!");
    }
});


// --------------------
// BACKGROUND MUSIC
// --------------------
document.body.addEventListener("click", () => {
    music.loop = true;
    music.volume = 0.3;
    music.play();
}, { once: true });