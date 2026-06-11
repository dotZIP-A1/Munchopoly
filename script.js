// Main JS Game Logic
// TODO: Split game logic into multiple js scripts once cluttered

// --------------------
// CORE VARIABLES
// --------------------
let score = 0;
let pointsPerClick = 1;
let yps = 0;

const scoreText = document.getElementById("scoreText");
const ypsText = document.getElementById("ypsText");

const shopButton = document.getElementById("shopButtonImage");
const shopMenu = document.getElementById("shopMenu");

const upgradeClick = document.getElementById("upgradeClick");
const biggerMouth = document.getElementById("biggerMouth");
const yumDeluxe = document.getElementById("yumDeluxe");
const buyChef = document.getElementById("buyChef");
const buyBakery = document.getElementById("buyBakery");
const buyCompany = document.getElementById("buyCompany");

const clickSound = document.getElementById("clickSound");
const music = document.getElementById("backgroundMusic");
const buyUpgradeSound = document.getElementById("buyUpgrade");

// ! Golden Mode: Beta
let goldenMode = false;

// --------------------
// FOOD DATA (ARRAY SYSTEM)
// --------------------
const foods = [
  {
    element: document.getElementById("breadImage"),
    points: 1,
  },
  {
    element: document.getElementById("chickenLegImage"),
    points: 2,
  },
  {
    element: document.getElementById("knifeImage"),
    points: 3,
  },
  {
    element: document.getElementById("pizzaImage"),
    points: 4,
  },
  {
    element: document.getElementById("burgerImage"),
    points: 5,
  },
  {
    element: document.getElementById("baconImage"),
    points: 3,
  },
  {
    element: document.getElementById("appleImage"),
    points: 2,
  },
];

// --------------------
// SCORE SYSTEM
// --------------------
function updateScore() {
  scoreText.textContent = `Yums: ${Math.floor(score)}`;
}

function updateYPS() {
  ypsText.textContent = `YPS: ${yps}`;
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
foods.forEach((food) => {
  makeClickable(food.element, food.points);
  moveFood(food.element);
});

// --------------------
// SHOP TOGGLE
// --------------------
shopButton.addEventListener("click", () => {
  shopMenu.classList.toggle("hidden");
});

// TODO: Add more multipliers
// CLICK POWER UPGRADE
let upgradeCost = 20;

upgradeClick.addEventListener("click", () => {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    pointsPerClick += 1;

    updateScore();

    upgradeCost = Math.floor(upgradeCost * 1.5);

    upgradeClick.textContent = `Upgrade (+1 Yum Power) - ${upgradeCost}`;

    buyUpgradeSound.currentTime = 0;
    buyUpgradeSound.play();
  }
});

// BIG MOUTH UPGRADE
let bigMouthCost = 50;

biggerMouth.addEventListener("click", () => {
  if (score >= bigMouthCost) {
    score -= bigMouthCost;
    pointsPerClick += 5;

    updateScore();

    bigMouthCost = Math.floor(bigMouthCost * 1.5);

    biggerMouth.textContent = `Bigger Mouth (+5 Yum Power) - ${bigMouthCost}`;

    buyUpgradeSound.currentTime = 0;
    buyUpgradeSound.play();
  }
});

// YUM DELUXE UPGRADE
let yumDeluxeCost = 150;

yumDeluxe.addEventListener("click", () => {
  if (score >= yumDeluxeCost) {
    score -= yumDeluxeCost;
    pointsPerClick += 10;

    updateScore();

    yumDeluxeCost = Math.floor(yumDeluxeCost * 1.5);

    yumDeluxe.textContent = `Yum Deluxe (+10 Yum Power) - ${yumDeluxeCost}`;

    buyUpgradeSound.currentTime = 0;
    buyUpgradeSound.play();
  }
});

// TODO: Add more YPS Upgrades
// CHEF (YPS) UPGRADE
let chefCost = 50;
let chefsOwned = 0;

buyChef.addEventListener("click", () => {
  if (score >= chefCost) {
    score -= chefCost;

    chefsOwned += 1;
    yps += 1;

    updateScore();
    updateYPS();

    chefCost = Math.floor(chefCost * 1.5);

    buyChef.textContent = `Chef (${chefsOwned}) +1 YPS - ${chefCost}`;

    buyUpgradeSound.currentTime = 0;
    buyUpgradeSound.play();
  }
});

// BAKERY (YPS) UPGRADE
let bakeryCost = 150;
let bakeriesOwned = 0;

buyBakery.addEventListener("click", () => {
  if (score >= bakeryCost) {
    score -= bakeryCost;

    bakeriesOwned += 1;
    yps += 5;

    updateScore();
    updateYPS();

    bakeryCost = Math.floor(bakeryCost * 1.5);

    buyBakery.textContent = `Bakery (${bakeriesOwned}) +5 YPS - ${bakeryCost}`;

    buyUpgradeSound.currentTime = 0;
    buyUpgradeSound.play();
  }
});

// Company (YPS) UPGRADE
let companyCost = 150;
let companiesOwned = 0;

buyCompany.addEventListener("click", () => {
  if (score >= companyCost) {
    score -= companyCost;

    companiesOwned += 1;
    yps += 10;

    updateScore();
    updateYPS();

    companyCost = Math.floor(companyCostCost * 1.5);

    buyCompany.textContent = `Company (${companiesOwned}) +10 YPS - ${companyCost}`;

    buyUpgradeSound.currentTime = 0;
    buyUpgradeSound.play();
  }
});

// AUTOMATION SYSTEM
setInterval(() => {
  score += yps / 10;
  updateScore();
}, 100);

// BACKGROUND MUSIC
document.body.addEventListener(
  "click",
  () => {
    music.loop = true;
    music.volume = 0.3;

    music.play().catch(() => {});
  },
  { once: true },
);

// ! Golden Mode!
// ! Beta, needs checkup
// TODO: Read over the script and ensure that it actually does smth!

if (goldenMode === false) {
  console.log("Golden Mode:", goldenMode);
}

// INITIAL UI UPDATE
updateScore();
updateYPS();
