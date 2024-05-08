setCanvSize();

//setting up 'globals'

let canv = document.getElementById("bending_lines");
let lines_ctx = canv.getContext("2d");

let lines_h = canv.height;
let lines_w = canv.width;

const line_amnt = 8; //amount of horizontal lines
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

const bg_gradient = lines_ctx.createLinearGradient(0,lines_h,lines_w,0);
bg_gradient.addColorStop(0,"#ff00c8");
bg_gradient.addColorStop(1, "#ffee03");

//starting the animation
requestAnimationFrame(drawLinesFrame);

/* An init function needed with the old way of resetting background
function drawInitialLines(){

    //draw background gradient
    lines_ctx.fillStyle = bg_gradient;
    lines_ctx.fillRect(0,0,lines_w,lines_h);

    //Set line color
    lines_ctx.fillStyle = "#002696";

    //Horizontal lines
    for(let i = 0; i < line_amnt; i++){
    for(let j = 0; j <= lines_w; j++){
        lines_ctx.fillRect(j,i * line_spacing,1,line_thck);
    }

    //Vertical lines
    for(let i = 0; i < vert_amnt; i++){
        for(let j = 0; j <= lines_h; j++){
            lines_ctx.fillRect(i * line_spacing,j,line_thck,1);
        }
    }
}
}*/

function drawLinesFrame(){

    /* old way of resetting background
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

    */

    //resetting the background

    lines_ctx.fillStyle = bg_gradient;
    lines_ctx.fillRect(0,0, lines_w,lines_h); //drawing background gradient

    lines_ctx.fillStyle = "#002696"; //setting line color

    for(let i = 0; i < line_amnt; i++){ //redrawing straight vertical lines
        lines_ctx.fillRect(0, i * line_spacing,lines_w,line_thck);
    }

    for(let i = 0; i < vert_amnt; i++){
        lines_ctx.fillRect(i * line_spacing, 0, line_thck, lines_h);
    }

    //bending the lines
    //-(p_axis_dist^2)/(s_axis_dist / 2) + (s_axis_dist * 0.6)

    //clearing the area for bent lines
    lines_ctx.fillStyle = bg_gradient;
    lines_ctx.fillRect(cursor.x - mouse_effect_radius,cursor.y - mouse_effect_radius,2 * mouse_effect_radius,2 * mouse_effect_radius);

    lines_ctx.fillStyle = "#002696";

    //bent horizontal lines
    //working version
    /*for(let i = 0; i < line_amnt; i++){
        if((i * line_spacing) >= (cursor.y - mouse_effect_radius) - line_thck && (i * line_spacing) <= (cursor.y + mouse_effect_radius) + line_thck){
            for(let j = cursor.x - mouse_effect_radius; j <= cursor.x + mouse_effect_radius; j++){
                let y_pos = (i * line_spacing);
                let p_axis_dist = Math.abs(j - cursor.x);
                let s_axis_dist = Math.abs(cursor.y - (i * line_spacing));
                lines_ctx.fillRect(j,(i * line_spacing) + (y_pos - cursor.y>0?-((-Math.pow(p_axis_dist,2))/(s_axis_dist * 2) + (s_axis_dist * 0.4)):((-Math.pow(p_axis_dist,2))/(s_axis_dist * 2) + (s_axis_dist * 0.4))) ,1,line_thck);
            }
        }
    }*/
    //experimental version
    for(let i = 0; i < line_amnt; i++){
        if((i * line_spacing) >= (cursor.y - mouse_effect_radius) - line_thck && (i * line_spacing) <= (cursor.y + mouse_effect_radius) + line_thck){
            for(let j = cursor.x - mouse_effect_radius; j <= cursor.x + mouse_effect_radius; j++){
                let y_pos = (i * line_spacing);
                let p_axis_dist = Math.abs(j - cursor.x);
                let s_axis_dist = Math.abs(cursor.y - (i * line_spacing));
                if(y_pos - cursor.y > 0){ //line is under the mouse pointer
                    let final_p_axis_coord = -((-Math.pow(p_axis_dist,2))/(s_axis_dist * 2) + (s_axis_dist * 0.4));
                    if(final_p_axis_coord + y_pos >= y_pos){
                        lines_ctx.fillRect(j,y_pos, 1 ,line_thck);
                    }else{
                        lines_ctx.fillRect(j, y_pos + final_p_axis_coord, 1, line_thck);
                    }
                }
                else{   //line is above the mouse pointer
                    let final_p_axis_coord =  ((-Math.pow(p_axis_dist,2))/(s_axis_dist * 2) + (s_axis_dist * 0.4));
                    if(final_p_axis_coord + y_pos < y_pos){
                        lines_ctx.fillRect(j,y_pos, 1 ,line_thck);
                    }
                    else{
                        lines_ctx.fillRect(j, y_pos + final_p_axis_coord, 1, line_thck); 
                    }
                }
            }
        }
    }

    //bent vertical lines
    for(let i = 0; i < vert_amnt; i++){
        if((i * line_spacing) >= (cursor.prevX - mouse_effect_radius) - line_thck && (i * line_spacing) <= (cursor.prevX + mouse_effect_radius) + line_thck){
        for(let j = (cursor.prevY - mouse_effect_radius) - line_thck; j <= (cursor.prevY + mouse_effect_radius) + line_thck; j++){
            let x_pos = (i * line_spacing);
            let p_axis_dist = Math.abs(j - cursor.y);
            let s_axis_dist = Math.abs(cursor.x - (i * line_spacing));
            if(x_pos - cursor.x > 0){//pointer before the line
                let final_p_axis_coord = -((-Math.pow(p_axis_dist,2))/(s_axis_dist * 2) + (s_axis_dist * 0.4));
                if(x_pos + final_p_axis_coord > x_pos){
                    lines_ctx.fillRect(x_pos,j,line_thck,1);
                }
                else{
                    lines_ctx.fillRect(x_pos + final_p_axis_coord,j,line_thck,1);
                }
            }
            else{ //pointer after the line
                let final_p_axis_coord = ((-Math.pow(p_axis_dist,2))/(s_axis_dist * 2) + (s_axis_dist * 0.4));
                if(x_pos + final_p_axis_coord < x_pos){
                    lines_ctx.fillRect(x_pos,j,line_thck,1);
                }
                else{
                    lines_ctx.fillRect(x_pos + final_p_axis_coord,j,line_thck,1);
                }
            }
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