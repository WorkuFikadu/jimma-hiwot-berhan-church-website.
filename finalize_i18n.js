const fs = require('fs');

const finalKeys = {
  en: {
    "giving_ways_title": "Ways to Give",
    "giving_ways_desc": "We have made it convenient for you to give through multiple channels. Choose the method that works best for you.",
    "giving_account_name": "Name: Jimma Hiwot Berhan Church",
    "admin_cancel": "Cancel",
    "sermons_featured_title": "Featured Sermon",
    "sermons_browse_desc": "Browse our complete sermon library. Use the filters below to find messages by speaker or topic.",
    "sermons_series_title": "Sermon Series",
    "sermons_access_desc": "Access our sermons anytime, anywhere through multiple platforms.",
    "team_leader_label": "Team Leader",
    "worship_arts_label": "Worship & Arts",
    "praise_intercession_title": "Praise & Intercession",
    "word_teaching_label": "Word & Teaching",
    "biblical_exposition_title": "Biblical Exposition",
    "youth_power_label": "Youth Power",
    "generation_next_title": "Generation Next",
    "church_media_team": "Church Media Team • Jimma, Ethiopia",
    "global_label": "Global",
    "date_sunday_jan_12": "Sunday, January 12, 2025",
    "date_sept_nov_2024": "September — November 2024",
    "date_jun_aug_2024": "June — August 2024",
    "date_mar_apr_2024": "March — April 2024",
    "sermon_series_1": "Walking in Faith",
    "sermon_series_2": "Grace & Giving",
    "contact_jimma_region": "Jimma Town, Oromia Region<br>Ethiopia",
    "contact_find_our_church": "Find Our Church",
    "contact_visit_us": "Visit Us in Jimma",
    "admin_master_control": "Master Control",
    "admin_jhbc_system": "JHBC System",
    "admin_content_control": "Content Control",
    "admin_system": "System",
    "admin_system_admin": "System Admin",
    "admin_superuser": "Superuser Level 1",
    "admin_system_command": "System Command Center",
    "admin_realtime": "Real-time status:",
    "admin_edit_item": "Edit Item"
  },
  am: {
    "giving_ways_title": "የመስጠት መንገዶች",
    "giving_ways_desc": "እንዲሰጡ ለማድረግ የተለያዩ መንገዶችን አዘጋጅተናል። ለእርስዎ የሚስማማውን ይምረጡ።",
    "giving_account_name": "ስም፡ የጅማ ሕይወት ብርሃን ቤተክርስቲያን",
    "admin_cancel": "ሰርዝ",
    "sermons_featured_title": "የተመረጠ ስብከት",
    "sermons_browse_desc": "የስብከቶቻችንን ስብስብ ይቃኙ። በመምህር ወይም በአርእስት ለመፈለግ ማጣሪያዎችን ይጠቀሙ።",
    "sermons_series_title": "ተከታታይ ትምህርቶች",
    "sermons_access_desc": "ስብከቶቻችንን በማንኛውም ጊዜ እና ቦታ በተለያዩ መንገዶች ያግኙ።",
    "team_leader_label": "የቡድን መሪ",
    "worship_arts_label": "አምልኮ እና ስነ-ጥበብ",
    "praise_intercession_title": "ምስጋና እና ምልጃ",
    "word_teaching_label": "ቃል እና ትምህርት",
    "biblical_exposition_title": "የመጽሐፍ ቅዱስ ትምህርት",
    "youth_power_label": "የወጣቶች ኃይል",
    "generation_next_title": "ቀጣዩ ትውልድ",
    "church_media_team": "የቤተክርስቲያን ሚዲያ ቡድን • ጅማ፣ ኢትዮጵያ",
    "global_label": "ዓለም አቀፍ",
    "date_sunday_jan_12": "እሁድ ጥር 4 2017",
    "date_sept_nov_2024": "መስከረም - ህዳር 2017",
    "date_jun_aug_2024": "ሰኔ - ነሐሴ 2016",
    "date_mar_apr_2024": "መጋቢት - ሚያዝያ 2016",
    "sermon_series_1": "በእምነት መመላለስ",
    "sermon_series_2": "ጸጋ እና መስጠት",
    "contact_jimma_region": "ጅማ ከተማ፣ ኦሮሚያ ክልል<br>ኢትዮጵያ",
    "contact_find_our_church": "ቤተክርስቲያናችንን ያግኙ",
    "contact_visit_us": "በጅማ ይጎብኙን",
    "admin_master_control": "ዋና መቆጣጠሪያ",
    "admin_jhbc_system": "JHBC ስርዓት",
    "admin_content_control": "የይዘት መቆጣጠሪያ",
    "admin_system": "ስርዓት",
    "admin_system_admin": "የስርዓት አስተዳዳሪ",
    "admin_superuser": "ዋና ተጠቃሚ ደረጃ 1",
    "admin_system_command": "የስርዓት ትዕዛዝ ማዕከል",
    "admin_realtime": "የአሁኑ ሁኔታ፡",
    "admin_edit_item": "ንጥል አርትዕ"
  },
  om: {
    "giving_ways_title": "Haala Kennuuf",
    "giving_ways_desc": "Haalota adda addaatiin akka kennitan gochuuf qophoofneerra. Kan isiniif tolu filadhaa.",
    "giving_account_name": "Maqaa: Waldaa Jimmaa Hiwot Birihaan",
    "admin_cancel": "Haqi",
    "sermons_featured_title": "Lallaba Filatamaa",
    "sermons_browse_desc": "Kuusaa lallaba keenyaa guutuu daawwadhaa. Barsiisaa ykn matadureedhaan faayidaa barbaaduuf shaakala gadii fayyadhaa.",
    "sermons_series_title": "Walitti Fufiinsa Lallabaa",
    "sermons_access_desc": "Lallaboota keenya yeroo hundumaa fi iddoo hundumaatti argachuu dandeessu.",
    "team_leader_label": "Hogganaa Garee",
    "worship_arts_label": "Waaqeffannaa fi Aartii",
    "praise_intercession_title": "Galataa fi Kadhannaa",
    "word_teaching_label": "Dubbii fi Barsiisa",
    "biblical_exposition_title": "Barsiisa Macaafa Qulqulluu",
    "youth_power_label": "Aangoo Dargaggootaa",
    "generation_next_title": "Dhaloota Ittaanu",
    "church_media_team": "Garee Miidiyaa Waldaa • Jimmaa, Itoophiyaa",
    "global_label": "Addunyaa",
    "date_sunday_jan_12": "Dilbata, Amajjii 12, 2025",
    "date_sept_nov_2024": "Fulbaana — Sadaasa 2024",
    "date_jun_aug_2024": "Waxabajjii — Haggayya 2024",
    "date_mar_apr_2024": "Bitootessa — Ebla 2024",
    "sermon_series_1": "Amantiin Dedeebi'uu",
    "sermon_series_2": "Ayyaanaa fi Kennuu",
    "contact_jimma_region": "Magaalaa Jimmaa, Naannoo Oromiyaa<br>Itoophiyaa",
    "contact_find_our_church": "Waldaa Keenya Barbaadi",
    "contact_visit_us": "Jimmaatti Nu Daawwadhaa",
    "admin_master_control": "To'annoo Olaanaa",
    "admin_jhbc_system": "Sirna JHBC",
    "admin_content_control": "To'annoo Qabiyyee",
    "admin_system": "Sirna",
    "admin_system_admin": "Bulchaa Sirnaa",
    "admin_superuser": "Fayyadamtoota Olaanaa Sadarkaa 1",
    "admin_system_command": "Giddugala Ajaja Sirnaa",
    "admin_realtime": "Haala yeroo ammaa:",
    "admin_edit_item": "Gulaali"
  }
};

let i18nContent = fs.readFileSync('js/i18n.js', 'utf8');

for (const lang of ['en', 'am', 'om']) {
    let anchor = `"${lang}": {`;
    if (!i18nContent.includes(anchor)) {
        anchor = `${lang}: {`;
    }
    
    const insertIdx = i18nContent.indexOf(anchor) + anchor.length;
    let injectStr = "\n";
    for (const [k, v] of Object.entries(finalKeys[lang])) {
        if (!i18nContent.includes(`"${k}"`)) {
            injectStr += `        "${k}": "${v.replace(/"/g, '\\"')}",\n`;
        }
    }
    i18nContent = i18nContent.slice(0, insertIdx) + injectStr + i18nContent.slice(insertIdx);
}

fs.writeFileSync('js/i18n.js', i18nContent);
console.log("Injected final keys into i18n.js");

// Now apply them to HTML files
const pagesDir = 'pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

let replacedTotal = 0;
for (const file of files) {
    let content = fs.readFileSync(`${pagesDir}/${file}`, 'utf8');
    for (const [key, text] of Object.entries(finalKeys.en)) {
        const safeText = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const regex1 = new RegExp(`>\\s*${safeText}\\s*<`, 'g');
        content = content.replace(regex1, (match) => {
            if (match.includes('data-i18n=')) return match;
            replacedTotal++;
            return ` data-i18n="${key}">${text}<`;
        });
    }
    fs.writeFileSync(`${pagesDir}/${file}`, content);
}
console.log(`Replaced ${replacedTotal} tags in HTMLs.`);
