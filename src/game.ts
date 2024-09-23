import { Apple } from './apple'
import { GameConfig } from './gameConfig'
import { Snake } from './snake'

export class Game extends GameConfig {
  #canvas: HTMLCanvasElement
  #context: CanvasRenderingContext2D

  #snake: Snake
  #apple: Apple

  #count: number

  constructor() {
    super(16, 400, 400)
    this.#canvas = document.querySelector('canvas') as HTMLCanvasElement
    this.#context = this.#canvas.getContext('2d') as CanvasRenderingContext2D
    this.#count = 0
    this.#snake = Snake.getInstance({
      canvas_height: this.canvas_height,
      canvas_width: this.canvas_width,
      GRID: this.GRID,
    })
    this.#apple = Apple.getInstance({
      canvas_height: this.canvas_height,
      canvas_width: this.canvas_width,
      GRID: this.GRID,
    })
  }

  #gameLoop(): void {
    window.requestAnimationFrame(this.#gameLoop.bind(this))

    if (++this.#count < 4) {
      return // Bỏ qua đến khung hình tiếp theo mà không xử lý thêm
    }

    this.#count = 0

		this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

		this.#snake.move();

    this.#snake.hitSelf();

		if (this.#snake.eatApple(this.#apple)) {
      this.#apple.randomPosition();
    }

		this.drawApple();
    this.drawSnake();

  }

  #handleKeyDown(e: KeyboardEvent): void {    
    switch (e.key) {
      case 'ArrowLeft': // Phím mũi tên trái
        // Đảm bảo rắn không đang di chuyển theo chiều ngang
        if (!this.#snake.isXMoving()) {
          this.#snake.moveLeft()
        }
        break
      case 'ArrowUp': // Phím mũi tên lên
        // Đảm bảo rắn không đang di chuyển theo chiều dọc
        if (this.#snake.dy === 0) {
          this.#snake.moveUp()
        }
        break
      case 'ArrowRight': // Phím mũi tên phải
        // Đảm bảo rắn không đang di chuyển theo chiều ngang
        if (this.#snake.dx === 0) {
          this.#snake.moveRight()
        }
        break
      case 'ArrowDown': // Phím mũi tên xuống
        // Đảm bảo rắn không đang di chuyển theo chiều dọc
        if (this.#snake.dy === 0) {
          this.#snake.moveDown()
        }
        break
    }
  }

  // Phương thức để vẽ rắn trên canvas
  drawSnake(): void {    
    this.#context.fillStyle = 'green' // Thiết lập màu sắc cho rắn
    this.#snake.cells.forEach((cell, index) => {
      // Duyệt qua mỗi phần thân rắn
      this.#context.fillRect(cell.x, cell.y, this.GRID - 1, this.GRID - 1) // Vẽ hình chữ nhật cho mỗi phần thân rắn
    })
  }

  // Phương thức để vẽ apple trên canvas
  drawApple(): void {
    this.#context.fillStyle = 'red' // Thiết lập màu sắc cho apple
    this.#context.fillRect(
      this.#apple.x,
      this.#apple.y,
      this.GRID - 1,
      this.GRID - 1
    ) // Vẽ hình chữ nhật cho apple
  }

  public runGame(): void {
    window.requestAnimationFrame(this.#gameLoop.bind(this))
    document.addEventListener('keydown', this.#handleKeyDown.bind(this))
  }
}
