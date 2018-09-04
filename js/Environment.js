const Enviroment = function(canvas, ctx){
    this.canvas = canvas;
    this.ctx = ctx;
    this.bgPos = 0;
    this.fgPos = 0;
    this.bgSpeed = 2;
    this.bgWidth = 450;
    this.bgImg = document.getElementById('bg');
};

Enviroment.prototype.update = function(){
   this.bgPos -= this.bgSpeed;
   if(this.bgPos < -this.bgWidth)
   this.bgPos = 0;
};

Enviroment.prototype.render = function(){
   for(let i = 0; i <= this.canvas.width/this.bgWidth + 1; i++){
       this.ctx.drawImage(this.bgImg, this.bgPos + i * this.bgWidth, 0);
   }
  
}
