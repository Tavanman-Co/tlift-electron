import { BrowserWindow } from "electron";
import { Controller } from "../controller";
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

class WindowController extends Controller {
    resize(width: number, height: number) {
        Controller.windows.unmaximize();
        Controller.windows.setResizable(true);
        Controller.windows.setBounds({ width, height });
        Controller.windows.setResizable(false);
        Controller.windows.center();
    }
    show(req: Request) {
        Controller.windows.show();
    }
    close() {
        Controller.windows.destroy();
    }
    minimize() {
        Controller.windows.minimize();
    }
    maximize() {
        Controller.windows.setResizable(true);
        Controller.windows.maximize();
    }
    openNewWindow(url: string,size: {width: number,height: number}){
        const newWindow = new BrowserWindow({
            webPreferences: {
              preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
              webSecurity: false,
              allowRunningInsecureContent: true,
              nodeIntegration: true,
              nodeIntegrationInWorker: true,
              contextIsolation: false
            },
            autoHideMenuBar: true,
            show: true,
            focusable: true,
            frame: true,
            width: size.width,
            height: size.height,
            resizable: false,
          });

          newWindow.loadURL(url);
    }
}

export default WindowController;