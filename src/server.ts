/* eslint-disable @typescript-eslint/no-var-requires */
import { BrowserWindow, ipcMain } from "electron";
import { Controller } from "./controller";
import WindowController from "./controllers/windowController";

export function run_server(electron: BrowserWindow) {
    new Controller(electron);
    const controller = new WindowController(electron);

    ipcMain.on('close-main-window', () => {
        controller.close();
    });
    ipcMain.on('minimize-main-window', () => {
        controller.minimize();
    });
    ipcMain.on('maximize-main-window', () => {
        controller.maximize();
    });
    ipcMain.on('maximize-and-unMaximize-auto-main-window', () => {
        if(controller.isMaximized()){
            controller.unMaximize();
        }else{
            controller.maximize();
        }
    });
    ipcMain.on('resize-main-window', (e, width, height) => {
        controller.resize(width, height);
    });
    ipcMain.on('open-new-electron-window', (e, url, width, height) => {
        controller.openNewWindow(url, {width, height});
    });
}