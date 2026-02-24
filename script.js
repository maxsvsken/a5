// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-out",
  once: true,
  offset: 100,
});

// Mobile Navigation Toggle
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

if (burger) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
  let startTime = null;
  const startValue = 0;

  function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);

    const currentValue = Math.floor(progress * target);
    element.textContent = currentValue + "%";

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = target + "%";
    }
  }

  requestAnimationFrame(animate);
}

// Intersection Observer for Counter Animation
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px",
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
      const target = parseInt(entry.target.getAttribute("data-target"));
      animateCounter(entry.target, target);
      entry.target.classList.add("counted");
    }
  });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll(".stat-number").forEach((stat) => {
  counterObserver.observe(stat);
});

// Parallax Effect for Hero Background
let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector(".hero");

      // Hero Parallax
      if (heroSection && scrolled < window.innerHeight) {
        const heroBg = document.querySelector(".hero-bg");
        if (heroBg) {
          heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
      }

      ticking = false;
    });
    ticking = true;
  }
});

// Add hover sound effect simulation (visual feedback)
document.querySelectorAll(".today-card, .rule-item").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

console.log("A1 Investment Company - Website Loaded Successfully");



// --- Legend Section Parallax Canvas Animation ---
const canvas = document.getElementById("legend-parallax-canvas");
const context = canvas.getContext("2d");
const frameCount = 192; // Total number of frames available
let images = [];
let imagesLoaded = 0;

// Set canvas dimensions
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);

// Function to get the correct path for a specific frame
function getFramePath(index) {
  // Example: frame_000_delay-0.042s.jpg -> frame_191_delay-0.042s.jpg
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  return `legend-frames/frame_${zeroPad(index, 3)}_delay-0.042s.jpg`;
}

// Preload images
function preloadImages() {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    img.onload = () => {
      imagesLoaded++;
      // When first image is loaded, start setting up dimensions
      if (i === 0) {
        resizeCanvas();
      }
      if (imagesLoaded === frameCount) {
        // Initial render once all frames are ready
        updateImage(0);
      }
    };
    images.push(img);
  }
}

// Draw the appropriate frame onto the canvas
function updateImage(index) {
  if (images[index] && images[index].complete) {
    // Draw image covering the whole canvas
    const hRatio = canvas.width / images[index].width;
    const vRatio = canvas.height / images[index].height;
    const ratio = Math.max(hRatio, vRatio); // Use max for cover effect
    const centerShift_x = (canvas.width - images[index].width * ratio) / 2;
    const centerShift_y = (canvas.height - images[index].height * ratio) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      images[index],
      0,
      0,
      images[index].width,
      images[index].height,
      centerShift_x,
      centerShift_y,
      images[index].width * ratio,
      images[index].height * ratio
    );
  }
}

// Map scroll position to frames
window.addEventListener("scroll", () => {
  const scrollWrapper = document.getElementById("parallax-wrapper");
  if (!scrollWrapper) return;

  // Calculate section's position relative to the viewport
  const rect = scrollWrapper.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // The top of the section relative to the page top
  const sectionTop = rect.top + scrollTop;
  const scrollStart = sectionTop - window.innerHeight; // Start animating when sect enters view
  const scrollEnd = sectionTop + scrollWrapper.offsetHeight; // End animating when sect leaves view

  let scrollProgress = 0;

  if (scrollTop >= scrollStart && scrollTop <= scrollEnd) {
    // We are currently scrolling past the section
    scrollProgress = (scrollTop - scrollStart) / (scrollEnd - scrollStart);
  } else if (scrollTop > scrollEnd) {
    scrollProgress = 1;
  }

  // Map the 0-1 progress to our frame count
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollProgress * frameCount)
  );

  // Update the canvas to show this frame
  if (imagesLoaded > 0) {
    // Safety check to ensure images have started loading
    requestAnimationFrame(() => updateImage(frameIndex));
  }
});

// Kick off
preloadImages();
