import { SceneManager } from "../SceneManager";
import { Credits } from "./Credits";
import { Game } from "./Game";
import { CrossyCatScenes } from "./Game15Scenes";
import { Menu } from "./Menu";

export class CrossyCatSceneManager extends SceneManager {
    public generateDictionary(): void {
        this.addScene(CrossyCatScenes.GAME, new Game());
        this.addScene(CrossyCatScenes.MENU, new Menu());
        this.addScene(CrossyCatScenes.CREDITS, new Credits());
    }
    public async setCurrentScene(name: CrossyCatScenes) {
        console.log("setCurrentScene");
        super.setCurrentScene(name);
    }
}
