// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer } from "electron"


(window as any).minimize = () => ipcRenderer.send('minimize-main-window');
(window as any).maximize = () => ipcRenderer.send('maximize-main-window');
(window as any).resize = (width: number, height: number) => ipcRenderer.send('resize-main-window', width, height);