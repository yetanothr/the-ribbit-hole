let sky_canv = document.getElementById("sky_bg");
let sky_ctx = sky_canv.getContext("2d");

let sky_h = sky_canv.height;
let sky_w = sky_canv.width;

sky_ctx.fillStyle="rgb(0, 0, 0)";
sky_ctx.fillRect(0,0,sky_w,sky_h);