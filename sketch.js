let cellSize = 150; // Dimensione fissa per ogni cella
let margin = 20; // Margine attorno alle forme
let gridWidth, gridHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100); //per una questione di comodità nel gestire i colori
  noLoop();
  
  // Calcola il numero di celle per larghezza e altezza
  gridWidth = floor((width - margin * 2) / cellSize);
  gridHeight = floor((height - margin * 2) / cellSize);
}

function draw() {
  background(0, 0, 95); // questo è il codice dello sfondo  
  
  
  let offsetX = (width - gridWidth * cellSize) / 2;// Calcola l'offset per centrare la griglia
  let offsetY = (height - gridHeight * cellSize) / 2;
  
  
  for (let i = 0; i < gridWidth; i++) { // Disegna ogni composizione nella sua cella della griglia
    for (let j = 0; j < gridHeight; j++) {
      push();
      translate(offsetX + i * cellSize + margin, offsetY + j * cellSize + margin);
      
      let size = cellSize - margin * 2;
      let circleRadius = size * 0.4;
      let numLines = floor(random(7, 13));
      let numCircles = floor(random(3, 6));
      
      // Disegna i cerchi più piccoli
      for (let k = 0; k < numCircles; k++) {
        drawSmallCircle(size, circleRadius);
      }
      
      // Disegna le linee curve
      for (let k = 0; k < numLines; k++) {
        drawCurvedLine(size, circleRadius);
      }
      
      pop();
    }
  }
}
function drawSmallCircle(size, circleRadius) {
  let hue = random(0, 20);
  let saturation = random(70, 100);
  let brightness = random(70, 100);
  fill(hue, saturation, brightness);
  noStroke();
  
  let angle = random(TWO_PI); //due pi greco per garantire ogni angolo del cerchio
  let r = random(circleRadius * 0.8);
  let x = size/2 + cos(angle) * r;
  let y = size/2 + sin(angle) * r;
  
  let diameter = random(size * 0.05, size * 0.15);
  
  ellipse(x, y, diameter, diameter);
}

function drawCurvedLine(size, circleRadius) {
  let hue = random(200, 240); 
  let saturation = random(50, 100);
  let brightness = random(70, 100);
  stroke(hue, saturation, brightness);
  
  strokeWeight(random(1, 3));
  noFill();
  beginShape();
  
  let startAngle = random(TWO_PI); //questo garantisce che la linea parta in un punto della circonferenza
  let startX = size/2 + cos(startAngle) * circleRadius;
  let startY = size/2 + sin(startAngle) * circleRadius;
  
  let endAngle = random(TWO_PI); //questo invece garantisce che la linea finisca in un punto della circonferenza
  let endX = size/2 + cos(endAngle) * circleRadius;
  let endY = size/2 + sin(endAngle) * circleRadius;
  
  curveVertex(startX, startY);
  curveVertex(startX, startY);
  
  for (let i = 0; i < 2; i++) {
    let angle = random(TWO_PI);
    let r = random(circleRadius);
    let controlX = size/2 + cos(angle) * r;
    let controlY = size/2 + sin(angle) * r;
    curveVertex(controlX, controlY);
  }
  
  curveVertex(endX, endY);
  curveVertex(endX, endY);
  
  endShape();
}

function mousePressed() {
  // Rigenera tutte le composizioni
  redraw();
  
}

function windowResized() {
  
  // Ricalcola le dimensioni della griglia
  gridWidth = floor((width - margin * 2) / cellSize);
  gridHeight = floor((height - margin * 2) / cellSize);
  // Ridisegna l'intera scena
  setup(); // Richiama la funzione setup per ricalcolare le dimensioni e le celle
  redraw(); // Ridisegna la scena 
  
}
