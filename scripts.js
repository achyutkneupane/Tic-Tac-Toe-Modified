const canvas = document.getElementById("canvas");
const [width, height] = [canvas.width, canvas.height];
const margin = 100;
const coordinates = {
  1: {
    x: margin + 0,
    y: margin + 0,
  },
  2: {
    x: margin + (width - margin * 2) / 2,
    y: margin + 0,
  },
  3: {
    x: margin + width - margin * 2,
    y: margin + 0,
  },
  4: {
    x: margin + 0,
    y: margin + (height - margin * 2) / 2,
  },
  5: {
    x: margin + (width - margin * 2) / 2,
    y: margin + (height - margin * 2) / 2,
  },
  6: {
    x: margin + width - margin * 2,
    y: margin + (height - margin * 2) / 2,
  },
  7: {
    x: margin + 0,
    y: margin + height - margin * 2,
  },
  8: {
    x: margin + (width - margin * 2) / 2,
    y: margin + height - margin * 2,
  },
  9: {
    x: margin + width - margin * 2,
    y: margin + height - margin * 2,
  },
};

// var gameRunning = false;

var crosses = [];
var circles = [];
var current = "";

// if (!gameRunning) {

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  current = 0; // 0 -> circle, 1 -> cross

  drawStructure(ctx);

  canvas.addEventListener("click", (evt) => {
        playGame(evt,ctx);
  });
  changeText();
}
// }

function drawStructure(ctx) {
  ctx.beginPath();
  // draw the square
  ctx.moveTo(coordinates[1].x, coordinates[1].y - 5);
  ctx.lineTo(coordinates[3].x, coordinates[3].y);
  ctx.lineTo(coordinates[9].x, coordinates[9].y);
  ctx.lineTo(coordinates[7].x, coordinates[7].y);
  ctx.lineTo(coordinates[1].x, coordinates[1].y - 10);

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
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 10;
  ctx.stroke();
}

function drawCircle(ctx, coordinates) {
  ctx.beginPath();
  ctx.rect(
    coordinates.x - margin / 2,
    coordinates.y - margin / 2,
    margin,
    margin
  );
  ctx.fillStyle = "#2c3e50";
  ctx.fill();

  ctx.beginPath();
  ctx.rect(
    coordinates.x - margin / 2,
    coordinates.y - margin / 2,
    margin,
    margin
  );
  ctx.strokeStyle = "#0083f5";
  ctx.lineWidth = 10;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(coordinates.x, coordinates.y, 25, 0, 2 * Math.PI);
  ctx.strokeStyle = "#0083f5";
  ctx.lineWidth = 10;
  ctx.stroke();
}

function drawCross(ctx, coordinates) {
  ctx.beginPath();
  ctx.rect(
    coordinates.x - margin / 2,
    coordinates.y - margin / 2,
    margin,
    margin
  );
  ctx.fillStyle = "#2c3e50";
  ctx.fill();

  ctx.beginPath();
  ctx.rect(
    coordinates.x - margin / 2,
    coordinates.y - margin / 2,
    margin,
    margin
  );
  ctx.strokeStyle = "#39c62f";
  ctx.lineWidth = 10;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(
    coordinates.x - (margin * 1) / 4,
    coordinates.y - (margin * 1) / 4
  );
  ctx.lineTo(
    coordinates.x + (margin * 1) / 4,
    coordinates.y + (margin * 1) / 4
  );
  ctx.moveTo(
    coordinates.x + (margin * 1) / 4,
    coordinates.y - (margin * 1) / 4
  );
  ctx.lineTo(
    coordinates.x - (margin * 1) / 4,
    coordinates.y + (margin * 1) / 4
  );
  ctx.strokeStyle = "#39c62f";
  ctx.lineWidth = 10;
  ctx.stroke();
}

// function clicked(ev) {
//     console.log(ev.pageX, ev.pageY);
//     // console.log(ev);
//     ev.preventDefault();
// }

function clicked(evt) {
  var rect = canvas.getBoundingClientRect(),
    scaleX = canvas.width / rect.width,
    scaleY = canvas.height / rect.height;
  var coordinate = {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY,
  };
  return checkCoordinate(coordinate);
}

// console log each value of coordinates
function checkCoordinate(coordinate) {
  for (let key in coordinates) {
    if (
      coordinates[key].x - margin * 1.5 <= coordinate.x &&
      coordinate.x <= coordinates[key].x + margin * 1.5 &&
      coordinates[key].y - margin * 1.5 <= coordinate.y &&
      coordinate.y <= coordinates[key].y + margin * 1.5
    ) {
      return key;
    }
  }
}

function playGame(evt,ctx) {
    const mousePos = clicked(evt);
    if((crosses.length < 3 && current == 1) || (circles.length < 3 && current == 0)){
        if(circles.includes(mousePos) || crosses.includes(mousePos)){
            return;
        }
        current === 0
        ? drawCircle(ctx, coordinates[mousePos])
        : drawCross(ctx, coordinates[mousePos]);
      current == 0 ? circles.push(mousePos) : crosses.push(mousePos);
      current == 0 ? (current = 1) : (current = 0);
    } else {
        if(current == 0){
            if(circles.includes(mousePos)){
                console.log(mousePos+" removed");
                circles.splice(circles.indexOf(mousePos),1);
                drawCircle(ctx, coordinates[mousePos]);
            }
        }
        if(current == 1){
            if(crosses.includes(mousePos)){
                console.log(mousePos+" removed");
                crosses.splice(crosses.indexOf(mousePos),1);
                drawCross(ctx, coordinates[mousePos]);
            }
        }
        refreshScreen(ctx);
    }
    changeText();
}

function refreshScreen(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStructure(ctx);
    circles.forEach(function(circle) {
        drawCircle(ctx, coordinates[circle]);
    }
    );
    crosses.forEach(function(cross) {
        drawCross(ctx, coordinates[cross]);
    }
    );
}

function changeText() {
    document.getElementById("current").innerHTML = current == 0 ? "O's turn" : "X's turn";
}