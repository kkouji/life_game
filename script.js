'use strict';

const WIDTH = 600;
const HEIGHT = 600;
const interval = 30;
var is_update;
var frame;

window.onload = function () {
  var canvas = document.getElementById('field');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  is_update = true;
  frame = setInterval("sample()",interval);
}

function startstop() {
  if (is_update) {
    clearInterval(frame);
  }else{
    frame = setInterval("sample()",interval);
  }
  is_update = !is_update;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sample() {
  //描画コンテキストの取得
  var canvas = document.getElementById('field');

  if (canvas.getContext) {

    var context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width/2,canvas.height);
    context.fillStyle = 'rgb(255,00,00)'; //塗りつぶしの色は赤
    // context.arc(15,20,1,0,Math.PI*2,true);

    var num = getRandomInt(300);

    for(let i = 1 ; i < num ; i++){
      // context.fillRect(10*i,10*i,1*i,1*i);
      var tate = getRandomInt(HEIGHT);
      var yoko = getRandomInt(WIDTH);
      // console.log("num",num,"iter",i,"yoko",yoko,"tate",tate);

      context.fillRect(yoko,tate,1,1);
      // context.fillText(i,yoko,tate);
    }

  }
}
