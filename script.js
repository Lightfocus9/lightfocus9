const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let t = 0;

function draw() {
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  // trippy color gradient
  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, `rgba(255,204,204,0.05)`);
  gradient.addColorStop(0.5, `rgba(0,0,0,0.1)`);
  gradient.addColorStop(1, `rgba(255,204,204,0.05)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // moving wave lines
  for (let i = 0; i < 40; i++) {
    const y = (Math.sin((i * 30 + t)/50) * 50) + h/2;
    ctx.strokeStyle = `rgba(255,204,204,0.03)`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y + Math.sin((i * 30 + t)/20)*30);
    ctx.stroke();
  }

  // subtle moving particles
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = `rgba(255,204,204,${Math.random()*0.05})`;
    ctx.fillRect(Math.random()*w, Math.random()*h, 1,1);
  }

  t += 1;
  requestAnimationFrame(draw);
}

draw();

