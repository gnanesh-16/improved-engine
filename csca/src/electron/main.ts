import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { pollResources } from './resourceManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if (isDev) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        const indexPath = path.join(process.cwd(), 'dist-react', 'index.html');
        mainWindow.loadFile(indexPath).catch(console.error);
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Ensure proper app cleanup
app.on('ready', () => {
    createWindow();
    pollResources();
});

app.on('window-all-closed', () => {
    mainWindow = null;
    app.quit();
});

process.on('SIGTERM', () => {
    if (mainWindow) {
        mainWindow.destroy();
    }
    app.quit();


});