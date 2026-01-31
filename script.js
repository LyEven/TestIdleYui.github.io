// ===== VARIABLES =====
let points = 0;

// Upgrade 1
let upgrade1Cost = 2;
let upgrade1Level = 0;

// Upgrade 2
let upgrade2Cost = 4;
let upgrade2Level = 0;
const clickContainer = document.getElementById("button-wrapper"); 

let pointsParSeconde = 1;

// ===== ÉLÉMENTS HTML =====
const pointsDisplay = document.getElementById("points");
const gpsDisplay = document.getElementById("gps");
const clickBtn = document.getElementById("clickBtn");

const upgrade1Btn = document.getElementById("upgrade1");
const upgrade2Btn = document.getElementById("upgrade2");

const upgrade1Text = document.querySelector("#upgrade1 + .upgrade-text");
const upgrade2Text = document.querySelector("#upgrade2 + .upgrade-text");


// ===== SAUVEGARDE =====
function saveGame() {
    const saveData = {
        points,
        upgrade1Cost,
        upgrade1Level,
        upgrade2Cost,
        upgrade2Level
    };
    localStorage.setItem("kayouSave", JSON.stringify(saveData));
}

function loadGame() {
    const saved = localStorage.getItem("kayouSave");
    if (saved) {
        const data = JSON.parse(saved);

        points = data.points || 0;
        upgrade1Cost = data.upgrade1Cost || 2;
        upgrade1Level = data.upgrade1Level || 0;
        upgrade2Cost = data.upgrade2Cost || 4;
        upgrade2Level = data.upgrade2Level || 0;
    }
}

// ===== CALCUL GPS =====
function calculateGPS() {
    const gps1 = Math.floor(Math.pow(1.5, upgrade1Level)) * 1;
    const gps2 = Math.floor(Math.pow(1.5, upgrade2Level)) * 2;
    return gps1 + gps2;
}

// ===== AFFICHAGE =====
function updateDisplay() {
    pointsParSeconde = calculateGPS();
    pointsDisplay.textContent = Math.floor(points);
    gpsDisplay.textContent = pointsParSeconde;
}

// ===== PROCHAIN GAIN =====
function getNextGain(level, base) {
    const current = Math.floor(Math.pow(1.5, level)) * base;
    const next = Math.floor(Math.pow(1.5, level + 1)) * base;
    return next - current;
}

// ===== TEXTE SHOP =====
function updateUpgradeTexts() {
    upgrade1Text.innerHTML = `
        +${getNextGain(upgrade1Level, 1)} /sec<br>
        Niveau : ${upgrade1Level}<br>
        Coût : ${upgrade1Cost}
    `;

    upgrade2Text.innerHTML = `
        +${getNextGain(upgrade2Level, 2)} /sec<br>
        Niveau : ${upgrade2Level}<br>
        Coût : ${upgrade2Cost}
    `;
}

// ===== CLIC =====
clickBtn.addEventListener("click", () => {
    points++;
    updateDisplay();
});

// ===== PRODUCTION AUTO =====
setInterval(() => {
    points += pointsParSeconde;
    updateDisplay();
}, 1000);

// =====================================================
// ================= ORBIT UPGRADE 1 ==================
// =====================================================
let orbitUpgrades = [];
let orbitAngle = 0;

function addOrbitUpgrade(imgSrc) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.classList.add("upgrade-orbit");
    clickContainer.appendChild(img);
    orbitUpgrades.push(img);
}

function animateOrbit() {
    orbitAngle += 2;
    const total = orbitUpgrades.length;
    const radius = 90;

    orbitUpgrades.forEach((img, i) => {
        const angle = (orbitAngle + (360 / total) * i) * Math.PI / 180;
        const x = Math.cos(angle) * radius + 120;
        const y = Math.sin(angle) * radius + 120;
        img.style.left = x + "px";
        img.style.top = y + "px";
    });

    requestAnimationFrame(animateOrbit);
}
animateOrbit();

// =====================================================
// ================= WALK UPGRADE 2 ===================
// =====================================================
let walkers = [];

function addWalkingUpgrade(imgSrc) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.classList.add("walking-upgrade");
    clickContainer.appendChild(img);

    walkers.push({
        el: img,
        x: 0,                       // commence à tout à gauche
        dir: 1,                     // commence vers la droite
        speed: 1 + Math.random() * 1.5, 
        bottom: -80 - Math.random() * 40  // un peu plus bas aléatoire
    });

    // placer immédiatement à la position de départ
    img.style.left = "0px";
    img.style.bottom = walkers[walkers.length - 1].bottom + "px";
}


function animateWalkers() {
    const maxWidth = window.innerWidth - 30; // toute la largeur de l'écran

    walkers.forEach(w => {
        w.x += w.speed * w.dir;

        if (w.x <= 0) w.dir = 1;      // rebond à gauche
        if (w.x >= maxWidth) w.dir = -1; // rebond à droite

        w.el.style.left = w.x + "px";
        w.el.style.bottom = w.bottom + "px";
        w.el.style.transform = "scaleX(1)"; // pas de retournement
    });

    requestAnimationFrame(animateWalkers);
}
animateWalkers();



    walkers.forEach(w => {
        w.x += w.speed * w.dir;

        if (w.x <= 0 || w.x >= maxWidth) {
            w.dir *= -1;
        }

        w.el.style.left = w.x + "px";
        w.el.style.bottom = "-40px";
        w.el.style.transform = w.dir === 1 ? "scaleX(1)" : "scaleX(-1)";
    });

    requestAnimationFrame(animateWalkers);

animateWalkers();

// =====================================================
// ================= ACHATS ============================
// =====================================================

// Upgrade 1
upgrade1Btn.addEventListener("click", () => {
    if (points >= upgrade1Cost) {
        points -= upgrade1Cost;
        upgrade1Level++;
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5);

        addOrbitUpgrade("https://fbi.cults3d.com/uploaders/25822624/illustration-file/cb64a7ab-6b01-4a98-adf1-1cc23a537445/thumbnail-9.png");

        updateDisplay();
        updateUpgradeTexts();
        saveGame();
    }
});

// Upgrade 2
upgrade2Btn.addEventListener("click", () => {
    if (points >= upgrade2Cost) {
        points -= upgrade2Cost;
        upgrade2Level++;
        upgrade2Cost = Math.floor(upgrade2Cost * 1.5);

        addWalkingUpgrade("https://wiki.leagueoflegends.com/en-us/images/thumb/Rift_Scuttler_Render.png/303px-Rift_Scuttler_Render.png?928e2");


        updateDisplay();
        updateUpgradeTexts();
        saveGame();
    }
});

// ===== SAUVEGARDE AUTO =====
setInterval(saveGame, 3000);

// ===== INIT =====
loadGame();

// Reconstruction visuelle
for (let i = 0; i < upgrade1Level; i++) addOrbitUpgrade("https://fbi.cults3d.com/uploaders/25822624/illustration-file/cb64a7ab-6b01-4a98-adf1-1cc23a537445/thumbnail-9.png");
;
for (let i = 0; i < upgrade2Level; i++) addWalkingUpgrade("https://wiki.leagueoflegends.com/en-us/images/thumb/Rift_Scuttler_Render.png/303px-Rift_Scuttler_Render.png?928e2");


updateDisplay();
updateUpgradeTexts();
