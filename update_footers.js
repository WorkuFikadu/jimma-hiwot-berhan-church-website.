const fs = require('fs');
const path = require('path');

const dir = 'pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const devText = `
                    <div class="border-t border-white/10 pt-4 mt-4 text-center text-xs text-white/40 tracking-widest font-mono">
                        DEVELOPED BY: Worku Fikadu &nbsp; +251934953593, workufikadu643@gmail.com
                    </div>`;

files.forEach(file => {
    const filepath = path.join(dir, file);
    let content = fs.readFileSync(filepath, 'utf8');

    const footerStart = content.indexOf('<footer');
    const footerEnd = content.indexOf('</footer>');

    if (footerStart !== -1 && footerEnd !== -1) {
        let beforeFooter = content.substring(0, footerStart);
        let footerContent = content.substring(footerStart, footerEnd + 9);
        let afterFooter = content.substring(footerEnd + 9);

        // Remove <video> tags
        footerContent = footerContent.replace(/<video[\s\S]*?<\/video>/gi, '');
        // Remove <iframe> tags that might be videos
        footerContent = footerContent.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

        // Add developer info right before </div>\n            </footer>
        // We look for the last </div> before </footer>
        let insertPos = footerContent.lastIndexOf('</div>');
        if (insertPos !== -1) {
            footerContent = footerContent.substring(0, insertPos) + devText + '\n                ' + footerContent.substring(insertPos);
        } else {
            // fallback if no </div> found
            footerContent = footerContent.replace('</footer>', devText + '\n</footer>');
        }

        fs.writeFileSync(filepath, beforeFooter + footerContent + afterFooter);
        console.log(`Updated ${file}`);
    } else {
        console.log(`No footer found in ${file}`);
    }
});
