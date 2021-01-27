const electron = require('electron')
const path = require('path')
const url = require('url')

const {app, BrowserWindow, Menu} = electron;
let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create Main Window
    mainWindow = new BrowserWindow({});
    // Load html into Window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    // Build Menu from Template below
    const mainMenu = Menu.buildFromTemplate.apply(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
    {
        label:'File'
    }
]