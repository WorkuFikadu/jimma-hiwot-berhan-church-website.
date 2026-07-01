const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix: remove "group" class from nav-dropdown so it doesn't conflict with language selector
    // and use nav-dropdown:hover instead
    const before = content;
    content = content.replace(
        /class="relative group nav-dropdown"/g,
        'class="relative nav-dropdown"'
    );
    
    // Also fix the chevron: change group-hover to work with nav-dropdown parent
    content = content.replace(
        /class="w-3\.5 h-3\.5 transition-transform group-hover:rotate-180 opacity-70"/g,
        'class="w-3.5 h-3.5 transition-transform opacity-70 nav-chevron"'
    );
    
    if (content !== before) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${file}`);
    } else {
        console.log(`No changes needed in ${file}`);
    }
}
