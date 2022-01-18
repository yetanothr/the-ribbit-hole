setCanvSize();

const star_density = 800;

let sky_canv = document.getElementById("sky_bg");
let sky_ctx = sky_canv.getContext("2d");

let sky_h = sky_canv.height;
let sky_w = sky_canv.width;

sky_ctx.fillStyle="rgb(0, 0, 0)";
sky_ctx.fillRect(0,0,sky_w,sky_h);

let stars = [];

for(let i = 0; i < star_density; i++){
    stars.push(new particle(Math.floor(sky_w * Math.random()),Math.floor(sky_h * Math.random())));
    sky_ctx.fillStyle="rgb(255, 255, 255)";
    sky_ctx.fillRect(stars[i].x,stars[i].y,1,1);
}


function particle(posX,posY){
    this.x = posX;
    this.y = posY;
}

function setCanvSize(){
    let canv = document.getElementById("sky_bg");
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
}