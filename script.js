/**
 * Phase Shift — Engineering Research Initiative
 */

// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const navbar      = document.getElementById('navbar');
const menuToggle  = document.getElementById('menu-toggle');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const yr          = document.getElementById('current-year');

/* ── Theme Management ── */
const applyTheme = (dark) => {
    document.body.classList.toggle('dark', dark);
    themeIcon.setAttribute('data-lucide', dark ? 'moon' : 'sun');
    lucide.createIcons();
};

const savedTheme  = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ── Mobile Menu ── */
const openMenu = () => {
    mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
};

const closeMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
};

if (menuToggle) menuToggle.addEventListener('click', openMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMenu);

// Close when clicking a mobile nav link
if (mobileMenu) {
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
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
            const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

/* ── Utilities ── */
if (yr) yr.textContent = new Date().getFullYear();
