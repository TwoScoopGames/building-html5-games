var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var colors = [ "#ff0000", "#00ff00", "#0000ff" ];
var color = 0;

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

  context.fillStyle = colors[color];
  color++;
  if (color >= colors.length) {
    color = 0;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(player.x, player.y, 50, 50);

  window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
