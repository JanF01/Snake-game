const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const canvasw = canvas.width;
const canvash = canvas.height;

let scale = 20;
let direction_flag = false;
let picking_flag=true;
let Xdirect = 0;
let Ydirect = 0;
let points = 0;
var speed=10;
let win_flag = false;

function Snake(){
  this.X = canvasw/2+10;
  this.Y = canvash/2+10;
  this.speedX = 0;
  this.speedY = 0;
  this.leng = [[this.X,this.Y]];

  this.make = function(){
        ctx.fillStyle='black';
     for(var i=0;i<this.leng.length;i++){
    ctx.fillRect(this.leng[i][0],this.leng[i][1],18,18);
     }
  }
  this.move = function(){
     if(this.leng.length>1){
      for(var i=this.leng.length-1;i>0;i--){
        this.leng[i]=this.leng[i-1];
      }
    }
    this.Y += this.speedY;
    this.X += this.speedX;
      this.leng[0]=[this.X,this.Y];
  }
  this.set = function(x,y){
    if(x == -Xdirect/scale && y == -Ydirect/scale){
      direction_flag=true;


    }
    else{direction_flag=false;}
    if(this.leng.length==1 || !direction_flag){
    this.speedX=x*scale;
    this.speedY=y*scale;
    }
  }
  this.eat = function(){


 if(foodT=='d'){
   for(let i=0;i<2;i++)
  this.leng.push([this.leng[this.leng.length-1][0],this.leng[this.leng.length-1][1]]);
  }
 else if(foodT=='n' || foodT=='s'){
  this.leng.push([this.leng[this.leng.length-1][0],this.leng[this.leng.length-1][1]]);
   if(foodT=='s'){fastSpeed++;fastTimer+=40;}
  }
 else{
   lose();
 }


    points++;
    food();
  }
}

var Pociong = new Snake();

let foodX = 25;
let foodY = 25;
let foodT = 'n';
let bombTime = 0;
let fastSpeed = 0;
let fastTimer = 0;

function food(){
    let random = Math.floor(Math.random()*100);
    if(random>=0 && random<=60){foodT='n';}
    else if(random>=61 && random<=75){foodT='d';}
    else if(random>=76 && random<=85){
      foodT='s';
    }
    else if(random>=86 && random<=99){foodT='b';
    bombTime=40;
  }

    foodX = Math.floor(Math.random()*24)*scale;
    foodY = Math.floor(Math.random()*24)*scale;
}

var record=0;
var length;
var hardnes;

function lose(){



  Pociong.leng=[[this.X,this.Y]];
    Pociong.X= canvasw/2+10;
    Pociong.Y= canvash/2+10;
    Pociong.speedX = 0;
    Pociong.speedY = 0;

  if(points>record){
    record=points;
  }
   points=0;
   food();

}
function win(){
  start(0);
  ctx.fillStyle= '#60A100';
  ctx.fillRect(0,0,canvasw,canvash);
  ctx.fillStyle= 'black';
  ctx.font='60px monospace';
  ctx.fillText("WYGRAŁEŚ!!",90, 100);
  ctx.font='35px monospace';
  ctx.fillText("Zdobyłeś 60 punktów!!!", 40, 200);
  ctx.font='35px monospace';
  ctx.fillText("Kliknij Q - Powrót", 80, 380);
  win_flag=true;
  points=0;
}
function draw(){
   if(fastTimer==1){start(speed);fastTimer=0;fastSpeed=0;}
   if(fastTimer>0){
    if(fastSpeed==1){
      start(speed+8);
    }
    else if(fastSpeed>1){
      start(speed+13);
    }
    fastTimer--;
  }


  ctx.fillStyle= '#999999';
  ctx.fillRect(0,0,canvasw,canvash);

  if(foodT=='n'){ctx.fillStyle= '#701020';}
  else if(foodT=='d'){ctx.fillStyle= '#107020';}
  else if(foodT=='s'){ctx.fillStyle= 'rgb(255,255,42)';}
  else{ctx.fillStyle= 'black';}
  ctx.fillRect(foodX,foodY,18,18);

  if(bombTime>0){bombTime--;}
  if(bombTime==1){food();bombTime--;}




  Pociong.make();
  Pociong.move();
  Xdirect = Pociong.speedX;
  Ydirect = Pociong.speedY;

  if(Pociong.X==canvasw || Pociong.Y==canvash || Pociong.X<0 || Pociong.Y<0){
    lose();
  }
  for(var i=2;i<Pociong.leng.length;i++){
    if(Pociong.X==Pociong.leng[i][0] && Pociong.Y==Pociong.leng[i][1]){
      if(!direction_flag)lose();
    }
  }

  if(Pociong.X==foodX && Pociong.Y==foodY){
    Pociong.eat();
  }
  ctx.fillStyle='black';
  ctx.font='50px monospace';
  ctx.fillText(points,230,40);

  length=Pociong.leng.length;
  ctx.font='15px monospace';
  ctx.fillStyle='black';
  ctx.fillText("Rekord: "+record,10,20);
  ctx.fillStyle='black';
  ctx.fillText("Trudność: "+hardnes,330,20);
  ctx.fillText("Kliknij Q - Powrót", 10, 480,80);
  if(points>=50){
    win();
  }
}
let zas_flag = 0;
function checkKey(e){
  if(e.keyCode=='38'){// up arrow
     Pociong.set(0,-1);
    }
  else if(e.keyCode=='39'){// right arrow
     Pociong.set(1,0);
    }
  else if(e.keyCode=='40'){// down arrow
     Pociong.set(0,1);
    }
  else if(e.keyCode=='37'){// left arrow
     Pociong.set(-1,0);
    }
  else if(e.keyCode=='65'){
       if(picking_flag==true){
         speed=6;
         start(speed);
         picking_flag=false;
         hardnes='EASY';
         zas_flag=2;
       }
    }
  else if(e.keyCode=='66'){
        if(picking_flag==true){
          speed=9;
         start(speed);
         picking_flag=false;
          hardnes='MEDIUM';
          zas_flag=2;
       }
    }
  else if(e.keyCode=='67'){
        if(picking_flag==true){
          speed=13
         start(speed);
         picking_flag=false;
          hardnes='HARD';
          zas_flag=2;
       }
  }
  else if(e.keyCode=='68'){
        if(picking_flag==true){
          speed=24;
         start(speed);
         picking_flag=false;
          hardnes='INPOSSIBLE';
          zas_flag=2;
        }
       }
  else if(e.keyCode=='81'){
    if(zas_flag==0){
      zas_flag=1;
      zasady();
    }
    else if(zas_flag==1){pick(); zas_flag=0}
    else{
      start(0);
      pick();
      zas_flag=0;
      picking_flag=true;
    }
 }
}

document.addEventListener("keydown",checkKey);

function zasady(){

  ctx.fillStyle = "#999999";
  ctx.fillRect(0,0,canvasw,canvash);
  if(win_flag){
  ctx.fillStyle= "rgb(217,200,85)";
  ctx.fillRect(0,0,50,50);
  ctx.font='25px monospace';
  ctx.fillText(" - Już wygrałeś w tej sesji :D",60,30);
  }
  ctx.font='20px monospace';
  ctx.fillStyle= '#701020';
  ctx.fillRect(50,50,scale,scale);
  ctx.fillText("- 1 punkt, przedłużenie węża o 1", 80, 67.5);
  ctx.fillStyle= '#107020';
  ctx.fillRect(50,100,scale,scale);
  ctx.fillText("- 1 punkt, przedłużenie węża o 2",80, 117.5);
  ctx.fillStyle= 'rgb(255,255,42)';
  ctx.fillRect(50,150,scale,scale);
  ctx.fillText("- 1 punkt, przyśpieszenie",80, 167.5);
  ctx.fillStyle= 'black';
  ctx.fillRect(50,200,scale,scale);
  ctx.fillText("- Przegrana!!!, bomba",80, 217.5);
  ctx.font='25px monospace';
  ctx.fillText("Zdobądź 50 punktów by WYGRAĆ!!!", 40, 290);
  ctx.font='35px monospace';
  ctx.fillText("Kliknij Q - Powrót", 80, 380);
}
function pick(){

  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvasw,canvash);
  if(win_flag){
  ctx.fillStyle = "rgb(217,200,85)";
  ctx.fillRect(0,0,50,50);
  ctx.font='25px monospace';
  ctx.fillText(" - Już wygrałeś w tej sesji :D",60,30);
  }
  ctx.font='35px monospace';
  ctx.fillStyle='white';
  ctx.fillText('Kliknij Q - Zasady Gry',40,120);
  ctx.font='20px monospace';
  ctx.fillText('Wybierz poziom trudności',110,250);
  ctx.fillText('Klikając przycisk na klawiaturze:',60,290);
  ctx.fillStyle="green";
  ctx.fillRect(12.5,330,100,100);
  ctx.fillStyle="orange";
  ctx.fillRect(140,330,100,100);
  ctx.fillStyle="red";
  ctx.fillRect(265,330,100,100);
  ctx.fillStyle="grey";
  ctx.fillRect(387.5,330,100,100);
  ctx.fillStyle= 'white';
  ctx.font = '100px monospace';
  ctx.fillText("A",37.5,410);
  ctx.fillText("B",162.5,410);
  ctx.fillText("C",287.5,410);
  ctx.fillText("D",412.5,410);

}


function game(){
draw();
}
food();
pick();
let inter;
function start(s){
 clearInterval(inter);
  if(s!=0){
 inter = setInterval(game,1000/s);
  }
}
