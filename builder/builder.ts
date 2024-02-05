import { exec } from 'child_process';
import { PackageJson } from './packageJson';
import fs from 'node:fs';

interface IEnv{
    name: string;
    appName: string;
}
export class Builder {
    private env:IEnv[] = [];

    addEnv(name:string, appName:string) {
        this.env.push({ name, appName });
    }

    private async exec(command:string) {
        return new Promise((resolve) => {
            exec(command,(res) => {
                resolve(res);
            })
        })
    }

    private async build() {
        return new Promise((resolve,reject) => {
            this.exec("npm run make").then((res) => {
                resolve(res);
                console.log(res);
            }).catch(reject);
        }) 
    }

    private async changeFolder(envName:string) {
        await fs.renameSync("./out/make", "./out/make-" + envName);
    }

    private async changeTo(name:string, appName:string) {
        const packageCtl = new PackageJson();
        await packageCtl.change({ name, productName: appName });
    }

    async run() {
        for (let i = 0; i < this.env.length; i++) {
            console.log("start building",  this.env[i].appName);
            await this.changeTo(this.env[i].name, this.env[i].appName);
            await this.build();
            await this.changeFolder(this.env[i].name);
            console.log("end building",  this.env[i].appName);
        }

        // TODO :: reset package json
    }
}