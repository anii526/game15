import { Graphics, Sprite } from "pixi.js";

export class Dice extends Sprite {
    public back: Graphics;
    public txt: PIXI.Text;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
        this.txt.text = this._id ? "" + this._id : "";
    }
    private _id: number;
    constructor() {
        super();
        this.back = new Graphics();
        this.back.beginFill(0xff0f0f);
        this.back.drawRect(0, 0, 100, 100);
        this.back.endFill();
        this.addChild(this.back);

        const style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fontWeight: "bold"
        });

        this.txt = new PIXI.Text("");
        this.txt.style = style;
        this.txt.text = "0";
        this.txt.anchor.set(0.5, 0.5);
        this.txt.position.x = 50;
        this.txt.position.y = 50;
        this.addChild(this.txt);

        this.back.interactive = true;
        this.back.buttonMode = true;
    }
}
