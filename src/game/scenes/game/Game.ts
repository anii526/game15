import { Scene } from "../../Scene";
import { Dice } from "./Dice";
// import { Wall } from "./game/items/Wall";
// const TWEEN = require("tween.js");

export class Game extends Scene {
    public maps: Dice[][];
    public init() {
        const dice = new Dice();
        dice.init();
        this.addChild(dice);
    }
    public update(delta: number) {
        //
    }
    public runScene(oldScene: Scene) {
        console.log("Game show");
    }
}
