import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// ========== LOADER ========== //

const counter = document.querySelector(".load-counter");

let value = 0;

function organicCount() {
  let startTime = null;
  const duration = 3000; // ⏱ 3 seconds minimum
  
  function organicCount(timestamp) {
  
    if (!startTime) startTime = timestamp;
  
    const elapsed = timestamp - startTime;
    let progress = elapsed / duration;
  
    if (progress > 1) progress = 1;
  
    // 🔥 ease curve (fast → slow → fast feel)
    const eased = 1 - Math.pow(1 - progress, 3); // acceleration curve
  
    value = eased * 100;
  
    counter.textContent = Math.floor(value);
  
    // 🔥 organic motion
    gsap.to(counter, {
      scale: 1 + Math.random() * 0.08,
      rotation: (Math.random() - 0.5) * 4,
      duration: 0.2,
      ease: "power2.out"
    });
  
    if (progress < 1) {
      requestAnimationFrame(organicCount);
    } else {
      value = 100;
      counter.textContent = "100";
      finishLoading();
    }
  }
  
  requestAnimationFrame(organicCount);
}

organicCount();

gsap.to(".load-VMwrap", {
  rotation: -1440,
  duration: 3,
  ease: "power4.inOut"
});
/*
gsap.to(".load-skull", {
  filter: "contrast(200%) brightness(1.2)",
  duration: 1.5,
  yoyo: true,
  repeat: 1
});
*/
// 🔥 FINAL HIT (this is the signature)
function finishLoading() {

  const tl = gsap.timeline();

  // 💀 skull disappears FIRST
  tl.to(".load-skull", {
    opacity: 0,
    duration: 0.3,
    ease: "power4.in"
  });

  // ⚡ counter follows AFTER
  tl.to(".load-counter", {
    y: -200,
    opacity: 0,
    duration: 0.6,
    ease: "power3.in"
  }, "+=0.4"); // small delay after skull

  // 🔥 loader fades out LAST
  tl.to(".loading", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    onComplete: () => {
      document.body.classList.remove("before-load");
      document.querySelector(".loading").remove();
      revealLanding();
    }
  });
}

function revealLanding() {

  const tl = gsap.timeline();

  tl.to(".skull", {
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
    duration: 1.4,
    ease: "power4.out"
  });

  // 🔥🔥
  tl.to(".flameI, .flameII", {
    opacity: 1,
    duration: .3,
    ease: "power3.out"
  }, "+=.05");

  // ⚡⚡
  tl.to(".marquee-trial, .marquee-trial-II", {
    x: -100,
    opacity: 1,
    duration: .3,
    ease: "power4.out"
  }, "+=.05");

  // 🔥 flames fade in delayed
  tl.to(".flameI, .flameII", {
    opacity: 0,
    duration: .3,
    ease: "power3.out"
  }, "+=1");

  // ⚡ marquee SLAM reveal
  tl.to(".marquee-trial, .marquee-trial-II", {
    x: 0,
    opacity: 0,
    duration: .3,
    ease: "power4.out"
  }, "+=.05");
  
  tl.to(".motorlive", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out"
  }, "+=.05");
  
  tl.to(".morph-text", {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    duration: 1,
    ease: "power3.out"
  }, "+=0");

  tl.set(".marquee-trial, .marquee-trial-II, .flameI, .flameII", { clearProps: "transform,opacity" });

}


// ========== VIDEO FORCE PLAY ========== //
/*
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll("video");

  videos.forEach(vid => {
    vid.muted = true; // Desktop browsers almost require this for autoplay
    vid.setAttribute('preload', 'metadata'); // Don't choke the network immediately
    
    // Delay play by 500ms to let the Canvas/GSAP settle
    setTimeout(() => {
      vid.play().catch(err => console.log("Autoplay blocked", err));
    }, 500);
  });
});
*/
// ===== SCROLL REVEAL =====
document.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".content-wrapper", {
    x: 20,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
/*
  gsap.utils.toArray(".content-wrapper h1, .content-wrapper h2").forEach(el => {
    gsap.fromTo(el,
      { x: -150, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 30%",
          scrub: true,
          onLeave: () => {
            gsap.to(el, {
              x: 150, // 👉 exit to RIGHT
              opacity: 0,
              duration: 0.6,
              ease: "power2.in"
            });
          },
          onEnterBack: () => {
            gsap.to(el, {
              x: 0,
              opacity: 1,
              duration: 0.6
            });
          }
        }
      }
    );
  });
  
  gsap.utils.toArray(".content-wrapper p").forEach(el => {
    gsap.fromTo(el,
      { x: -80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 40%",
          scrub: true,
          onLeave: () => {
            gsap.to(el, {
              x: 120,
              opacity: 0,
              duration: 0.5
            });
          },
          onEnterBack: () => {
            gsap.to(el, {
              x: 0,
              opacity: 1,
              duration: 0.5
            });
          }
        }
      }
    );
  });
  */
  
  gsap.utils.toArray(".content-wrapper > div > *").forEach(el => {
    gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "top -10%",
        scrub: true
      }
    })
    .fromTo(el, 
      { x: -120, opacity: 0 },   // enter from LEFT
      { x: 0, opacity: 1, ease: "none" }
    )
    .to(el, 
      { x: 120, opacity: 0, ease: "none" } // exit to RIGHT
    );
  });

  gsap.utils.toArray(".items").forEach(container => {
    const items = container.querySelectorAll(".item");

    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
      }
    });
  });

  gsap.utils.toArray(".item").forEach((el, i) => {
    gsap.to(el, {
      y: "+=" + (10 + i * 2),
      duration: 2 + i * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
  
  // SCROLL = ENERGY BOOST
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const current = window.scrollY;
    const speed = Math.abs(current - lastScroll);
  
    gsap.to(".content-marquee-track", {
      timeScale: 1 + speed * 0.02,
      duration: 0.3
    });
  
    lastScroll = current;
  });

});

/*
// FOOTER REVEAL
gsap.to(".footer", {
  opacity: 1,
  y: 0,
  duration: 1.5,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".footer",
    start: "top 85%",
  }
});

// Footer marquee reacts to scroll speed
let lastScrollFooter = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  const speed = Math.abs(current - lastScrollFooter);

  gsap.to(".footer-marquee-track", {
    timeScale: 1 + speed * 0.02,
    duration: 0.3
  });

  lastScrollFooter = current;
});
*/
/*
// BG points -----------------------------------------------------------------

const gridCanvas = document.getElementById("grid-bg");
const ctx = gridCanvas.getContext("2d");

let mouse = { x: 0.5, y: 0.5 };
let time = 0;

function resize() {
  gridCanvas.width = window.innerWidth;
  gridCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX / window.innerWidth;
  mouse.y = e.clientY / window.innerHeight;
});

function draw() {
  time += 0.015;

  ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
  
  // High-performance Red Base
  ctx.fillStyle = "#C21924";
  ctx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);

  const spacing = 45; // Slightly wider for stars
  const rows = Math.ceil(gridCanvas.height / spacing) + 1;
  const cols = Math.ceil(gridCanvas.width / spacing) + 1;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const px = x * spacing;
      const py = y * spacing;

      const wave = Math.sin(x * 0.3 + time) + Math.cos(y * 0.3 + time);
      const mx = (mouse.x - 0.5) * 60;
      const my = (mouse.y - 0.5) * 60;

      const dx = px + wave * 5 + mx * (y / rows);
      const dy = py + wave * 5 + my * (x / cols);

      // --- 4-CORNER STAR (DIAMOND GLINT) ---
      const size = 4 + wave * 2; // Pulsing size
      const innerScale = 0.2; // Makes the "arms" sharp
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.beginPath();
      
      // Top
      ctx.moveTo(dx, dy - size);
      // Right Inner
      ctx.lineTo(dx + size * innerScale, dy - size * innerScale);
      // Right
      ctx.lineTo(dx + size, dy);
      // Bottom Inner
      ctx.lineTo(dx + size * innerScale, dy + size * innerScale);
      // Bottom
      ctx.lineTo(dx, dy + size);
      // Left Inner
      ctx.lineTo(dx - size * innerScale, dy + size * innerScale);
      // Left
      ctx.lineTo(dx - size, dy);
      // Top Inner
      ctx.lineTo(dx - size * innerScale, dy - size * innerScale);
      
      ctx.closePath();
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

draw();
*/
/*
// BG points -----------------------------------------------------------------
const gridCanvas = document.getElementById("grid-bg");
const ctx = gridCanvas.getContext("2d");

// --- 1. Create a hidden noise buffer ---
const noiseCanvas = document.createElement('canvas');
const noiseCtx = noiseCanvas.getContext('2d');
noiseCanvas.width = 100;
noiseCanvas.height = 100;

function createNoise() {
    const imageData = noiseCtx.createImageData(100, 100);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = data[i+1] = data[i+2] = val; // RGB
        data[i+3] = 25; // Opacity of the grain (keep it low!)
    }
    noiseCtx.putImageData(imageData, 0, 0);
}
createNoise();

let time = 0;

function resize() {
    gridCanvas.width = window.innerWidth;
    gridCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function draw() {
    time += 0.005;
    
    // Clear canvas
    ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

    // 2. Draw the Gradient
    const centerX = gridCanvas.width / 2 + Math.cos(time) * (gridCanvas.width * 0.3);
    const centerY = gridCanvas.height / 2 + Math.sin(time * 0.8) * (gridCanvas.height * 0.2);
    const baseRadius = Math.max(gridCanvas.width, gridCanvas.height) * 0.7;
    const pulseRadius = baseRadius + Math.sin(time * 0.5) * 100;

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius);
    gradient.addColorStop(0, "#CB2027"); 
    gradient.addColorStop(1, "#000");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, gridCanvas.width, gridCanvas.height);

    // 3. Layer the Noise on top
    // We use 'source-over' or 'overlay' to blend the grain
    ctx.globalCompositeOperation = "source-over"; 
    
    // To animate the noise, we draw the small noise tile at random offsets
    const noiseOffsetX = Math.random() * noiseCanvas.width;
    const noiseOffsetY = Math.random() * noiseCanvas.height;

    // Create a pattern from the noise tile
    const pattern = ctx.createPattern(noiseCanvas, 'repeat');
    ctx.save();
    ctx.translate(noiseOffsetX, noiseOffsetY); // Shifts noise every frame
    ctx.fillStyle = pattern;
    ctx.fillRect(-noiseOffsetX, -noiseOffsetY, gridCanvas.width, gridCanvas.height);
    ctx.restore();

    requestAnimationFrame(draw);
}

draw();
*/