import { Point, Sprite } from "pixi.js";
import { Scene } from "../../Scene";
import { Figure } from "./Figure";
// import { Wall } from "./game/items/Wall";
// const TWEEN = require("tween.js");

export class Game extends Scene {
    // контейнер костяшек
    private holder: Sprite;
    // массив с текущим набором костей
    private figures: Figure[][];
    // Координаты пустой ячейки на игровом поле, в виде номеров ячеек, а не пикселей.
    private empty: Point;
    // Флаг состояния игры. Разрешает/запрещает взаимодействие пользователя с игрой (мышь и клавиатура).
    private gameReadyState: boolean;
    constructor() {
        super();
        // entry point
        // здесь можно схимичить красивенький интерфейс. Поставить стол, стул пару бокалов... зажечь свечи...)))
        this.addChild((this.holder = new Sprite()));
        this.holder.x = this.holder.y = 20;
        // service variables and listeners
        // this.figures = [];
        this.figures = [[], [], [], []];
        // stage.addEventListener(KeyboardEvent.KEY_DOWN, keyController);
        // holder.addEventListener(MouseEvent.CLICK, mouseController);
        // потопали играться.
        this.newGame();
    }
    public init() {
        // const dice = new Figure();
        // dice.id = 7;
        // this.addChild(dice);
        // for (let i = 0; i < this.countX; i++) {
        //     for (let j = 0; j < this.countY; j++) {
        //         console.log();
        //     }
        // }
    }
    public update(delta: number) {
        //
    }
    public runScene(oldScene: Scene) {
        console.log("Game show");
    }
    private newGame(): void {
        // очистка контейнера и обновление статуса игры
        while (this.holder.children.length) {
            this.holder.removeChildAt(0);
        }
        this.gameReadyState = true;
        // **Создание новых игровых настроек
        // this.figures.length = 0;
        // временный массив с индексами фигурок
        const arr: number[] = [];
        for (let i: number = 0; i < 15; i++) {
            arr.push(i + 1);
        }
        /* Перетасуем массив, затем проверим полученный расклад на предмет гарантированного выигрыша.
        Если расклад "не собираемый" (количество хаосов - нечетное), то чуть модифицируем его*/
        arr.sort(this.shuffle);
        if (this.checkChaos(arr)) {
            //  нечет. Поменяем местами 2 последних индекса
            const ind: number = arr[14];
            arr[14] = arr[13];
            arr[13] = ind;
        }
        /*Создадим 15 новых фигурок, расставим их и вставим, каждой, индексы из временного массива
         * Кроме того, фигуры запомним в двумерном массиве figures*/
        let x0: number;
        let y0: number;
        let fig: Figure;
        for (let i = 0; i < 15; i++) {
            x0 = i % 4;
            y0 = Math.round(i / 4);
            this.holder.addChild((fig = new Figure()));
            fig.x = 100 * x0;
            fig.y = 100 * y0;
            fig.id = arr[i];
            x0 ? this.figures[y0].push(fig) : this.figures.push([fig]);
        }
        // Установка пустой ячейки
        this.figures[3].push(null);
        this.empty = new Point(14 % 4, Math.round(14 / 4));
    }
    private shuffle(a: number, b: number): number {
        return Math.round(Math.random() * 16 - 8);
    }
    private checkChaos(arg: number[]): boolean {
        let first: number;
        let chaos: number = 0;
        for (let i: number = 0; i < 14; i++) {
            first = arg[i];
            for (let j: number = i + 1; j < 15; j++) {
                chaos += Number(first > arg[j]);
            }
        }
        return Boolean(chaos % 2);
    }
}
