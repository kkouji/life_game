'use strict';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function sample() {
  //描画コンテキストの取得
  var canvas = document.getElementById('field');
  canvas.width = 600;
  canvas.height = 300;
  if (canvas.getContext) {

    var context = canvas.getContext('2d');
    context.fillStyle = 'rgb(255,00,00)'; //塗りつぶしの色は赤
    // context.arc(15,20,1,0,Math.PI*2,true);

    for(let i = 1 ; i < 10 ; i++){
      // context.fillRect(10*i,10*i,1*i,1*i);
      var tate = getRandomInt(300);
      var yoko = getRandomInt(600);
      console.log(i,"yoko",yoko,"tate",tate);

      context.fillRect(yoko,tate,1*i,1*i);
      context.fillText(i,yoko,tate);
    }

  }
}