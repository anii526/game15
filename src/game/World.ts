import * as PIXI from "pixi.js";
import { app } from "..";
// import { CrossyCatSceneManager } from "./scenes/CrossyCatSceneManager";
// import { CrossyCatScenes } from "./scenes/CrossyCatScenes";

export class World extends PIXI.Sprite {
    constructor() {
        super();
    }
    public init() {
        // this.createBg();
        this.createSceneManager();
    }
    public createSceneManager() {
        // const crossyCatSceneManager = new CrossyCatSceneManager(this);
        // crossyCatSceneManager.init();
        // crossyCatSceneManager.setCurrentScene(CrossyCatScenes.GAME);

        // //
        // app.pixi.app.ticker.add(delta => {
        //     crossyCatSceneManager.update(delta);
        // });

        const bg1 = new PIXI.Sprite(app.getTexture("bg"));
        bg1.scale.set(2, 2);
        this.addChild(bg1);
    }
}
