import * as PIXI from "pixi.js";
// import * as WebFont from 'webfontloader';
// import { PreloaderManager } from './utils/preloader/preloader-manager';
// import { mainSlot } from 'index';
/**
 * Created by aniii526 on 1.09.2017.
 */
export class ResourcesLoader {
    protected loader: PIXI.Loader;
    protected fontFamilies: string[];
    protected fontUrls: string[];
    constructor() {
        this.loader = new PIXI.Loader();
    }
    public init() {
        return new Promise((resolve, reject) => {
            const version = 1;

            this.loader.add("bg", "./assets/back.png?" + version);

            this.loader.on("progress", (loader, res) => {
                // (loader.progress);
                // PreloaderManager.instance.setProgress(loader.progress > 90 ? 90 : loader.progress)
            });

            this.loader.once("complete", (loader, res) => {
                // ('Нужно сделать загрузку шрифтов');
                // WebFont.load({
                //     custom: {
                //         families: this.fontFamilies,
                //         urls: this.fontUrls
                //     },
                //     active: () => {
                //         resolve();
                //     }
                // });
                resolve();
            });
            this.loader.on("error", () => {
                reject("ПРОИЗОШЛА ОШИБКА ЗАГРУЗКИ");
            });

            this.loader.load();
        });
    }
}
