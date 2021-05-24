
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
    context.rect(width/3, 0, width/3, height/20)
    context.moveTo(width/3, 0)
    context.rect(width/3, height-height/20 , width/3, height)
    context.font = '48px serif';
    context.fillText(computer.score, width/15, height/15)
    context.fillText(player.score, width/15, height - height/16)
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
        this.score = 0

 
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

        const Pa = Math.abs(this.x - player.x)
        const Pb = Math.abs(this.y - player.y)
        const Pc = Math.sqrt(Pa**2 + Pb**2)
        const Ca = Math.abs(this.x - player.x)
        const Cb = Math.abs(this.y - player.y)
        const Cc = Math.sqrt(Ca**2 + Cb**2)

        if(this.y - width*.04 < 0) {
        if(this.x > width/3 && this.x < 2*width/3) {
            computer.score++
            puck.x = width/2
            puck.y = height/2
            puck.dx = 0
            puck.dy = 0
        } 

    } else if (this.y + width*.04 > height) {

        if(this.x > width/3 && this.x < 2*width/3) {
            player.score++
            puck.x = width/2
            puck.y = height/2
            puck.dx = 0
            puck.dy = 0
        } 
    }
        if(this.x + width*.04 > width || this.x - width*.04 < 0) {
            this.dx *= -1
        }

        if(this.y + width*.04 > height || this.y - width*.04 < 0) {
            this.dy *= -1
        }
        if(Pc < width*.04 + width*.05) {
            player.dx === 0 ? this.dx *= -1 : this.dx += player.dx * .5
            player.dy === 0 ? this.dy *= -1 : this.dy += player.dy * .5
        } else if (Cc < width*.04 + width*.05) {
            computer.dx === 0 ? this.dx *= -1 : this.dx += computer.dx * .5
            computer.dy === 0 ? this.dy *= -1 : this.dy += computer.dy * .5
        }
        Math.sign(this.dx) === 1 ? this.dx -= .1 : this.dx += .1
        Math.sign(this.dy) === 1 ? this.dy -= .1 : this.dy += .1
    }
}

class Computer{
    constructor() {
        this.x = width/4
        this.y = height/5
        this.dx = 3
        this.dy = 3
        this.homePosition = {
            x: width/2,
            y: height/10
        }
        this.score = 0
    }

    draw() {
        context.beginPath()
        context.arc(this.x, this.y , width*.05 ,0 ,2*Math.PI)
        context.fillStyle = "blue"
        context.fill()
        context.stroke()
    }
    update() {


        if (Math.sign(puck.dy) === 1) {
            this.retract()

        } else if (puck.y < this.y) {
            this.retract()

        } else if(Math.sign(puck.dy) === -1 && puck.y < height/2) {
            
            this.strike()

        }


    }
    strike() {
        
        const relativeX = puck.x - this.x
        const relativeY = puck.y - this.y
        const theta = Math.atan(relativeX/relativeY)
        const vector = 10 
        this.dx = vector*Math.sin(theta)
        this.dy = vector*Math.cos(theta)
        
        this.x += this.dx
        this.y += this.dy
    }
    retract() {
        this.dx = 3
        this.dy = 3
        this.x += this.x > this.homePosition.x ? this.dx*-1 : this.dx
        this.y += this.y > this.homePosition.y ? this.dy*-1 : this.dy
    }
}
const player = new Player
const puck = new Puck
const computer= new Computer

function animate() {
    context.clearRect(0,0,width,height)
      
    board()

    player.draw()
    player.update()
    
    computer.draw()
    computer.update()

    puck.draw()
    puck.update()
    
    requestAnimationFrame(animate)
}

animate()

