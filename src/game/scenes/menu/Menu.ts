// import { Graphics } from "pixi.js";
import { Scene } from "../../Scene";
import { Game15Scenes } from "../Game15Scenes";

export class Menu extends Scene {
    public init() {
        const startGameBtn = new PIXI.Graphics();
        startGameBtn.beginFill(0xffffff);
        startGameBtn.drawRect(0, 0, 200, 100);
        startGameBtn.endFill();
        startGameBtn.position.x = 100;
        startGameBtn.position.y = 100;
        this.addChild(startGameBtn);

        startGameBtn.interactive = true;
        startGameBtn.buttonMode = true;
        startGameBtn.on("pointerup", () => {
            console.log("pointerup");
            this.manager.setCurrentScene(Game15Scenes.GAME);
        });
    }
    public update(delta: number) {
        //
    }
    public runScene(oldScene: Scene) {
        console.log("Menu show");
    }
}
