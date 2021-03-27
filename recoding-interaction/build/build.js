var gui = new dat.GUI({ name: 'Interactivity' });
var params = {
    r1: 0,
    r2: 0,
    r3: 0,
    angle1: 0,
    angle2: -1,
    angle3: -1.5,
    frameRate: 25,
    strokeWeight: 1.5,
    Download_Image: function () { return save(); },
    Stop_Drawing: function () { return stopDraw(); },
    Reset_Drawing: function () { return resetDraw(); }
};
gui.add(params, "r1", -2, 2, 0.1);
gui.add(params, "r2", -3, 3, 0.1);
gui.add(params, "r3", -3, 3, 1);
gui.add(params, "angle1", -2, 2, 0.1);
gui.add(params, "angle2", -1, 2, 0.1);
gui.add(params, "angle3", -1.5, 1.5, 0.1);
gui.add(params, "frameRate", 20, 50, 10);
gui.add(params, "strokeWeight", 0.5, 2, 0.5);
gui.add(params, "Stop_Drawing");
gui.add(params, "Reset_Drawing");
gui.add(params, "Download_Image");
var angle1, angle2, angle3, v1, v2, v3;
var r1, r2, r3;
var button, reset;
var sensr2, sensr3, sensr1;
function setup() {
    p6_CreateCanvas();
    translate(width / 2, height / 2);
    background(0);
    angle1 = random(-360, 360);
    angle2 = random(-360, 360);
    angle3 = random(-360, 360);
    sensr1 = 1;
    sensr2 = 1;
    sensr3 = 0.5;
    r1 = 100;
    r2 = 250;
    r3 = 170;
}
function windowResized() {
    p6_ResizeCanvas();
}
function draw() {
    frameRate(params.frameRate);
    strokeWeight(params.strokeWeight);
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
    sensr1 = AllerRetour(r1, v1, sensr1, 0, 0, 4);
    sensr2 = AllerRetour(r2, v2, sensr2, v1.x, v1.y, 2);
    var sommeX = v1.x + v2.x;
    var sommeY = v1.y + v2.y;
    sensr3 = AllerRetour(r3, v3, sensr3, sommeX, sommeY, 3);
    angle3 -= params.angle3;
    angle2 += params.angle2;
    angle1 -= params.angle1;
    r1 -= params.r1 * sensr1;
    r2 += params.r2 * sensr2;
    r3 -= params.r3 * sensr3;
}
function AllerRetour(rayon, vect, sens, originX, originY, ratio) {
    if (abs(originX + vect.x) > width / ratio - 5 || abs(originY + vect.y) > height / ratio - 5) {
        sens = -sens;
    }
    return sens;
}
function stopDraw() {
    noLoop();
}
function resetDraw() {
    clear();
    background(0);
    loop();
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