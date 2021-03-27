var angle1, angle2, angle3, v1, v2, v3;
var r1, r2, r3;
var theta1, theta2, theta3;
var sensr1, sensr3, sensr2;
var long1, long2, long3;
function setup() {
    p6_CreateCanvas();
    translate(width / 2, height / 2);
    background(0);
    sensr1 = 1;
    sensr2 = 1;
    sensr3 = 1;
    angle1 = random(-360, 360);
    angle2 = random(-360, 360);
    angle3 = random(-360, 360);
    long1 = random(1, 1.5);
    long2 = random(1, 1.5);
    long3 = random(0.5, 1.5);
    theta1 = random(1, 2);
    theta2 = random(1, 2);
    theta3 = random(0.5, 1.5);
    r1 = random(50, 130);
    r2 = random(150, 260);
    r3 = random(100, 220);
}
function windowResized() {
    p6_ResizeCanvas();
}
function draw() {
    frameRate(20);
    strokeWeight(1);
    translate(width / 2, height / 2);
    v1 = p5.Vector.fromAngle(radians(angle1), r1);
    v2 = p5.Vector.fromAngle(radians(angle2), r2);
    v3 = p5.Vector.fromAngle(radians(angle3), r3);
    noStroke();
    line(0, 0, v1.x, v1.y);
    noStroke();
    push();
    translate(v1.x, v1.y);
    line(0, 0, v2.x, v2.y);
    pop();
    stroke(255);
    push();
    translate(v2.x + v1.x, v2.y + v1.y);
    line(0, 0, v3.x, v3.y);
    pop();
    angle3 += theta3;
    angle2 -= theta2;
    angle1 -= theta1;
    sensr1 = normalSize(r1, 230, 50, sensr1);
    sensr2 = normalSize(r2, 270, 50, sensr2);
    sensr3 = normalSize(r3, 250, 50, sensr3);
    r1 += long1 * sensr1;
    r2 -= long2 * sensr2;
    r3 -= long3 * sensr3;
    if (frameCount == 10) {
        var alerte = createSpan("You can click on the canvas to stop the drawing");
        alerte.position(30, height / 2);
        alerte.style('padding', '5px');
        alerte.style('border', 'solid black 1px');
    }
}
function normalSize(rayon, condition1, condition2, sens) {
    if (abs(rayon) > condition1 || abs(rayon) < condition2) {
        console.log("là");
        sens = -sens;
    }
    return sens;
}
function mousePressed() {
    console.log("clic " + frameCount);
    if (frameCount > 250) {
        noLoop();
    }
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map