import express = require("express");
import { BrowserWindow } from "electron";
import { Controller } from "./controller";
import WindowController from "./controllers/windowController";
import kill from 'kill-port';
import cors from 'cors';

const app = express()
const port = 8756

export function run_server(electron: BrowserWindow) {
    new Controller(electron);

    kill(port, 'tcp')
        .then(() => {
            setTimeout(() => {
                try {
                    app.use(cors({
                        origin: "*"
                    }));
                    const bodyParser = require('body-parser');
    
                    app.post("/api/windows/resize", bodyParser.json(), (req, res) => {
                        const controller = new WindowController(electron);
                        controller.resize(req);
                        res.json({ success: "true" })
                    });
                    app.post("/api/windows/close", bodyParser.json(), (req, res) => {
                        const controller = new WindowController(electron);
                        controller.close(req);
                        res.json({ success: "true" })
                    });
                    app.post("/api/windows/minimize", bodyParser.json(), (req, res) => {
                        const controller = new WindowController(electron);
                        controller.minimize(req);
                        res.json({ success: "true" })
                    });
                    app.post("/api/windows/maximize", bodyParser.json(), (req, res) => {
                        const controller = new WindowController(electron);
                        controller.maximize(req);
                        res.json({ success: "true" })
                    });
                    app.listen(port, () => {
                        console.log(`Tlift app listening on port ${port}`)
                    })
                } catch (e) {
                    console.log('====================================');
                    console.error("error", e);
                    console.log('====================================');
                }
            },500);
         
        })
        .catch(console.log)


}