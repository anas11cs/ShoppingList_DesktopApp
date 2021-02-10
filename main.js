const { create } = require('domain');
const electron = require('electron');
//const { DownloadItem } = require('electron/main');
const path = require('path')
const url = require('url')

const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;
let isDev=false;
if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true
}

// Listen for app to be ready
app.on('ready', function(){
    // Create Main Window
    mainWindow = new BrowserWindow({
        width:400,
        height:900,
        resizable: isDev?false:true,
        webPreferences:{nodeIntegration:true} // Added as embedding node in html is by default false
    });
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
            title:'Add Shopping List Item',
            webPreferences:{nodeIntegration:true} // Added as embedding node in html is by default false
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

// [ item:add ] from addWindow.html being caught here
ipcMain.on('item:add', function(e,item){
    //console.log(item)
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
});

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
                label:'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];
// Mac Config. for Menu Items
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({}); // unshift is array method that adds an empty object {} in the start of Array(mainMenuTemplate)
}
// Developer Tools for Development ENABLED
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}