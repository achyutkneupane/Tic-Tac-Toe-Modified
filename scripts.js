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

const movables = {
  1: [2, 4, 5],
  2: [1, 3, 5],
  3: [2, 5, 6],
  4: [1, 5, 7],
  5: [1, 2, 3, 4, 6, 7, 8, 9],
  6: [3, 5, 9],
  7: [4, 5, 8],
  8: [5, 7, 9],
  9: [6, 8, 5],
};

const winningCases = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

var gameRunning = false;

var crosses = [];
var circles = [];
var current = "";
var removedFrom = "";
var winner = "";
var crossTime = circleTime = 60;

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  if (!gameRunning) {
    current = 0; // 0 -> circle, 1 -> cross

    drawStructure(ctx);
  }
  changeText();
  updateTime();
  canvas.addEventListener("click", (evt) => {
    gameRunning = true;
    playGame(evt, ctx);
  });
}

function updateTime() {
  document.getElementById("circle-time").innerHTML = new Date(circleTime * 1000).toISOString().slice(14, 19);
  document.getElementById("cross-time").innerHTML = new Date(crossTime * 1000).toISOString().slice(14, 19);
}

setInterval(function() {
  checkWinner();
  if(circleTime > 0 || crossTime > 0) {
    if(!gameRunning) return;
    updateTime();
    if(current == 0) {
      circleTime--
    }
    else if(current == 1) {
      crossTime--
    }
  }
},1000);

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

function playGame(evt, ctx) {
  const mousePos = clicked(evt);
  if (
    (crosses.length < 3 && current == 1) ||
    (circles.length < 3 && current == 0)
  ) {
    if (removedFrom) {
      if (!allowedToMove(removedFrom, mousePos)) {
        return;
      }
    }
    // console.log(
    //   current == 0
    //     ? "circle added to " + mousePos
    //     : "cross added to " + mousePos
    // );
    if (circles.includes(mousePos) || crosses.includes(mousePos)) {
      return;
    }
    current === 0
      ? drawCircle(ctx, coordinates[mousePos])
      : drawCross(ctx, coordinates[mousePos]);
    current == 0 ? circles.push(mousePos) : crosses.push(mousePos);
    current == 0 ? (current = 1) : (current = 0);
  } else {
    removedFrom = mousePos;
    if (current == 0) {
      if (circles.includes(removedFrom)) {
        // console.log("circle removed from " + removedFrom);
        circles.splice(circles.indexOf(removedFrom), 1);
      }
    }
    if (current == 1) {
      if (crosses.includes(removedFrom)) {
        // console.log("cross removed from " + removedFrom);
        crosses.splice(crosses.indexOf(removedFrom), 1);
      }
    }
    refreshScreen(ctx);
  }
  changeText();
  checkWinner();
}

function drawPoint() {
  // console.log(
  //   current == 0 ? "circle added to " + mousePos : "cross added to " + mousePos
  // );
  if (circles.includes(mousePos) || crosses.includes(mousePos)) {
    return;
  }
  current === 0
    ? drawCircle(ctx, coordinates[mousePos])
    : drawCross(ctx, coordinates[mousePos]);
  current == 0 ? circles.push(mousePos) : crosses.push(mousePos);
  current == 0 ? (current = 1) : (current = 0);
}

function refreshScreen(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStructure(ctx);
  circles.forEach(function (circle) {
    drawCircle(ctx, coordinates[circle]);
  });
  crosses.forEach(function (cross) {
    drawCross(ctx, coordinates[cross]);
  });
}

function changeText() {
  document.getElementById("current").innerHTML =
    current == 0 ? "Current: O's turn" : "Current: X's turn";
}

function allowedToMove(source, destination) {
  return movables[source].includes(parseInt(destination));
}

function checkWinner() {
  if (
    JSON.stringify(winningCases).includes(
      JSON.stringify(
        crosses.map((cross) => parseInt(cross)).sort((a, b) => a - b)
      )
    ) || circleTime <= 0
  ) {
    document.getElementById("current").innerHTML = "";
    canvas.style.display = "none"
    document.getElementById("cross-time-box").style.display = "none";
    document.getElementById("circle-time-box").style.display = "none";
    document.getElementById("floatingButton").style.display = "block";
    document.getElementById("floatingButton").innerHTML = "Cross Won";
  } else if (
    JSON.stringify(winningCases).includes(
      JSON.stringify(
        circles.map((circle) => parseInt(circle)).sort((a, b) => a - b)
      )
    ) || crossTime <= 0
  ) {
    document.getElementById("current").innerHTML = "";
    canvas.style.display = "none"
    document.getElementById("cross-time-box").style.display = "none";
    document.getElementById("circle-time-box").style.display = "none";
    document.getElementById("floatingButton").style.display = "block";
    document.getElementById("floatingButton").innerHTML = "Circle Won";
  } else {
    return;
  }
}