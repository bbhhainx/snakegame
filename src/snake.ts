import { GameConfig } from "./gameConfig";

export class Snake {
    static #instance: Snake;

    readonly #GRID:number

    readonly #canvas_width:number

    /** vị trí ban đầu của rắn */
    readonly #ORIGIN_SNAKE = {
        /** vị trí ban đầu của rắn trên trục x | trục hoành */
        x: 160,
        /** vị trí ban đầu của rắn trên trục y | trục tung */
        y: 160
    }

    /** vị trí của rắn theo trục x */ 
    #x: number;
    /** vị trí của rắn theo trục y */ 
    #y: number
    /** chiều dài của rắn khởi tạo là 4 */
    #length:number
    /** thân rắn chứa các điểm để cấu tạo nên rắn */
    #cells: SnakeCell[] = []

    /** Hướng di chuyển của rắn theo trục x
     *  Nếu lớn hơn 0 là sang phải
     *  Nhỏ hơn 0 là sang trái
     */
    #dx: number

    /** Hướng di chuyển của rắn theo trục x
     *  Nếu lớn hơn 0 là đi xuống
     *  Nhỏ hơn 0 là đi lên
     */
    #dy: number

    /** khởi tạo các thuộc tính */
    constructor(gameConfig: GameConfig) {
        this.#GRID = gameConfig.GRID
        this.#canvas_width = gameConfig.canvas_width

        
        this.#x = this.#ORIGIN_SNAKE.x
        this.#y = this.#ORIGIN_SNAKE.y
        this.#length = 4
        this.#dx = gameConfig.GRID
        this.#dy = 0
    }

    static getInstance(gameConfig: GameConfig): Snake {
        if (!Snake.#instance) {
            Snake.#instance = new Snake(gameConfig);
        }
        return Snake.#instance;
    }

    /** rắn di chuyển */
    public move(): void {
        this.#x += this.#dx
        this.#y += this.#dy

        // kiểm tra chạm với tường
        // Kiểm tra va chạm với tường
        if (this.#x < 0) {
            this.#x = this.#canvas_width - this.#GRID;
        } else if (this.#x >= this.#canvas_width) {
            this.#x = 0;
        }
    }

    /** rắn di chuyển lên */
    public moveUp(): void {
        this.#dx = 0
        this.#dy = - this.#GRID
    }

    /** rắn di chuyển xuống */
    public moveDown(): void {
        this.#dx = 0
        this.#dy = this.#GRID
    }

    /** rắn di chuyển trái */
    public moveLeft(): void {
        this.#dx = - this.#GRID
        this.#dy = 0
    }

    /** rắn di chuyển phải */
    public moveRight(): void {
        this.#dx = this.#GRID
        this.#dy = 0
    }


}