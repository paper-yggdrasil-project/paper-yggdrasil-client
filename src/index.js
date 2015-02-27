var app = require('app');
var BrowserWindow = require('browser-window');  

var mainWindow = null;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {

    mainWindow = new BrowserWindow({width: 1280, height: 720});
    var loadUrl = "file://" + __dirname + "/custom_components/app.html";
    mainWindow.loadUrl(loadUrl);

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
