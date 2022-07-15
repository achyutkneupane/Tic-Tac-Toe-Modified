import React, { useEffect, useRef, useState } from "react";
import { ReactDOM } from "react-dom";
import "./App.css";

// if (canvas.getContext) {
//   const ctx = canvas.getContext("2d");
//   if (!gameRunning) {
//     current = 0; // 0 -> circle, 1 -> cross

//     drawStructure(ctx);
//   }
//   changeText();
//   updateTime();
//   canvas.addEventListener("click", (evt) => {
//     gameRunning = true;
//     playGame(evt, ctx);
//   });
// }

// function updateTime() {
//   document.getElementById("circle-time").innerHTML = new Date(circleTime * 1000).toISOString().slice(14, 19);
//   document.getElementById("cross-time").innerHTML = new Date(crossTime * 1000).toISOString().slice(14, 19);
// }

// setInterval(function() {
//   checkWinner();
//   if(circleTime > 0 || crossTime > 0) {
//     if(!gameRunning) return;
//     updateTime();
//     if(current === 0) {
//       circleTime--
//     }
//     else if(current === 1) {
//       crossTime--
//     }
//   }
// },1000);


// function clicked(evt) {
//   var rect = canvas.getBoundingClientRect(),
//     scaleX = canvas.width / rect.width,
//     scaleY = canvas.height / rect.height;
//   var coordinate = {
//     x: (evt.clientX - rect.left) * scaleX,
//     y: (evt.clientY - rect.top) * scaleY,
//   };
//   return checkCoordinate(coordinate);
// }

// function checkCoordinate(coordinate) {
//   for (let key in coordinates) {
//     if (
//       coordinates[key].x - margin * 1.5 <= coordinate.x &&
//       coordinate.x <= coordinates[key].x + margin * 1.5 &&
//       coordinates[key].y - margin * 1.5 <= coordinate.y &&
//       coordinate.y <= coordinates[key].y + margin * 1.5
//     ) {
//       return key;
//     }
//   }
// }

// function playGame(evt, ctx) {
//   const mousePos = clicked(evt);
//   if (
//     (crosses.length < 3 && current === 1) ||
//     (circles.length < 3 && current === 0)
//   ) {
//     if (removedFrom) {
//       if (!allowedToMove(removedFrom, mousePos)) {
//         return;
//       }
//     }
//     // console.log(
//     //   current === 0
//     //     ? "circle added to " + mousePos
//     //     : "cross added to " + mousePos
//     // );
//     if (circles.includes(mousePos) || crosses.includes(mousePos)) {
//       return;
//     }
//     current === 0
//       ? drawCircle(ctx, coordinates[mousePos])
//       : drawCross(ctx, coordinates[mousePos]);
//     current === 0 ? circles.push(mousePos) : crosses.push(mousePos);
//     current === 0 ? (current = 1) : (current = 0);
//   } else {
//     removedFrom = mousePos;
//     if (current === 0) {
//       if (circles.includes(removedFrom)) {
//         // console.log("circle removed from " + removedFrom);
//         circles.splice(circles.indexOf(removedFrom), 1);
//       }
//     }
//     if (current === 1) {
//       if (crosses.includes(removedFrom)) {
//         // console.log("cross removed from " + removedFrom);
//         crosses.splice(crosses.indexOf(removedFrom), 1);
//       }
//     }
//     refreshScreen(ctx);
//   }
//   changeText();
//   checkWinner();
// }

// // function drawPoint() {
// //   if (circles.includes(mousePos) || crosses.includes(mousePos)) {
// //     return;
// //   }
// //   current === 0
// //     ? drawCircle(ctx, coordinates[mousePos])
// //     : drawCross(ctx, coordinates[mousePos]);
// //   current === 0 ? circles.push(mousePos) : crosses.push(mousePos);
// //   current === 0 ? (current = 1) : (current = 0);
// // }

// function refreshScreen(ctx) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawStructure(ctx);
//   circles.forEach(function (circle) {
//     drawCircle(ctx, coordinates[circle]);
//   });
//   crosses.forEach(function (cross) {
//     drawCross(ctx, coordinates[cross]);
//   });
// }

// function changeText() {
//   document.getElementById("current").innerHTML =
//     current === 0 ? "Current: O's turn" : "Current: X's turn";
// }

// function allowedToMove(source, destination) {
//   return movables[source].includes(parseInt(destination));
// }

// function checkWinner() {
//   if (
//     JSON.stringify(winningCases).includes(
//       JSON.stringify(
//         crosses.map((cross) => parseInt(cross)).sort((a, b) => a - b)
//       )
//     ) || circleTime <= 0
//   ) {
//     document.getElementById("current").innerHTML = "";
//     canvas.style.display = "none"
//     document.getElementById("cross-time-box").style.display = "none";
//     document.getElementById("circle-time-box").style.display = "none";
//     document.getElementById("floatingButton").style.display = "block";
//     document.getElementById("floatingButton").innerHTML = "Cross Won";
//   } else if (
//     JSON.stringify(winningCases).includes(
//       JSON.stringify(
//         circles.map((circle) => parseInt(circle)).sort((a, b) => a - b)
//       )
//     ) || crossTime <= 0
//   ) {
//     document.getElementById("current").innerHTML = "";
//     canvas.style.display = "none"
//     document.getElementById("cross-time-box").style.display = "none";
//     document.getElementById("circle-time-box").style.display = "none";
//     document.getElementById("floatingButton").style.display = "block";
//     document.getElementById("floatingButton").innerHTML = "Circle Won";
//   } else {
//     return;
//   }
// }

function App() {
  const canvas = useRef();
  const [width, setWidth] = useState(canvas?.current?.getAttribute("width"));
  const [height, setHeight] = useState(canvas?.current?.getAttribute("height"));
  const [margin,setMargin] = useState(100);
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

  var [gameRunning, setGameRunning] = useState(false);
  var [crosses, setCrosses] = useState([]);
  var [circles, setCircles] = useState([]);
  var [current, setCurrent] = useState("");
  var [removedFrom, setRemovedFrom] = useState("");
  var [circleTime, setCircleTime] = useState(60);
  var [crossTime, setCrossTime] = useState(60);

  useEffect(() => {
    if (canvas.current.getContext) {
      const ctx = canvas.current.getContext("2d");
      if (!gameRunning) {
        setCurrent(0); // 0 -> circle, 1 -> cross
        drawStructure(ctx,coordinates);
        console.log(coordinates)
        console.log(width,height)
      }
      // changeText();
      // updateTime();
      canvas.current.addEventListener("click", (evt) => {
        setGameRunning(true);
        // playGame(evt, ctx);
      });
      console.log(current, circleTime, crossTime,gameRunning);
    }
  }, []);

  return (
    <div className="App">
      <div className="" id="details">
        <span id="current"></span>
      </div>
      <div className="main">
        <div id="circle-time-box">
          {/* Circle Time: <div id="circle-time"></div> */}
        </div>
        <canvas ref={canvas} id="canvas" width="1100" height="1100"></canvas>
        <div id="cross-time-box">
          {/* Cross Time: <div id="cross-time"></div> */}
        </div>
        <div id="timer"></div>
      </div>
      <div id="floatingButton"></div>
    </div>
  );
}

export default App;
