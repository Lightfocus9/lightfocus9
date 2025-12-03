const canvas = document.getElementById('crtCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let t = 0;

// Scroll progress: 0 (top) to 1 (bottom of scroll section)
function getScrollProgress() {
  const scrollTop = window.scrollY;
  const section = document.querySelector('.scroll-section');
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const progress = Math.min(Math.max((scrollTop - sectionTop + window.innerHeight) / sectionHeight, 0), 1);
  return progress;
}

function drawCRT() {
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const opacity = getScrollProgress();

  // Black liquid gradient background
  const gradient = ctx.createLinearGradient(0, 0, w, h);
  gradient.addColorStop(0, `rgba(0,0,0,${1 - opacity})`);
  gradient.addColorStop(1, `rgba(10,0,0,${1 - opacity})`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // CRT horizontal scanlines
  ctx.strokeStyle = `rgba(255,255,255,${0.02 * opacity})`;
  for (let y = 0; y < h; y += 3) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin((y+t)/20) * 1.5);
    ctx.lineTo(w, y + Math.sin((y+t)/20) * 1.5);
    ctx.stroke();
  }

  // Random glitch bars
  for (let i = 0; i < 10 * opacity; i++) {
    const y = Math.random() * h;
    const height = 2 + Math.random() * 3;
    ctx.fillStyle = `rgba(255,255,255,${0.05 * opacity})`;
    ctx.fillRect(Math.random()*w, y, w*0.5, height);
  }

  t += 1;
  requestAnimationFrame(drawCRT);
}

drawCRT();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
