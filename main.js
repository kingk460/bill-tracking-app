const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
// because this project is done in electron the fs module is not allowed to be used in the renderer process, so we import it here in the main process
// and use it to save the data in the file system, this is done to ensure that the data is saved even after the app is closed
const fs = require("fs"); // Import the fs module
const userDataPath = app.getPath("userData"); // Get the user data path
const filePath = path.join(userDataPath, "data.json"); // Create the file path
// the commented code bellow are the modules needed to use the file system to save the lists containing the bills on restart
//  const { app, BrowserWindow, ipcMain, dialog } = require('electron');
//     const fs = require('fs');
//     const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 710,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // ✅ Correct placement
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  win.loadFile("index.html"); // ✅ Loads your HTML
}

app.whenReady().then(createWindow);

// Handle save-to-json
ipcMain.handle("save-json-file", async (event, jsonString) => {
  const filePath = path.join(__dirname, "data.json");

  try {
    fs.writeFileSync(filePath, jsonString, "utf8");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
// Handle clear-json-file
ipcMain.handle("clear-json-file", async () => {
  const filePath = path.join(__dirname, "data.json");

  try {
    // Clear the file by writing an empty array
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf8");
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});
