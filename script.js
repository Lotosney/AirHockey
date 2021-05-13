
const canvas = document.createElement('canvas')
const width = canvas.width = 500
const height = canvas.height = 700
document.body.appendChild(canvas)
const context = canvas.getContext('2d')

const board = () => {
    context.beginPath()
    context.arc(width/2, height/2 ,width/10 ,0 , 2*Math.PI)
    context.moveTo(0,height/2)
    context.lineTo(width,height/2)
    context.moveTo(width/3, 0)

    context.stroke()
}

window.addEventListener('mousemove', (e) => {
    player.x = e.x - window.innerWidth/2 + width/2
    player.y = e.y - height*.05
}) 
class Player {
    constructor() {
        this.x = undefined
        this.y = undefined
        this.prevX = undefined
        this.prevY = undefined
        this.dx = undefined
        this.dy = undefined
 
    }

    draw() {
        context.beginPath()
        context.arc(this.x, this.y , width*.05 ,0 ,2*Math.PI)
        context.fillStyle = "red"
        context.fill()
        context.stroke()
    }
    update() {
        this.dx = this.x - this.prevX
        this.dy = this.y - this.prevY
        this.prevX = this.x
        this.prevY = this.y
    }

}

class Puck {

    constructor() {
        this.x = width/2
        this.y = height/2
        this.dx = 1
        this.dy = 1
    }

    draw() {
        context.beginPath()
        context.arc(this.x, this.y , width*.04 ,0 ,2*Math.PI)
        context.fillStyle = "black"
        context.fill()
        context.stroke()
    }
    update(){
        this.x +=this.dx
        this.y += this.dy
        if(this.x + width*.04 > width || this.x - width*.04 < 0) {
            this.dx *= -1
        }

        if(this.y + width*.04 > height || this.y - width*.04 < 0) {
            this.dy *= -1
        }
    }
}
const player = new Player
const puck = new Puck

function animate() {
    context.clearRect(0,0,width,height)
    player.draw()
    player.update()

    puck.draw()
    puck.update()
    board()    
    requestAnimationFrame(animate)
}

animate()