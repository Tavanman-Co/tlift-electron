/* eslint-disable @typescript-eslint/no-var-requires */
import { BrowserWindow, ipcMain } from "electron";
import { Controller } from "./controller";
import WindowController from "./controllers/windowController";

export function run_server(electron: BrowserWindow) {
    new Controller(electron);

    ipcMain.on('minimize-main-window', () => {
        const controller = new WindowController(electron);
        controller.minimize();
    });
    ipcMain.on('maximize-main-window', () => {
        const controller = new WindowController(electron);
        controller.maximize();
    });
    ipcMain.on('resize-main-window', (e, width, height) => {
        const controller = new WindowController(electron);
        controller.resize(width, height);
    });
}