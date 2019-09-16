var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = Number(canvas.getAttribute("width"));
var height = Number(canvas.getAttribute("height"));
var n = 4;
var pList = rndPoints(width, height, n);

drawPoints(pList);
console.log(pList, totalTime(pList));

function drawPoints(pList) {
  ctx.beginPath();
  pList.forEach(function(p) {
    ctx.arc(p[0], height - p[1], 2, 0, 7);
    ctx.stroke();
  });
}

function totalTime(pList) {
  var result = time(pList[0], pList[1], 0);
  var tottime = result[0];

  for (var i = 1; i < pList.length - 1; i++) {
    result = time(pList[i], pList[i + 1], result[1]);
    tottime += result[0];
  }

  return tottime;
}

function time(pointA, pointB, vel) {
  var dx = pointB[0] - pointA[0];
  var dy = pointB[1] - pointA[1];
  var s = Math.sqrt(dx * dx + dy * dy);
  var acc = (-9.8 * dy) / s;
  var t;

  if (vel == undefined) vel = 0;

  if (acc == 0) t = s / vel;
  else t = cuadEq(0.5 * acc, vel, -s);

  if (t) {
    console.log(t, vel + acc * t);
    return [t, vel + acc * t];
  } else return false;
}

function cuadEq(a, b, c) {
  var disc = b * b - 4 * a * c;
  if (disc >= 0) return (-b + Math.sqrt(disc)) / 2 / a;
  else return false;
}

function rndPoints(width, height, n) {
  // returns a list of random points [x,y]
  var pList = [];
  pList.push([0, height]);
  for (var i = 1; i < n; i++) {
    pList.push([
      (2 * Math.random() * width) / n + pList[i - 1][0],
      height * Math.random()
    ]);
  }
  return pList;
}

// console.log(rndPoints(1200, 600, 10));
// console.log(time([500, 200], [600, 100]));

/*
var A = [0, 5];
var B = [5, 6.2755102040816326];
var t1 = time(A, B, 5);
console.log(t1, 25 / 2 / 9.8);
*/
