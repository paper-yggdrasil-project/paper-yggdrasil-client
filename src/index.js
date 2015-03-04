var app = require('app');
var ipc = require('ipc');
var BrowserWindow = require('browser-window');  

var mainWindow = null;
var oauthWindow = null;

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

ipc.on('auth', function(event, arg) {

  var githubConfig = require('config').get("github");

  switch(arg) {
    case 'github':
      var port = 3031;

      var githubOAuth = require('github-oauth')({
        githubClient: githubConfig.client,
        githubSecret: githubConfig.secret,
        baseURL: 'http://localhost:' + port,
        loginURI: '/login',
        callbackURI: '/callback',
        scope: 'user:email',
      });

      require('http').createServer(function(req, res) {
        if (req.url.match(/login/)) {
          return githubOAuth.login(req, res);
        }
        if (req.url.match(/callback/)) {
          return githubOAuth.callback(req, res);
        }
      }).listen(port);

      githubOAuth.on('error', function(err) {
        console.error('there was a login error', err);
        event.sender.send('auth-reply', 'error');
      });

      githubOAuth.on('token', function(token, serverResponse) {
        console.log('here is your shiny new github oauth token', token);
        serverResponse.end(JSON.stringify(token));
        event.sender.send('auth-reply', token);
        oauthWindow.close();
      });

      oauthWindow = new BrowserWindow({width: 800, height: 600});
      var loadUrl = "file://" + __dirname + "/github-oauth.html";
      oauthWindow.loadUrl(loadUrl);
      oauthWindow.on('closed', function() {
          oauthWindow = null;
      });
      break;

  }

});
