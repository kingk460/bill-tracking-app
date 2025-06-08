const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveJsonToFile: (jsonString) =>
    ipcRenderer.invoke("save-json-file", jsonString),
  clearJsonFile: () => ipcRenderer.invoke("clear-json-file"),
});
