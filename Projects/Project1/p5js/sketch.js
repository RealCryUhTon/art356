//------------------------------------------------INITS


//init slider
let betSlider;

//init chips
let baseChips = 200;
let currentChips = 0;
let maxWonChips = 0;

//init text
let scoreT = 'Chips: ';
let highscoreT = 'Highscore: ';
let betT = ' - Currently Betting';
let pointT = 'Bet on Point';
let passT = 'Bet on Pass';
let rollT = 'Roll';
let preRollT = 'Place a Bet First';
let pointVT = 'Point Line: ';
let diceVT = 'Rolled: ';

//init dice values
let canRoll = true;
let isRolling = false;
let diceVal = 0;
let pointSet = false;
let pointVal = 0;
let pointTry = 3;

//set game desc text
let gameDesc = "HANDBOOK:\n\n7 - Win | x3 Multiplier\n11 - Win | x3 Multiplier\n\n2 - Loss\n3 - Loss\n12 - Loss\n\n4 - Set Point Line\n5 - Set Point Line\n6 - Set Point Line\n8 - Set Point Line\n9 - Set Point Line\n10 - Set Point Line";

//---------------------------------------------------COMMON METHODS

//compiled common text methods
function drawText(T, S, F, x, y){
  textSize(S);
  fill(F);
  text(T, x, y);
}

//advanced version allow RGB args for fill()
function drawTextA(T, S, f1, f2, f3, x, y){
  textSize(S);
  fill(f1, f2, f3);
  text(T, x, y);
}

//----------------------------------------------------------APP METHODS

//update slider min max if args are valid; else set 0 - 1000
function updateSliderBet(min, max){
  if(min){
      betSlider.attribute('min', min);
  }else{
    betSlider.attribute('min', 0);
  }

  if(max){
    betSlider.attribute('max', max);
  }else{
    betSlider.attribute('max', 0);
  }

  if(max && min){
    betSlider.elt.step = round(max * 0.005);
  }
}

//update dice render based on input value
function drawDice(val){
  //subtratced by 2 becuase that is min of 2d6.
  switch(val - 2){
    case 0: //ROLLED 2
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 2, height / 2, 10);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.5, height / 1.7, 10);
      break;
    case 1: // ROLLED 3
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.95, height / 1.95, 10);
      circle(width / 2.05, height / 2.05, 10);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.5, height / 1.7, 10);
      break;
    case 2: //ROLLED A 4
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.95, height / 1.95, 10);
      circle(width / 2.05, height / 2.05, 10);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.4, height / 1.75, 10);
      circle(width / 2.6, height / 1.65, 10);
      break;
    case 3://ROLLED A 5
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.92, height / 1.9, 10);
      circle(width / 2.1, height / 2.12, 10);
      circle(width / 2, height / 2, 10);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.4, height / 1.75, 10);
      circle(width / 2.6, height / 1.65, 10);
      break;
    case 4://ROLLED A 6
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.92, height / 1.9, 10);
      circle(width / 2.1, height / 2.12, 10);
      circle(width / 2, height / 2, 10);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.37, height / 1.78, 10);
      circle(width / 2.65, height / 1.63, 10);
      circle(width / 2.5, height / 1.7, 10);
      
      break;
    case 5://ROLLED A 7
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.92, height / 1.9, 10);
      circle(width / 2.1, height / 2.12, 10);
      circle(width / 2.1, height / 1.9, 10);
      circle(width / 1.92, height / 2.12, 10);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.37, height / 1.78, 10);
      circle(width / 2.65, height / 1.63, 10);
      circle(width / 2.5, height / 1.7, 10);
      
      break;
    case 6://ROLLED A 8
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.92, height / 1.9, 10);
      circle(width / 2.1, height / 2.12, 10);
      circle(width / 2.1, height / 1.9, 10);
      circle(width / 1.92, height / 2.12, 10);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.37, height / 1.78, 10);
      circle(width / 2.65, height / 1.63, 10);
      circle(width / 2.37, height / 1.63, 10);
      circle(width / 2.65, height / 1.78, 10);
      
      break;
    case 7://ROLLED A 9
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.92, height / 1.9, 10);
      circle(width / 2.1, height / 2.12, 10);
      circle(width / 2.1, height / 1.9, 10);
      circle(width / 1.92, height / 2.12, 10);
      circle(width / 2, height / 2, 10);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.37, height / 1.78, 10);
      circle(width / 2.65, height / 1.63, 10);
      circle(width / 2.37, height / 1.63, 10);
      circle(width / 2.65, height / 1.78, 10);
      
      break;
    case 8://ROLLED A 10
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.92, height / 1.9, 10);
      circle(width / 2.1, height / 2.12, 10);
      circle(width / 2.1, height / 1.9, 10);
      circle(width / 1.92, height / 2.12, 10);
      circle(width / 2, height / 2, 10);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.37, height / 1.78, 10);
      circle(width / 2.65, height / 1.63, 10);
      circle(width / 2.37, height / 1.63, 10);
      circle(width / 2.65, height / 1.78, 10);
      circle(width / 2.5, height / 1.7, 10);

      break;
    case 9://ROLLED A 11
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.92, height / 2.12, 9);
      circle(width / 1.92, height / 2, 9);
      circle(width / 1.92, height / 1.9, 9);
      circle(width / 2.1, height / 2.12, 9);
      circle(width / 2.1, height / 2, 9);
      circle(width / 2.1, height / 1.9, 9);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.37, height / 1.78, 10);
      circle(width / 2.65, height / 1.63, 10);
      circle(width / 2.37, height / 1.63, 10);
      circle(width / 2.65, height / 1.78, 10);
      circle(width / 2.5, height / 1.7, 10);

      
      break;
    case 10://ROLLED A 12
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      fill(0);
      circle(width / 1.92, height / 2.12, 9);
      circle(width / 1.92, height / 2, 9);
      circle(width / 1.92, height / 1.9, 9);
      circle(width / 2.1, height / 2.12, 9);
      circle(width / 2.1, height / 2, 9);
      circle(width / 2.1, height / 1.9, 9);

      //d2
      rectMode(CENTER);
      fill(255);
      rect(width / 2.5, height / 1.7, 50, 50);
      fill(0);
      circle(width / 2.37, height / 1.78, 9);
      circle(width / 2.37, height / 1.7, 9);
      circle(width / 2.37, height / 1.63, 9);
      circle(width / 2.65, height / 1.78, 9);
      circle(width / 2.65, height / 1.7, 9);
      circle(width / 2.65, height / 1.63, 9);
      
      break;
    default: //draw empty 1d6 on invalid case
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, 50, 50);
      
  }
}

//try to take player chips based on arg
function loseChips(x){
  if(pointSet == false){
        if(x && x > 0){
      if(currentChips > x){
        currentChips = currentChips - x;
        canRoll = true;
      }else{
        currentChips = 0;
      }
    }else{
      return;
    }
  }else{
    return;
  }
}

//update maxWonChips
function updateMaxWon(x){
  maxWonChips = x + maxWonChips;
}

//try to award player chips based on arg
function winChips(x){
    if(x && x > 0){
    currentChips = currentChips + x;
    updateMaxWon(x);
    canRoll = true;
  }
}

function resetPointTry(){
  pointTry = 3;
  console.log("---POINT TRY RESET---");
}

//Update drawDice with bet value, subtract bet amount from currentChips
function roll(){
  //init local bet amount
  let b = betSlider.value();
  
  //check if player can bet, halt betting, take chips, update dice & slider, execute bet.
  if(canRoll == true){
    //need to set diceVal first before betting
    diceVal = int(random(2, 13));
    canRoll = false;
    loseChips(b);
    betChips(b);
    updateSliderBet(0, currentChips);

    
    
  }else{
    console.log("CAN'T BET!");
    return;
  }

  //DEBUG
  console.log("//ROLL DEBUG\\");
  console.log("Can Roll " + canRoll);
  console.log("Dice Value: " + diceVal);
  console.log("-------------END OF ROLLING DEBUG-----------");
  
}

//bet input chips, award based on diceVal
function betChips(x){
  //subtratced by 2 becuase that is min of 2d6.
  
  //DEBUG
  console.log("//BET DEBUG\\");

  if(pointSet != true){
    switch(diceVal - 2){
      case 0: //roll2 - FAIL
        break;
        
      case 1://roll3 - FAIL
        break;
        
      case 2://roll4 - POINT
        pointVal = 4;
        pointSet = true;
        canRoll = true;
        resetPointTry();
        break;
        
      case 3://roll5 - POINT
        pointVal = 5;
        pointSet = true;
        canRoll = true;
        resetPointTry();
        break;
        
      case 4:// roll6 - POINT
        pointVal = 6;
        pointSet = true;
        canRoll = true;
        resetPointTry();
        break;
        
      case 5://roll7 - NAT WIN
        winChips(x * 3);
        break;
        
      case 6://roll8 - POINT
        pointVal = 8;
        pointSet = true;
        canRoll = true;
        resetPointTry();
        break;
        
      case 7://roll9 - POINT
        pointVal = 9;
        pointSet = true;
        canRoll = true;
        resetPointTry();
        break;
        
      case 8://roll10 - POINT
        pointVal = 10;
        pointSet = true;
        canRoll = true;
        resetPointTry();
        break;
        
      case 9://roll11 - NAT WIN
        winChips(x * 3);
        break;
        
      case 10://roll12 - FAIL
        break;

      default:
        return;
    }
  }else{//Do if Point value is set
    if(pointTry > 0){
      pointTry--;

      switch(diceVal - 2){
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        //decrease tries to roll point

        //if rolled value is equal to point value
        if(pointVal && pointVal == diceVal){
          winChips(x * 2);
          console.log("ROLLED POINT VAL");
          break;          
        }else{
          console.log("DID NOT ROLL POINT");
          if(pointTry === 0){
            console.log('OUT OF TRIES');
            pointSet = false;
            resetPointTry();
            pointVal = 0;
          }
          canRoll = true;
          break;
        }

      case 5://7-out loss
        console.log("7-OUT LOSS");
        pointSet = false;
        resetPointTry();
        pointVal = 0;
        canRoll = true;
        break;

      default:
        console.log("INVALID");
        canRoll = true;
        break;
    }

    }else{//do if pointTry is 0
      pointSet = false;
      resetPointTry();
      pointVal = 0;
      canRoll = true;
      return;
    }
  }

  //DEBUG
  console.log("Bet Amount: " + x);
  console.log("Point? " + pointSet);
  console.log("Point Value: " + pointVal)
}

function getPointHandbook() {
  return `HANDBOOK:\n\n${pointVal} - Win | x2 Multiplier\n\n7 - Loss\n\n${pointTry} Tries Left!`;
}

//-------------------------------------------------------APP INITIAL RENDER

function setup() {
  createCanvas(800, 600);

  //creat slider, style, and set max to baseChips
  betSlider = createSlider(1, 1000, 1, 5);
  betSlider.position(width / 10 * -2, height / 2);
  betSlider.style('transform', 'rotate(270deg)');
  betSlider.style('width', width / 2 + 'px');
  updateSliderBet(1, baseChips);

  diceVal = int(random(2, 13));
  currentChips = baseChips;

  //create Roll Button
  let rollB = createButton(rollT);
  rollB.position(width / 2, height / 1.25);
  rollB.mousePressed(roll);

}

//----------------------------------------------------------APP TICK
function draw() {
  background(150);

  //draw Score Text
  drawText(scoreT, 22, 'black', width/ 100, height / 15);
  drawText(currentChips, 22, 'black', width/ 10, height / 15);

  //draw Highscore Text
  drawText(highscoreT, 22, 'black', width/ 1.5, height / 15);
  drawText(maxWonChips, 22, 'black', width/ 1.23, height / 15);

  //draw Betting Text
  drawText(betT, 22, 'black', width/ 9, height / 1.1);

  //draw Betting Amount
  drawText(betSlider.value(), 22, 'black', width/ 20, height / 1.1);

  //draw point value
  drawText(pointVT, 22, 'black', width / 3, height / 15);
  drawText(pointVal, 22, 'yellow', width / 2.1, height / 15)

  //draw Rolled value
  drawText(diceVT, 22, 'black', width/3, height / 8);
  drawText(diceVal, 22, 'white', width/2.325, height/8);

  //draw dice
  drawDice(diceVal);

  //draw game description
  if (!pointSet) {
    drawText(gameDesc, 16, 'black', width / 1.5, height / 5);
  } else {
    drawText(getPointHandbook(), 16, 'black', width / 1.5, height / 5);
  }
  
}

//---------------------------------------------------------AFTER TICK


function getGameDesc(){
  let out = '';
  if(pointSet == false){
    out = gameDesc;
  }else{
    out = gameDescP;
  }
  return out;
}
