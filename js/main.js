window.onload = function(){
    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 600;

    const ctx = canvas.getContext('2d');

    const environment = new Enviroment(canvas, ctx);
    const bird = new Bird(250, 300, ctx);
    const pipes = [];
    setInterval(function(){
        let pipeSet =  generateRandomPipes(ctx, canvas.width, canvas.height);
        pipes.push(pipeSet.top, pipeSet.bottom);
    }, 3000);
    gameLoop();

    /*
        MAIN GAME LOOP
    */

    function gameLoop(){

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        environment.update();
        environment.render();
        pipes.forEach(function(pipe1){
            pipe1.update();
            pipe1.render();
        });
       
        bird.update();
        bird.render();
        if(detectCollisions(bird, pipes)){
            alert("you loose!");
            window.location
        } 
        window.requestAnimationFrame(gameLoop);
    }
   
};

function generateRandomPipes(ctx, canvasWidth, canvasHeight){
    let lengthTop = Math.round(Math.random() * 200 + 50);
    let lengthBottom = canvasHeight - 300 - lengthTop;
    let returnVal = {};
    returnVal.top = new Pipes(canvasWidth, -5, lengthTop, 3, ctx);
    returnVal.bottom = new Pipes(canvasWidth, canvasHeight + 5 - lengthBottom, lengthTop, 3, ctx);
    return returnVal;
}

function detectCollisions(bird, pipes){
    
    for(var i = 0; i < pipes.lenght; i++){
        let e = pipes[i];
        let highPipe = e.ypos <= 0;
        let x0 = e.xpos, x1 = e.xpos + e.width;
         if(highPipe){
            let y0 = e.ypos + e.lenght;
            let alpha = bird.x;
            let beta =  bird.y - bird.height/2;
            if(alpha > x0 && alpha < x1 && beta < y0){
                return true;
            }
         }
         else{
             let y2 = e.ypos;
             let a = bird.x;
             let b = bird.y + bird.height/2;
             if(a > x0 && a < x1 && b > y2) return true;
         }
    }
    return false;
};