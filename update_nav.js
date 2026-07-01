const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html') && f !== 'index.html');

const newNavLinks = `                <div class="hidden lg:flex items-center gap-2 xl:gap-4 border-r border-white/10 pr-6 mr-2">
                        <a href="index.html" class="nav-link text-[14px]" data-i18n="nav_home">Home</a>
                        <a href="about.html" class="nav-link text-[14px]" data-i18n="nav_about">About</a>
                        <a href="services.html" class="nav-link text-[14px]" data-i18n="nav_services">Services</a>
                        <a href="sermons.html" class="nav-link text-[14px]" data-i18n="nav_sermons">Sermons</a>
                        <a href="events.html" class="nav-link text-[14px]" data-i18n="nav_events">Events</a>
                        <a href="ministries.html" class="nav-link text-[14px]" data-i18n="nav_ministries">Ministries</a>
                        <a href="giving.html" class="nav-link text-[14px]" data-i18n="nav_giving">Giving</a>
                        <a href="contact.html" class="nav-link text-[14px]" data-i18n="nav_contact">Contact</a>
                    </div>

                    <div class="flex items-center gap-6">
                        <!-- Language Selector -->
                        <div class="relative group">
                            <button class="lang-selector-btn hover:bg-white/5 px-3 py-1.5 rounded-full transition-colors duration-300">
                                <i data-lucide="languages" class="w-4 h-4 text-gold-light"></i>
                                <span class="text-[11px] font-bold uppercase tracking-widest text-white/90"
                                    data-i18n="lang_current">EN</span>
                                <i data-lucide="chevron-down"
                                    class="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-white/50"></i>
                            </button>
                            <!-- Dropdown -->
                            <div class="lang-dropdown-menu">
                                <a href="#" class="lang-option active" data-lang="en"><span>English</span> <span class="lang-badge" data-i18n="lang_current">EN</span>
                                </a>
                                <a href="#" class="lang-option" data-lang="am"><span>አማርኛ</span> <span class="lang-badge">AM</span>
                                </a>
                                <a href="#" class="lang-option" data-lang="om"><span>Afaan Oromoo</span> <span class="lang-badge">OM</span>
                                </a>
                            </div>
                        </div>

                        <!-- Login Button -->
                        <a href="login.html"
                            class="flex items-center gap-2 text-[13px] font-semibold text-forest-dark transition-all duration-300 tracking-wide px-6 py-2.5 bg-gold border border-gold rounded-full hover:bg-gold-light hover:scale-105 shadow-[0_4px_14px_rgba(201,168,76,0.3)] active:scale-95">
                            <i data-lucide="user-circle" class="w-4 h-4"></i>
                            <span data-i18n="btn_login">Login</span>
                        </a>
                    </div>
                </div>`;

for (const file of files) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Use regex to find the block
    const regex = /<div class="hidden lg:flex items-center gap-8 xl:gap-12">[\s\S]*?<button id="mobile-menu-btn"/m;
    
    if (regex.test(content)) {
        let replacement = newNavLinks;
        
        // Add active class to current page
        replacement = replacement.replace(
            `href="${file}" class="nav-link text-[14px]"`,
            `href="${file}" class="nav-link text-[14px] active"`
        );
        
        content = content.replace(regex, replacement + '\n                <button id="mobile-menu-btn"');
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`Could not find nav block in ${file}`);
    }
}
