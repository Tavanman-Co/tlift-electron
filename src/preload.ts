// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, shell } from "electron"


(window as any).destroy = () => ipcRenderer.send('close-main-window');
(window as any).minimize = () => ipcRenderer.send('minimize-main-window');
(window as any).maximize = () => ipcRenderer.send('maximize-main-window');
(window as any).resize = (width: number, height: number) => ipcRenderer.send('resize-main-window', width, height);

(window as any).setListers = (onChangeLocation: (url: string) => void) => {
    ipcRenderer.on('change-location', (e, url) => onChangeLocation(url));
};

(window as any).openOSBrowser = (url: string) => shell.openExternal(url);
(window as any).openNewElectronWindow = (url: string, width:number, height:number) => ipcRenderer.send('open-new-electron-window', url, width, height);