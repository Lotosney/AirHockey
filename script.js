
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
function animate() {
    board()    
    requestAnimationFrame(animate)
}

animate()