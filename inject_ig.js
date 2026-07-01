const fs = require('fs');
const glob = require('fs').promises.readdir;
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');

const instagramFooterHtml = '<a href="https://www.instagram.com/jhbc.13?igsh=bmJwZ3BkdGZ5a3h3" target="_blank" rel="noopener noreferrer" title="Instagram" class="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#E1306C] transition-colors"><i data-lucide="instagram" class="w-4 h-4"></i></a>';
const instagramContactHtml = '<a href="https://www.instagram.com/jhbc.13?igsh=bmJwZ3BkdGZ5a3h3" target="_blank" rel="noopener noreferrer" class="w-11 h-11 bg-charcoal/10 rounded-xl flex items-center justify-center hover:bg-[#E1306C] hover:text-white text-charcoal transition-colors"><i data-lucide="instagram" class="w-5 h-5"></i></a>';

(async () => {
    let files = await glob(pagesDir);
    files = files.filter(f => f.endsWith('.html')).map(f => path.join(pagesDir, f));

    for (let file of files) {
        let content = fs.readFileSync(file, 'utf8');

        if (!content.includes('https://www.instagram.com/jhbc.13')) {
            let lines = content.split('\n');
            let newLines = [];
            let i = 0;
            let modified = false;

            while (i < lines.length) {
                let line = lines[i];
                newLines.push(line);

                if (line.includes('href="https://www.tiktok.com/@jhbc13"')) {
                    let j = i;
                    while (j < lines.length && !lines[j].includes('</a>')) {
                        j++;
                        if (j !== i) newLines.push(lines[j]);
                    }
                    i = j;

                    let indentMatch = line.match(/^(\s*)/);
                    let indent = indentMatch ? indentMatch[1] : '';

                    let blockText = lines.slice(newLines.length - (j-i) - 1, j + 1).join('\n');
                    if (lines[i] && lines[i].includes('</a>')) blockText += lines[i];
                    else blockText = line; 

                    let isContactForm = line.includes('w-11 h-11 bg-charcoal/10') || blockText.includes('w-11 h-11 bg-charcoal/10');
                    let igHtml = isContactForm ? instagramContactHtml : instagramFooterHtml;

                    newLines.push(indent + igHtml);
                    modified = true;
                }
                i++;
            }

            if (modified) {
                fs.writeFileSync(file, newLines.join('\n'), 'utf8');
                console.log('Modified Instagram in', path.basename(file));
            }
        }
    }
})();
