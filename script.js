let points = 0;

const pointsDisplay = document.getElementById("points");
const clickBtn = document.getElementById("clickBtn");

clickBtn.addEventListener("click", () => {
    points++;
    pointsDisplay.textContent = points;
});

let pointsParSeconde = 1;
const gpsDisplay = document.getElementById("gps");
clickBtn.addEventListener("click", () => {
    points++;
    updateDisplay();
});

setInterval(() => {
    points += pointsParSeconde;
    pointsDisplay.textContent = points;
}, 1000);
// Charger la sauvegarde
const savedPoints = localStorage.getItem("points");
if (savedPoints) {
    points = parseInt(savedPoints);
    pointsDisplay.textContent = points;
}

// Sauvegarde automatique
setInterval(() => {
    localStorage.setItem("points", points);
}, 3000);
