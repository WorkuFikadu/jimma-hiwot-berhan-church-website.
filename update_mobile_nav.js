const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const mobilePattern = /(<a href="services\.html"\s+class="mobile-nav[^>]+>Services<\/a>\s*<a href="sermons\.html"\s+class="mobile-nav[^>]+>Sermons<\/a>\s*<a href="events\.html"\s+class="mobile-nav[^>]+>Events<\/a>\s*<a href="ministries\.html"\s+class="mobile-nav[^>]+>Ministries<\/a>)/;

for (const file of htmlFiles) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const match = content.match(mobilePattern);
    if (match) {
        const originalBlock = match[1];
        
        const groupedMobileHtml = `<div class="flex flex-col items-center gap-3 my-2 bg-white/5 px-12 py-4 rounded-3xl border border-white/5 shadow-inner">
                <span class="text-[11px] text-gold-light uppercase tracking-widest font-bold opacity-80" data-i18n="nav_connect">Connect</span>
                <a href="services.html" class="mobile-nav text-xl font-medium text-white hover:text-gold" data-i18n="nav_services">Services</a>
                <a href="sermons.html" class="mobile-nav text-xl font-medium text-white hover:text-gold" data-i18n="nav_sermons">Sermons</a>
                <a href="events.html" class="mobile-nav text-xl font-medium text-white hover:text-gold" data-i18n="nav_events">Events</a>
                <a href="ministries.html" class="mobile-nav text-xl font-medium text-white hover:text-gold" data-i18n="nav_ministries">Ministries</a>
            </div>`;
                        
        const newContent = content.replace(originalBlock, groupedMobileHtml);
        
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated mobile nav in ${file}`);
    } else {
        console.log(`No match in ${file}`);
    }
}
