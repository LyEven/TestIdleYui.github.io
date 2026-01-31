let points = 0;
let pointsParSeconde = 1;

const pointsDisplay = document.getElementById("points");
const gpsDisplay = document.getElementById("gps");
const clickBtn = document.getElementById("clickBtn");

// Fonction pour mettre à jour l'affichage
function updateDisplay() {
    pointsDisplay.textContent = points;
    gpsDisplay.textContent = pointsParSeconde;
}

// Clic sur l'image
clickBtn.addEventListener("click", () => {
    points++;
    updateDisplay();
});

// Gain automatique par seconde
setInterval(() => {
    points += pointsParSeconde;
    updateDisplay();
}, 1000);

// Charger la sauvegarde
const savedPoints = localStorage.getItem("points");
if (savedPoints) {
    points = parseInt(savedPoints);
    updateDisplay();
}

// Sauvegarde automatique
setInterval(() => {
    localStorage.setItem("points", points);
}, 3000);

// Initialisation affichage
updateDisplay();
