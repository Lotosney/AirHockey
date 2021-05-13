
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
 
    }

    draw() {
        context.beginPath()
        context.arc(this.x, this.y , width*.05 ,0 ,2*Math.PI)
        context.fillStyle = "red"
        context.fill()
        context.stroke()
    }

}
const player = new Player

function animate() {
    context.clearRect(0,0,width,height)
    player.draw()
    board()    
    requestAnimationFrame(animate)
}

animate()