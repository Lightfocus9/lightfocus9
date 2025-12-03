const canvas = document.getElementById('backdrop');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let t = 0;

function draw() {
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4;
      const color = Math.floor(128 + 128 * Math.sin((x + t)/50) * Math.cos((y + t)/50));
      data[idx] = color;       // R
      data[idx+1] = color/2;   // G
      data[idx+2] = color/2;   // B
      data[idx+3] = 50;        // Alpha
    }
  }

  ctx.putImageData(imageData, 0, 0);
  t += 1;
  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
