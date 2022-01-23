setCanvSize();

let canv = document.getElementById("bending_lines");
let lines_ctx = canv.getContext("2d");

var lines_h = canv.height;
var lines_w = canv.width;

let bg_gradient = lines_ctx.createLinearGradient(0,lines_h,lines_w,0);
bg_gradient.addColorStop(0,"#ff00c8");
bg_gradient.addColorStop(1, "#ffee03");

lines_ctx.fillStyle = bg_gradient;
lines_ctx.fillRect(0,0,lines_w,lines_h);

function setCanvSize(){
    let canv = document.getElementById("bending_lines");
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
}
