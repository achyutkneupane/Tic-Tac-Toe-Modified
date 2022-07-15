import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const canvas = useRef();
  const [margin, setMargin] = useState(0);
  const [current, setCurrent] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [crosses, setCrosses] = useState([]);
  const [circles, setCircles] = useState([]);
  const [removedFrom, setRemovedFrom] = useState("");
  const [crossTime, setCrossTime] = useState(60);
  const [circleTime, setCircleTime] = useState(60);
  const [movables, setMovables] = useState({});
  const [winningCases, setWinningCases] = useState([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [coordinates, setCoordinates] = useState({});
  const [ctx, setCtx] = useState(null);
  const [mousePos, setMousePos] = useState(-1);

  const drawStructure = () => {
    ctx?.moveTo(0, 0);
    ctx?.lineTo(0, canvas.current.height);
    ctx?.lineTo(canvas.current.width, canvas.current.height);
    ctx?.lineTo(canvas.current.width, 0);
    ctx?.lineTo(0, 0);
    ctx.fillStyle = "#2c3e50";
    ctx?.fill();

    ctx?.beginPath();
    // draw the square
    ctx?.moveTo(coordinates[1].x, coordinates[1].y - 5);
    ctx?.lineTo(coordinates[3].x, coordinates[3].y);
    ctx?.lineTo(coordinates[9].x, coordinates[9].y);
    ctx?.lineTo(coordinates[7].x, coordinates[7].y);
    ctx?.lineTo(coordinates[1].x, coordinates[1].y - 10);

    // draw the diagonals
    ctx?.moveTo(coordinates[1].x, coordinates[1].y);
    ctx?.lineTo(coordinates[9].x, coordinates[9].y);
    ctx?.moveTo(coordinates[7].x, coordinates[7].y);
    ctx?.lineTo(coordinates[3].x, coordinates[3].y);

    // draw the plus sign in center
    ctx?.moveTo(coordinates[2].x, coordinates[2].y);
    ctx?.lineTo(coordinates[8].x, coordinates[8].y);
    ctx?.moveTo(coordinates[4].x, coordinates[4].y);
    ctx?.lineTo(coordinates[6].x, coordinates[6].y);

    // styling the lines
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 10;
    ctx?.stroke();
  };
  const drawCircle = (coordinate) => {
    ctx?.beginPath();
    ctx?.rect(
      coordinate.x - margin / 2,
      coordinate.y - margin / 2,
      margin,
      margin
    );
    ctx.fillStyle = "#2c3e50";
    ctx?.fill();

    ctx?.beginPath();
    ctx?.rect(
      coordinate.x - margin / 2,
      coordinate.y - margin / 2,
      margin,
      margin
    );
    ctx.strokeStyle = "#0083f5";
    ctx.lineWidth = 10;
    ctx?.stroke();

    ctx?.beginPath();
    ctx?.arc(coordinate.x, coordinate.y, 25, 0, 2 * Math.PI);
    ctx.strokeStyle = "#0083f5";
    ctx.lineWidth = 10;
    ctx?.stroke();
  };

  const drawCross = (coordinate) => {
    ctx?.beginPath();
    ctx?.rect(
      coordinate.x - margin / 2,
      coordinate.y - margin / 2,
      margin,
      margin
    );
    ctx.fillStyle = "#2c3e50";
    ctx?.fill();

    ctx?.beginPath();
    ctx?.rect(
      coordinate.x - margin / 2,
      coordinate.y - margin / 2,
      margin,
      margin
    );
    ctx.strokeStyle = "#39c62f";
    ctx.lineWidth = 10;
    ctx?.stroke();

    ctx?.beginPath();
    ctx?.moveTo(
      coordinate.x - (margin * 1) / 4,
      coordinate.y - (margin * 1) / 4
    );
    ctx?.lineTo(
      coordinate.x + (margin * 1) / 4,
      coordinate.y + (margin * 1) / 4
    );
    ctx?.moveTo(
      coordinate.x + (margin * 1) / 4,
      coordinate.y - (margin * 1) / 4
    );
    ctx?.lineTo(
      coordinate.x - (margin * 1) / 4,
      coordinate.y + (margin * 1) / 4
    );
    ctx.strokeStyle = "#39c62f";
    ctx.lineWidth = 10;
    ctx?.stroke();
  };

  const changeText = (current) => {
    document.getElementById("current").innerHTML =
      current === 0 ? "Current: O's turn" : "Current: X's turn";
  };

  const clicked = (evt) => {
    var rect = canvas.current.getBoundingClientRect(),
      scaleX = width / rect.width,
      scaleY = height / rect.height;
    var coordinate = {
      x: (evt.clientX - rect.left) * scaleX,
      y: (evt.clientY - rect.top) * scaleY,
    };
    // console.log(checkCoordinate(coordinate), coordinate);
    return checkCoordinate(coordinate);
  };

  const checkCoordinate = (coordinate) => {
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
  };

  function allowedToMove(source, destination) {
    return movables[source].includes(parseInt(destination));
  }

  const playGame = (evt) => {
    setMousePos(clicked(evt));
    if(!gameRunning) return;
    if (
      (crosses.length < 3 && current === 1) ||
      (circles.length < 3 && current === 0)
    ) {
      if (removedFrom) {
        if (!allowedToMove(removedFrom, mousePos)) {
          return;
        }
      }
      console.log(
        current === 0
          ? "circle added to " + mousePos
          : "cross added to " + mousePos
      );
      if (circles.includes(mousePos) || crosses.includes(mousePos)) {
        return;
      }
      current === 0
        ? drawCircle(coordinates[mousePos])
        : drawCross(coordinates[mousePos]);
        current === 0 ? setCircles([...circles, mousePos]) : setCrosses([...crosses, mousePos]);
      current === 0 ? setCurrent(1) : setCurrent(0);
    } else {
      setRemovedFrom(mousePos);
      if (current === 0) {
        if (circles.includes(removedFrom)) {
          console.log("circle removed from " + removedFrom);
        //   remove element from state circles in index of removedFrom
            setCircles(circles.filter((circle) => circle !== removedFrom));

        }
      }
      if (current === 1) {
        if (crosses.includes(removedFrom)) {
          console.log("cross removed from " + removedFrom);
          setCrosses(crosses.filter((cross) => cross !== removedFrom));
        }
      }
      refreshScreen();
    }
    changeText();
    checkWinner();
  };

  const refreshScreen = () => {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    drawStructure();
    circles.forEach(function (circle) {
      drawCircle(coordinates[circle]);
    });
    crosses.forEach(function (cross) {
      drawCross(coordinates[cross]);
    });
  };

  const checkWinner = () => {
    if (
      JSON.stringify(winningCases).includes(
        JSON.stringify(
          crosses.map((cross) => parseInt(cross)).sort((a, b) => a - b)
        )
      ) ||
      circleTime <= 0
    ) {
      document.getElementById("current").innerHTML = "";
      canvas.style.display = "none";
      document.getElementById("cross-time-box").style.display = "none";
      document.getElementById("circle-time-box").style.display = "none";
      document.getElementById("floatingButton").style.display = "block";
      document.getElementById("floatingButton").innerHTML = "Cross Won";
    } else if (
      JSON.stringify(winningCases).includes(
        JSON.stringify(
          circles.map((circle) => parseInt(circle)).sort((a, b) => a - b)
        )
      ) ||
      crossTime <= 0
    ) {
      document.getElementById("current").innerHTML = "";
      canvas.style.display = "none";
      document.getElementById("cross-time-box").style.display = "none";
      document.getElementById("circle-time-box").style.display = "none";
      document.getElementById("floatingButton").style.display = "block";
      document.getElementById("floatingButton").innerHTML = "Circle Won";
    } else {
      return;
    }
  };

  const updateTime = () => {
    console.log(new Date(circleTime * 1000).toISOString().slice(14, 19));
    console.log(new Date(crossTime * 1000).toISOString().slice(14, 19));
  };

  useEffect(() => {
    if (canvas.current.getContext) {
      setCtx(canvas.current.getContext("2d"));
      setWidth(canvas.current.width);
      setHeight(canvas.current.height);
      setMargin(100);
      console.log(margin)

      setCoordinates({
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
      });
      console.log(coordinates)

      const movablesList = {
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
      setMovables(movablesList);

      const winningCasesList = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 5, 9],
        [3, 5, 7],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ];
      setWinningCases(winningCasesList);

      if (ctx) {
        setInterval(function() {
            console.log(crossTime, circleTime);
            checkWinner();
            if(circleTime > 0 || crossTime > 0) {
              if(!gameRunning) return;
              updateTime();
              if(current == 0) {
                setCircleTime(circleTime - 1);
              }
              else if(current == 1) {
                setCrossTime(crossTime - 1);
              }
            }
          },1000);
        drawStructure();
        changeText(current);
        canvas.current.addEventListener("click", (evt) => {
          setGameRunning(true);
          playGame(evt);
        });
      }
    }
  },[gameRunning]);

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
        <button onClick={() => setGameRunning(true)}>Start Game</button>
    </div>
  );
}
