import { GameConfig } from "./gameConfig";

export class Apple{

    static #instance: Apple

    readonly #GRID:number

    /** vị trí ban đầu của apple */
    readonly #ORIGIN_APPLE = {
        /** vị trí ban đầu của apple trên trục x | trục hoành */
        x: 320,
        /** vị trí ban đầu của apple trên trục y | trục tung */
        y: 320
    }

    /** vị trí của apple theo trục x */ 
    #x: number
    /** vị trí của apple theo trục y */ 
    #y: number

    constructor(gameConfig: GameConfig){
        this.#GRID = gameConfig.GRID
        this.#x = this.#ORIGIN_APPLE.x
        this.#y = this.#ORIGIN_APPLE.y
    }

    static getInstance(gameConfig: GameConfig): Apple {
        if (!Apple.#instance) {
            Apple.#instance = new Apple(gameConfig);
        }
        return Apple.#instance;
    }

    public get x(): number {
        return this.#x
    }

    public get y(): number {
        return this.#y
    }

    /** hàm tạo số nguyên ngẫu nhiên trong 1 khoảng */
    getRandomInt(min:number, max:number):number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /** hàm tạo vị trí ngẫu nhiên cho apple */
    randomPosition() {
        this.#x = this.getRandomInt(0, 25) * this.#GRID
        this.#y = this.getRandomInt(0, 25) * this.#GRID
    }
}