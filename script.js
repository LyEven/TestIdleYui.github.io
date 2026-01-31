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

// Fonction pour mettre à jour l'affichage
function updateDisplay() {
    pointsDisplay.textContent = points;
    gpsDisplay.textContent = pointsParSeconde;
}

// Clic sur l’image
clickBtn.addEventListener("click", () => {
    points++;
    updateDisplay();
});

// Production automatique par seconde
setInterval(() => {
    points += pointsParSeconde;
    updateDisplay();
}, 1000);

// Achat de l’upgrade
const upgradeText = document.querySelector("#upgrade1 + .upgrade-text");

upgrade1Btn.addEventListener("click", () => {
    if (points >= upgrade1Cost) {
        points -= upgrade1Cost;
        pointsParSeconde += 1;
        upgrade1Level += 1;
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5);

        // Mettre à jour le texte du coût
        upgradeText.textContent = `+1 Kayou tapé/sec (Coût : ${upgrade1Cost} Kayoux!)`;

        // Ajouter une image qui orbitera autour du bouton principal
        addOrbitUpgrade("https://fbi.cults3d.com/uploaders/25822624/illustration-file/cb64a7ab-6b01-4a98-adf1-1cc23a537445/thumbnail-9.png");

        updateDisplay();
    } else {
        alert("Pas assez de points !");
    }
});

let orbitUpgrades = []; // stocke les images qui orbitent
let orbitAngle = 0;     // angle de rotation global

function addOrbitUpgrade(imgSrc) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.classList.add("upgrade-orbit");
    document.getElementById("click-container").appendChild(img);
    orbitUpgrades.push(img);
}

// Animation rotation
function animateOrbit() {
    orbitAngle += 2; // vitesse de rotation en degrés
    const total = orbitUpgrades.length;
    orbitUpgrades.forEach((img, i) => {
        const angle = orbitAngle + (360 / total) * i;
        img.style.transform = `rotate(${angle}deg)`;
    });
    requestAnimationFrame(animateOrbit);
}
animateOrbit();


// Initialisation affichage
updateDisplay();
