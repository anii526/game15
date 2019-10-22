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
    private size: number;
    private maxIndex: number;
    constructor() {
        super();
    }
    public init() {
        // entry point
        // здесь можно схимичить красивенький интерфейс. Поставить стол, стул пару бокалов... зажечь свечи...)))
        this.addChild((this.holder = new Sprite()));
        this.holder.x = this.holder.y = 20;

        this.size = 4;
        this.figures = [];
        // потопали играться.
        this.newGame(this.randomInteger(2, 5));

        document.addEventListener("keydown", this.keyController);
    }
    public update(delta: number) {
        //
    }
    public runScene(oldScene: Scene) {
        console.log("Game show");
    }
    private newGame(size: number): void {
        this.size = size;
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
        this.figures = [];
        for (let i = 0; i < this.size; i++) {
            this.figures.push([]);
        }
        // сначала последний находится индекс для квадрата
        // потом из него вычитается -1 так как ячейка не заполнена
        // потому еще -1 потому что индексы начинаются с 0
        this.maxIndex = Math.pow(this.size, 2) - 1 - 1;
        const arr: number[] = [];
        for (let i: number = 0; i < this.maxIndex + 1; i++) {
            arr.push(i + 1);
        }
        /* Перетасуем массив, затем проверим полученный расклад на предмет гарантированного выигрыша.
        Если расклад "не собираемый" (количество хаосов - нечетное), то чуть модифицируем его*/
        arr.sort(this.shuffle);
        if (this.checkChaos(arr)) {
            //  нечет. Поменяем местами 2 последних индекса
            const ind: number = arr[this.maxIndex];
            arr[this.maxIndex] = arr[this.maxIndex - 1];
            arr[this.maxIndex - 1] = ind;
        }
        /*Создадим 15 новых фигурок, расставим их и вставим, каждой, индексы из временного массива
         * Кроме того, фигуры запомним в двумерном массиве figures*/
        let x0: number;
        let y0: number;
        let fig: Figure;
        for (let i = 0; i < this.maxIndex + 1; i++) {
            x0 = i % this.size;
            y0 = Math.trunc(i / this.size);
            this.holder.addChild((fig = new Figure()));
            fig.x = 105 * x0;
            fig.y = 105 * y0;
            fig.id = arr[i];
            this.figures[y0][x0] = fig;
            fig.on("pointerup", this.mouseController);
            fig.interactive = true;
        }
        // Установка пустой ячейки
        this.figures[this.size - 1][this.size - 1] = null;
        this.empty = new Point(
            (this.maxIndex + 1) % this.size,
            Math.trunc((this.maxIndex + 1) / this.size)
        );
    }
    private shuffle(a: number, b: number): number {
        return Math.trunc(Math.random() * 16 - 8);
    }
    private checkChaos(arg: number[]): boolean {
        let first: number;
        let chaos: number = 0;
        for (let i: number = 0; i < this.maxIndex; i++) {
            first = arg[i];
            for (let j: number = i + 1; j < this.maxIndex + 1; j++) {
                chaos += Number(first > arg[j]);
            }
        }
        return Boolean(chaos % 2);
    }
    private keyController = (e: any) => {
        if (!this.holder.children.length) {
            return;
        }
        const key = keyboardKey.getKey(e);
        let fig: Figure;
        const oldEmpty: Point = this.empty.clone();
        switch (key) {
            case "ArrowLeft": // стрелка влево
                if (this.empty.x === this.size - 1 || !this.gameReadyState) {
                    return;
                }
                this.empty.x++;
                break;
            case "ArrowUp": // стрелка вверх
                if (this.empty.y === this.size - 1 || !this.gameReadyState) {
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
                this.newGame(this.randomInteger(2, 5));
                return;
                break;
            default:
                return;
        }
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
        for (let i: number = 0; i < this.maxIndex + 1; i++) {
            (x0 = i % this.size), (y0 = Math.trunc(i / this.size));
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
    private randomInteger(min: number, max: number) {
        // случайное число от min до (max+1)
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
}
