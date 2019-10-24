import { Sprite } from "pixi.js";
import { app } from "../../..";

export class Figure extends Sprite {
    public back: Sprite;
    public txt: PIXI.Text;
    public width: number;
    public height: number;
    public offset: number;
    public textureName: string;
    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
        this.txt.text = this._id ? "" + this._id : "";
    }
    private _id: number;
    constructor(size: number) {
        super();

        this.changeParam(size);

        this.back = new Sprite(app.getTexture(this.textureName));
        // this.back.beginFill(0x575757);
        // this.back.drawRoundedRect(0, 0, 100, 100, 0);
        // this.back.endFill();
        this.addChild(this.back);

        const style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fill: 0xfffff0,
            fontSize: 36,
            fontWeight: "bold"
        });

        this.txt = new PIXI.Text("");
        this.txt.style = style;
        this.txt.text = "0";
        this.txt.anchor.set(0.5, 0.5);
        this.txt.position.x = this.back.width / 2;
        this.txt.position.y = this.back.height / 2;
        this.addChild(this.txt);
    }
    public deadMe(): void {
        while (this.children.length) {
            this.removeChildAt(0);
        }
    }
    private changeParam(size: number) {
        switch (size) {
            case 5:
                this.width = 105;
                this.offset = 5;
                this.textureName = "5x5";
                break;
            case 4:
                this.width = 130;
                this.offset = 7.5;
                this.textureName = "4x4";
                break;
            case 3:
                this.width = 173.3;
                this.offset = 10;
                this.textureName = "3x3";
                break;
        }
        this.height = this.width;
    }
}
