import { Controller } from "../controller";

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
    close(req: Request) {
        Controller.windows.close();
    }
    minimize() {
        Controller.windows.minimize();
    }
    maximize() {
        Controller.windows.setResizable(true);
        Controller.windows.maximize();
    }
}

export default WindowController;