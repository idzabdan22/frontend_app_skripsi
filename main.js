const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
  });
  win.loadFile("index.html");
};

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .catch(() => {
    console.log("cannot open up window");
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
