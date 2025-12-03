const canvas = document.getElementById('backdrop');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let t = 0;

function drawBackdrop() {
  const w = canvas.width;
  const h = canvas.height;

  // Clear canvas
  ctx.clearRect(0, 0, w, h);

  // Black liquid gradient
  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, 'rgba(0,0,0,1)');
  gradient.addColorStop(1, 'rgba(10,0,0,1)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // CRT horizontal scanlines
  ctx.strokeStyle = 'rgba(255,255,255,0.02)';
  for (let y = 0; y < h; y += 3) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin((y + t)/20) * 1.5);
    ctx.lineTo(w, y + Math.sin((y + t)/20) * 1.5);
    ctx.stroke();
  }

  t += 1;
  requestAnimationFrame(drawBackdrop);
}

drawBackdrop();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
