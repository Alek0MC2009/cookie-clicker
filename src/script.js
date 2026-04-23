// Declaracion de variables
// =================
// Elementos del DOM
// =================
const UI = {
  cookieBtn: document.getElementById("big-cookie"),
  cookiesLabel: document.getElementById("cookies"),
  cpsLabel: document.getElementById("cps"),
};
// ================
// Eventos del DOM
// ================
UI.cookieBtn.addEventListener("click", (e) => {
  game.cookies += game.cpc;
  updateUI();
  saveGame();
  showFloatText(`+${game.cpc}`, e);
});
// ================
// Estado del juego
// ================
let game = {
  cookies: 0,
  cps: 0,
  cpc: 1,
  upgrades: [], // Array vacio de forma inicial
  buildings: [],
};

function updateUI() {
  UI.cookiesLabel.textContent = game.cookies;
  UI.cpsLabel.textContent = game.cps;
}

function saveGame() {
  let estado = JSON.stringify(game);
  localStorage.setItem("game", estado);
}
function loadGame() {
  const savedData = localStorage.getItem("game");
  if (savedData) {
    game = JSON.parse(savedData);
    updateUI();
  }
}
function showFloatText(text, event) {
  const el = document.createElement("div");
  el.className = "float-number";
  el.textContent = text;

  // posición relativa al click
  const rect = UI.cookieBtn.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  UI.cookieBtn.parentElement.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 800);
}
// Entry points
lucide.createIcons();
loadGame();
updateUI();
setInterval(() => {
  game.cookies += game.cps / 10;
  updateUI();
}, 100);
