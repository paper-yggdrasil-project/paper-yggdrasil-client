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
    mainWindow.on("page-title-updated", function(event) {
      var url = mainWindow.getUrl();
      if (url.indexOf("unzoning.com") != -1) {
        mainWindow.loadUrl(loadUrl);
      } else {
        console.log("page-title-updated", url);
      }
    });
});
