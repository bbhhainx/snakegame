import { ORIGIN_SNAKE } from "./constant"

export class Snake {
    /** vị trí của rắn theo trục x */ 
    #x: number = ORIGIN_SNAKE.x
    /** vị trí của rắn theo trục y */ 
    #y: number = ORIGIN_SNAKE.y

    /** rắn di chuyển */
    #move(){
        console.log(123)
    }
}