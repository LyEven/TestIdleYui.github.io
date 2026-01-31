let points = 0;
let pointsParSeconde = 1;

let upgrade1Cost = 10;
let upgrade1Level = 0;

const pointsDisplay = document.getElementById("points");
const gpsDisplay = document.getElementById("gps");
const clickBtn = document.getElementById("clickBtn");
const upgrade1Btn = document.getElementById("upgrade1");

function updateDisplay() {
    pointsDisplay.textContent = points;
    gpsDisplay.textContent = pointsParSeconde;
}

// Clic sur l’image
clickBtn.addEventListener("click", () => {
    points++;
    updateDisplay();
});

// Production automatique
setInterval(() => {
    points += pointsParSeconde;
    updateDisplay();
}, 1000);

// Achat de l’upgrade
upgrade1Btn.addEventListener("click", () => {
    if (points >= upgrade1Cost) {
        points -= upgrade1Cost;
        pointsParSeconde += 1;
        upgrade1Level += 1;
        upgrade1Cost = Math.floor(upgrade1Cost * 1.5);
        upgrade1Btn.textContent = `+1 point/sec (Coût : ${upgrade1Cost})`;
        updateDisplay();
    } else {
        alert("Pas assez de points !");
    }
});

// Initialisation affichage
updateDisplay();
