import { SceneManager } from "./SceneManager";

export class Scene extends PIXI.Sprite {
    public name: string;
    public manager: SceneManager;
    constructor() {
        super();

        setTimeout(() => {
            this.init();
        }, 10);
    }
    public init() {
        //
    }
    public runScene(oldScene: Scene) {
        //
    }
    public exitScene(newScene: Scene) {
        //
    }
    public update(delta: number) {
        //
    }
}
