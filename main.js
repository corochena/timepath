var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var width = Number(canvas.getAttribute("width"));
var height = Number(canvas.getAttribute("height"));
var n = 15;
var pList = rndPoints(width, height, n);
//pList = [[-1000,400], [-600,200], [-400,200], [0,300], [100,-400], [200,0], [500,100], [700,-300]];

console.log(pList, totalTime(pList));

function drawPoints(pList) {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  pList.forEach(function(p) {
    ctx.arc(p[0], height - p[1], 0.5, 0, 7);
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
    // console.log(t, vel + acc * t);
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
  pList.push([0, height * 0.99]);
  for (var i = 1; i < n; i++) {
    pList.push([
      (2 * Math.random() * width) / n + pList[i - 1][0],
      height * Math.random()
    ]);
  }
  return pList;
}

function magn(vector) {
  return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
}

function multEscalar(vector, k) {
  return [k * vector[0], k * vector[1]];
}

function prodPunto(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function vecSum(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

var vel = 0;
var pos = [pList[0][0], pList[0][1]];
var dist = 0;

var vecS;
var vecUS;
var acc;

var k = 0;
var count = 0;

function setIni(idx) {
  vecS = [pList[idx + 1][0] - pList[idx][0], pList[idx + 1][1] - pList[idx][1]];
  vecUS = multEscalar(vecS, 1 / magn(vecS));
  acc = prodPunto([0, -9.8], vecUS);
  //console.log(idx, vecS, vecUS, acc);
}

setIni(k);

function animate(t) {
  ctx.clearRect(0, 0, width, height);

  drawPoints(pList);

  // do the math to calculate position x, y
  dist += vel / 60;
  var dvecS = multEscalar(vecUS, vel / 60);
  pos = vecSum(pos, dvecS);

  if (dist >= magn(vecS)) {
    console.log("k", k);
    k++;
    if (k == pList.length - 1) {
      console.log(count / 60);
      return;
    }
    setIni(k);
    dist = 0;
  }
  vel += acc / 60;
  count++;
  //console.log(vel, pos, dist, magn(vecS));

  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.arc(pos[0], height - pos[1], 6, 0, 7);
  ctx.stroke();
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
// console.log(rndPoints(1200, 600, 10));
// console.log(time([500, 200], [600, 100]));

/*
var A = [0, 5];
var B = [5, 6.2755102040816326];
var t1 = time(A, B, 5);
console.log(t1, 25 / 2 / 9.8);
*/
