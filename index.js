var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

// Keyboard Input
var keys = {
  32: "space",
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
  bullet: {
    image: new Image(),
    frame: 0,
    frames: 5,
    frameWidth: 55 / 5,
    time: 0,
    speed: 100
  },
  ship: {
    image: new Image(),
    frame: 0,
    frames: 3,
    frameWidth: 204 / 3,
    time: 0,
    speed: 200
  }
};
animations.bullet.image.src = "images/bullet-f5.png";
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
  x: 380,
  y: 500,
  speed: .7
};

var bullets = [];

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
  if (pressed["space"]) {
    bullets.push({
      x: player.x + (animations.ship.frameWidth / 2) - (animations.bullet.frameWidth / 2),
      y: player.y - animations.bullet.image.height
    });
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawAnimation(context, "ship", player.x, player.y);

  for (var i = 0; i < bullets.length; i++) {
    var bullet = bullets[i];
    drawAnimation(context, "bullet", bullet.x, bullet.y);
    bullet.y -= 1 * elapsed;
  }

  window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
