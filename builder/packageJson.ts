import fs from 'node:fs';

export class PackageJson {
    private packageJsonAddress = "./package.json";
    private packageJsonBaseContent:null | string = null;
    private packageJsonChangedContent:null | string = null;

    async readPackageJson() {
        if (this.packageJsonBaseContent === null)
            this.packageJsonBaseContent = await fs.readFileSync(this.packageJsonAddress, {}).toString();

        return JSON.parse(this.packageJsonBaseContent);
    }

    async saveChanges() {
        if(this.packageJsonChangedContent !== null){
            await fs.writeFileSync(this.packageJsonAddress, JSON.stringify(this.packageJsonChangedContent));
        }else{
            throw new Error("Nothing to save into package.json");
        }
    }

    async resetToDefault(){
        this.packageJsonChangedContent = this.packageJsonBaseContent;
        await this.saveChanges();
    }

    async change(newProps: object) {
        const content = await this.readPackageJson();

        this.packageJsonChangedContent = { ...content, ...newProps };
        await this.saveChanges();
    }
}