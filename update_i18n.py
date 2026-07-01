import json
import re

# 1. Update admin.html
admin_file = r'c:\xampp\htdocs\Church\Jimma Hiwot Berhan Church\pages\admin.html'
with open(admin_file, 'r', encoding='utf-8') as f:
    html = f.read()

# Make a dict of string -> key
replacements = {
    '>Master Control<': ' data-i18n="admin_master_control">Master Control<',
    'Dashboard Overview': '<span data-i18n="admin_dashboard">Dashboard Overview</span>',
    'User Management': '<span data-i18n="admin_users">User Management</span>',
    'Analytics &amp; Reports': '<span data-i18n="admin_analytics">Analytics &amp; Reports</span>',
    'Events Manager': '<span data-i18n="admin_events">Events Manager</span>',
    'Sermons &amp; Media': '<span data-i18n="admin_sermons">Sermons &amp; Media</span>',
    'Ministries Control': '<span data-i18n="admin_ministries">Ministries Control</span>',
    'Donations &amp; Giving': '<span data-i18n="admin_giving">Donations &amp; Giving</span>',
    'Localization (i18n)': '<span data-i18n="admin_i18n">Localization (i18n)</span>',
    'Global Settings': '<span data-i18n="admin_settings">Global Settings</span>',
    '>System Command Center<': ' data-i18n="admin_system_command">System Command Center<',
    'Real-time status:': '<span data-i18n="admin_real_time">Real-time status:</span>',
    '> Online<': ' data-i18n="admin_online"> Online<',
    '>Online<': ' data-i18n="admin_online">Online<', # Depending on snippet
    'placeholder="Global search..."': 'placeholder="Global search..." data-i18n="admin_search"',
    '> View Live Site': ' data-i18n="admin_view_live"> View Live Site',
    '>Active Members<': ' data-i18n="admin_active_members">Active Members<',
    '>Monthly Giving<': ' data-i18n="admin_monthly_giving">Monthly Giving<',
    '>Upcoming Events<': ' data-i18n="admin_upcoming_events">Upcoming Events<',
    '>Site Views / Mo<': ' data-i18n="admin_site_views">Site Views / Mo<',
    '>Recent Data Entries<': ' data-i18n="admin_recent_data">Recent Data Entries<',
    '>View All<': ' data-i18n="admin_view_all">View All<',
    '>Item / Title<': ' data-i18n="admin_item_title">Item / Title<',
    '>Category<': ' data-i18n="admin_category">Category<',
    '>Status<': ' data-i18n="admin_status">Status<',
    '>Actions<': ' data-i18n="admin_actions">Actions<',
    '>Quick Creation<': ' data-i18n="admin_quick_creation">Quick Creation<',
    '>New Sermon<': ' data-i18n="admin_new_sermon">New Sermon<',
    '>Schedule Event<': ' data-i18n="admin_schedule_event">Schedule Event<',
    '>Update Gallery<': ' data-i18n="admin_update_gallery">Update Gallery<',
    '>Generate Report<': ' data-i18n="admin_generate_report">Generate Report<'
}

for k, v in replacements.items():
    html = html.replace(k, v)

# Add Language Switcher to header
if 'id="admin-lang-switcher"' not in html:
    header_end_idx = html.find('        <header class="h-20')
    if header_end_idx != -1:
        lang_switcher = """
            <div class="flex items-center gap-2 mr-4" id="admin-lang-switcher">
                <button onclick="switchLanguage('en')" class="text-xs font-bold px-2 py-1 bg-gray-200 rounded hover:bg-gold">EN</button>
                <button onclick="switchLanguage('am')" class="text-xs font-bold px-2 py-1 bg-gray-200 rounded hover:bg-gold">AM</button>
            </div>
"""
        view_live_idx = html.find('<a href="index.html"', header_end_idx)
        if view_live_idx != -1:
            html = html[:view_live_idx] + lang_switcher + html[view_live_idx:]

# Add scripts at the bottom
if 'i18n.js' not in html:
    html = html.replace('</body>', '    <script src="../js/i18n.js"></script>\n    <script src="../js/main.js"></script>\n</body>')

with open(admin_file, 'w', encoding='utf-8') as f:
    f.write(html)

# 2. Update i18n.js
i18n_file = r'c:\xampp\htdocs\Church\Jimma Hiwot Berhan Church\js\i18n.js'
with open(i18n_file, 'r', encoding='utf-8') as f:
    i18n_content = f.read()

en_keys = {
    "admin_master_control": "Master Control",
    "admin_dashboard": "Dashboard Overview",
    "admin_users": "User Management",
    "admin_analytics": "Analytics & Reports",
    "admin_events": "Events Manager",
    "admin_sermons": "Sermons & Media",
    "admin_ministries": "Ministries Control",
    "admin_giving": "Donations & Giving",
    "admin_i18n": "Localization (i18n)",
    "admin_settings": "Global Settings",
    "admin_system_command": "System Command Center",
    "admin_real_time": "Real-time status:",
    "admin_online": "Online",
    "admin_search": "Global search...",
    "admin_view_live": "View Live Site",
    "admin_active_members": "Active Members",
    "admin_monthly_giving": "Monthly Giving",
    "admin_upcoming_events": "Upcoming Events",
    "admin_site_views": "Site Views / Mo",
    "admin_recent_data": "Recent Data Entries",
    "admin_view_all": "View All",
    "admin_item_title": "Item / Title",
    "admin_category": "Category",
    "admin_status": "Status",
    "admin_actions": "Actions",
    "admin_quick_creation": "Quick Creation",
    "admin_new_sermon": "New Sermon",
    "admin_schedule_event": "Schedule Event",
    "admin_update_gallery": "Update Gallery",
    "admin_generate_report": "Generate Report"
}

am_keys = {
    "admin_master_control": "ዋና መቆጣጠሪያ",
    "admin_dashboard": "ዳሽቦርድ አጠቃላይ እይታ",
    "admin_users": "የአባላት አስተዳደር",
    "admin_analytics": "ትንታኔዎች እና ሪፖርቶች",
    "admin_events": "የመርሐ ግብር አስተዳዳሪ",
    "admin_sermons": "ስብከቶች እና ሚዲያ",
    "admin_ministries": "ክፍላተ አገልግሎት መቆጣጠሪያ",
    "admin_giving": "ስጦታ እና ልገሳ",
    "admin_i18n": "ቋንቋዎች (i18n)",
    "admin_settings": "አጠቃላይ ቅንብሮች",
    "admin_system_command": "የስርዓት ትዕዛዝ ማዕከል",
    "admin_real_time": "የአሁኑ ሁኔታ፦",
    "admin_online": "በመስመር ላይ",
    "admin_search": "ፈልግ...",
    "admin_view_live": "ገፁን ይመልከቱ",
    "admin_active_members": "ንቁ አባላት",
    "admin_monthly_giving": "ወርሃዊ ስጦታ",
    "admin_upcoming_events": "መጪ ክስተቶች",
    "admin_site_views": "የገጽ ዕይታዎች በወር",
    "admin_recent_data": "የቅርብ ጊዜ መረጃዎች",
    "admin_view_all": "ሁሉንም አሳይ",
    "admin_item_title": "ዕቃ / ርዕስ",
    "admin_category": "ምድብ",
    "admin_status": "ሁኔታ",
    "admin_actions": "ተግባራት",
    "admin_quick_creation": "ፈጣን መፍጠሪያ",
    "admin_new_sermon": "አዲስ ስብከት",
    "admin_schedule_event": "መርሐ ግብር መዝግብ",
    "admin_update_gallery": "ጋለሪ አድስ",
    "admin_generate_report": "ሪፖርት አውጣ"
}

# format them
en_str = "\n".join([f'        "{k}": "{v}",' for k,v in en_keys.items()])
am_str = "\n".join([f'        "{k}": "{v}",' for k,v in am_keys.items()])

# Insert into i18n
if '"admin_master_control"' not in i18n_content:
    # insert before "lang_current": "EN" roughly towards end of en block
    en_target = '"lang_current": "EN",'
    # find first occurrence of en_target which is in EN block
    first_en_target_idx = i18n_content.find(en_target)
    if first_en_target_idx != -1:
        i18n_content = i18n_content[:first_en_target_idx] + en_str + "\n" + i18n_content[first_en_target_idx:]
    
    # insert before "lang_current": "አማ"
    am_target = '"lang_current": "አማ",'
    am_target_idx = i18n_content.find(am_target)
    if am_target_idx != -1:
        i18n_content = i18n_content[:am_target_idx] + am_str + "\n" + i18n_content[am_target_idx:]
        
with open(i18n_file, 'w', encoding='utf-8') as f:
    f.write(i18n_content)

print("Done updating i18n for admin page.")
