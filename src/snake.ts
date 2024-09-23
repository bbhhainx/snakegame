import { GameConfig } from './gameConfig'

/** đối tượng rắn trong trờ chơi */
export class Snake {
  /** đối tương singleton */
  static #instance: Snake

  /** kích thước của 1 pixel */
  readonly #GRID: number

  /** độ rộng của khung trò chơi */
  readonly #canvas_width: number

  /** độ cao của khung trò chơi */
  readonly #canvas_height: number

  /** vị trí ban đầu của rắn */
  readonly #ORIGIN_SNAKE: SnakeCell

  /** vị trí của rắn theo trục x */
  #x: number
  /** vị trí của rắn theo trục y */
  #y: number
  /** chiều dài của rắn khởi tạo là 4 */
  #length: number
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
    this.#canvas_height = gameConfig.canvas_height
    this.#ORIGIN_SNAKE = {
      x: 160,
      y: 160,
    }
    this.#x = this.#ORIGIN_SNAKE.x
    this.#y = this.#ORIGIN_SNAKE.y
    this.#length = 4
    this.#dx = gameConfig.GRID
    this.#dy = 0
    this.#cells = [{ x: this.#ORIGIN_SNAKE.x, y: this.#ORIGIN_SNAKE.y }]
  }

  /** tạo đối tương singleton */
  static getInstance(gameConfig: GameConfig): Snake {
    if (!Snake.#instance) {
      Snake.#instance = new Snake(gameConfig)
    }
    return Snake.#instance
  }

  public get dx() {
    return this.#dx
  }

  public get dy() {
    return this.#dy
  }

  public get cells(): SnakeCell[] {
    return this.#cells
  }

  /** rắn di chuyển */
  public move(): void {
    this.#x += this.#dx
    this.#y += this.#dy

    // kiểm tra chạm với tường
    // Kiểm tra va chạm với tường trái
    if (this.#x < 0) {
      this.#x = this.#canvas_width - this.#GRID
    } 

    // Kiểm tra va chạm với tường phải
    if (this.#x >= this.#canvas_width) {
      this.#x = 0
    }

    // Kiểm tra va chạm với các bức tường trên
    if (this.#y < 0) {
      this.#y = this.#canvas_height - this.#GRID
    }
    
    // Kiểm tra va chạm với các bức tường dưới
    if (this.#y >= this.#canvas_height) {
      this.#y = 0
    }

    // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng
    this.#cells.unshift({ x: this.#x, y: this.#y })

    // thêm 1 ô vuông phía trc thì phải remove 1 cái phía sau để snake move dc.
    if (this.#cells.length > this.#length) {
      this.#cells.pop()
    }
  }

  /** rắn di chuyển lên */
  public moveUp(): void {
    this.#dx = 0
    this.#dy = -this.#GRID
  }

  /** rắn di chuyển xuống */
  public moveDown(): void {
    this.#dx = 0
    this.#dy = this.#GRID
  }

  /** rắn di chuyển trái */
  public moveLeft(): void {
    this.#dx = -this.#GRID
    this.#dy = 0
  }

  /** rắn di chuyển phải */
  public moveRight(): void {
    this.#dx = this.#GRID
    this.#dy = 0
  }

  /** có phải đang di chuyển theo chiều ngang không */
  public isXMoving(): boolean {
    return this.#dx !== 0
  }

  /** có phải đang di chuyển theo chiều dọc không */
  public isYMoving(): boolean {
    return this.#dy !== 0
  }

  /** rắn ăn táo */ 
  public eatApple(apple: Position): boolean {
    // If the snake head is at the same position as the apple
    if (this.#x === apple.x && this.#y === apple.y) {
      this.#length++ // Increase the snake's maximum length
      return true // Indicate that the apple was eaten
    }
    return false // Indicate that the apple was not eaten
  }

  /** kiểm tra đầu chạm vào thân thì reset */ 
  public hitSelf(): void {
    this.#cells?.forEach((cell, index) => {
      if (index === 0) return

      if (cell.x === this.#cells[0].x && cell.y === this.#cells[0].y) {
        this.#x = this.#ORIGIN_SNAKE.x

        this.#y = this.#ORIGIN_SNAKE.y

        this.#cells = [{ x: this.#ORIGIN_SNAKE.x, y: this.#ORIGIN_SNAKE.x }]

        this.#length = 4

        this.#dx = 16

        this.#dy = 0
      }
    })
  }
}
