import os, glob

pages_dir = r'c:\xampp\htdocs\Church\Jimma Hiwot Berhan Church\pages'
html_files = glob.glob(os.path.join(pages_dir, '*.html'))

instagram_footer_html = '<a href="https://www.instagram.com/jhbc.13?igsh=bmJwZ3BkdGZ5a3h3" target="_blank" rel="noopener noreferrer" title="Instagram" class="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#E1306C] transition-colors"><i data-lucide="instagram" class="w-4 h-4"></i></a>'
instagram_contact_html = '<a href="https://www.instagram.com/jhbc.13?igsh=bmJwZ3BkdGZ5a3h3" target="_blank" rel="noopener noreferrer" class="w-11 h-11 bg-charcoal/10 rounded-xl flex items-center justify-center hover:bg-[#E1306C] hover:text-white text-charcoal transition-colors"><i data-lucide="instagram" class="w-5 h-5"></i></a>'

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    new_lines = []
    i = 0
    modified = False
    
    while i < len(lines):
        line = lines[i]
        new_lines.append(line)
        
        # Check if this line starts the TikTok link
        if 'href="https://www.tiktok.com/@jhbc13"' in line:
            # We need to find the closing </a>
            j = i
            while j < len(lines) and '</a>' not in lines[j]:
                j += 1
                if j != i:
                    new_lines.append(lines[j])
            
            # Now we are at the line with </a>
            i = j
            
            # Determine indentation from the opening line
            indent_match = len(line) - len(line.lstrip())
            indent = ' ' * indent_match
            
            # Decide which version to add based on the TikTok link class
            # Check the whole block for the class
            block_text = '\n'.join(lines[i:j+1]) if i <= j else line
            class_contact = 'w-11 h-11 bg-charcoal/10'
            is_contact_form = class_contact in line or class_contact in block_text
            
            ig_html = instagram_contact_html if is_contact_form else instagram_footer_html
            new_lines.append(indent + ig_html)
            modified = True
        i += 1
        
    if modified:
        with open(file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(new_lines))
        print(f'Modified {os.path.basename(file)}')
