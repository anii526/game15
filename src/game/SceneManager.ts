import { Scene } from "./Scene";

export class SceneManager {
    public current: Scene;
    public currentName: string;
    public dictionaryScenes: Map<string, Scene>;
    private container: PIXI.Container;
    constructor(aContainer: PIXI.Container) {
        this.container = aContainer;
        this.dictionaryScenes = new Map();
        this.generateDictionary();
    }
    public init() {
        //
    }
    public update(delta: number) {
        if (this.current) {
            this.current.update(delta);
        }
    }
    public generateDictionary(): void {
        throw new Error("Не заполнен словарь стейтов");
    }
    public addScene(name: string, state: Scene): void {
        state.manager = this;
        state.name = name;
        this.dictionaryScenes.set(name, state);
    }
    public getCurrent(): Scene {
        return this.current;
    }
    public async setCurrentScene(name: string) {
        this.currentName = name;
        if (!this.dictionaryScenes.has(name)) {
            throw new Error(
                "Режим " + name + " не добавлен в SceneSlotManager"
            );
        }
        const newScene: Scene = this.dictionaryScenes.get(name);
        const oldScene: Scene = this.current;

        this.current = newScene;

        if (oldScene) {
            oldScene.exitScene(this.current);
            this.container.removeChild(oldScene);
        }
        newScene.runScene(oldScene);
        this.container.addChild(newScene);
    }
}
