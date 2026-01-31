let points = 0;
let pointsParSeconde = 1;

// Upgrade 1
let upgrade1Cost = 2;
let upgrade1Level = 0;

// Éléments HTML
const pointsDisplay = document.getElementById("points");
const gpsDisplay = document.getElementById("gps");
const clickBtn = document.getElementById("clickBtn");
const upgrade1Btn = document.getElementById("upgrade1");
const upgradeText = document.querySelector("#upgrade1 + .upgrade-text");

// ===== SAUVEGARDE =====
function saveGame() {
    const saveData = {
        points: points,
        pointsParSeconde: pointsParSeconde,
        upgrade1Cost: upgrade1Cost,
        upgrade1Level: upgrade1Level
    };

    localStorage.setItem("kayouSave", JSON.stringify(saveData));
}

function loadGame() {
    const saved = localStorage.getItem("kayouSave");
    if (saved) {
        const data = JSON.parse(saved);

        points = data.points || 0;
        pointsParSeconde = data.pointsParSeconde || 1;
        upgrade1Cost = data.upgrade1Cost || 2;
        upgrade1Level = data.upgrade1Level || 0;

        upgradeText.textContent = `+1 Kayou tapé/sec (Coût : ${upgrade1Cost} Kayoux!)`;
    }
}

// Fonction affichage
function updateDisplay() {
    pointsDisplay.textContent = Math.floor(points);
    gpsDisplay.textContent = pointsParSeconde;
}

// Clic image
clickBtn.addEventListener("click", () => {
    points++;
    updateDisplay();
});

// Production auto
setInterval(() => {
    points += pointsParSeconde;
    updateDisplay();
}, 1000);

// ===== ORBIT =====
let orbitUpgrades = [];
let orbitAngle = 0;

function addOrbitUpgrade(imgSrc) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.classList.add("upgrade-orbit");
    document.getElementById("click-container").appendChild(img);
    orbitUpgrades.push(img);
}

function animateOrbit() {
    orbitAngle += 2;
    const total = orbitUpgrades.length;

    orbitUpgrades.forEach((img, i) => {
        const angle = orbitAngle + (360 / total) * i;
        img.style.transform = `rotate(${angle}deg)`;
    });

    requestAnimationFrame(animateOrbit);
}
animateOrbit();

// Achat upgrade
upgrade1Btn.addEventListener("click", () => {
    if (points >= upgrade1Cost) {
        points -= upgrade1Cost;

        upgrade1Level += 1;
        pointsParSeconde = Math.floor(Math.pow(1.5, upgrade1Level));

        upgrade1Cost = Math.floor(upgrade1Cost * 1.5);

        upgradeText.textContent = `+1 Kayou tapé/sec (Coût : ${upgrade1Cost} Kayoux!)`;

        addOrbitUpgrade("https://fbi.cults3d.com/uploaders/25822624/illustration-file/cb64a7ab-6b01-4a98-adf1-1cc23a537445/thumbnail-9.png");

        updateDisplay();
        saveGame(); // sauvegarde immédiate après achat
    }
});

// Sauvegarde automatique toutes les 3 secondes
setInterval(saveGame, 3000);

// Chargement au démarrage
loadGame();

// Reconstruction des images orbitantes selon le niveau
for (let i = 0; i < upgrade1Level; i++) {
    addOrbitUpgrade("https://fbi.cults3d.com/uploaders/25822624/illustration-file/cb64a7ab-6b01-4a98-adf1-1cc23a537445/thumbnail-9.png");
}

updateDisplay();
