import { Scene } from "../../Scene";

export class Credits extends Scene {
    public init() {
        const titleTxt = new PIXI.Text("Credits");
        titleTxt.style.fontSize = 25;
        titleTxt.anchor.set(0.5, 0);
        titleTxt.position.x = 320 / 2;
        titleTxt.position.y = 100;
        this.addChild(titleTxt);
    }
    public update(delta: number) {
        //
    }
    public runScene(oldScene: Scene) {
        console.log("Credits show");
    }
}
