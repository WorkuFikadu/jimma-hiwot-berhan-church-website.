import sys
content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Master Control Panel — Jimma Hiwot Berhan Church</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../css/style.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    forest: { DEFAULT: '#1A5632', dark: '#0d2e19', light: '#2d8a52' },
                    gold: { DEFAULT: '#C9A84C', light: '#dfc677', dark: '#a88935' },
                    terracotta: { DEFAULT: '#B85C38', light: '#d47a56' },
                    ivory: { DEFAULT: '#FFFDF7', dark: '#F5F0E3' },
                    charcoal: '#2D2D2D',
                },
                fontFamily: { heading: ['Playfair Display','Georgia','serif'], body: ['Inter','system-ui','sans-serif'] }
            }
        }
    }
    </script>
    <style>
        .admin-sidebar {
            background: linear-gradient(180deg, #0d2e19 0%, #1A5632 100%);
        }
        .admin-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(26, 86, 50, 0.1);
            transition: all 0.3s ease;
        }
        .admin-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px -10px rgba(26, 86, 50, 0.15);
            border-color: rgba(201, 168, 76, 0.3);
        }
        .nav-item.active {
            background: rgba(201, 168, 76, 0.15);
            border-left: 4px solid #C9A84C;
            color: #dfc677;
        }
        @keyframes shimmer {
            0% { transform: translateX(-150%) skewX(-12deg); }
            100% { transform: translateX(250%) skewX(-12deg); }
        }
    </style>
</head>
<body class="font-body text-charcoal bg-ivory flex h-screen overflow-hidden">
    <!-- Background Decors -->
    <div class="bg-texture"></div>
    <div class="bg-pattern"></div>

    <!-- Sidebar -->
    <aside class="w-72 admin-sidebar text-white shadow-2xl flex flex-col z-20 shrink-0">
        <!-- Brand -->
        <div class="p-6 border-b border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img src="../images/church_logo.jpg" alt="Logo" class="w-10 h-10 rounded-full border-2 border-gold/50 bg-white p-0.5">
                <div>
                    <h2 class="font-heading font-bold text-lg leading-tight tracking-tight text-white mb-0" data-i18n="admin_master_control">Master Control</h2>
                    <p class="text-[10px] text-gold-light uppercase tracking-widest font-bold" data-i18n="admin_jhbc_system">JHBC System</p>
                </div>
            </div>
            <button class="lg:hidden text-white/70 hover:text-white">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
        </div>

        <!-- Navigation -->
        <div class="p-4 flex-grow overflow-y-auto space-y-1">
            <span class="text-[10px] uppercase font-bold text-white/40 tracking-wider ml-4 mb-2 inline-block" data-i18n="contact_email_general">General</span>
            <a href="#" id="view-dashboard" class="nav-item active flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                <i data-lucide="layout-dashboard" class="w-5 h-5 opacity-80"></i>
                Dashboard Overview
            </a>
'''

with open('pages/admin.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open('pages/admin.html', 'w', encoding='utf-8') as f:
    f.write(content)
    # The current file has its original line 59 starting around line 13.
    # Lines 1-11 in current file are broken head content.
    # Line 12 is '            </a>'
    # Line 13 is '            <a href="#" id="view-users"'
    # We want to keep everything from line 13 onwards.
    f.writelines(lines[12:])
