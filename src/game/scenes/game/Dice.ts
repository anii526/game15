import { Graphics, Sprite } from "pixi.js";

export class Dice extends Sprite {
    public back: Graphics;
    public textTF: PIXI.Text;
    public init() {
        this.back = new Graphics();
        this.back.beginFill(0xff0f0f);
        this.back.drawRect(0, 0, 100, 100);
        this.back.endFill();
        this.addChild(this.back);

        this.textTF = new PIXI.Text("");
        this.textTF.text = "0";
        this.addChild(this.textTF);
    }
}
