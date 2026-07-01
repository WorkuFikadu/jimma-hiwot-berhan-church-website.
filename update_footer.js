const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const footerRegex = /<h4 class="font-heading text-lg font-bold text-gold mb-4" data-i18n="footer_quick_links">Quick Links<\/h4>\s*<ul class="space-y-2 text-sm">[\s\S]*?<a href="contact\.html"[^>]*data-i18n="nav_contact">Contact<\/a>\s*<\/li>\s*<\/ul>/;

const newFooter = `<h4 class="font-heading text-lg font-bold text-gold mb-4" data-i18n="footer_quick_links">Quick Links</h4>
                            <ul class="space-y-2 text-sm flex flex-col">
                                <li><a href="index.html" class="text-white/60 hover:text-gold transition-colors" data-i18n="nav_home">Home</a></li>
                                <li><a href="about.html" class="text-white/60 hover:text-gold transition-colors" data-i18n="nav_about">About Us</a></li>
                                
                                <li class="pt-2"><span class="text-[11px] text-gold-light uppercase tracking-widest font-bold opacity-80" data-i18n="nav_connect">Connect</span></li>
                                <li class="pl-3 border-l border-white/10 ml-1"><a href="services.html" class="text-white/60 hover:text-gold transition-colors" data-i18n="nav_services">Worship Services</a></li>
                                <li class="pl-3 border-l border-white/10 ml-1"><a href="sermons.html" class="text-white/60 hover:text-gold transition-colors" data-i18n="nav_sermons">Sermons</a></li>
                                <li class="pl-3 border-l border-white/10 ml-1"><a href="events.html" class="text-white/60 hover:text-gold transition-colors" data-i18n="nav_events">Events</a></li>
                                <li class="pl-3 border-l border-white/10 ml-1"><a href="ministries.html" class="text-white/60 hover:text-gold transition-colors" data-i18n="nav_ministries">Ministries</a></li>
                                
                                <li class="pt-2"><a href="giving.html" class="text-white/60 hover:text-gold transition-colors" data-i18n="nav_giving">Giving</a></li>
                                <li><a href="contact.html" class="text-white/60 hover:text-gold transition-colors" data-i18n="nav_contact">Contact</a></li>
                            </ul>`;

for (const file of htmlFiles) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (footerRegex.test(content)) {
        content = content.replace(footerRegex, newFooter);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated footer in ${file}`);
    } else {
        console.log(`Could not match footer in ${file}`);
    }
}
