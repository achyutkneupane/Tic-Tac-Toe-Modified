const canvas = document.getElementById('canvas');
const [width, height] = [canvas.width, canvas.height];
const margin = 100;
const coordinates = {
    1: {x: margin+0, y: margin+0},
    2: {x: margin+(width-margin*2)/2, y: margin+0},
    3: {x: margin+width-margin*2, y: margin+0},
    4: {x: margin+0, y: margin+(height-margin*2)/2},
    5: {x: margin+(width-margin*2)/2, y: margin+(height-margin*2)/2},
    6: {x: margin+width-margin*2, y: margin+(height-margin*2)/2},
    7: {x: margin+0, y: margin+height-margin*2},
    8: {x: margin+(width-margin*2)/2, y: margin+height-margin*2},
    9: {x: margin+width-margin*2, y: margin+height-margin*2}
}

var gameRunning = false;

if(!gameRunning) {
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        
        
        drawStructure(ctx);
        drawCircle(ctx,coordinates[5]);
        drawCross(ctx,coordinates[8]);
        
    }
}

function drawStructure(ctx) {
    ctx.beginPath();
    // draw the square
    ctx.moveTo(coordinates[1].x, coordinates[1].y-5);
    ctx.lineTo(coordinates[3].x, coordinates[3].y);
    ctx.lineTo(coordinates[9].x, coordinates[9].y);
    ctx.lineTo(coordinates[7].x, coordinates[7].y);
    ctx.lineTo(coordinates[1].x, coordinates[1].y-10);

    // draw the diagonals
    ctx.moveTo(coordinates[1].x, coordinates[1].y);
    ctx.lineTo(coordinates[9].x, coordinates[9].y);
    ctx.moveTo(coordinates[7].x, coordinates[7].y);
    ctx.lineTo(coordinates[3].x, coordinates[3].y);

    // draw the plus sign in center
    ctx.moveTo(coordinates[2].x, coordinates[2].y);
    ctx.lineTo(coordinates[8].x, coordinates[8].y);
    ctx.moveTo(coordinates[4].x, coordinates[4].y);
    ctx.lineTo(coordinates[6].x, coordinates[6].y);

    // styling the lines
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 10;
    ctx.stroke();
}

function drawCircle(ctx,coordinates) {
    ctx.beginPath();
    ctx.rect(coordinates.x-margin/2,coordinates.y-margin/2,margin,margin);
    ctx.fillStyle = '#2c3e50';
    ctx.fill();

    ctx.beginPath();
    ctx.rect(coordinates.x-margin/2,coordinates.y-margin/2,margin,margin);
    ctx.strokeStyle = '#0083f5';
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(coordinates.x, coordinates.y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = '#0083f5';
    ctx.lineWidth = 10;
    ctx.stroke();
}

function drawCross(ctx,coordinates) {
    ctx.beginPath();
    ctx.rect(coordinates.x-margin/2,coordinates.y-margin/2,margin,margin);
    ctx.fillStyle = '#2c3e50';
    ctx.fill();

    ctx.beginPath();
    ctx.rect(coordinates.x-margin/2,coordinates.y-margin/2,margin,margin);
    ctx.strokeStyle = '#39c62f';
    ctx.lineWidth = 10;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(coordinates.x-margin*1/4, coordinates.y-margin*1/4);
    ctx.lineTo(coordinates.x+margin*1/4, coordinates.y+margin*1/4);
    ctx.moveTo(coordinates.x+margin*1/4,coordinates.y-margin*1/4);
    ctx.lineTo(coordinates.x-margin*1/4, coordinates.y+margin*1/4);
    ctx.strokeStyle = '#39c62f';
    ctx.lineWidth = 10;
    ctx.stroke();
}