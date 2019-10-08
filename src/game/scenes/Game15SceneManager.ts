import { SceneManager } from "../SceneManager";
import { Credits } from "./credits/Credits";
import { Game } from "./game/Game";
import { Game15Scenes } from "./Game15Scenes";
import { Menu } from "./menu/Menu";

export class Game15SceneManager extends SceneManager {
    public generateDictionary(): void {
        this.addScene(Game15Scenes.GAME, new Game());
        this.addScene(Game15Scenes.MENU, new Menu());
        this.addScene(Game15Scenes.CREDITS, new Credits());
    }
    public async setCurrentScene(name: Game15Scenes) {
        console.log("setCurrentScene");
        super.setCurrentScene(name);
    }
}
