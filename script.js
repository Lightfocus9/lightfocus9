// Lightweight JS for LF9: scroll fade-ins, FAQ toggle, newsletter handling, and a canvas particle background

// --------- Fade-in on scroll ---------
const observeFade = () => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, {threshold:0.12});
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
};

// --------- FAQ Toggle ---------
const initFAQ = () => {
  document.querySelectorAll('.faq-item h3').forEach(h => {
    h.addEventListener('click', ()=>{
      const p = h.nextElementSibling;
      const open = p.style.display === 'block';
      document.querySelectorAll('.faq-item p').forEach(pp=>pp.style.display='none');
      p.style.display = open ? 'none' : 'block';
    })
  })
}

// --------- Newsletter (dummy handler) ---------
const initNewsletter = () => {
  const form = document.querySelector('.newsletter-form');
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const mail = form.querySelector('input[type=email]').value;
    // Here you'd wire to Mailchimp or Netlify forms or another provider
    form.querySelector('input').value = '';
    alert('Thanks — subscribed: ' + mail);
  })
}

// --------- Simple Particle Canvas (not WebGL) ---------
const initCanvas = () => {
  const canvas = document.getElementById('webgl-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w=canvas.width=innerWidth, h=canvas.height=innerHeight;
  window.addEventListener('resize', ()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight});

  const particles = [];
  const count = Math.floor((w*h)/70000);
  for(let i=0;i<count;i++) particles.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-0.5)*0.2,vy:(Math.random()-0.5)*0.2,r:Math.random()*1.8+0.6});

  const draw = ()=>{
    ctx.clearRect(0,0,w,h);
    // subtle radial gradient
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'rgba(0,20,30,0.06)');
    g.addColorStop(1,'rgba(0,0,0,0.3)');
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

    // draw particles
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x=w; if(p.x>w) p.x=0; if(p.y<0) p.y=h; if(p.y>h) p.y=0;
      const grd = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6);
      grd.addColorStop(0,'rgba(0,255,209,0.9)');
      grd.addColorStop(0.5,'rgba(138,0,255,0.35)');
      grd.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath(); ctx.fillStyle=grd; ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2); ctx.fill();
    });

    // subtle connection lines
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a=particles[i], b=particles[j];
        const dx=a.x-b.x, dy=a.y-b.y, d=dx*dx+dy*dy;
        if(d<20000){
          ctx.strokeStyle='rgba(0,255,209,0.03)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
}

// --------- Init all ---------
window.addEventListener('DOMContentLoaded', ()=>{
  observeFade(); initFAQ(); initNewsletter(); initCanvas();
});
