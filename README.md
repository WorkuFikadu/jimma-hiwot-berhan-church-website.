# Jimma Hiwot Berhan Church - Multi-Page Website (XAMPP)

## Setup Instructions (5 Minutes)

### Step 1: Copy to XAMPP
Copy the entire `church-xampp` folder into your XAMPP `htdocs` directory:
```
C:\xampp\htdocs\church-xampp\
```

### Step 2: Start XAMPP
1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL**

### Step 3: Import Database
1. Go to http://localhost/phpmyadmin
2. Click **Import** tab
3. Select `database.sql` from this folder
4. Click **Go**      

### Step 4: Open the Website
```
http://localhost/church-xampp/pages/index.html    
 
```  http://localhost/Church/Jimma%20Hiwot%20Berhan%20Church/pages/about.html

## File Structure

```
church-xampp/
├── pages/
│   ├── index.html          ← Home (landing page)
│   ├── about.html          ← About Us (history, mission, leadership, faith)
│   ├── services.html       ← Worship Services (schedule, first visit guide)
│   ├── sermons.html        ← Sermons (featured, archive, series, search)
│   ├── events.html         ← Events (calendar, timeline, past events)
│   ├── ministries.html     ← Ministries (all ministries, volunteer, training)
│   ├── giving.html         ← Giving (methods, allocation, report, FAQ)
│   └── contact.html        ← Contact (form, prayer request, directions, FAQ)
├── css/
│   └── style.css           ← Global styles + animations
├── js/
│   └── main.js             ← Shared JavaScript (nav, forms, modals)
├── api/
│   ├── config.php          ← Database connection
│   ├── get_sermons.php
│   ├── get_events.php
│   ├── get_ministries.php
│   ├── get_testimonials.php
│   ├── get_services.php
│   ├── submit_prayer.php
│   └── submit_contact.php
├── images/
│   └── church_cover.png    ← Hero background image
├── database.sql            ← MySQL schema + seed data
└── README.md               ← This file
```

## 8 Detailed Pages

| Page | Sections |
|------|----------|
| **Home** | Hero, Welcome, Stats, Service Times, Latest Sermons, Events, Testimonials, CTA |
| **About** | History, Mission (4 pillars), Vision, Values (6), Leadership (4), Timeline (5 milestones), Statement of Faith (6 beliefs) |
| **Services** | Schedule Table, What to Expect (4), First Visit Guide, Location & Directions, Special Services |
| **Sermons** | Featured Sermon, Dynamic Archive with Search/Filter, 3 Sermon Series, How to Listen |
| **Events** | Dynamic Timeline, Annual Calendar, Past Events Gallery, Host an Event |
| **Ministries** | 4 Ministry Cards (dynamic), Join a Ministry, 6 Volunteer Roles, Leadership Training |
| **Giving** | Why We Give, 4 Methods, Fund Allocation, Annual Report, Testimonies, Tax Info, 5 FAQ |
| **Contact** | Contact Form, Info Cards, Prayer Request Form, Visit Directions, Map, 5 FAQ |

## Technologies
- HTML5, CSS3, Vanilla JavaScript
- Tailwind CSS (CDN)
- PHP 8 (API endpoints)
- MySQL (database)
- Lucide Icons, Google Fonts
