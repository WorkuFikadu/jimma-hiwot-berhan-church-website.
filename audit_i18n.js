const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const i18nPath = path.join(__dirname, 'js', 'i18n.js');

// Extract all data-i18n keys from all HTML files
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));
const allKeys = new Set();

files.forEach(file => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    const matches = content.matchAll(/data-i18n="([^"]+)"/g);
    for (const m of matches) allKeys.add(m[1]);
    // Also placeholder keys
    const phMatches = content.matchAll(/data-i18n-placeholder="([^"]+)"/g);
    for (const m of phMatches) allKeys.add(m[1]);
});

// Load i18n.js and eval the translations object
const i18nContent = fs.readFileSync(i18nPath, 'utf8');
let window = {};
eval(i18nContent);
const trans = window.translations;

const langs = ['en', 'am', 'om'];
const report = {};

langs.forEach(lang => {
    report[lang] = [];
    allKeys.forEach(key => {
        if (!trans[lang] || !trans[lang][key]) {
            report[lang].push(key);
        }
    });
});

console.log('\n=== TRANSLATION AUDIT ===\n');
console.log(`Total unique data-i18n keys found in HTML: ${allKeys.size}\n`);
langs.forEach(lang => {
    console.log(`[${lang.toUpperCase()}] Missing ${report[lang].length} keys:`);
    report[lang].forEach(k => console.log(`   - ${k}`));
    console.log('');
});
