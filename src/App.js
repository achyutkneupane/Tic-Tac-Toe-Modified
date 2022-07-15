import React, { useEffect, useRef } from "react";

export default function App() {
  const canvas = useRef();
  const margin = 100;

  const drawStructure = (ctx, coordinates) => {
    ctx.moveTo(0,0);
    ctx.lineTo(0, canvas.current.height);
    ctx.lineTo(canvas.current.width, canvas.current.height);
    ctx.lineTo(canvas.current.width, 0);
    ctx.lineTo(0, 0);
    ctx.fillStyle = "#2c3e50";
    ctx.fill();

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
  };
  const drawCircle = (ctx, coordinates) => {
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

  const drawCross = (ctx, coordinates) => {
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

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    const width = canvas.current.width;
    const height = canvas.current.height;
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

    drawStructure(ctx, coordinates);
  });
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
