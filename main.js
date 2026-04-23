const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 600,
    minHeight: 400,
    autoHideMenuBar: true, // TODO: Cambiar a true en produccion!
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  // haz esto parsa /src/index.html
  mainWindow.loadFile(path.join(__dirname, "src", "index.html"));

  // Dejo las devTools encendidas de momento
  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Cuando Electron está listo
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // En Mac recrea ventana si no hay ninguna
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Cerrar app cuando no queden ventanas (excepto en Mac)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
