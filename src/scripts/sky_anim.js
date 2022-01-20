setCanvSize();

const star_density = 800;

let sky_canv = document.getElementById("sky_bg");
let sky_ctx = sky_canv.getContext("2d");

let sky_h = sky_canv.height;
let sky_w = sky_canv.width;

let stars = [];
let dec = false;

for(let i = 0; i < star_density; i++){
    stars.push(new particle(Math.floor(sky_w * Math.random()),Math.floor(sky_h * Math.random())));
}

requestAnimationFrame(drawSkyFrame)

function particle(posX,posY){
    this.x = posX;
    this.y = posY;
    this.col = 0;
}
function drawSkyFrame(){

    sky_ctx.fillStyle="rgb(0, 0, 0)";
    sky_ctx.fillRect(0,0,sky_w,sky_h);
    
    for(let i = 0; i < star_density; i++){

        if(!dec){
            stars[i].col++;
            if(stars[i].col == 255)
            dec = true;
        }
        else{
            stars[i].col--;
            if(stars[i].col == 0)
            dec = false;
        }
        
        sky_ctx.fillStyle=`rgb(${stars[i].col}, ${stars[i].col}, ${stars[i].col})`;
        sky_ctx.fillRect(stars[i].x,stars[i].y,1,1);
    }

    requestAnimationFrame(drawSkyFrame);

}

function setCanvSize(){
    let canv = document.getElementById("sky_bg");
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
}