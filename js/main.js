// ============================================
// Jimma Hiwot Berhan Church - Shared JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    initLucideIcons();
    initNavigation();
    initScrollAnimations();
    initAccordions();
    initScrollToTop();
    initAdminState();
    initScrollProgress();
    initI18n(); // Initialize translation system
    initAuthNav(); // Show logout if logged in
});

function initAdminState() {
    const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true' || localStorage.getItem('church_admin') === 'true';
    if (isAdmin) {
        localStorage.setItem('church_admin', 'true');
        const nav = document.querySelector('.nav-container-inner .lg\\:flex');
        if (nav && !document.querySelector('.admin-link')) {
            const adminLink = document.createElement('a');
            adminLink.href = 'admin.html';
            adminLink.className = 'admin-link flex items-center gap-2 px-3 py-1 bg-gold/20 text-gold rounded-full text-[10px] font-bold uppercase tracking-widest border border-gold/30 hover:bg-gold hover:text-forest-dark transition-all';
            adminLink.innerHTML = '<i data-lucide="settings" class="w-3.5 h-3.5"></i> Admin Panel';
            nav.insertBefore(adminLink, nav.firstChild);
            if (window.lucide) lucide.createIcons();
        }
    }
}

// ============================================
// i18n — Language Translation System
// ============================================

function initI18n() {
    const savedLang = localStorage.getItem('church_lang') || 'en';
    switchLanguage(savedLang);

    // Desktop dropdown language options — use data-lang attribute (reliable, no innerText guessing)
    document.querySelectorAll('.lang-option[data-lang]').forEach(function(option) {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            switchLanguage(this.getAttribute('data-lang'));
        });
    });

    // Admin dashboard language toggle buttons
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn) {
        btn.addEventListener('click', function() {
            switchLanguage(this.getAttribute('data-lang-btn'));
        });
    });
}

/**
 * switchLanguage — core translation engine
 * Translates every [data-i18n] element and every [data-i18n-placeholder] input.
 * Also updates the visual state of all language selectors.
 */
function switchLanguage(lang) {
    if (!lang || !['en', 'am', 'om'].includes(lang)) lang = 'en';

    localStorage.setItem('church_lang', lang);
    document.documentElement.lang = lang;

    // Guard: translations object must be loaded (from i18n.js)
    if (typeof translations === 'undefined') {
        console.warn('JHBC i18n: translations dictionary not loaded.');
        return;
    }

    var dict = translations[lang];
    if (!dict) {
        console.warn('JHBC i18n: no dictionary for language:', lang);
        return;
    }

    // 1. Translate all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (key && dict[key] !== undefined) {
            el.innerHTML = dict[key];
        }
    });

    // 2. Translate all input/textarea placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (key && dict[key] !== undefined) {
            el.placeholder = dict[key];
        }
    });

    // 3. Translate select option text
    document.querySelectorAll('[data-i18n-option]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-option');
        if (key && dict[key] !== undefined) {
            el.text = dict[key];
        }
    });

    // 4. Update selector UI to reflect new language
    updateLangSelectorUI(lang);
}

function updateLangSelectorUI(lang) {
    var shortLabelMap = { 'en': 'EN', 'am': 'አማ', 'om': 'OM' };

    // Update the dropdown button's visible label
    var btnLabels = document.querySelectorAll('.lang-selector-btn span[data-i18n="lang_current"]');
    btnLabels.forEach(function(el) {
        el.innerText = shortLabelMap[lang] || lang.toUpperCase();
    });

    // Highlight the active desktop dropdown option
    document.querySelectorAll('.lang-option').forEach(function(opt) {
        var optLang = opt.getAttribute('data-lang');
        if (optLang) {
            opt.classList.toggle('active', optLang === lang);
        }
    });

    // Highlight mobile menu language buttons
    document.querySelectorAll('#mobile-menu .flex.gap-4 a').forEach(function(a) {
        var onclick = a.getAttribute('onclick') || '';
        var isActive = onclick.indexOf("'" + lang + "'") !== -1;
        a.classList.toggle('text-gold', isActive);
        a.classList.toggle('font-bold', isActive);
        a.classList.toggle('text-white', !isActive);
        a.classList.toggle('text-white/60', !isActive);
    });

    // Highlight admin dashboard lang toggle buttons
    document.querySelectorAll('[data-lang-btn]').forEach(function(btn) {
        var isActive = btn.getAttribute('data-lang-btn') === lang;
        btn.classList.toggle('bg-gold', isActive);
        btn.classList.toggle('text-forest-dark', isActive);
        btn.classList.toggle('border-gold', isActive);
    });
}

// Expose switchLanguage globally so HTML onclick="switchLanguage('am')" works
window.switchLanguage = switchLanguage;


function initLucideIcons() {
    if (window.lucide) lucide.createIcons();
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
        if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
    }

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }
}

function initScrollToTop() {
    const btn = document.createElement('div');
    btn.id = 'scroll-to-top';
    btn.innerHTML = '<i data-lucide="chevron-up"></i>';
    document.body.appendChild(btn);
    if (window.lucide) lucide.createIcons();

    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 300);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initScrollProgress() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    navbar.appendChild(progress);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progress.style.width = ((winScroll / height) * 100) + '%';
    });
}

// ============================================
// Scroll Animations
// ============================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));
}

// ============================================
// Accordions
// ============================================
function initAccordions() {
    document.querySelectorAll('.accordion-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            content.classList.toggle('open');
            if (icon) {
                icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    });
}

// ============================================
// Toast
// ============================================
function showToast(message, type = 'success') {
    let el = document.getElementById('toast');
    if (!el) {
        el = document.createElement('div');
        el.id = 'toast';
        el.className = 'toast';
        document.body.appendChild(el);
    }
    el.textContent = message;
    el.className = 'toast ' + type + ' show';
    setTimeout(() => el.classList.remove('show'), 4500);
}

// ============================================
// API Helper
// ============================================
async function fetchAPI(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        return await res.json();
    } catch (e) {
        console.error('API Error:', e);
        return null;
    }
}

// ============================================
// Date Helpers
// ============================================
function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
function getMonthShort(d) { return new Date(d).toLocaleDateString('en-US', { month: 'short' }).toUpperCase(); }
function getDayNum(d) { return new Date(d).getDate(); }

// ============================================
// Video Modal
// ============================================
function openVideo(url) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    if (!modal || !iframe) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    iframe.src = url;
    document.body.style.overflow = 'hidden';
}
function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-iframe');
    if (!modal || !iframe) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    iframe.src = '';
    document.body.style.overflow = '';
}

// ============================================
// Auth-Aware Navigation (Login <-> Logout)
// ============================================
async function initAuthNav() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const apiBase = depth >= 2 ? '../api' : 'api';

    try {
        const res = await fetch(`${apiBase}/auth.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'check' })
        });
        const data = await res.json();
        if (!data.logged_in) return;

        document.querySelectorAll('a[href="login.html"], a[href*="/login.html"]').forEach(link => {
            if (!link.closest('nav')) return;
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'nav-logout-btn';
            logoutBtn.className = 'flex items-center gap-2 text-[12px] font-bold text-white transition-all duration-300 uppercase tracking-widest px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-terracotta hover:text-white hover:border-terracotta hover:shadow-lg hover:shadow-terracotta/20 active:scale-95';
            logoutBtn.innerHTML = '<i data-lucide="log-out" class="w-4 h-4 opacity-80"></i><span>Logout</span>';
            logoutBtn.onclick = doLogout;
            link.replaceWith(logoutBtn);
        });

        if (window.lucide) lucide.createIcons();
    } catch (e) {
        // Silently fail — auth nav is a progressive enhancement
    }
}

async function doLogout() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    const apiBase = depth >= 2 ? '../api' : 'api';
    try {
        await fetch(`${apiBase}/auth.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'logout' })
        });
    } catch (e) {}
    localStorage.removeItem('church_admin');
    window.location.href = 'login.html';
}

// ============================================
// Form Helpers
// ============================================
function setupForm(formId, submitId, apiUrl, successMsg) {
    const form = document.getElementById(formId);
    const btn = document.getElementById(submitId);
    if (!form || !btn) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        btn.disabled = true;
        const origHTML = btn.innerHTML;
        btn.innerHTML = '<svg class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4m-7.07-3.93l2.83-2.83m8.48-8.48l2.83-2.83M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83"/></svg> Processing...';

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.success) {
                showToast(successMsg || result.message, 'success');
                form.reset();
            } else {
                showToast(result.error || 'Something went wrong.', 'error');
            }
        } catch (e) {
            showToast('Network error. Please try again.', 'error');
        }

        btn.disabled = false;
        btn.innerHTML = origHTML;
        initLucideIcons();
    });
}
