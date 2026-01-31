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

        // Mettre à jour uniquement le texte
        upgradeText.textContent = `+1 Kayou tapé/sec (Coût : ${upgrade1Cost} Kayous!)`;

        updateDisplay();
    }
});

// Initialisation affichage
updateDisplay();
