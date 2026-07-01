const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, 'js', 'i18n.js');
const i18nContent = fs.readFileSync(i18nPath, 'utf8');

let window = {};
eval(i18nContent);
const enDict = window.translations.en;

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

let totalReplacements = 0;

files.forEach(file => {
    let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    let replacedCount = 0;

    for (const [key, text] of Object.entries(enDict)) {
        // Look for typical element boundaries >Text<
        // Escape special regex chars in text
        const safeText = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        
        // Exact match with tags
        const regex1 = new RegExp(`>\\s*${safeText}\\s*<`, 'g');
        content = content.replace(regex1, (match) => {
            if (match.includes('data-i18n=')) return match; // Already translated
            replacedCount++;
            return ` data-i18n="${key}">${text}<`;
        });

        // Some might be wrapped in spaces and another tag e.g. <p> Text </p>
    }

    if (replacedCount > 0) {
        // Fix weird insertions like `> data-i18n="xxx">Text<`
        content = content.replace(/>\s*data-i18n="/g, ' data-i18n="');
        content = content.replace(/""/g, '"');
        fs.writeFileSync(path.join(pagesDir, file), content, 'utf8');
        console.log(`Replaced ${replacedCount} texts in ${file}`);
        totalReplacements += replacedCount;
    }
});

console.log(`\nTotal string replacements: ${totalReplacements}`);
