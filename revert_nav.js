const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const desktopPattern = /<!-- Connect Dropdown -->[\s\S]*?<div class="nav-dropdown-menu">\s*<a href="services\.html" class="dropdown-item( active)?" data-i18n="nav_services">Services<\/a>\s*<a href="sermons\.html" class="dropdown-item( active)?" data-i18n="nav_sermons">Sermons<\/a>\s*<a href="events\.html" class="dropdown-item( active)?" data-i18n="nav_events">Events<\/a>\s*<a href="ministries\.html" class="dropdown-item( active)?" data-i18n="nav_ministries">Ministries<\/a>\s*<\/div>\s*<\/div>/;

const mobilePattern = /<div class="flex flex-col items-center gap-3 my-2 bg-white\/5 px-12 py-4 rounded-3xl border border-white\/5 shadow-inner">[\s\S]*?<span[^>]*data-i18n="nav_connect"[^>]*>Connect<\/span>\s*<a href="services\.html" class="mobile-nav text-xl font-medium text-white hover:text-gold" data-i18n="nav_services">Services<\/a>\s*<a href="sermons\.html" class="mobile-nav text-xl font-medium text-white hover:text-gold" data-i18n="nav_sermons">Sermons<\/a>\s*<a href="events\.html" class="mobile-nav text-xl font-medium text-white hover:text-gold" data-i18n="nav_events">Events<\/a>\s*<a href="ministries\.html" class="mobile-nav text-xl font-medium text-white hover:text-gold" data-i18n="nav_ministries">Ministries<\/a>\s*<\/div>/;

for (const file of htmlFiles) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let changed = false;

    const desktopMatch = content.match(desktopPattern);
    if (desktopMatch) {
        const servActive = desktopMatch[1] || '';
        const sermActive = desktopMatch[2] || '';
        const eventActive = desktopMatch[3] || '';
        const minActive = desktopMatch[4] || '';

        const originalDesktopHtml = `<a href="services.html" class="nav-link text-[14px]${servActive}" data-i18n="nav_services">Services</a>
                        <a href="sermons.html" class="nav-link text-[14px]${sermActive}" data-i18n="nav_sermons">Sermons</a>
                        <a href="events.html" class="nav-link text-[14px]${eventActive}" data-i18n="nav_events">Events</a>
                        <a href="ministries.html" class="nav-link text-[14px]${minActive}" data-i18n="nav_ministries">Ministries</a>`;
                        
        content = content.replace(desktopMatch[0], originalDesktopHtml);
        changed = true;
    }

    const mobileMatch = content.match(mobilePattern);
    if (mobileMatch) {
        const originalMobileHtml = `<a href="services.html" class="mobile-nav text-xl font-medium text-white hover:text-gold"
                data-i18n="nav_services">Services</a>
            <a href="sermons.html" class="mobile-nav text-xl font-medium text-white hover:text-gold"
                data-i18n="nav_sermons">Sermons</a>
            <a href="events.html" class="mobile-nav text-xl font-medium text-white hover:text-gold"
                data-i18n="nav_events">Events</a>
            <a href="ministries.html" class="mobile-nav text-xl font-medium text-white hover:text-gold"
                data-i18n="nav_ministries">Ministries</a>`;
                
        content = content.replace(mobileMatch[0], originalMobileHtml);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Reverted ${file}`);
    }
}
