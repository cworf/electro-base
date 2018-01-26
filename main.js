const { app, BrowserWindow} = require('electron');

let win;

function createWindow(){
	win= new BrowserWindow({
		width: 600,
		height: 600,
		backgroundColor: '#fff',
		icon: `file://${__dirname}/dist/assets/logo.png`,
	});

	win.loadURL(`file://${__dirname}/dist/index.html`); //load the window

	win.on('closed', function(){
		win = null;
	});
}

app.on('ready', createWindow) //on init

app.on('window-all-closed', function(){// On macOS specific close process
	if (process.platform !== 'darwin') {
	  app.quit()
	}
});

app.on('activate', function () {  // macOS specific close process

  if (win === null) {
    createWindow()
  }
});
