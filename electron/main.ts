import { app, BrowserWindow } from "electron";
import * as path  from "path";
import isDev from "electron-is-dev";

function createWindow(): void {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webviewTag: true,
            preload: path.join(__dirname, "preload.js")
        }
    })

    win.loadURL(
        isDev
        ? "http://localhost:5173"
        :`file://${path.join(__dirname, '../dist/index.html')}`
    );
    if (isDev) {
        win.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})