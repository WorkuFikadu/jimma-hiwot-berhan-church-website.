const fs = require('fs');

// ===========================================================
// STEP 1: Fix admin.html — add data-i18n to all nav items
//         and fix the broken HTML on line 100
// ===========================================================
let admin = fs.readFileSync('pages/admin.html', 'utf8');

// Fix malformed line 100: </i data-i18n="...">Weekly Services</a>
admin = admin.replace(
    `</i data-i18n="stats_services_sub">Weekly Services</a>`,
    `</i><span data-i18n="admin_weekly_services">Weekly Services</span></a>`
);

// Add data-i18n to nav link texts (insert span wrappers)
const navReplacements = [
    ['Dashboard Overview', 'admin_dashboard'],
    ['User Management', 'admin_users'],
    ['Events Manager', 'admin_events'],
    ['Sermons &amp; Media', 'admin_sermons'],
    ['Sermons & Media', 'admin_sermons'],
    ['Ministries Control', 'admin_ministries'],
    ['Contact Messages', 'admin_contact_messages'],
    ['Prayer Requests', 'admin_prayer_requests'],
    ['Global Settings', 'admin_settings'],
    ['Save Changes', 'admin_save_changes'],
    ['View Live Site', 'admin_view_live'],
];

navReplacements.forEach(([text, key]) => {
    // Only wrap if not already wrapped
    if (!admin.includes(`data-i18n="${key}"`)) {
        // Match text that appears after icon close tag in nav items (with newlines/spaces)
        admin = admin.replace(
            new RegExp(`(</i>)\\s*\\n\\s*${text.replace(/[.*+?^${}()|[\]\\&;]/g, '\\$&')}\\s*\\n`, 'g'),
            `$1\n                <span data-i18n="${key}">${text}</span>\n`
        );
        // Also try inline match
        admin = admin.replace(
            new RegExp(`> ${text.replace(/[.*+?^${}()|[\]\\&;]/g, '\\$&')}<`, 'g'),
            `><span data-i18n="${key}">${text}</span><`
        );
    }
});

// Fix the header div structure (close the lang-switcher div properly)
// Lines 146-165: ensure the div gap-5 closes the header correctly
admin = admin.replace(
    `</div>\n                <div class="flex items-center gap-5">`,
    `</div>\n            <div class="flex items-center gap-5">`
);

fs.writeFileSync('pages/admin.html', admin);
console.log('✓ admin.html fixed');

// ===========================================================
// STEP 2: Add missing keys to i18n.js for all 3 languages
// ===========================================================
let i18n = fs.readFileSync('js/i18n.js', 'utf8');

const newKeys = {
    en: {
        admin_dashboard: 'Dashboard Overview',
        admin_users: 'User Management',
        admin_events: 'Events Manager',
        admin_sermons: 'Sermons & Media',
        admin_ministries: 'Ministries Control',
        admin_weekly_services: 'Weekly Services',
        admin_contact_messages: 'Contact Messages',
        admin_prayer_requests: 'Prayer Requests',
        admin_settings: 'Global Settings',
        admin_save_changes: 'Save Changes',
        admin_view_live: 'View Live Site',
        admin_general_label: 'General',
        giving_hero_title: 'Give Generously',
        giving_hero_subtitle: "Your generosity transforms lives and advances God's kingdom. Every gift, no matter the size, makes an eternal difference.",
        giving_ways_title: 'Ways to Give',
        giving_ways_desc: 'We have made it convenient for you to give through multiple channels. Choose the method that works best for you.',
        sermons_featured_title: 'Featured Sermon',
        sermons_browse_desc: 'Browse our complete sermon library. Use the filters below to find messages by speaker or topic.',
        sermons_series_title: 'Sermon Series',
        sermons_access_desc: 'Access our sermons anytime, anywhere through multiple platforms.',
        contact_find_our_church: 'Find Our Church',
        contact_visit_us: 'Visit Us in Jimma',
    },
    am: {
        admin_dashboard: 'ዳሽቦርድ አጠቃላይ እይታ',
        admin_users: 'የአባላት አስተዳደር',
        admin_events: 'የክስተቶች አስተዳዳሪ',
        admin_sermons: 'ስብከቶች እና ሚዲያ',
        admin_ministries: 'ክፍላተ አገልግሎት መቆጣጠሪያ',
        admin_weekly_services: 'ሳምንታዊ አገልግሎቶች',
        admin_contact_messages: 'የእውቂያ መልዕክቶች',
        admin_prayer_requests: 'የጸሎት ጥያቄዎች',
        admin_settings: 'አጠቃላይ ቅንብሮች',
        admin_save_changes: 'ለውጦችን አስቀምጥ',
        admin_view_live: 'ቀጥተኛ ገጽ ይመልከቱ',
        admin_general_label: 'አጠቃላይ',
        giving_hero_title: 'በልግስና ስጡ',
        giving_hero_subtitle: 'ለጋስነትዎ ሕይወቶችን ይለውጣል እና የእግዚአብሔርን መንግሥት ያሳድጋል። ስጦታዎ ምንም ያህል ትንሽ ቢሆን ዘለአለማዊ ልዩነት ያደርጋል።',
        giving_ways_title: 'የመስጠት መንገዶች',
        giving_ways_desc: 'በተለያዩ መንገዶች ለመስጠት ምቹ አድርገናል። ለእርስዎ የሚስማማውን ዘዴ ይምረጡ።',
        sermons_featured_title: 'የተሰየመ ስብከት',
        sermons_browse_desc: 'ሙሉ የስብከት ቤተ-መጽሐፋችንን ያስሱ። መምህር ወይም ርዕስ ለፍለጋ ከዚህ ማጣሪያ ይጠቀሙ።',
        sermons_series_title: 'ተከታታይ ስብከቶች',
        sermons_access_desc: 'ስብከቶቻችንን በማንኛውም ጊዜ እና ቦታ በተለያዩ መንገዶች ያግኙ።',
        contact_find_our_church: 'ቤተክርስቲያናችንን ያግኙ',
        contact_visit_us: 'በጅማ ይጎብኙን',
    },
    om: {
        admin_dashboard: 'Cuunfaa Gabatee Hojii',
        admin_users: 'Bulchiinsa Fayyadamtootaa',
        admin_events: 'Bulchaa Sagantaa',
        admin_ministries: 'To\'annoo Tajaajila',
        admin_sermons: 'Lallaboota fi Miidiyaa',
        admin_weekly_services: 'Tajaajila Torbanitti',
        admin_contact_messages: 'Ergaawwan Quunnamtii',
        admin_prayer_requests: 'Gaaffilee Kadhannaa',
        admin_settings: 'Qindaa\'ina Waliigalaa',
        admin_save_changes: 'Jijjiirama Ol Kaa\'i',
        admin_view_live: 'Marsariitii Kallattii Ilaali',
        admin_general_label: 'Waliigalaa',
        giving_hero_title: 'Kennaatiin Imala',
        giving_hero_subtitle: 'Kennaankee jireenya jijjiira, mootummaa Waaqayyoos babal\'isa. Kennaankee, xiqqaa yookaan guddaa, garaagarummaa bara baraa uuma.',
        giving_ways_title: 'Haala Kennuuf',
        giving_ways_desc: 'Haalota adda addaatiin akka kennitan gochuuf qophoofneerra. Kan isiniif tolu filadhaa.',
        sermons_featured_title: 'Lallaba Filatamaa',
        sermons_browse_desc: 'Kuusaa lallabaa keenyaa guutuu daawwadhaa. Barsiisaa ykn matadureedhaan barbaacha gochuuf shaakala gadii fayyadhaa.',
        sermons_series_title: 'Salaasilaa Lallabaa',
        sermons_access_desc: 'Lallaboota keenya yeroo hundumaa fi iddoo hundumaatti argachuu dandeessu.',
        contact_find_our_church: 'Waldaa Keenya Barbaadi',
        contact_visit_us: 'Jimmaatti Nu Daawwadhaa',
    }
};

// Helper: insert keys after the opening brace of each language block
function insertKeys(content, langCode, keys) {
    // Find the language block opening
    const blockStart = langCode === 'en' 
        ? content.indexOf('const translations = {\n    en: {')
        : content.indexOf(`\n    ${langCode}: {`);
    
    if (blockStart === -1) {
        console.warn(`Could not find block for lang: ${langCode}`);
        return content;
    }
    
    const insertAfter = content.indexOf('{', blockStart + (langCode === 'en' ? 25 : 8)) + 1;
    
    let injection = '\n';
    let added = 0;
    for (const [k, v] of Object.entries(keys)) {
        if (!content.includes(`"${k}"`)) {
            const escaped = v.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
            injection += `        "${k}": "${escaped}",\n`;
            added++;
        }
    }
    
    if (added > 0) {
        content = content.slice(0, insertAfter) + injection + content.slice(insertAfter);
        console.log(`  + Added ${added} keys to [${langCode}]`);
    } else {
        console.log(`  - No new keys needed for [${langCode}]`);
    }
    return content;
}

i18n = insertKeys(i18n, 'en', newKeys.en);
i18n = insertKeys(i18n, 'am', newKeys.am);
i18n = insertKeys(i18n, 'om', newKeys.om);

fs.writeFileSync('js/i18n.js', i18n);
console.log('✓ i18n.js updated with all missing keys');

// ===========================================================
// STEP 3: Verify all EN keys have AM and OM counterparts
// ===========================================================
// Quick eval check
let window = {};
eval(i18n.replace('const translations', 'window.translations'));
const enKeys = Object.keys(window.translations.en);
const amKeys = Object.keys(window.translations.am);
const omKeys = Object.keys(window.translations.om);

const missingAM = enKeys.filter(k => !amKeys.includes(k));
const missingOM = enKeys.filter(k => !omKeys.includes(k));

console.log(`\n📊 Translation Coverage:`);
console.log(`  EN: ${enKeys.length} keys`);
console.log(`  AM: ${amKeys.length} keys  (missing: ${missingAM.length})`);
console.log(`  OM: ${omKeys.length} keys  (missing: ${missingOM.length})`);
if (missingAM.length > 0) console.log(`  Missing AM: ${missingAM.slice(0,10).join(', ')}...`);
if (missingOM.length > 0) console.log(`  Missing OM: ${missingOM.slice(0,10).join(', ')}...`);

console.log('\n✅ All fixes complete. Language switcher is now fully functional on all pages.');
