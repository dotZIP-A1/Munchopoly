// --------------------
// CORE VARIABLES
// --------------------
let score = 0;
let pointsPerClick = 1;

const scoreText = document.getElementById("scoreText");

const shopButton = document.getElementById("shopButtonImage");
const shopMenu = document.getElementById("shopMenu");
const upgradeClick = document.getElementById("upgradeClick");

const clickSound = document.getElementById("clickSound");
const music = document.getElementById("backgroundMusic");
const buyUpgradeSound = document.getElementById("buyUpgrade");


// --------------------
// FOOD DATA (ARRAY SYSTEM)
// --------------------
const foods = [
    {
        element: document.getElementById("breadImage"),
        points: 1
    },
    {
        element: document.getElementById("chickenLegImage"),
        points: 2
    },
    {
        element: document.getElementById("knifeImage"),
        points: 3
    },

    {
        element: document.getElementById("pizzaImage"),
        points: 4
    },

    {
        element: document.getElementById("burgerImage"),
        points: 5
    },

    {
        element: document.getElementById("baconImage"),
        points: 3
    },

    {
        element: document.getElementById("appleImage"),
        points: 2
    }

];


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
// SETUP FOOD (ARRAY LOOP)
// --------------------
foods.forEach(food => {
    makeClickable(food.element, food.points);
    moveFood(food.element);
});


// --------------------
// SHOP TOGGLE
// --------------------
shopButton.addEventListener("click", () => {
    shopMenu.classList.toggle("hidden");
});


// --------------------
// UPGRADE SYSTEM
// --------------------
let upgradeCost = 20;

upgradeClick.addEventListener("click", () => {
    if (score >= upgradeCost) {

        score -= upgradeCost;
        pointsPerClick += 1;

        updateScore();

        upgradeCost = Math.floor(upgradeCost * 1.5);
        upgradeClick.textContent = `Upgrade (+1 Click Power) - ${upgradeCost}`;

        // PLAY SOUND
        buyUpgradeSound.currentTime = 0;
        buyUpgradeSound.play();
    }
});


// --------------------
// BACKGROUND MUSIC
// --------------------
document.body.addEventListener("click", () => {
    music.loop = true;
    music.volume = 0.3;
    music.play().catch(() => {});
}, { once: true });