const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = { x: 50, y: 150, w: 20, h: 20, v: 0 };
let pipes = [];
let score = 0;

document.addEventListener("keydown", () => bird.v = -8);
document.addEventListener("touchstart", () => bird.v = -8);

function update() {
  bird.v += 0.5;
  bird.y += bird.v;

  if (Math.random() < 0.02) {
    let top = Math.random() * 300;
    pipes.push({ x: 400, top, bottom: top + 120 });
  }

  pipes.forEach(p => {
    p.x -= 2;

    if (
      bird.x < p.x + 40 &&
      bird.x + bird.w > p.x &&
      (bird.y < p.top || bird.y + bird.h > p.bottom)
    ) {
      reset();
    }

    if (p.x === bird.x) score++;
  });

  pipes = pipes.filter(p => p.x > -40);

  if (bird.y > 600) reset();
}

function draw() {
  ctx.clearRect(0, 0, 400, 600);

  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.w, bird.h);

  ctx.fillStyle = "green";
  pipes.forEach(p => {
    ctx.fillRect(p.x, 0, 40, p.top);
    ctx.fillRect(p.x, p.bottom, 40, 600);
  });

  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 20);
}

function reset() {
  bird.y = 150;
  bird.v = 0;
  pipes = [];
  score = 0;
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
