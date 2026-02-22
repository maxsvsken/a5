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

// --- Custom Pipe Cursor ---
const pipeCursor = document.createElement('div');
pipeCursor.id = 'custom-pipe-cursor';
pipeCursor.innerHTML = `
<svg width="40" height="40" viewBox="0 0 100 100" style="position: absolute; left: -5px; top: -5px; transform: rotate(-5deg);">
    <path d="M 10,10 C 20,15 30,25 40,45 C 45,55 55,60 65,60 C 75,60 85,55 90,40 L 95,20 L 70,20 L 70,40 C 70,45 65,50 60,50 C 50,50 45,40 35,25 L 15,10 Z" fill="#ffffff" stroke="#a0a0a0" stroke-width="2"/>
    <rect x="70" y="15" width="25" height="10" fill="#222222" />
    <path d="M 75,25 C 80,35 90,35 95,25" fill="#222222"/>
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
    // Position at the bowl (left + ~28, top + ~5)
    smoke.style.left = (cursorX + 28) + 'px';
    smoke.style.top = (cursorY + 5) + 'px';

    smoke.style.setProperty('--tx', (Math.random() * 40 - 20) + 'px');
    smoke.style.setProperty('--ty', (Math.random() * -60 - 40) + 'px');

    const size = Math.random() * 15 + 15;
    smoke.style.width = size + 'px';
    smoke.style.height = size + 'px';

    document.body.appendChild(smoke);

    setTimeout(() => {
        smoke.remove();
    }, 2000);
}, 100);
