setCanvSize();

const star_density = 800;

let sky_canv = document.getElementById("sky_bg");
let sky_ctx = sky_canv.getContext("2d");

let sky_h = sky_canv.height;
let sky_w = sky_canv.width;

let stars = [];


for(let i = 0; i < star_density; i++){
    stars.push(new particle(Math.floor(sky_w * Math.random()),Math.floor(sky_h * Math.random())));
}

requestAnimationFrame(drawSkyFrame)

function particle(posX,posY){
    this.x = posX;
    this.y = posY;
    this.maxCol = Math.floor((Math.random() * 105) + 150);
    this.currCol = 0;
    this.dec = false;

    this.frame = function(){

        if(!this.dec){
            this.currCol++;
            if(this.currCol == this.maxCol)
            this.dec = true;
        }
        else{
            this.currCol--;
            if(this.currCol == 0)
            this.dec = false;
        }


    };

}
function drawSkyFrame(){

    sky_ctx.fillStyle="rgb(0, 0, 0)";
    sky_ctx.fillRect(0,0,sky_w,sky_h);
    
    for(let i = 0; i < star_density; i++){

        stars[i].frame();
        
        sky_ctx.fillStyle=`rgb(${stars[i].currCol}, ${stars[i].currCol}, ${stars[i].currCol})`;
        sky_ctx.fillRect(stars[i].x,stars[i].y,1,1);
    }

    requestAnimationFrame(drawSkyFrame);

}

function setCanvSize(){
    let canv = document.getElementById("sky_bg");
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
}