import { Request } from "express";
import { Controller } from "../controller";

class WindowController extends Controller {
    resize(req: Request) {
        Controller.windows.unmaximize();
        Controller.windows.setResizable(true);
        Controller.windows.setBounds({width: req.body["width"], height: req.body["height"]});
        Controller.windows.setResizable(false);
        Controller.windows.center();
    }
    show(req: Request) {
        Controller.windows.show();
    }
    close(req: Request) {
        Controller.windows.close();
    }
    minimize(req: Request) {
        Controller.windows.minimize();
    }
    maximize(req: Request) {
        Controller.windows.setResizable(true);
        Controller.windows.maximize();
    }
}

export default WindowController;