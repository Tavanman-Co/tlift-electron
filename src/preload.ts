// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, shell } from "electron"
import getMAC from "getmac";
interface IListers{
    onChangeLocation: (url: string) => void;
    onChangeMaximized: (isMaximized: boolean) => void;
}

(window as any).destroy = () => ipcRenderer.send('close-main-window');
(window as any).minimize = () => ipcRenderer.send('minimize-main-window');
(window as any).maximize = () => ipcRenderer.send('maximize-main-window');
(window as any).unMaximize = () => ipcRenderer.send('unMaximize-main-window');
(window as any).isMaximized = () => ipcRenderer.send('isMaximized-main-window');
(window as any).resize = (width: number, height: number) => ipcRenderer.send('resize-main-window', width, height);
(window as any).maximizeAndUndoAuto = () => ipcRenderer.send('maximize-and-unMaximize-auto-main-window');

(window as any).setListers = (props: IListers) => {
    ipcRenderer.on('change-location', (e, url) => props.onChangeLocation(url));
    ipcRenderer.on('change-maximize', (e, maximize) => props.onChangeMaximized(maximize));
};
(window as any).getMac = getMAC();

(window as any).openOSBrowser = (url: string) => shell.openExternal(url);
(window as any).openNewElectronWindow = (url: string, width:number, height:number) => ipcRenderer.send('open-new-electron-window', url, width, height);