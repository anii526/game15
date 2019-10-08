// import * as PIXI from "pixi.js";
import { app } from "..";
import { Game15SceneManager } from "./scenes/Game15SceneManager";
import { Game15Scenes } from "./scenes/Game15Scenes";

export class World extends PIXI.Sprite {
    constructor() {
        super();
    }
    public init() {
        // this.createBg();
        this.createSceneManager();
    }
    public createSceneManager() {
        const scenesManager = new Game15SceneManager(this);
        scenesManager.init();
        scenesManager.setCurrentScene(Game15Scenes.GAME);

        app.pixi.app.ticker.add(delta => {
            scenesManager.update(delta);
        });
    }
}
