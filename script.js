/**
 * Phase Shift — Engineering Research Initiative
 * Clean Script (Mobile Menu Removed)
 */

// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navbar = document.getElementById('navbar');
const popup = document.getElementById('mobile-popup');
const popupClose = document.getElementById('popup-close');
const yr = document.getElementById('current-year');

/* ── Theme Management ── */
const applyTheme = (dark) => {
    document.body.classList.toggle('dark', dark);
    themeIcon.setAttribute('data-lucide', dark ? 'moon' : 'sun');
    lucide.createIcons();
};

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ── Navbar Scroll Effect ── */
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
});

/* ── Smooth Scrolling ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            const headerOffset = 72;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ── Utilities ── */
if (yr) yr.textContent = new Date().getFullYear();

/* ── Recruitment Popup ── */
if (window.innerWidth <= 768 && !sessionStorage.getItem('psPopup')) {
    setTimeout(() => {
        if (popup) {
            popup.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }, 1400);
}

if (popupClose) {
    popupClose.addEventListener('click', () => {
        popup.classList.add('hidden');
        document.body.style.overflow = '';
        sessionStorage.setItem('psPopup', '1');
    });
}


