import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    });
    
    const indexPath = path.join(__dirname, '../../dist-react/index.html');
    console.log('Loading index from:', indexPath);
    
    mainWindow.loadFile(indexPath).catch(err => {
        console.error('Failed to load index.html:', err);
    });
    
    // Open DevTools for debugging
    mainWindow.webContents.openDevTools();
    
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error('Failed to load:', errorDescription);
    });
});