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

// Animations
var animations = {
  ship: {
    image: new Image(),
    frame: 0,
    frames: 3,
    frameWidth: 204 / 3,
    time: 0,
    speed: 200
  }
};
animations.ship.image.src = "images/ship-f3.png";

function advanceAnimations(elapsed) {
  Object.keys(animations).forEach(function(name) {
    var anim = animations[name];
    anim.time += elapsed;
    while (anim.time > anim.speed) {
      anim.time -= anim.speed;
      anim.frame++;
      if (anim.frame >= anim.frames) {
        anim.frame = 0;
      }
    }
    anim.x = anim.frame * anim.frameWidth;
  });
}
function drawAnimation(context, name, x, y) {
  var anim = animations[name];
  context.drawImage(anim.image, anim.x, 0, anim.frameWidth, anim.image.height, x, y, anim.frameWidth, anim.image.height);
}

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

  advanceAnimations(elapsed);

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
  drawAnimation(context, "ship", player.x, player.y);

  window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
