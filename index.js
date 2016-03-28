var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Keyboard Input
var keys = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};
var pressed = {};

window.addEventListener("keydown", function(e) {
  pressed[keys[e.keyCode]] = true;
});
window.addEventListener("keyup", function(e) {
  pressed[keys[e.keyCode]] = false;
});

// Images
var ship = new Image();
ship.src = "images/ship-f3.png";

// Entities
var player = {
  x: 50,
  y: 50,
  speed: .7
};

var lastFrameTime = null;

var render = function(time) {
  if (lastFrameTime === null) {
    lastFrameTime = time;
  }
  var elapsed = time - lastFrameTime;
  lastFrameTime = time;

  if (pressed["left"]) {
    player.x -= player.speed * elapsed;
  }
  if (pressed["right"]) {
    player.x += player.speed * elapsed;
  }
  if (pressed["up"]) {
    player.y -= player.speed * elapsed;
  }
  if (pressed["down"]) {
    player.y += player.speed * elapsed;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(ship, 0, 0, ship.width, ship.height, player.x, player.y, ship.width, ship.height);

  window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
