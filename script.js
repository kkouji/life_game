'use strict';

const WIDTH = 600;
const HEIGHT = 600;
const INTERVAL = 30;
const BIRTH_AGE_LOW = 20;
const BIRTH_AGE_HIGH = 100;
var is_update;
var frame;
var cells = [];
var serial_num = 0;

class Cell {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.age = 0;
    this.alive = true;
  }

  set_serial_num(serial_num) {
    this.serial_num = serial_num;
  }

  move() {
    // this.width += getRandomInt(3)-1;
    // this.height += getRandomInt(3)-1;
    this.width += getRandomInt(9) - 4;
    this.height += getRandomInt(9) - 4;

    if (this.width < 0) {
      this.width = 0;
    } else if (this.width > WIDTH) {
      this.width = WIDTH;
    }

    if (this.heigth < 0) {
      this.heigth = 0;
    } else if (this.heigth > HEIGHT) {
      this.heigth = HEIGHT;
    }
    // console.log(this.width,this.height);
  }

  display() {
    console.log(this.width,this.height);
    var canvas = document.getElementById('field');
    if (canvas.getContext) {
      var context = canvas.getContext('2d');
      context.fillStyle = 'rgb(255,00,00)'; //塗りつぶしの色は赤
      context.fillRect(this.width, this.height, 2, 2);
      // context.fillText(this.age,this.width, this.height+2);
      //context.fillText(this.serial_num,this.width, this.height+2);
    }
  }

  get_old() {
    this.age++;
  }

  deth() {
    //0.1% の確率で死ぬ
    if (getRandomInt(1000) == 0) {
      this.alive = false;
    }
    if (this.age > 100) {
      this.alive = false;
    }
  }

  birth() {
    if (BIRTH_AGE_LOW < this.age && this.age < BIRTH_AGE_HIGH) {
      //30%の確率で子供を生む
      if (getRandomInt(30) == 0) {
        var new_cell = new Cell(this.width, this.height);
        serial_num++;
        new_cell.set_serial_num(serial_num);
        cells.push(new_cell);
      }
    }
  }
}

window.onload = function () {
  var canvas = document.getElementById('field');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  is_update = true;

  var new_cell = new Cell(WIDTH/2, HEIGHT/2);
  serial_num++;
  new_cell.set_serial_num(serial_num);
  cells.push(new_cell);

  frame = setInterval("sample()", INTERVAL);
}

function startstop() {
  if (is_update) {
    clearInterval(frame);
  } else {
    frame = setInterval("sample()", INTERVAL);
  }
  is_update = !is_update;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sample() {

  var canvas = document.getElementById('field');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  for (let i in cells) {
    console.log("i",i,"age",cells[i].age);
    cells[i].get_old();
    cells[i].move();
    if(i < 200){
      cells[i].birth();
    }
    cells[i].deth();
    cells[i].display();
    if (!cells[i].alive) {
      delete cells[i];
    }
  }
  cells = cells.filter(v => v);

  show_info();

}

function show_info(){
  var infoarea = document.getElementById('info');
  var text = "";
  for (let i in cells) {
    text += "Index:"+i
    text += "Serial:"+cells[i].serial_num;
    text += "Age:"+cells[i].age;
    text += "\n";
  }
  infoarea.innerText = text;
}

