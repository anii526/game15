import { Point, Sprite } from "pixi.js";
import { Scene } from "../../Scene";
import { Figure } from "./Figure";
const keyboardKey = require("keyboard-key");
// import { Wall } from "./game/items/Wall";
const TWEEN = require("tween.js");

export class Game extends Scene {
    // контейнер костяшек
    private holder: Sprite;
    // массив с текущим набором костей
    private figures: any[][];
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
        // this.holder.interactive = true;
        // this.holder.interactiveChildren = true;
        // service variables and listeners
        // this.figures = [];
        this.figures = [[], [], [], []];
        // потопали играться.
        this.newGame();

        document.addEventListener("keydown", this.keyController);
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
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.figures.length; j++) {
            for (let i = 0; i < this.figures[0].length; i++) {
                const figure = this.figures[j][i];
                if (figure) {
                    figure.off("pointerup", this.mouseController);
                    figure.deadMe();
                }
            }
        }
        while (this.holder.children.length) {
            this.holder.removeChildAt(0);
        }
        this.gameReadyState = true;
        // **Создание новых игровых настроек
        this.figures.length = 0;
        this.figures = [[], [], [], []];
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
            y0 = Math.trunc(i / 4);
            this.holder.addChild((fig = new Figure()));
            fig.x = 100 * x0;
            fig.y = 100 * y0;
            fig.id = arr[i];
            // if()
            this.figures[y0][x0] = fig;

            fig.on("pointerup", this.mouseController);
            fig.interactive = true;
        }
        // Установка пустой ячейки
        this.figures[3][3] = null;
        this.empty = new Point(15 % 4, Math.trunc(15 / 4));
    }
    private shuffle(a: number, b: number): number {
        return Math.trunc(Math.random() * 16 - 8);
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
    private keyController = (e: any) => {
        if (!this.holder.children.length) {
            return;
        }
        console.log(e);
        const key = keyboardKey.getKey(e);
        let fig: Figure;
        const oldEmpty: Point = this.empty.clone();
        switch (key) {
            case "ArrowLeft": // стрелка влево
                if (this.empty.x === 3 || !this.gameReadyState) {
                    return;
                }
                this.empty.x++;
                break;
            case "ArrowUp": // стрелка вверх
                if (this.empty.y === 3 || !this.gameReadyState) {
                    return;
                }
                this.empty.y++;
                break;
            case "ArrowRight": // стрелка вправо
                if (!this.empty.x || !this.gameReadyState) {
                    return;
                }
                this.empty.x--;
                break;
            case "ArrowDown": // стрелка вниз
                if (!this.empty.y || !this.gameReadyState) {
                    return;
                }
                this.empty.y--;
                break;
            case "Escape": // escape
                this.newGame();
                return;
                break;
            default:
                return;
        }
        console.log({ x: this.figures });
        fig = this.figures[this.empty.y][this.empty.x];
        this.figures[this.empty.y][this.empty.x] = null;
        this.figures[oldEmpty.y][oldEmpty.x] = fig;
        new TWEEN.Tween(fig)
            .to({ x: oldEmpty.x * fig.width, y: oldEmpty.y * fig.height }, 300)
            .easing(TWEEN.Easing.Quadratic.In)
            .start();
        this.checkGameStatus();
    };
    private mouseController = (e: any) => {
        console.log(e.target);
        if (!this.gameReadyState) {
            return;
        }
        if (
            Math.abs(this.empty.x - e.target.x / e.target.width) +
                Math.abs(this.empty.y - e.target.y / e.target.height) !==
            1
        ) {
            return;
        }
        const x0: number = this.empty.x * e.target.width;
        const y0: number = this.empty.y * e.target.height;
        this.figures[this.empty.y][this.empty.x] = e.target;
        this.empty.y = e.target.y / e.target.height;
        this.empty.x = e.target.x / e.target.width;
        this.figures[this.empty.y][this.empty.x] = null;
        // // TweenMax.to(e.target, .3, { x:x0, y:y0, ease:Quart.easeIn } );
        // e.target.x = x0;
        // e.target.y = y0;
        new TWEEN.Tween(e.target)
            .to({ x: x0, y: y0 }, 300)
            .easing(TWEEN.Easing.Quadratic.In)
            .start();
        this.checkGameStatus();
    };
    private checkGameStatus(): void {
        let x0: number;
        let y0: number;
        // const fig:Clip;
        for (let i: number = 0; i < 15; i++) {
            (x0 = i % 4), (y0 = Math.trunc(i / 4));
            if (
                this.figures[y0][x0] === null ||
                this.figures[y0][x0].id !== i + 1
            ) {
                return;
            }
        }
        // game over
        this.gameReadyState = false;
        // Здесь можно слепить свою победу...
        // var mc:victory = new victory();
        // mc.x = (holder.width - mc.width) / 2;
        // mc.y = (holder.height - mc.height) / 2;
        // holder.addChild(mc);
        alert("Победа!!!");
    }
}
