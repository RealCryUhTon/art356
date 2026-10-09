let url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_9w3JnwwYBqVPQ_pHh5WhCfp4i24bWy73tPcSQLEuxYHr5BQX5HuUl78CuOlyyKMr7ooVFA-LSemK/pub?output=csv";
let nextB;
let backB;
let foodTable;
let dataCircles = [];
let currentRow = 0;


// PLEASE NOTE: 
// AI assisted for developing the code for visualizing the data.
// Specifically the visuals for putting the data in circles, and the title of the current food. Loading the data, Handling the index and cycling through the options of food was self-made.

function preload() {
  foodTable = loadTable(url, 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth * .8, windowHeight * .75);
  nextB = new Button(width * .9, height * .5, 200, 75, 'NEXT', incrementIndex);
  backB = new Button(width * .1, height * .5, 200, 75, 'BACK', decrementIndex);

  updateCircles();
}

function draw() {
  background(240);
  nextB.display();
  backB.display();
  
  fill(50);
  noStroke();
  textSize(20);
  textAlign(LEFT, TOP);
  if (foodTable.getRowCount() > 0) {
    text("Visualizing: " + foodTable.getRow(currentRow).getString("Name"), 20, 20);
  }
  
  for (let circle of dataCircles) {
    circle.update();
    circle.over();
    circle.show();
  }
}

function updateCircles() {
  dataCircles = []; 
  
  if (foodTable.getRowCount() > 0) {
    let cRow = foodTable.getRow(currentRow);
    let trackingColumns = ['Calories', 'Sugar', 'Carbs', 'Sodium', 'Protein']; 

    for (let i = 0; i < trackingColumns.length; i++) {
      let colName = trackingColumns[i];
      let value = cRow.getNum(colName);
      
      let x = width * .25 + i * 160;
      let y = height * .75;
      
      let diameter = map(value, 0, 500, 30, 150); 
      
      dataCircles.push(new DraggableCircle(x, y, diameter, colName, value));
    }
  }
}


function incrementIndex(){
  if(currentRow < foodTable.getRowCount() - 1){
      currentRow++;
  }else{
    currentRow = 0;
  }

  updateCircles();
  return currentRow;
}

function decrementIndex(){
  if(currentRow == 0){
      currentRow = foodTable.getRowCount() - 1;
  }else{
    currentRow --;
  }

  updateCircles();
  return currentRow;
}


function mousePressed() {
  for (let circle of dataCircles) {
    circle.pressed();
  }

  nextB.checkClick();
  backB.checkClick();
}

function mouseReleased() {
  for (let circle of dataCircles) {
    circle.released();
  }
}


class DraggableCircle {
  constructor(x, y, diameter, label, val) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.radius = diameter / 2;
    this.label = label;
    this.value = val;
    
    this.dragging = false;
    this.rollover = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }
  
  over() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    this.rollover = (d < this.radius);
  }
  
  update() {
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }
  
  show() {
    stroke(0);
    strokeWeight(2);
    
    if (this.dragging) {
      fill(100, 150, 255);
    } else if (this.rollover) {
      fill(150, 200, 255);
    } else {
      fill(255, 204, 0);
    }
    
    ellipse(this.x, this.y, this.diameter);
    
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(this.label, this.x, this.y - 10);
    textSize(12);
    text(this.value, this.x, this.y + 10);
  }
  
  pressed() {
    if (this.rollover) {
      this.dragging = true;
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }
  
  released() {
    this.dragging = false;
  }
}

//GENERIC
class Button {
  constructor(x, y, w, h, label, onClickAction) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.onClickAction = onClickAction;

    this.baseColor = color(240);
    this.hoverColor = color(200);
    this.textColor = color(0);
  }

  display() {
    let isHovered = this.isMouseOver();
    
    fill(isHovered ? this.hoverColor : this.baseColor);
    
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 5);

    noStroke();
    fill(this.textColor);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.label, this.x, this.y);
  }

  isMouseOver() {
    return (
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2
    );
  }

  checkClick() {
    if (this.isMouseOver() && this.onClickAction) {
      this.onClickAction();
    }
  }
}
