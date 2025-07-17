// Smooth scrolling for navigation links
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Simple contact form handler (no backend)
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out! I will get back to you soon.');
    this.reset();
});

// Reveal on scroll animation (merged version)
const revealEls = document.querySelectorAll('.reveal, .fade-in, .fade-in-left, .fade-in-right, .fade-in-up');
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Typing effect for hero name
const typingName = document.getElementById('typing-name');
const nameText = "Faizan Ali";
let typingIdx = 0;
function typeWriter() {
    if (typingIdx < nameText.length) {
        typingName.textContent += nameText.charAt(typingIdx);
        typingIdx++;
        setTimeout(typeWriter, 120);
    }
}
window.addEventListener('DOMContentLoaded', typeWriter);

// Parallax effect for hero image
const parallaxImg = document.querySelector('.parallax-img');
const parallaxContainer = document.querySelector('.parallax-container');
if (parallaxImg && parallaxContainer) {
    parallaxContainer.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = parallaxContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        parallaxImg.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.04)`;
    });
    parallaxContainer.addEventListener('mouseleave', () => {
        parallaxImg.style.transform = 'translate(0,0) scale(1)';
    });
}

// Smooth scrolling for .nav-link and highlight
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 120;
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section && section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// Contact form validation and focus animation
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;
        form.querySelectorAll('input, textarea').forEach(input => {
            const error = input.nextElementSibling;
            if (!input.value.trim()) {
                error.textContent = 'Required';
                valid = false;
            } else if (input.type === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
                error.textContent = 'Invalid email';
                valid = false;
            } else {
                error.textContent = '';
            }
        });
        if (valid) {
            alert('Thank you for reaching out! I will get back to you soon.');
            form.reset();
        }
    });

    // Focus animation
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => input.classList.add('focused'));
        input.addEventListener('blur', () => input.classList.remove('focused'));
    });
}

// Animated social icons on hover (JS fallback for touch devices)
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('touchstart', () => {
        icon.classList.add('active');
        setTimeout(() => icon.classList.remove('active'), 600);
    });
});
