import type { BrowserWindow } from "electron";
import { app, ipcMain } from "electron";
import serve from "electron-serve";

import createWindow from "@main/lib/helpers/createWindow";
import StorageService from "@main/lib/helpers/storageService";


// Storage location
if (app.isPackaged) serve({ directory: "app" });
else app.setPath("userData", `${app.getPath("userData")} (development)`);

// Initialize storage
const storage = new StorageService();

// Window
let mainWindow: BrowserWindow;

// Lifecycle
app.on("ready", async () => {
    mainWindow = await createWindow(storage, "main", false);

    // Load the app
    if (app.isPackaged) {
        await mainWindow.loadURL("app://./home");
    } else {
        const port = process.argv[2];
        await mainWindow.loadURL(`http://localhost:${port}/home`);
    }

    // Show by default
    mainWindow.show();
});


// Make initialized storage and window instances available globally
export {
    storage,
    mainWindow
};