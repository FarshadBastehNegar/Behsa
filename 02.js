function bresenham(x0, y0, x1, y1) {
  const points = [];
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    points.push([x0, y0]);
    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
  return points;
}

function uniqueVisitedCells(points) {
  const visited = new Set();

  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const segment = bresenham(x0, y0, x1, y1);

    for (const [x, y] of segment) {
      visited.add(`${x},${y}`);
    }
  }

  return Array.from(visited).map(p => p.split(",").map(Number));
}

// مثال از ورودی شما
const input = [
  [13, 14], [6, 13], [18, 7], [4, 11], [3, 14]
];

const visitedCells = uniqueVisitedCells(input);
console.log("تعداد خانه‌ها:", visitedCells.length);
console.log("لیست خانه‌ها:", visitedCells);
