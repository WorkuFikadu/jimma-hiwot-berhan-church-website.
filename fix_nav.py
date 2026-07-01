import os
import glob
import re

pages_dir = 'c:/xampp/htdocs/Church/Jimma Hiwot Berhan Church/pages'
html_files = glob.glob(os.path.join(pages_dir, '*.html'))

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    
    # Nav container padding
    new_content = re.sub(
        r'class="max-w-full mx-auto px-[0-9]+ md:px-[0-9]+ lg:px-[0-9]+ nav-container transition-all duration-500"',
        'class="max-w-full mx-auto px-2 md:px-4 lg:px-6 nav-container transition-all duration-500"',
        new_content
    )
    
    # Main nav links container gap
    new_content = re.sub(
        r'class="hidden lg:flex items-center gap-8 xl:gap-12"',
        'class="hidden lg:flex items-center gap-3 xl:gap-6"',
        new_content
    )
    
    # Links container gap and padding
    new_content = re.sub(
        r'class="flex items-center gap-6 xl:gap-8 border-r border-white/10 pr-8"',
        'class="flex items-center gap-3 xl:gap-5 border-r border-white/10 pr-4"',
        new_content
    )
    
    # Language/Login gap
    new_content = re.sub(
        r'class="flex items-center gap-6">\n(\s*)<!-- Language Selector -->',
        r'class="flex items-center gap-3">\n\1<!-- Language Selector -->',
        new_content
    )
    
    # Logo gap (matches both gap-4 and gap-6 in group)
    new_content = re.sub(
        r'class="flex items-center gap-[0-9]+ group"',
        'class="flex items-center gap-3 group"',
        new_content
    )

    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file)}")
    else:
        print(f"No changes in {os.path.basename(file)}")
