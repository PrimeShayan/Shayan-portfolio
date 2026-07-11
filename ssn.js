(function () {
"use strict";

var lc = document.createElement('canvas');
lc.style.position      = 'fixed';
lc.style.top           = '0';
lc.style.left          = '0';
lc.style.width         = '100%';
lc.style.height        = '100%';
lc.style.zIndex        = '0';
lc.style.pointerEvents = 'none';
document.body.appendChild(lc);
var lx = lc.getContext('2d');

function sizeLightning() {
lc.width  = window.innerWidth;
lc.height = window.innerHeight;
}
sizeLightning();
window.addEventListener('resize', sizeLightning);

function rnd(a, b) { return a + Math.random() * (b - a); }

function bolt(ctx, x1, y1, x2, y2, depth) {
  if (depth === 0) return;
  var bx = (x1 + x2) / 2 + rnd(-60, 60) / depth;
  var by = (y1 + y2) / 2 + rnd(-60, 60) / depth;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(bx, by);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = depth > 2
    ? 'rgba(80,120,200,' + (0.09 * depth) + ')'
    : 'rgba(230,235,250,' + (0.08 * depth) + ')';
  ctx.lineWidth   = depth * 0.45;
  ctx.shadowColor = '#3a5a8c';
  ctx.shadowBlur  = 18;
  ctx.stroke();
  if (depth > 1) {
    bolt(ctx, x1, y1, bx, by, depth - 1);
    bolt(ctx, bx, by, x2, y2, depth - 1);
    if (Math.random() > 0.65) {
      bolt(ctx, bx, by, bx + rnd(-100, 100), by + rnd(30, 120), depth - 1);
    }
  }
}

function flashLightning() {
lx.clearRect(0, 0, lc.width, lc.height);
var sx = rnd(lc.width * 0.15, lc.width * 0.85);
bolt(lx, sx, 0, sx + rnd(-140, 140), lc.height * 0.55, 4);
setTimeout(function () { lx.clearRect(0, 0, lc.width, lc.height); }, 110);
setTimeout(function () {
bolt(lx, sx, 0, sx + rnd(-80, 80), lc.height * 0.45, 3);
setTimeout(function () { lx.clearRect(0, 0, lc.width, lc.height); }, 80);
}, 150);
setTimeout(flashLightning, rnd(2500, 6500));
}
setTimeout(flashLightning, 1200);

var bars = document.querySelectorAll('.bar div');

/* Save each bar's target width, then reset to 0 */
bars.forEach(function (bar) {
  var target = bar.style.width || '0%';
  bar.setAttribute('data-width', target);
  bar.style.width = '0';
});

function animateBar(bar) {
  var target = bar.getAttribute('data-width');
  /* Small delay so the transition is visible */
  setTimeout(function () {
    bar.style.width = target;
  }, 100);
}

if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateBar(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  bars.forEach(function (b) { io.observe(b); });
} else {
  /* Fallback: animate immediately */
  bars.forEach(function (b) { animateBar(b); });
}

var lastSpark = 0;
document.addEventListener('mousemove', function (e) {
  var now = Date.now();
  if (now - lastSpark < 40) return;
  lastSpark = now;
var spark = document.createElement('div');
var isBlood = Math.random() > 0.5;
spark.style.position     = 'fixed';
spark.style.left         = e.clientX + 'px';
spark.style.top          = e.clientY + 'px';
spark.style.width        = '5px';
spark.style.height       = '5px';
spark.style.borderRadius = '50%';
spark.style.pointerEvents= 'none';
spark.style.zIndex       = '9999';
spark.style.transform    = 'translate(-50%,-50%)';
spark.style.background   = isBlood
  ? 'radial-gradient(circle, rgba(140,10,20,1), transparent)'
  : 'radial-gradient(circle, rgba(80,120,200,1), transparent)';
spark.style.boxShadow    = isBlood
  ? '0 0 8px 3px rgba(120,10,20,0.7)'
  : '0 0 8px 3px rgba(70,100,180,0.6)';
spark.style.transition   = 'opacity 0.45s, transform 0.45s';
document.body.appendChild(spark);

requestAnimationFrame(function () {
  spark.style.opacity   = '0';
  spark.style.transform = 'translate(-50%,-50%) scale(2)';
});
setTimeout(function () { spark.remove(); }, 460);

});

})();
