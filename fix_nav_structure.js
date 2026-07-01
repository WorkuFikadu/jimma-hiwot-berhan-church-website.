const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const desktopRegex = /<div class="hidden lg:flex items-center gap-2 xl:gap-4 border-r border-white\/10 pr-6 mr-2">[\s\S]*?<\/div>\s*<div class="flex items-center gap-6">/;

const mobileRegex = /<div class="flex flex-col items-center justify-center h-full gap-5">[\s\S]*?<div class="h-px w-24 bg-white\/10 my-2"><\/div>/;

for (const file of htmlFiles) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // We need to know which page is active.
    const isHome = file === 'index.html' ? ' active' : '';
    const isAbout = file === 'about.html' ? ' active' : '';
    const isServices = file === 'services.html' ? ' active' : '';
    const isSermons = file === 'sermons.html' ? ' active' : '';
    const isEvents = file === 'events.html' ? ' active' : '';
    const isMinistries = file === 'ministries.html' ? ' active' : '';
    const isGiving = file === 'giving.html' ? ' active' : '';
    const isContact = file === 'contact.html' ? ' active' : '';

    const connectActive = (isServices || isSermons || isEvents || isMinistries) ? ' active' : '';

    const newDesktopNav = `<div class="hidden lg:flex items-center gap-2 xl:gap-4 border-r border-white/10 pr-6 mr-2">
                        <a href="index.html" class="nav-link text-[14px]${isHome}" data-i18n="nav_home">Home</a>
                        <a href="about.html" class="nav-link text-[14px]${isAbout}" data-i18n="nav_about">About</a>
                        <!-- Connect Dropdown -->
                        <div class="relative group nav-dropdown">
                            <button class="nav-link text-[14px] flex items-center gap-1.5${connectActive}">
                                <span data-i18n="nav_connect">Connect</span>
                                <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform group-hover:rotate-180 opacity-70"></i>
                            </button>
                            <div class="nav-dropdown-menu">
                                <a href="services.html" class="dropdown-item${isServices}" data-i18n="nav_services">Services</a>
                                <a href="sermons.html" class="dropdown-item${isSermons}" data-i18n="nav_sermons">Sermons</a>
                                <a href="events.html" class="dropdown-item${isEvents}" data-i18n="nav_events">Events</a>
                                <a href="ministries.html" class="dropdown-item${isMinistries}" data-i18n="nav_ministries">Ministries</a>
                            </div>
                        </div>
                        <a href="giving.html" class="nav-link text-[14px]${isGiving}" data-i18n="nav_giving">Giving</a>
                        <a href="contact.html" class="nav-link text-[14px]${isContact}" data-i18n="nav_contact">Contact</a>
                    </div>
                    <div class="flex items-center gap-6">`;

    const newMobileNav = `<div class="flex flex-col items-center justify-center h-full gap-5">
            <a href="index.html" class="mobile-nav text-xl font-medium text-white hover:text-gold${isHome}" data-i18n="nav_home">Home</a>
            <a href="about.html" class="mobile-nav text-xl font-medium text-white hover:text-gold${isAbout}" data-i18n="nav_about">About</a>
            <div class="flex flex-col items-center gap-3 my-2 bg-white/5 px-12 py-4 rounded-3xl border border-white/5 shadow-inner">
                <span class="text-[11px] text-gold-light uppercase tracking-widest font-bold opacity-80" data-i18n="nav_connect">Connect</span>
                <a href="services.html" class="mobile-nav text-xl font-medium text-white hover:text-gold${isServices}" data-i18n="nav_services">Services</a>
                <a href="sermons.html" class="mobile-nav text-xl font-medium text-white hover:text-gold${isSermons}" data-i18n="nav_sermons">Sermons</a>
                <a href="events.html" class="mobile-nav text-xl font-medium text-white hover:text-gold${isEvents}" data-i18n="nav_events">Events</a>
                <a href="ministries.html" class="mobile-nav text-xl font-medium text-white hover:text-gold${isMinistries}" data-i18n="nav_ministries">Ministries</a>
            </div>
            <a href="giving.html" class="mobile-nav text-xl font-medium text-white hover:text-gold${isGiving}" data-i18n="nav_giving">Giving</a>
            <a href="contact.html" class="mobile-nav text-xl font-medium text-white hover:text-gold${isContact}" data-i18n="nav_contact">Contact</a>
            
            <div class="h-px w-24 bg-white/10 my-2"></div>`;

    let changed = false;
    
    if (desktopRegex.test(content)) {
        content = content.replace(desktopRegex, newDesktopNav);
        changed = true;
    }
    
    if (mobileRegex.test(content)) {
        content = content.replace(mobileRegex, newMobileNav);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed structure for ${file}`);
    } else {
        console.log(`Could not match in ${file}`);
    }
}
