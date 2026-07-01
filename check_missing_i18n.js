const fs = require('fs');
const path = require('path');
const pagesDir = path.join(__dirname, 'pages');

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
    const noI18nLines = content.split('\n').filter(line => {
        return !line.includes('data-i18n') && 
               line.match(/>\s*[a-zA-Z]{4,}[^<]*</) && 
               !line.includes('<script') && 
               !line.includes('<style') &&
               !line.includes('<title') &&
               !line.includes('lucide');
    });
    
    if (noI18nLines.length > 0) {
        console.log(`\n\n--- ${file} ---`);
        for(let j=0; j<Math.min(10, noI18nLines.length); j++) {
            console.log(noI18nLines[j].trim());
        }
    }
}
