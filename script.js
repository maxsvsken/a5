// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
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
        element.textContent = currentValue + '%';

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = target + '%';
        }
    }

    requestAnimationFrame(animate);
}

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all stat numbers
document.querySelectorAll('.stat-number').forEach(stat => {
    counterObserver.observe(stat);
});

// Parallax Effect for Hero Background
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroSection = document.querySelector('.hero');

            // Hero Parallax
            if (heroSection && scrolled < window.innerHeight) {
                const heroBg = document.querySelector('.hero-bg');
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
document.querySelectorAll('.today-card, .rule-item').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

console.log('A1 Investment Company - Website Loaded Successfully');

// --- Custom Pipe Cursor & Smoke Filter ---
const smokeFilter = document.createElement('div');
smokeFilter.innerHTML = `
<svg width="0" height="0" style="position:absolute;z-index:-1;">
  <defs>
    <filter id="smoke-fluid">
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="4" result="noise" />
      <feDisplacementMap in="blur" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>`;
document.body.appendChild(smokeFilter);

const pipeCursor = document.createElement('div');
pipeCursor.id = 'custom-pipe-cursor';
pipeCursor.innerHTML = `
<svg width="60" height="60" viewBox="0 0 120 120" style="position: absolute; left: -10px; top: -10px; filter: drop-shadow(3px 5px 4px rgba(0,0,0,0.5));">
    <defs>
        <linearGradient id="wood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#8a8a8a"/>
            <stop offset="20%" stop-color="#555555"/>
            <stop offset="50%" stop-color="#2a2a2a"/>
            <stop offset="100%" stop-color="#0a0a0a"/>
        </linearGradient>
        <linearGradient id="stem" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#555555"/>
            <stop offset="20%" stop-color="#222222"/>
            <stop offset="100%" stop-color="#050505"/>
        </linearGradient>
        <linearGradient id="band" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="40%" stop-color="#aaaaaa"/>
            <stop offset="100%" stop-color="#444444"/>
        </linearGradient>
    </defs>
    <g transform="translate(15, 15) rotate(15)">
        <path d="M 10,40 C 5,50 10,65 25,70 C 40,75 50,65 55,55 L 85,45 L 80,30 L 45,35 C 40,20 25,20 15,25 Z" fill="url(#wood)" />
        <path d="M 10,40 C 20,45 35,45 45,35" fill="none" stroke="#222" stroke-width="1.5" />
        <path d="M 25,70 C 35,62 45,55 55,55" fill="none" stroke="#222" stroke-width="1.5" />
        <ellipse cx="28" cy="27" rx="14" ry="7" fill="#1a1a1a" stroke="#444" stroke-width="1.5" />
        <ellipse cx="28" cy="27" rx="10" ry="4" fill="#000000" />
        <path d="M 85,45 C 100,40 115,25 115,15 C 110,18 95,25 80,30 Z" fill="url(#stem)" />
        <polygon points="80,30 85,45 82,46 77,31" fill="url(#band)" />
        <circle cx="95" cy="30" r="1.5" fill="#ffffff" />
    </g>
</svg>`;
document.body.appendChild(pipeCursor);

let cursorX = -100, cursorY = -100;
let mouseX = -100, mouseY = -100;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.4;
    cursorY += (mouseY - cursorY) * 0.4;
    pipeCursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

// Smoke generation
setInterval(() => {
    if (mouseX === -100) return; // don't spawn until mouse moves
    const smoke = document.createElement('div');
    smoke.className = 'smoke-particle';

    // Position at the bowl (roughly +15px right and +18px down from cursor)
    smoke.style.left = (cursorX + 22) + 'px';
    smoke.style.top = (cursorY + 15) + 'px';

    // More complex, higher rise, snaking path simulating smoke
    smoke.style.setProperty('--tx', (Math.random() * 80 - 40) + 'px');
    smoke.style.setProperty('--ty', (Math.random() * -150 - 80) + 'px');
    smoke.style.setProperty('--rot', (Math.random() * 180 - 90) + 'deg');
    smoke.style.setProperty('--scale', (Math.random() * 3 + 3));

    // Random elongated shapes for wispy look before filter
    const width = Math.random() * 15 + 10;
    const height = Math.random() * 30 + 15;
    smoke.style.width = width + 'px';
    smoke.style.height = height + 'px';

    document.body.appendChild(smoke);

    setTimeout(() => {
        smoke.remove();
    }, 4000);
}, 100);
