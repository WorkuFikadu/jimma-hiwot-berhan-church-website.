const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, 'js', 'i18n.js');
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

// 1. Missing keys for AM and OM
const am_additions = {
    "admin_master_control": "ዋና መቆጣጠሪያ",
    "admin_jhbc_system": "የጅማ ሕይወት ብርሃን ሲስተም",
    "admin_content_control": "የይዘት መቆጣጠሪያ",
    "admin_system": "ሲስተም",
    "admin_system_admin": "የሲስተም አስተዳዳሪ",
    "admin_superuser": "ዋና አስተዳዳሪ",
    "admin_system_command": "የሲስተም ማዘዣ ማዕከል",
    "admin_realtime": "የአሁኑ ሁኔታ፦",
    "admin_edit_item": "ያስተካክሉ",
    "admin_cancel": "ሰርዝ",
    "contact_jimma_region": "ጅማ ከተማ፣ ኦሮሚያ ክልል<br>ኢትዮጵያ",
    "contact_find_our_church": "ቤተክርስቲያናችንን ያግኙ",
    "contact_visit_us": "በጅማ ይጎብኙን",
    "giving_ways_title": "የመስጫ መንገዶች",
    "giving_ways_desc": "በተለያዩ አማራጮች መስጠት እንዲችሉ አዘጋጅተናል። ለእርስዎ የሚመችዎትን አማራጭ ይጠቀሙ።",
    "giving_account_name": "ስም፦ የጅማ የሕይወት ብርሃን ቤተክርስቲያን",
    "global_label": "ዓለም አቀፍ",
    "church_media_team": "የቤተክርስቲያን ሚዲያ ቡድን • ጅማ፣ ኢትዮጵያ",
    "date_sunday_jan_12": "እሁድ፣ ጥር 4፣ 2017",
    "sermons_featured_title": "ተመራጭ ስብከት",
    "sermons_browse_desc": "ሁሉንም ስብከቶቻችንን ያስሱ። በአገልግሎት አቅራቢ ወይም በርዕስ ለመፈለግ ከታች ያሉትን ማጣሪያዎች ይጠቀሙ።",
    "sermons_series_title": "ተከታታይ ስብከቶች",
    "date_sept_nov_2024": "መስከረም — ኅዳር 2017",
    "sermon_series_1": "በእምነት መራመድ",
    "date_jun_aug_2024": "ሰኔ — ነሐሴ 2016",
    "date_mar_apr_2024": "መጋቢት — ሚያዚያ 2016",
    "sermons_access_desc": "ስብከቶቻችንን በማንኛውም ጊዜ እና ቦታ በተለያዩ መድረኮች ያግኙ።",
    "worship_arts_label": "አምልኮ እና ስነ-ጥበብ",
    "praise_intercession_title": "ምስጋና እና ምልጃ",
    "team_leader_label": "የቡድን መሪ",
    "word_teaching_label": "ቃል እና ትምህርት",
    "biblical_exposition_title": "መጽሐፍ ቅዱሳዊ ማብራሪያ",
    "youth_power_label": "የወጣቶች ኃይል",
    "generation_next_title": "ቀጣዩ ትውልድ"
};

const om_additions = {
    "admin_master_control": "To'annoo Muummee",
    "admin_jhbc_system": "Sirna JHBC",
    "admin_content_control": "To'annoo Qabiyyee",
    "admin_system": "Sirna",
    "admin_system_admin": "Bulchaa Sirnaa",
    "admin_superuser": "Muummee Bulchaa",
    "admin_system_command": "Giddugala Ajaja Sirnaa",
    "admin_realtime": "Haala amma jiru:",
    "admin_edit_item": "Gulaali",
    "admin_cancel": "Haqi",
    "contact_jimma_region": "Magaalaa Jimmaa, Naannoo Oromiyaa<br>Itoophiyaa",
    "contact_find_our_church": "Waldaa Keenya Barbaadaa",
    "contact_visit_us": "Jimmaatti Nu Daawwadhaa",
    "giving_ways_title": "Karaawwan Ittiin Kennan",
    "giving_ways_desc": "Karaa adda addaatiin akka kennitan gooneerra. Filannoo isiniif mijaahu filadhaa.",
    "giving_bank_transfer": "Baankiin Dabarsuu",
    "giving_mobile_money": "Maallaqa Moobaayilaa",
    "giving_telebirr": "Telebirr",
    "giving_cbebirr": "CBE Birr",
    "giving_online": "Toora Interneetiin",
    "giving_account_name": "Maqaa: Waldaa Ifa Jireenyaa Jimmaa",
    "global_label": "Aduunyaa",
    "church_media_team": "Gareen Miidiyaa Waldaa • Jimmaa, Itoophiyaa",
    "date_sunday_jan_12": "Dilbata, Amajjii 12, 2025",
    "sermons_featured_title": "Lallaba Filatamaa",
    "sermons_browse_desc": "Kuusaa lallaba keenyaa guutuu daawwadhaa. Nama lallabe ykn mata dureen barbaaduuf filannoowwan armaan gadii fayyadamaa.",
    "sermons_series_title": "Lallaba Walitti Fufaa",
    "date_sept_nov_2024": "Fulbaana — Sadaasa 2024",
    "sermon_series_1": "Amantiin Deemuu",
    "date_jun_aug_2024": "Waxabajjii — Hagayya 2024",
    "date_mar_apr_2024": "Bitootessa — Ebla 2024",
    "sermons_access_desc": "Lallaboota keenya yeroo hundaa fi bakka hundaatti argachuu dandeessu.",
    "worship_arts_label": "Waaqeffannaa fi Aartii",
    "praise_intercession_title": "Galataa fi Kadhannaa",
    "team_leader_label": "Hogganaa Garee",
    "word_teaching_label": "Dubbii fi Barsiisa",
    "biblical_exposition_title": "Ibsa Macaafa Qulqulluu",
    "youth_power_label": "Humna Dargaggootaa",
    "generation_next_title": "Dhaloota Itti Aanu"
};

const new_keys_en = {
    "admin_save_changes": "Save Changes",
    "lang_om": "Afaan Oromoo",
    "tag_remastered": "Remastered",
    "strategic_roadmap": "Strategic Roadmap",
    "shepherds_bg": "SHEPHERDS",
    "pastor_abraham": "Abraham Tadesse",
    "pastor_samuel": "Samuel Kebede",
    "pastor_daniel": "Daniel Hailu",
    "pastor_ruth": "Ruth Tesfaye",
    "the_sanctuary": "the <span class='text-gold italic'>Sanctuary</span>",
    "amole_dashen": "Amole (Dashen Bank)",
    "mobile_banking_fast": "Mobile banking is the fastest way to give. Transfers are processed instantly.",
    "offering_boxes_counted": "Offering boxes are opened and counted by at least two authorized finance team members following strict financial procedures.",
    "coming_soon": "Coming Soon",
    "where_giving_goes": "Where Your Giving Goes",
    "church_building_fund": "Church Building Fund",
    "youth_children_fund": "Youth & Children",
    "annual_giving_report": "Annual Giving Report",
    "table_category": "Category",
    "join_online_community": "Join Our <span class='text-gold italic font-light'>Online Community</span>",
    "stay_connected_desc": "Stay connected with Jimma Hiwot Berhan Church.<br> Experience spiritual growth wherever you are.",
    "moments_of_light": "Moments of <span class='text-gold italic'>Light</span>",
    "eternal_moments": "Eternal <br> Moments",
    "date_jan_5_2025": "Sunday, January 5, 2025",
    "jimma_oromia_ethiopia": "Jimma Town, Oromia, Ethiopia",
    "info_email": "info@hiwotberhan.org",
    "grace_and_giving": "Grace & Giving",
    "youtube_channel": "YouTube Channel",
    "podcast_label": "Podcast",
    "martha_tesfaye": "Martha Tesfaye",
    "solomon_abebe": "Solomon Abebe",
    "youth_director": "Youth Director",
    "henok_tadesse": "Henok Tadesse",
    "greeters_welcome": "Greeters & Welcome",
    "heart_of_service": "Heart of Service",
    "admin_head": "Admin Head",
    "bekele_gizaw": "Bekele Gizaw",
    "watch_label": "Watch"
};

const new_keys_am = {
    "admin_save_changes": "ለውጦችን አስቀምጥ",
    "lang_om": "አፋን ኦሮሞ",
    "tag_remastered": "የተሻሻለ",
    "strategic_roadmap": "ስልታዊ ዕቅድ",
    "shepherds_bg": "እረኞች",
    "pastor_abraham": "አብርሃም ታደሰ",
    "pastor_samuel": "ሳሙኤል ከበደ",
    "pastor_daniel": "ዳንኤል ሀይሉ",
    "pastor_ruth": "ሩት ተስፋዬ",
    "the_sanctuary": "ወደ <span class='text-gold italic'>አዳራሹ</span>",
    "amole_dashen": "አሞሌ (ዳሽን ባንክ)",
    "mobile_banking_fast": "በሞባይል ባንክ መስጠት ፈጣኑ መንገድ ነው። ዝውውሮች ወዲያውኑ ይፈጸማሉ።",
    "offering_boxes_counted": "የስጦታ ሳጥኖች ቢያንስ በሁለት የተፈቀደላቸው የፋይናንስ ቡድን አባላት በጥብቅ የፋይናንስ ሥነ-ሥርዓቶች መሠረት ይከፈታሉ እንዲሁም ይቆጠራሉ።",
    "coming_soon": "በቅርቡ የሚመጣ",
    "where_giving_goes": "ስጦታዎ ወዴት ይሄዳል",
    "church_building_fund": "የቤተክርስቲያን ሕንፃ ፈንድ",
    "youth_children_fund": "ወጣቶች እና ልጆች",
    "annual_giving_report": "ዓመታዊ የስጦታ ሪፖርት",
    "table_category": "ምድብ",
    "join_online_community": "የመስመር ላይ <span class='text-gold italic font-light'>ማህበረሰባችንን</span> ይቀላቀሉ",
    "stay_connected_desc": "ከጅማ የሕይወት ብርሃን ቤተክርስቲያን ጋር ይገናኙ።<br> ባሉበት ቦታ መንፈሳዊ ዕድገትን ይለማመዱ።",
    "moments_of_light": "የብርሃን <span class='text-gold italic'>ጊዜያት</span>",
    "eternal_moments": "ዘላለማዊ <br> ጊዜያት",
    "date_jan_5_2025": "እሁድ፣ ታህሳስ 27፣ 2017",
    "jimma_oromia_ethiopia": "ጅማ ከተማ፣ ኦሮሚያ፣ ኢትዮጵያ",
    "info_email": "info@hiwotberhan.org",
    "grace_and_giving": "ጸጋ እና መስጠት",
    "youtube_channel": "የዩቲዩብ ቻናል",
    "podcast_label": "ፖድካስት",
    "martha_tesfaye": "ማርታ ተስፋዬ",
    "solomon_abebe": "ሰሎሞን አበበ",
    "youth_director": "የወጣቶች ዳይሬክተር",
    "henok_tadesse": "ሄኖክ ታደሰ",
    "greeters_welcome": "አቀባባዮች እና እንግዳ ተቀባዮች",
    "heart_of_service": "የአገልግሎት ልብ",
    "admin_head": "ዋና አስተዳዳሪ",
    "bekele_gizaw": "በቀለ ግዛው",
    "watch_label": "ይመልከቱ"
};

const new_keys_om = {
    "admin_save_changes": "Jijjiiramoota Olkaa'i",
    "lang_om": "Afaan Oromoo",
    "tag_remastered": "Kan Fooyya'e",
    "strategic_roadmap": "Karoora Tarsiimawaa",
    "shepherds_bg": "TIKSOOTA",
    "pastor_abraham": "Abrahaam Taaddasaa",
    "pastor_samuel": "Saamu'eel Kabadaa",
    "pastor_daniel": "Daani'eel Haayiluu",
    "pastor_ruth": "Ruut Tasfaayee",
    "the_sanctuary": "gara <span class='text-gold italic'>Galma</span>tti",
    "amole_dashen": "Amoolee (Baankii Daashan)",
    "mobile_banking_fast": "Baankiin moobaayilaa karaa saffisaa ittiin kennaniidha. Maallaqni battalatti darba.",
    "offering_boxes_counted": "Saanduqni aarsaa miseensota garee faayinaansii hayyama qaban yoo xiqqaate namoota lamaan sirna faayinaansii cimaa hordofuun banamee lakkaa'ama.",
    "coming_soon": "Dhiyootti Kan Eegalu",
    "where_giving_goes": "Kennaan Keessan Eessa Deema",
    "church_building_fund": "Fandii Ijaarsa Waldaa",
    "youth_children_fund": "Dargaggootaa fi Ijoollee",
    "annual_giving_report": "Gabaasa Kennaa Waggaa",
    "table_category": "Ramaddii",
    "join_online_community": "Hawaasa Keenya <span class='text-gold italic font-light'>Toora Interneetii</span>tti Makamaa",
    "stay_connected_desc": "Waldaa Ifa Jireenyaa Jimmaa wajjin wal quunnamaa.<br> Bakka jirtanitti guddina hafuuraa shaakalaa.",
    "moments_of_light": "Yeroo <span class='text-gold italic'>Ifaa</span>",
    "eternal_moments": "Yeroo <br> Bara Baraa",
    "date_jan_5_2025": "Dilbata, Muddee 27, 2024",
    "jimma_oromia_ethiopia": "Magaalaa Jimmaa, Oromiyaa, Itoophiyaa",
    "info_email": "info@hiwotberhan.org",
    "grace_and_giving": "Ayyaanaa fi Kennuu",
    "youtube_channel": "Chaanaalii YouTube",
    "podcast_label": "Podkaastii",
    "martha_tesfaye": "Maartaa Tasfaayee",
    "solomon_abebe": "Solomoon Abbabaa",
    "youth_director": "Daayirektara Dargaggootaa",
    "henok_tadesse": "Henook Taaddasaa",
    "greeters_welcome": "Simbirroo fi Simannaa",
    "heart_of_service": "Onnee Tajaajilaa",
    "admin_head": "Itti Gaafatamaa Bulchiinsaa",
    "bekele_gizaw": "Baqqalaa Gizaaw",
    "watch_label": "Daawwadhu"
};

// Insert into i18nContent
function injectTranslations(lang, content, add1, add2) {
    let target = `"lang_current": "${lang === 'en' ? 'EN' : (lang === 'am' ? 'አማ' : 'OM')}"`;
    let idx = content.indexOf(target);
    if (idx !== -1) {
        let str = "";
        for (let [k, v] of Object.entries(add1)) str += `        "${k}": "${v.replace(/"/g, '\\"')}",\n`;
        if (add2) {
            for (let [k, v] of Object.entries(add2)) str += `        "${k}": "${v.replace(/"/g, '\\"')}",\n`;
        }
        return content.substring(0, idx) + str + content.substring(idx);
    }
    return content;
}

i18nContent = injectTranslations('en', i18nContent, new_keys_en, null);
i18nContent = injectTranslations('am', i18nContent, am_additions, new_keys_am);
i18nContent = injectTranslations('om', i18nContent, om_additions, new_keys_om);

fs.writeFileSync(i18nPath, i18nContent, 'utf8');
console.log("Updated i18n.js with missing keys.");


// 2. Replace hardcoded strings in HTML files
const replacements = [
    { file: 'admin.html', search: />Save Changes</g, replace: ' data-i18n="admin_save_changes">Save Changes<' },
    { file: 'all', search: /<span>Afaan Oromoo<\\/span>/g, replace: '<span data-i18n="lang_om">Afaan Oromoo</span>' },
    { file: 'about.html', search: />Remastered</g, replace: ' data-i18n="tag_remastered">Remastered<' },
    { file: 'about.html', search: />Strategic Roadmap</g, replace: ' data-i18n="strategic_roadmap">Strategic Roadmap<' },
    { file: 'about.html', search: />SHEPHERDS</g, replace: ' data-i18n="shepherds_bg">SHEPHERDS<' },
    { file: 'all', search: />Abraham Tadesse</g, replace: ' data-i18n="pastor_abraham">Abraham Tadesse<' },
    { file: 'all', search: />Samuel Kebede</g, replace: ' data-i18n="pastor_samuel">Samuel Kebede<' },
    { file: 'all', search: />Daniel Hailu</g, replace: ' data-i18n="pastor_daniel">Daniel Hailu<' },
    { file: 'all', search: />Ruth Tesfaye</g, replace: ' data-i18n="pastor_ruth">Ruth Tesfaye<' },
    { file: 'about.html', search: /the <span class="text-gold italic">Sanctuary<\\/span><\\/h2>/g, replace: '<span data-i18n="the_sanctuary">the <span class="text-gold italic">Sanctuary</span></span></h2>' },
    { file: 'giving.html', search: />Amole \\(Dashen Bank\\)</g, replace: ' data-i18n="amole_dashen">Amole (Dashen Bank)<' },
    { file: 'giving.html', search: />Mobile banking is the fastest way to give\\. Transfers are processed instantly\\.</g, replace: ' data-i18n="mobile_banking_fast">Mobile banking is the fastest way to give. Transfers are processed instantly.<' },
    { file: 'giving.html', search: />Offering boxes are opened and counted by at least two authorized finance team members following strict financial procedures\\.</g, replace: ' data-i18n="offering_boxes_counted">Offering boxes are opened and counted by at least two authorized finance team members following strict financial procedures.<' },
    { file: 'giving.html', search: />Coming Soon</g, replace: ' data-i18n="coming_soon">Coming Soon<' },
    { file: 'giving.html', search: />Where Your Giving Goes</g, replace: ' data-i18n="where_giving_goes">Where Your Giving Goes<' },
    { file: 'giving.html', search: />Church Building Fund</g, replace: ' data-i18n="church_building_fund">Church Building Fund<' },
    { file: 'giving.html', search: />Youth &amp; Children</g, replace: ' data-i18n="youth_children_fund">Youth &amp; Children<' },
    { file: 'giving.html', search: />Annual Giving Report</g, replace: ' data-i18n="annual_giving_report">Annual Giving Report<' },
    { file: 'giving.html', search: />Category</g, replace: ' data-i18n="table_category">Category<' },
    { file: 'index.html', search: /Experiencing the <span class="text-gold font-medium">Light of Life<\\/span> through authentic worship,/g, replace: '<span data-i18n="hero_tagline">Experiencing the <span class="text-gold font-medium">Light of Life</span> through authentic worship,' },
    { file: 'index.html', search: /Join Our <span class="text-gold italic font-light">Online Community<\\/span>/g, replace: '<span data-i18n="join_online_community">Join Our <span class="text-gold italic font-light">Online Community</span></span>' },
    { file: 'index.html', search: /Stay connected with Jimma Hiwot Berhan Church\\.<br> Experience spiritual growth wherever ,<br>you/g, replace: '<span data-i18n="stay_connected_desc">Stay connected with Jimma Hiwot Berhan Church.<br> Experience spiritual growth wherever you are.</span>' },
    { file: 'index.html', search: /of <span class="text-gold italic">Light<\\/span><\\/h2>/g, replace: '<span data-i18n="moments_of_light">of <span class="text-gold italic">Light</span></span></h2>' },
    { file: 'index.html', search: />Eternal <br> Moments<\\/p>/g, replace: ' data-i18n="eternal_moments">Eternal <br> Moments</p>' },
    { file: 'index.html', search: />Sunday, January 5, 2025</g, replace: ' data-i18n="date_jan_5_2025">Sunday, January 5, 2025<' },
    { file: 'login.html', search: />Jimma Town, Oromia, Ethiopia<\\/li>/g, replace: ' data-i18n="jimma_oromia_ethiopia">Jimma Town, Oromia, Ethiopia</li>' },
    { file: 'login.html', search: />info@hiwotberhan\\.org<\\/li>/g, replace: ' data-i18n="info_email">info@hiwotberhan.org</li>' },
    { file: 'sermons.html', search: />Grace &amp; Giving</g, replace: ' data-i18n="grace_and_giving">Grace &amp; Giving<' },
    { file: 'sermons.html', search: />YouTube Channel</g, replace: ' data-i18n="youtube_channel">YouTube Channel<' },
    { file: 'sermons.html', search: />Podcast</g, replace: ' data-i18n="podcast_label">Podcast<' },
    { file: 'services.html', search: />Martha Tesfaye</g, replace: ' data-i18n="martha_tesfaye">Martha Tesfaye<' },
    { file: 'services.html', search: />Solomon Abebe</g, replace: ' data-i18n="solomon_abebe">Solomon Abebe<' },
    { file: 'services.html', search: />Youth Director</g, replace: ' data-i18n="youth_director">Youth Director<' },
    { file: 'services.html', search: />Henok Tadesse</g, replace: ' data-i18n="henok_tadesse">Henok Tadesse<' },
    { file: 'services.html', search: />Greeters &amp; Welcome</g, replace: ' data-i18n="greeters_welcome">Greeters &amp; Welcome<' },
    { file: 'services.html', search: />Heart of Service</g, replace: ' data-i18n="heart_of_service">Heart of Service<' },
    { file: 'services.html', search: />Admin Head</g, replace: ' data-i18n="admin_head">Admin Head<' },
    { file: 'services.html', search: />Bekele Gizaw</g, replace: ' data-i18n="bekele_gizaw">Bekele Gizaw<' },
    { file: 'services.html', search: />Watch</g, replace: ' data-i18n="watch_label">Watch<' },
];

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    
    replacements.forEach(r => {
        if (r.file === 'all' || r.file === file) {
            content = content.replace(r.search, r.replace);
        }
    });

    // Fix remaining split text from task-40:
    if (file === 'about.html') {
        content = content.replace(/>Hiwot <span class="text-gold">Berhan Church<\\/span><\\/span>/g, ' data-i18n="church_name">Jimma Hiwot Berhan Church</span>');
    }

    if (file === 'index.html') {
        content = content.replace(/>Hiwot <span class="text-gold"> Berhan Church<\\/span><\\/span>/g, ' data-i18n="church_name">Jimma Hiwot Berhan Church</span>');
        // Fix Pastor name occurrences
        content = content.replace(/class="w-4 h-4"><\\/i> Pastor Abraham Tadesse<\\/p>/g, 'class="w-4 h-4"></i> <span data-i18n="pastor_abraham">Pastor Abraham Tadesse</span></p>');
        content = content.replace(/class="w-4 h-4"><\\/i> Pastor Samuel Kebede<\\/p>/g, 'class="w-4 h-4"></i> <span data-i18n="pastor_samuel">Pastor Samuel Kebede</span></p>');
    }

    fs.writeFileSync(path.join(pagesDir, file), content, 'utf8');
});

console.log("Updated HTML files with data-i18n tags.");
