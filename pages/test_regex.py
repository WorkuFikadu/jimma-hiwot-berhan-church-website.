import os
import re

directory = r"c:\xampp\htdocs\Church\Jimma Hiwot Berhan Church\pages"
filepath = os.path.join(directory, "about.html")

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(
    r'<div class="hidden lg:flex items-center gap-8 xl:gap-12">.*?(?=<button id="mobile-menu-btn")',
    re.DOTALL
)

matches = pattern.findall(content)
print(f"Found {len(matches)} matches")
if matches:
    print("Match length:", len(matches[0]))
    print("Match starts with:", matches[0][:50])
    print("Match ends with:", matches[0][-50:])
