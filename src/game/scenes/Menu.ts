import { Scene } from "../Scene";

export class Menu extends Scene {
    public init() {
        const bigBlackLine = new PIXI.Graphics();
        bigBlackLine.beginFill();
        bigBlackLine.drawRect(0, 0, 320, 100);
        bigBlackLine.endFill();
        bigBlackLine.position.y = 95;
        this.addChild(bigBlackLine);

        const graySmallLine = new PIXI.Graphics();
        graySmallLine.beginFill(0x646865);
        graySmallLine.drawRect(0, 0, 320, 10);
        graySmallLine.endFill();
        graySmallLine.position.y = 97;
        this.addChild(graySmallLine);
    }
    public update(delta: number) {
        //
    }
    public runScene(oldScene: Scene) {
        console.log("Menu show");
    }
}
