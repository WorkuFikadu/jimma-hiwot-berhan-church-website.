const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const pattern = /(<a href="services\.html"[^>]*>Services<\/a>\s*<a href="sermons\.html"[^>]*>Sermons<\/a>\s*<a href="events\.html"[^>]*>Events<\/a>\s*<a href="ministries\.html"[^>]*>Ministries<\/a>)/;

for (const file of htmlFiles) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const match = content.match(pattern);
    if (match) {
        const originalBlock = match[1];
        
        // Check active state
        const servActive = originalBlock.match(/<a href="services\.html"[^>]*class="[^"]*active[^"]*"/) ? ' active' : '';
        const sermActive = originalBlock.match(/<a href="sermons\.html"[^>]*class="[^"]*active[^"]*"/) ? ' active' : '';
        const eventActive = originalBlock.match(/<a href="events\.html"[^>]*class="[^"]*active[^"]*"/) ? ' active' : '';
        const minActive = originalBlock.match(/<a href="ministries\.html"[^>]*class="[^"]*active[^"]*"/) ? ' active' : '';
        
        const connectActive = (servActive || sermActive || eventActive || minActive) ? ' active' : '';
        
        const dropdownHtml = `<!-- Connect Dropdown -->
                        <div class="relative group nav-dropdown">
                            <button class="nav-link text-[14px] flex items-center gap-1.5${connectActive}">
                                <span data-i18n="nav_connect">Connect</span>
                                <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform group-hover:rotate-180 opacity-70"></i>
                            </button>
                            <div class="nav-dropdown-menu">
                                <a href="services.html" class="dropdown-item${servActive}" data-i18n="nav_services">Services</a>
                                <a href="sermons.html" class="dropdown-item${sermActive}" data-i18n="nav_sermons">Sermons</a>
                                <a href="events.html" class="dropdown-item${eventActive}" data-i18n="nav_events">Events</a>
                                <a href="ministries.html" class="dropdown-item${minActive}" data-i18n="nav_ministries">Ministries</a>
                            </div>
                        </div>`;
                        
        const newContent = content.replace(originalBlock, dropdownHtml);
        
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`No match in ${file}`);
    }
}
