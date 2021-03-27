// -------------------
//    Initialization
// -------------------
var angle1, angle2, angle3, v1, v2, v3;
let r1,r2,r3;
let theta1, theta2, theta3;
let sensr1, sensr3, sensr2;
let long1, long2, long3;

function setup() {
    p6_CreateCanvas()
    translate(width/2,height/2)
    background(0)
    
    // determine if value is negative or positive
    sensr1 = 1
    sensr2 = 1
    sensr3 = 1

    angle1 = random(-360,360)
    angle2 = random(-360,360)
    angle3 = random(-360,360)

    // values will be added to the values of radius
    long1 = random(1,1.5)
    long2 = random(1, 1.5)
    long3 = random(0.5,1.5)

    // values will be added to the values of angles
    theta1 = random(1,2)
    theta2 = random(1,2)
    theta3 = random(0.5,1.5)

    // radius 
    r1=random(50,130)
    r2=random(150,260)
    r3=random(100,220)
    
}

function windowResized() {
    p6_ResizeCanvas()
}

// -------------------
//       Drawing
// -------------------

function draw() {
    // for a slow drawing
    frameRate(20)  
    strokeWeight(1)
    translate(width/2,height/2)

    //creation of the 3 vectors for the 3 lines of the "arm" taking angle and radius as parameters
    v1 = p5.Vector.fromAngle(radians(angle1),r1)
    v2 = p5.Vector.fromAngle(radians(angle2),r2)
    v3 = p5.Vector.fromAngle(radians(angle3),r3)
    // drawing of the 3 lines according to the values of the vectors 
    noStroke()
    //stroke(255,0,0)
    line(0,0,v1.x,v1.y)
    //stroke(0,255,0)
    noStroke()
    push();
    translate(v1.x,v1.y)
    line(0,0,v2.x,v2.y)
    pop();
    //noStroke()
    stroke(255)
    push();
    translate(v2.x+v1.x,v2.y+v1.y)
    line(0,0,v3.x,v3.y)
    pop();

    // evolution of angles 
    angle3 += theta3
    angle2 -= theta2
    angle1 -= theta1

    // determine if the lines are out of the canvas : if that's the case the value takes its opposite
    sensr1 = normalSize(r1, 230, 50, sensr1)
    sensr2 = normalSize(r2, 270, 50, sensr2)
    sensr3 = normalSize(r3, 250, 50, sensr3)

    // evolution of the radius
    r1 += long1 * sensr1
    r2 -= long2 * sensr2
    r3 -= long3 * sensr3
    

    //message to stop the drawing
    if(frameCount==10){
        var alerte = createSpan("You can click on the canvas to stop the drawing");
        alerte.position(30, height/2)
        alerte.style('padding', '5px')
        alerte.style('border', 'solid black 1px')
    }
}

function normalSize(rayon, condition1, condition2, sens){
    if(abs(rayon) > condition1 || abs(rayon) < condition2){
        console.log("là")
        sens = -sens
    }
    return sens
}
// stop the drawing
function mousePressed(){
    console.log("clic " + frameCount )
    if(frameCount>250){
        noLoop();

    }
}
