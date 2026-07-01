$admin_file = "C:\xampp\htdocs\Church\Jimma Hiwot Berhan Church\pages\admin.html"
$html = Get-Content -Path $admin_file -Raw -Encoding UTF8

$replacements = @{
    '>Master Control<' = ' data-i18n="admin_master_control">Master Control<'
    'Dashboard Overview' = '<span data-i18n="admin_dashboard">Dashboard Overview</span>'
    'User Management' = '<span data-i18n="admin_users">User Management</span>'
    'Analytics &amp; Reports' = '<span data-i18n="admin_analytics">Analytics &amp; Reports</span>'
    'Events Manager' = '<span data-i18n="admin_events">Events Manager</span>'
    'Sermons &amp; Media' = '<span data-i18n="admin_sermons">Sermons &amp; Media</span>'
    'Ministries Control' = '<span data-i18n="admin_ministries">Ministries Control</span>'
    'Donations &amp; Giving' = '<span data-i18n="admin_giving">Donations &amp; Giving</span>'
    'Localization (i18n)' = '<span data-i18n="admin_i18n">Localization (i18n)</span>'
    'Global Settings' = '<span data-i18n="admin_settings">Global Settings</span>'
    '>System Command Center<' = ' data-i18n="admin_system_command">System Command Center<'
    'Real-time status:' = '<span data-i18n="admin_real_time">Real-time status:</span>'
    '> Online<' = ' data-i18n="admin_online"> Online<'
    'placeholder="Global search..."' = 'placeholder="Global search..." data-i18n="admin_search"'
    '> View Live Site' = ' data-i18n="admin_view_live"> View Live Site'
    '>Active Members<' = ' data-i18n="admin_active_members">Active Members<'
    '>Monthly Giving<' = ' data-i18n="admin_monthly_giving">Monthly Giving<'
    '>Upcoming Events<' = ' data-i18n="admin_upcoming_events">Upcoming Events<'
    '>Site Views / Mo<' = ' data-i18n="admin_site_views">Site Views / Mo<'
    '>Recent Data Entries<' = ' data-i18n="admin_recent_data">Recent Data Entries<'
    '>View All<' = ' data-i18n="admin_view_all">View All<'
    '>Item / Title<' = ' data-i18n="admin_item_title">Item / Title<'
    '>Category<' = ' data-i18n="admin_category">Category<'
    '>Status<' = ' data-i18n="admin_status">Status<'
    '>Actions<' = ' data-i18n="admin_actions">Actions<'
    '>Quick Creation<' = ' data-i18n="admin_quick_creation">Quick Creation<'
    '>New Sermon<' = ' data-i18n="admin_new_sermon">New Sermon<'
    '>Schedule Event<' = ' data-i18n="admin_schedule_event">Schedule Event<'
    '>Update Gallery<' = ' data-i18n="admin_update_gallery">Update Gallery<'
    '>Generate Report<' = ' data-i18n="admin_generate_report">Generate Report<'
}

foreach ($key in $replacements.Keys) {
    $html = $html.Replace($key, $replacements[$key])
}

if (-not ($html -match 'id="admin-lang-switcher"')) {
    $lang_switcher = @"
            <div class="flex items-center gap-2 mr-4" id="admin-lang-switcher">
                <button onclick="switchLanguage('en')" class="text-xs font-bold px-2 py-1 bg-gray-200 rounded hover:bg-gold">EN</button>
                <button onclick="switchLanguage('am')" class="text-xs font-bold px-2 py-1 bg-gray-200 rounded hover:bg-gold">AM</button>
            </div>
"@
    $html = $html.Replace('<a href="index.html"', "$lang_switcher`n                <a href=`"index.html`"")
}

if (-not ($html -match 'i18n.js')) {
    $html = $html.Replace("</body>", "    <script src=`"../js/i18n.js`"></script>`n    <script src=`"../js/main.js`"></script>`n</body>")
}

Set-Content -Path $admin_file -Value $html -Encoding UTF8


$i18n_file = "C:\xampp\htdocs\Church\Jimma Hiwot Berhan Church\js\i18n.js"
$i18n_content = Get-Content -Path $i18n_file -Raw -Encoding UTF8

$en_str = @"
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
        "admin_generate_report": "Generate Report",
"@

$am_str = @"
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
        "admin_generate_report": "ሪፖርት አውጣ",
"@

if (-not ($i18n_content -match "admin_master_control")) {
    $i18n_content = $i18n_content.Replace("`"lang_current`": `"EN`",", "$en_str`n        `"lang_current`": `"EN`",")
    $i18n_content = $i18n_content.Replace("`"lang_current`": `"አማ`",", "$am_str`n        `"lang_current`": `"አማ`",")
    Set-Content -Path $i18n_file -Value $i18n_content -Encoding UTF8
}
