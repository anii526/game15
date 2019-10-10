import { Scene } from "../../Scene";
import { Dice } from "./Dice";
// import { Wall } from "./game/items/Wall";
// const TWEEN = require("tween.js");

export class Game extends Scene {
    public maps: Dice[][];
    public countX: number = 0;
    public countY: number = 0;
    public init() {
        const dice = new Dice();
        this.addChild(dice);

        for (let i = 0; i < this.countX; i++) {
            for (let j = 0; j < this.countY; j++) {
                console.log();
            }
        }
    }
    public update(delta: number) {
        //
    }
    public runScene(oldScene: Scene) {
        console.log("Game show");
    }
}
