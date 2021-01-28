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
    // Quitting Complete App
    mainWindow.on('closed', function(){
        app.quit()
    })
    // Build Menu from Template below
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert Menu
    Menu.setApplicationMenu(mainMenu);
});

// Creating Add Window
function createAddWindow()
{
        // Create Add Window
        addWindow = new BrowserWindow({
            width:300,
            height:200,
            title:'Add Shopping List Item'
        });
        // Load html into Window
        addWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'addWindow.html'),
            protocol:'file:',
            slashes: true
        }));
        // Garbage Collection
        addWindow.on('closed',function(){
            addWindow=null;
        });
}

// ============================ TOP MENU BELOW =======================
// Creating Menu Template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear Items'
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctr',
                click(){
                    app.quit();
                }
            }
        ]
    }
];