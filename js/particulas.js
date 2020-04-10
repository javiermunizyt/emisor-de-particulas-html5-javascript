
var canvas;
var ctx;
var FPS = 50;

//TAMAÑO REAL DEL CANVAS
var widthCanvas = 128;
var heightCanvas = 80;

//TAMAÑO DE VISUALIZACIÓN DEL CANVAS (AMPLIADO CON CSS)
var widthCanvasAmpliado = 700;
var heightCanvasAmpliado = 500;

//FACTOR DE AMPLIACIÓN PARA EL CANVAS
var factorX = widthCanvasAmpliado/widthCanvas;
var factorY = heightCanvasAmpliado/heightCanvas;


//REESCALAMOS EL CANVAS MEDIANTE CSS
function reescalaCanvas(){
  canvas.style.width = widthCanvasAmpliado + 'px';
  canvas.style.height = heightCanvasAmpliado + 'px';
}


//POSICIÓN DEL RATÓN
var ratonX = 0;
var ratonY = 0;


function posicionRaton(raton){
  ratonX = Math.floor(raton.pageX/factorX);
  ratonY = Math.floor(raton.pageY/factorY);
}



//-----------------------------------------------
//PARTÍCULAS
var particulas = new Array();
var numParticulas = 300;

class Particula{

  constructor(x,y,orden){
    this.x = x;
    this.y = y;

    this.orden = orden;

    this.alfa;  //grado de transparencia

    this.vx;  //velocidad X
    this.vy;  //velocidad Y

    this.factorAlfa = 0.05; //velocidad a la que desaparece

    //this.color = '#EE7600'; //amarillo
    //this.color = '#222222'; //gris oscuro
    this.color = '#1d8fa8'; //azul

    this.gravedad = 1;

    this.resetea(this.x, this.y);
  }


  resetea(x,y){
    this.x = x;
    this.y = y;

    this.vx = Math.random()*1 - 0.5;    // -0.5 , 0.5
    this.vy = Math.random()*1 - 0.5;    // -0.5 , 0.5

    //this.factorAlfa = (Math.random()*1)/10; //hacemos más volátiles las partículas

    this.alfa = 1;
  }


  actualiza(){


    if(this.orden <=0){
      this.alfa -= this.factorAlfa;

      this.x += this.vx;
      this.y += this.vy + this.gravedad;

      //MOMENTO DE RESETEAR
      if(this.alfa <=0){
        this.resetea(ratonX, ratonY);
      }

      //dibuja la partícula
      this.dibuja();
    }

    else{
      this.orden -= 2;  //ajustamos el caudal de partículas
    }



  }




  dibuja(){
    ctx.save();
    ctx.globalAlpha = this.alfa;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 1, 1);   //cuadrado de 1x1 = pixel
    ctx.restore();
  }


}




function inicializa(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //INICIALIZAMOS EL TAMAÑO DEL CANVAS
  canvas.width = widthCanvas;
  canvas.height = heightCanvas;

  //REESCALAMOS EL CANVAS
  reescalaCanvas();

  //AÑADIMOS LISTENER PARA ESCUCHAR AL RATÓN
  canvas.addEventListener('mousemove',posicionRaton,false);

  //CREAMOS LAS PARTÍCULAS
  for(i=0; i<numParticulas;i++){
    particulas[i] = new Particula(ratonX,ratonY,i);
  }

  //AÑADIMOS EL BUCLE PRINCIPAL
  setInterval(principal,1000/FPS);

}



function borraCanvas(){
  canvas.width = canvas.width;
  canvas.height = canvas.height;
}


//BUCLE PRINCIPAL DE JUEGO
function principal(){

  borraCanvas();

  console.log(ratonX + ' - ' + ratonY);

  for(i=0; i<numParticulas;i++){
    particulas[i].actualiza();
  }

}
