/** thông số của game */
export class GameConfig {
  /** kích thước của 1 pixel trong game */
  readonly GRID: number
  /** độ rộng của khung trò chơi */
  readonly canvas_width:number
  /** độ cao của khung trò chơi */
  readonly canvas_height:number

  constructor(GRID: number, canvas_width:number, canvas_height:number) {
    this.GRID = GRID
    this.canvas_width = canvas_width
    this.canvas_height = canvas_height
  }
}
