let xRot = 0;
let yRot = 0;
let zRot = 0;

let magNum = 0;
let magnets = [];
let angles = [0, 110, -45, -90, 180, 135, 70];

let electronNum = 0;
let electrons = [];
let states = [1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1, 1,  1, -1, -1, 1, 1, -1, 1, -1, -1, 1];

let clearScreen = false;
let slider;

function setup() {
  createCanvas(1280, 720, WEBGL);
  slider = createSlider(1,10,1);
  img = loadImage('img/screen.jpg');

  frameRate(60);

}

function draw() {
  background(360);
  angleMode(DEGREES);
  orbitControl();
  // debugMode();
  drawNorth();
  drawSouth();
  drawScreen();


  if (frameCount > 20) {
    sendElectrons();
    // sendMagnets();
  }


}

function keyPressed() {
  if (keyCode === ENTER) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function drawNorth() {
  strokeWeight(4);
  stroke(192, 57, 43);
  fill(255,85,85);

  // front
  beginShape();
  vertex(100, -200, 250);
  vertex(-100, -200, 250);
  vertex(-100, -100, 250);
  vertex(0, -50, 250);
  vertex(100, -100, 250);
  endShape(CLOSE);

  // back
  beginShape();
  vertex(100, -200, -250);
  vertex(-100, -200, -250);
  vertex(-100, -100, -250);
  vertex(0, -50, -250);
  vertex(100, -100, -250);
  endShape(CLOSE);
  
  // top
  beginShape();
  vertex(100, -200, 250);
  vertex(-100, -200, 250);
  vertex(-100, -200, -250);
  vertex(100, -200, -250);
  endShape(CLOSE);
  
  // right
  beginShape();
  vertex(100, -200, 250);
  vertex(100, -100, 250);
  vertex(100, -100, -250);
  vertex(100, -200, -250);
  endShape(CLOSE);
  
  // left
  beginShape();
  vertex(-100, -200, 250);
  vertex(-100, -100, 250);
  vertex(-100, -100, -250);
  vertex(-100, -200, -250);
  endShape(CLOSE);
  
  // bottom-right
  beginShape();
  vertex(0, -50, 250);
  vertex(100, -100, 250);
  vertex(100, -100, -250);
  vertex(0, -50, -250);
  endShape(CLOSE);
  
  // bottom-left
  beginShape();
  vertex(0, -50, 250);
  vertex(-100, -100, 250);
  vertex(-100, -100, -250);
  vertex(0, -50, -250);
  endShape(CLOSE);
}

function drawSouth() {
  strokeWeight(4);
  stroke(41, 128, 185);
  fill(74,70,225);


  // front
  beginShape();
  vertex(100, 100, 250);
  vertex(-100, 100, 250);
  vertex(-100, 200, 250);
  vertex(100, 200, 250);
  endShape(CLOSE);

  // back
  beginShape();
  vertex(100, 100, -250);
  vertex(-100, 100, -250);
  vertex(-100, 200, -250);
  vertex(100, 200, -250);
  endShape(CLOSE);


  // top
  beginShape();
  vertex(100, 100, 250);
  vertex(-100, 100, 250);
  vertex(-100, 100, -250);
  vertex(100, 100, -250);
  endShape(CLOSE);

  // down
  beginShape();
  vertex(100, 200, -250);
  vertex(-100, 200, -250);
  vertex(-100, 200, 250);
  vertex(100, 200, 250);
  endShape(CLOSE);
  
  // right
  beginShape();
  vertex(100, 100, 250);
  vertex(100, 200, 250);
  vertex(100, 200, -250);
  vertex(100, 100, -250);
  endShape(CLOSE);
  
  // left
  beginShape();
  vertex(-100, 100, 250);
  vertex(-100, 200, 250);
  vertex(-100, 200, -250);
  vertex(-100, 100, -250);
  endShape(CLOSE);
}

function drawScreen() {
  strokeWeight(4);
  stroke(178, 186, 187);
  fill(220,220,220);
  // texture(img);


  //front
  // beginShape();
  // vertex(-150, -300, -451);
  // vertex(150, -300, -451);
  // vertex(150, 300, -451);
  // vertex(-150, 300, -451);
  // endShape(CLOSE);

  //back
  beginShape();
  vertex(-150, -300, -471);
  vertex(150, -300, -471);
  vertex(150, 300, -471);
  vertex(-150, 300, -471);
  endShape(CLOSE);


}

function rotateAppZ(degree) {
  xRot += degree;
}

function rotateAppY(degree) {
  yRot += degree;
}

function rotateAppZ(degree) {
  zRot += degree;
}
  
function sendMagnets() {
  if (magnets.length === 0) {
    magnets[magNum] = new Magnet(angles[magNum]);
  }
  
  if (magNum < angles.length-1 && magnets[magNum].z <= -450) {
    magNum++;
    magnets[magNum] = new Magnet(angles[magNum]);
  }
  
  if (!clearScreen) {
    magnets.forEach(magnet => magnet.move());
  }
}
  
function sendElectrons() {
  if (electrons.length === 0) {
    electrons[electronNum] = new Electron(states[electronNum]);
  }
  
  if (electronNum < states.length-1 && electrons[electronNum].z <= -450) {
    electronNum++;
    electrons[electronNum] = new Electron(states[electronNum]);
  }
  
  if (!clearScreen) {
    for(var i=1;i<=slider.value();i++)
    electrons.forEach(electron => electron.move());
  }
}

class Magnet {
  constructor(angle) {
    this._angle = angle;
    this._y = 30;
    this._z = 300;
    this._yVel = 0;
  }
  
  get z() {
    return this._z;
  }
  
  move() {
    // change variables
    let onScreen = (this._z <= -450);
    if (!onScreen) {
      this._z -= 10;
      this._y -= cos(this._angle) * this._yVel;
      this._yVel += 0.02;
    }
    
    // redraw
    noStroke();
    push(); // south side
    fill(41, 128, 185);
    translate(0, this._y, this._z);
    onScreen ? rotateY(0) : rotateY(-yRot);
    rotateZ(this._angle);
    translate(0, -20, 0);
    plane(30, 40);
    pop();

    rotateY(0);

    push(); // north side
    fill(192, 57, 43);
    translate(0, this._y, this._z);
    onScreen ? rotateY(0) : rotateY(-yRot);
    rotateZ(this._angle);
    translate(0, 20, 0);
    plane(30, 40);
    pop();
  }
}

class Electron {
  constructor(state) {
    this._state = state;
    this._y = 30;
    this._z = 300;
    this._yVel = 0;
  }
  
  get z() {
    return this._z;
  }
  
  move() {
    // change variables
    if (!(this._z <= -450)) {
      this._z -= 10;
      this._yVel += 0.02;
      this._y -= this._state * this._yVel;


    }
    
    // redraw
    push();
    noStroke();
    fill(244, 208, 63);
    translate(0, this._y, this._z);
    sphere(10);
    pop();
  }
}
