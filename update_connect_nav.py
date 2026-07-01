import os
import glob
import re

pages_dir = r'c:\xampp\htdocs\Church\Jimma Hiwot Berhan Church\pages'
html_files = glob.glob(os.path.join(pages_dir, '*.html'))

pattern = re.compile(
    r'(<a href="services\.html"[^>]*>Services</a>\s*'
    r'<a href="sermons\.html"[^>]*>Sermons</a>\s*'
    r'<a href="events\.html"[^>]*>Events</a>\s*'
    r'<a href="ministries\.html"[^>]*>Ministries</a>)'
)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = pattern.search(content)
    if match:
        original_block = match.group(1)
        
        # Check active state
        serv_active = ' active' if 'active' in re.search(r'<a href="services\.html"[^>]*>', original_block).group(0) else ''
        serm_active = ' active' if 'active' in re.search(r'<a href="sermons\.html"[^>]*>', original_block).group(0) else ''
        event_active = ' active' if 'active' in re.search(r'<a href="events\.html"[^>]*>', original_block).group(0) else ''
        min_active = ' active' if 'active' in re.search(r'<a href="ministries\.html"[^>]*>', original_block).group(0) else ''
        
        connect_active = ' active' if any([serv_active, serm_active, event_active, min_active]) else ''
        
        dropdown_html = f'''<!-- Connect Dropdown -->
                        <div class="relative group nav-dropdown">
                            <button class="nav-link text-[14px] flex items-center gap-1.5{connect_active}">
                                <span data-i18n="nav_connect">Connect</span>
                                <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform group-hover:rotate-180 opacity-70"></i>
                            </button>
                            <div class="nav-dropdown-menu">
                                <a href="services.html" class="dropdown-item{serv_active}" data-i18n="nav_services">Services</a>
                                <a href="sermons.html" class="dropdown-item{serm_active}" data-i18n="nav_sermons">Sermons</a>
                                <a href="events.html" class="dropdown-item{event_active}" data-i18n="nav_events">Events</a>
                                <a href="ministries.html" class="dropdown-item{min_active}" data-i18n="nav_ministries">Ministries</a>
                            </div>
                        </div>'''
                        
        new_content = content.replace(original_block, dropdown_html)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(file)}")
    else:
        print(f"No match in {os.path.basename(file)}")
