import { BrowserWindow } from "electron";

export class Controller {
    static windows: BrowserWindow;
    static splashScreen: BrowserWindow;

    constructor(windows: BrowserWindow) {
        if (!Controller.windows || Controller.windows.isDestroyed()) {
            Controller.windows = windows;
        }
    }
}
