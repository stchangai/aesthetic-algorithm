// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI({name: 'Interactivity'})
const params = {
    r1:0,
    r2:0,
    r3:0,
    angle1:0,
    angle2:-1,
    angle3:-1.5,
    frameRate:25,
    strokeWeight:1.5,
    Download_Image: () => save(),
    Stop_Drawing: () => stopDraw(),
    Reset_Drawing: () => resetDraw()
}
gui.add(params, "r1", -2, 2, 0.1)
gui.add(params, "r2", -3, 3, 0.1)
gui.add(params, "r3", -3, 3, 1)
gui.add(params, "angle1", -2, 2, 0.1)
gui.add(params, "angle2", -1, 2, 0.1)
gui.add(params, "angle3", -1.5, 1.5, 0.1)
gui.add(params, "frameRate", 20, 50, 10)
gui.add(params, "strokeWeight", 0.5, 2, 0.5)
gui.add(params, "Stop_Drawing")
gui.add(params, "Reset_Drawing")
gui.add(params, "Download_Image")


// -------------------
//    Initialization
// -------------------
var angle1, angle2, angle3, v1, v2, v3;
let r1,r2,r3;
let button, reset;
let sensr2, sensr3, sensr1;

function setup() {
    p6_CreateCanvas()
    translate(width/2,height/2)
    background(0)
    

    angle1 = random(-360,360)
    angle2 = random(-360,360)
    angle3 = random(-360,360)

    sensr1 = 1
    sensr2 = 1
    sensr3 = 0.5

    r1=100
    r2=250
    r3=170
    
}

function windowResized() {
    p6_ResizeCanvas()
}

// -------------------
//       Drawing
// -------------------

function draw() {
    frameRate(params.frameRate)  
    strokeWeight(params.strokeWeight)
    translate(width/2,height/2)
    v1 = p5.Vector.fromAngle(radians(angle1),r1)
    v2 = p5.Vector.fromAngle(radians(angle2),r2)
    v3 = p5.Vector.fromAngle(radians(angle3),r3)
    noStroke()
    //stroke(255,0,0)
    line(0,0,v1.x,v1.y)
    //stroke(0,255,0)
    noStroke()
    push();
    translate(v1.x,v1.y)
    line(0,0,v2.x,v2.y)
    pop();
    stroke(255)
    push();
    translate(v2.x+v1.x,v2.y+v1.y)
    line(0,0,v3.x,v3.y)
    pop();
    

    sensr1 = AllerRetour(r1, v1, sensr1, 0, 0, 4)
    sensr2 = AllerRetour(r2, v2, sensr2, v1.x, v1.y, 2)
    var sommeX = v1.x+v2.x;
    var sommeY = v1.y+v2.y;
    sensr3 = AllerRetour(r3, v3, sensr3, sommeX, sommeY,3)

    angle3 -= params.angle3
    angle2 += params.angle2
    angle1 -= params.angle1

    r1 -= params.r1 * sensr1
    r2 += params.r2 * sensr2
    r3 -= params.r3 * sensr3
}

// fonction qui empêche les rayons de trop sortir de la fenêtre
function AllerRetour(rayon, vect, sens, originX, originY, ratio){
    if(abs(originX + vect.x)> width/ratio-5 || abs(originY + vect.y)>height/ratio-5){
        sens = -sens
    }
    return sens
}
function stopDraw(){
     noLoop()
}

function resetDraw(){
    clear()
    background(0)
    loop()
     
}

