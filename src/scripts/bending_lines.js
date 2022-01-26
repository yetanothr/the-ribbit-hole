setCanvSize();

//setting up 'globals'

let canv = document.getElementById("bending_lines");
let lines_ctx = canv.getContext("2d");

let lines_h = canv.height;
let lines_w = canv.width;

const line_amnt = 10; //amount of horizontal lines
const line_thck = 5; //line thickness

const mouse_effect_radius = 70; //'radius' in which the mosue will affect the lines(and in which parts of canvas will be drawn)

const line_spacing = /*(lines_h - line_thck * line_amnt) / line_amnt*/ lines_h / line_amnt; //spacing between lines(based on the given amount of horizontal lines)
const vert_amnt = lines_w / line_spacing; //calcualting amount of vertical lines

const cursor = { //object for easy cursor position access
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0

}

//setting up event listeners
canv.addEventListener("mousemove",(e) => {
    cursor.prevX = cursor.x;
    cursor.prevY = cursor.y;
    cursor.x = e.clientX;
    cursor.y = e.clientY;
}); //updating the cursor coordinates

//preparing background gradient

let bg_gradient = lines_ctx.createLinearGradient(0,lines_h,lines_w,0);
bg_gradient.addColorStop(0,"#ff00c8");
bg_gradient.addColorStop(1, "#ffee03");

drawInitialLines();

//starting the animation
requestAnimationFrame(drawLinesFrame);

function drawInitialLines(){

    //draw background gradient
    lines_ctx.fillStyle = bg_gradient;
    lines_ctx.fillRect(0,0,lines_w,lines_h);

    //Set line color
    lines_ctx.fillStyle = "#002696";

    //Horizontal lines
    for(let i = 0; i < line_amnt; i++){
    for(let j = 0; j <= lines_w; j++){
        /*if(Math.abs(j - cursor.x) < 50 && Math.abs((i * line_spacing) - cursor.y) < 50){
            lines_ctx.fillRect(j,(i * line_spacing) + 1.0/(Math.abs(j - cursor.x) / 10.0),1,line_thck);
        }
        else{*/
        lines_ctx.fillRect(j,i * line_spacing,1,line_thck);
        //}
    }

    //Vertical lines
    for(let i = 0; i < vert_amnt; i++){
        for(let j = 0; j <= lines_h; j++){
            lines_ctx.fillRect(i * line_spacing,j,line_thck,1);
        }
    }
}
}

function drawLinesFrame(){
    //clearing previous draw area(resetting to straight lines)
    lines_ctx.fillStyle = bg_gradient;
    lines_ctx.fillRect(cursor.prevX - mouse_effect_radius,cursor.prevY - mouse_effect_radius,2 * mouse_effect_radius,2 * mouse_effect_radius);
    
    //redrawing straight hotizontal lines
    lines_ctx.fillStyle = "#002696"; //setting line color

    for(let i = 0; i < line_amnt; i++){
        if((i * line_spacing) >= (cursor.prevY - mouse_effect_radius) - line_thck && (i * line_spacing) <= (cursor.prevY + mouse_effect_radius) + line_thck){
            for(let j = cursor.prevX - mouse_effect_radius; j <= cursor.prevX + mouse_effect_radius; j++){
                lines_ctx.fillRect(j,i * line_spacing,1,line_thck);
            }
        }
    }

    //redrawing straight vertical lines
    for(let i = 0; i < vert_amnt; i++){
        if((i * line_spacing) >= (cursor.prevX - mouse_effect_radius) - line_thck && (i * line_spacing) <= (cursor.prevX + mouse_effect_radius) + line_thck){
        for(let j = (cursor.prevY - mouse_effect_radius) - line_thck; j <= (cursor.prevY + mouse_effect_radius) + line_thck; j++){
            lines_ctx.fillRect(i * line_spacing,j,line_thck,1);
        }
    }
    }

    //bending the lines
    //−(𝑥^2/50+𝑥/50−10)
    //-(Math.pow(dist, 2)/50 + dist/50-10)
    lines_ctx.fillStyle = bg_gradient;
    lines_ctx.fillRect(cursor.x - mouse_effect_radius,cursor.y - mouse_effect_radius,2 * mouse_effect_radius,2 * mouse_effect_radius);

    lines_ctx.fillStyle = "#002696";

    //bent horizontal lines
    for(let i = 0; i < line_amnt; i++){
        if((i * line_spacing) >= (cursor.y - mouse_effect_radius) - line_thck && (i * line_spacing) <= (cursor.y + mouse_effect_radius) + line_thck){
            for(let j = cursor.x - mouse_effect_radius; j <= cursor.x + mouse_effect_radius; j++){
                let y_pos = (i * line_spacing);
                let dist = Math.abs(j - cursor.x);
                lines_ctx.fillRect(j,(i * line_spacing) + (y_pos - cursor.y>0?-(-(Math.pow(dist, 2)/200 + dist/200-25)):(-(Math.pow(dist, 2)/200 + dist/200-25))) ,1,line_thck);
            }
        }
    }

    //bent vertical lines
    for(let i = 0; i < vert_amnt; i++){
        if((i * line_spacing) >= (cursor.prevX - mouse_effect_radius) - line_thck && (i * line_spacing) <= (cursor.prevX + mouse_effect_radius) + line_thck){
        for(let j = (cursor.prevY - mouse_effect_radius) - line_thck; j <= (cursor.prevY + mouse_effect_radius) + line_thck; j++){
            let x_pos = (i * line_spacing);
            let dist = Math.abs(j - cursor.y);
            lines_ctx.fillRect(i * line_spacing + (x_pos - cursor.x>0?-(-(Math.pow(dist, 2)/200 + dist/200-25)):(-(Math.pow(dist, 2)/200 + dist/200-25))),j,line_thck,1);
        }
    }
    }

    //next frame
    requestAnimationFrame(drawLinesFrame);
}

function setCanvSize(){
    let canv = document.getElementById("bending_lines");
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
}