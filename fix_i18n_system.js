/**
 * COMPREHENSIVE i18n FIXER
 * Fixes all language translation issues across the entire Church website:
 * 1. Adds data-lang="en/am/om" to all lang-option dropdowns in all pages
 * 2. Removes duplicate data-i18n attributes
 * 3. Adds language switcher to admin.html
 * 4. Fixes admin nav items with data-i18n tags
 * 5. Rewrites main.js initI18n to use data-lang properly
 */

const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

let totalFixes = 0;

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // -------------------------------------------------------
    // FIX 1: Add data-lang attributes to language option links
    // -------------------------------------------------------
    // English option
    content = content.replace(
        /<a href="#" class="lang-option active">\s*<span>English<\/span>/g,
        '<a href="#" class="lang-option active" data-lang="en"><span>English</span>'
    );
    content = content.replace(
        /<a href="#" class="lang-option">\s*<span>አማርኛ<\/span>/g,
        '<a href="#" class="lang-option" data-lang="am"><span>አማርኛ</span>'
    );
    content = content.replace(
        /<a href="#" class="lang-option">\s*\n?\s*<span>Afaan Oromoo<\/span>/g,
        '<a href="#" class="lang-option" data-lang="om"><span>Afaan Oromoo</span>'
    );

    // -------------------------------------------------------
    // FIX 2: Add onclick to mobile lang buttons if missing
    // -------------------------------------------------------
    // These already have onclick from earlier work, but ensure they're correct
    content = content.replace(
        /onclick="switchLanguage\('en'\); return false;"(\s+data-i18n="lang_current")?/g,
        'onclick="switchLanguage(\'en\'); return false;"'
    );

    // -------------------------------------------------------
    // FIX 3: Remove duplicate data-i18n attributes
    // e.g. data-i18n="nav_home" data-i18n="nav_home" → data-i18n="nav_home"
    // -------------------------------------------------------
    content = content.replace(/(data-i18n="[^"]+")(\s+data-i18n="[^"]+")+/g, '$1');

    // -------------------------------------------------------
    // FIX 4: Fix admin nav items that are missing data-i18n
    // -------------------------------------------------------
    if (file === 'admin.html') {
        const adminNavFixes = [
            ['Dashboard Overview', 'admin_dashboard'],
            ['User Management', 'admin_users'],
            ['Events Manager', 'admin_events'],
            ['Sermons &amp; Media', 'admin_sermons'],
            ['Ministries Control', 'admin_ministries'],
            ['Weekly Services', 'admin_weekly_services'],
            ['Contact Messages', 'admin_contact_messages'],
            ['Prayer Requests', 'admin_prayer_requests'],
            ['Global Settings', 'admin_settings'],
            ['View Live Site', 'admin_view_live'],
            ['Save Changes', 'admin_save_changes'],
        ];

        adminNavFixes.forEach(([text, key]) => {
            // Match text inside nav-item anchor tags
            const regex = new RegExp(
                `(class="nav-item[^"]*"[^>]*)>\\s*(<i[^>]*>[^<]*<\\/i>)\\s*\\n?\\s*${text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}`,
                'g'
            );
            const replacement = `$1><span data-i18n="${key}">${text}</span>$2`;
            // Simpler inline replacement
            if (content.includes(`\n                 ${text}\n`) || content.includes(`>\n                 ${text}\n`)) {
                content = content.replace(
                    new RegExp(`>\\n\\s+${text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\n`, 'g'),
                    `><span data-i18n="${key}">${text}</span>\n`
                );
                changed = true;
            }
        });

        // Add language switcher to admin header if not present
        if (!content.includes('admin-lang-switcher')) {
            const headerSearch = '<div class="flex items-center gap-5">';
            const langSwitcher = `<div class="flex items-center gap-1 mr-2" id="admin-lang-switcher">
                    <button onclick="switchLanguage('en')" class="text-[10px] font-bold px-2.5 py-1 rounded-full border border-forest/20 hover:bg-gold hover:text-forest-dark hover:border-gold transition-all admin-lang-btn" data-lang-btn="en">EN</button>
                    <button onclick="switchLanguage('am')" class="text-[10px] font-bold px-2.5 py-1 rounded-full border border-forest/20 hover:bg-gold hover:text-forest-dark hover:border-gold transition-all admin-lang-btn" data-lang-btn="am">አማ</button>
                    <button onclick="switchLanguage('om')" class="text-[10px] font-bold px-2.5 py-1 rounded-full border border-forest/20 hover:bg-gold hover:text-forest-dark hover:border-gold transition-all admin-lang-btn" data-lang-btn="om">OM</button>
                </div>
                ${headerSearch}`;
            content = content.replace(headerSearch, langSwitcher);
            changed = true;
        }

        // Ensure i18n.js and main.js are loaded in admin.html
        if (!content.includes('i18n.js')) {
            content = content.replace(
                '<script src="../js/admin.js"></script>',
                '<script src="../js/i18n.js"></script>\n    <script src="../js/main.js"></script>\n    <script src="../js/admin.js"></script>'
            );
            changed = true;
        }
    }

    const newContent = content;
    if (newContent !== fs.readFileSync(filePath, 'utf8')) {
        fs.writeFileSync(filePath, newContent);
        totalFixes++;
        console.log(`✓ Fixed: ${file}`);
    }
});

console.log(`\nDone. Fixed ${totalFixes} files.`);
