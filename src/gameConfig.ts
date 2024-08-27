export class GameConfig {
  readonly GRID: number
  readonly canvas_width:number
  readonly canvas_height:number

  constructor(GRID: number, canvas_width:number, canvas_height:number) {
    this.GRID = GRID
    this.canvas_width = canvas_width
    this.canvas_height = canvas_height

  }
}
