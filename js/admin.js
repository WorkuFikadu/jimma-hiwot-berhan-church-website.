// Admin Panel Logic
const API_URL = '../api/admin_api.php';

let currentModel = '';
let currentId = null;

const MODEL_CONFIG = {
    events: {
        title: 'Events', icon: 'calendar',
        fields: [
            { name: 'title', label: 'Event Title', type: 'text', required: true },
            { name: 'event_date', label: 'Date', type: 'date', required: true },
            { name: 'location', label: 'Location', type: 'text' },
            { name: 'image_url', label: 'Image URL', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    sermons: {
        title: 'Sermons', icon: 'video',
        fields: [
            { name: 'title', label: 'Sermon Title', type: 'text', required: true },
            { name: 'speaker', label: 'Speaker', type: 'text', required: true },
            { name: 'date', label: 'Date', type: 'date', required: true },
            { name: 'video_url', label: 'Video URL (YouTube)', type: 'text' },
            { name: 'audio_url', label: 'Audio URL', type: 'text' },
            { name: 'image_url', label: 'Cover Image URL', type: 'text' },
            { name: 'description', label: 'Study Notes / Description', type: 'textarea' }
        ]
    },
    ministries: {
        title: 'Ministries', icon: 'church',
        fields: [
            { name: 'name', label: 'Ministry Name', type: 'text', required: true },
            { name: 'leader', label: 'Leader Name', type: 'text' },
            { name: 'meeting_day', label: 'Meeting Schedule', type: 'text' },
            { name: 'icon', label: 'Icon Name (Lucide)', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' }
        ]
    },
    weekly_services: {
        title: 'Weekly Services', icon: 'clock',
        fields: [
            { name: 'name', label: 'Service Name', type: 'text', required: true },
            { name: 'day', label: 'Day', type: 'text', required: true },
            { name: 'time', label: 'Time Range', type: 'text', required: true },
            { name: 'sort_order', label: 'Sort Order', type: 'number' },
            { name: 'description', label: 'Brief Details', type: 'textarea' }
        ]
    },
    users: {
        title: 'Users', icon: 'users',
        fields: [
            { name: 'username', label: 'Username', type: 'text', required: true },
            { name: 'password', label: 'Password', type: 'password', required: true },
            { name: 'role', label: 'Role', type: 'text' }
        ]
    },
    settings: {
        title: 'Global Settings', icon: 'settings',
        fields: [
            { name: 'setting_key', label: 'Setting Key (Internal)', type: 'text', required: true },
            { name: 'setting_value', label: 'Value', type: 'textarea', required: true },
            { name: 'setting_group', label: 'Group', type: 'text' }
        ]
    },
    contact_messages: { 
        title: 'Contact Messages', icon: 'mail', readonly: true,
        fields: [
            { name: 'name', label: 'From', type: 'text' },
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'subject', label: 'Subject', type: 'text' },
            { name: 'message', label: 'Message', type: 'textarea' },
            { name: 'created_at', label: 'Received At', type: 'text' }
        ]
    },
    prayer_requests: { 
        title: 'Prayer Requests', icon: 'heart', readonly: true,
        fields: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'email', label: 'Email', type: 'text' },
            { name: 'request', label: 'Prayer Request', type: 'textarea' },
            { name: 'created_at', label: 'Received At', type: 'text' }
        ]
    }
};

async function fetchFromAPI(model, action = 'read', payload = null, id = null) {
    try {
        const body = { action, model };
        if (payload) body.payload = payload;
        if (id) body.id = id;

        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return await res.json();
    } catch (e) {
        console.error('API Error:', e);
        return null;
    }
}

// VIEW CONTROLLER
function switchView(viewId) {
    // Update Sidebar
    document.querySelectorAll('.nav-item').forEach(v => v.classList.remove('active'));
    const activeNav = document.getElementById(`view-${viewId}`);
    if (activeNav) activeNav.classList.add('active');

    const container = document.getElementById('main-content-container');
    container.innerHTML = '<div class="flex items-center justify-center h-64"><i data-lucide="loader" class="w-10 h-10 animate-spin text-forest/20"></i></div>';
    lucide.createIcons();

    if (viewId === 'dashboard') renderDashboard();
    else if (MODEL_CONFIG[viewId]) renderModelManager(viewId);
    else container.innerHTML = `<div class="p-12 text-center text-charcoal/40 font-heading text-2xl">View "${viewId}" is under construction.</div>`;
}

// DASHBOARD
async function renderDashboard() {
    const container = document.getElementById('main-content-container');
    
    // Fetch some summary data
    const evs = await fetchFromAPI('events');
    const srms = await fetchFromAPI('sermons');
    const msgs = await fetchFromAPI('contact_messages');
    const prys = await fetchFromAPI('prayer_requests');

    container.innerHTML = `
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            ${renderStatCard('Events', evs?.length || 0, 'calendar', 'forest')}
            ${renderStatCard('Sermons', srms?.length || 0, 'video', 'gold')}
            ${renderStatCard('Messages', msgs?.length || 0, 'mail', 'terracotta')}
            ${renderStatCard('Prayers', prys?.length || 0, 'heart', 'charcoal')}
        </div>

        <!-- System Command Center Real-time Status -->
        <div class="admin-card rounded-3xl p-8 mb-8 relative overflow-hidden bg-gradient-to-br from-charcoal to-forest-dark text-white border border-forest/20 shadow-2xl">
            <!-- decorative background elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div class="absolute bottom-0 left-0 w-48 h-48 bg-forest/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
            
            <div class="relative z-10">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h3 class="text-xl font-heading font-bold text-white flex items-center gap-3">
                            <i data-lucide="cpu" class="w-6 h-6 text-gold"></i>
                            System Command Center
                        </h3>
                        <p class="text-xs text-white/50 uppercase tracking-widest font-bold mt-1">Real-time status monitoring</p>
                    </div>
                    <div class="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                        <span class="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                        <span class="text-[10px] font-bold text-green-400 uppercase tracking-wider">All Systems Operational</span>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <!-- CPU -->
                    <div class="bg-black/20 rounded-2xl p-5 border border-white/5 backdrop-blur-sm relative group overflow-hidden transition-all hover:-translate-y-1 hover:bg-black/30">
                        <div class="flex justify-between items-end mb-4">
                            <div class="text-white/60"><i data-lucide="activity" class="w-5 h-5 mb-2 group-hover:text-gold transition-colors"></i><span class="text-[10px] uppercase font-bold tracking-widest block">CPU Load</span></div>
                            <div class="text-2xl font-bold font-heading text-white">24<span class="text-sm text-white/40 ml-0.5">%</span></div>
                        </div>
                        <div class="w-full bg-white/5 rounded-full h-1.5 mb-1 overflow-hidden">
                            <div class="bg-gold h-1.5 rounded-full relative overflow-hidden" style="width: 24%">
                                <div class="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-full animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    
                    <!-- Memory -->
                    <div class="bg-black/20 rounded-2xl p-5 border border-white/5 backdrop-blur-sm relative group overflow-hidden transition-all hover:-translate-y-1 hover:bg-black/30">
                        <div class="flex justify-between items-end mb-4">
                            <div class="text-white/60"><i data-lucide="database" class="w-5 h-5 mb-2 group-hover:text-terracotta transition-colors"></i><span class="text-[10px] uppercase font-bold tracking-widest block">Memory</span></div>
                            <div class="text-2xl font-bold font-heading text-white">42<span class="text-sm text-white/40 ml-0.5">%</span></div>
                        </div>
                        <div class="w-full bg-white/5 rounded-full h-1.5 mb-1 overflow-hidden">
                            <div class="bg-terracotta h-1.5 rounded-full relative overflow-hidden" style="width: 42%">
                                <div class="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-full animate-[shimmer_2.5s_infinite]"></div>
                            </div>
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>

                    <!-- Network -->
                    <div class="bg-black/20 rounded-2xl p-5 border border-white/5 backdrop-blur-sm relative group overflow-hidden transition-all hover:-translate-y-1 hover:bg-black/30">
                        <div class="flex justify-between items-end mb-4">
                            <div class="text-white/60"><i data-lucide="wifi" class="w-5 h-5 mb-2 group-hover:text-forest-light transition-colors"></i><span class="text-[10px] uppercase font-bold tracking-widest block">Network latency</span></div>
                            <div class="text-2xl font-bold font-heading text-white">12<span class="text-sm text-white/40 ml-0.5">ms</span></div>
                        </div>
                        <div class="w-full bg-white/5 rounded-full h-1.5 mb-1 overflow-hidden">
                            <div class="bg-forest-light h-1.5 rounded-full relative overflow-hidden" style="width: 15%">
                                <div class="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                            </div>
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-forest-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>

                    <!-- DB Health -->
                    <div class="bg-black/20 rounded-2xl p-5 border border-white/5 backdrop-blur-sm relative group overflow-hidden transition-all hover:-translate-y-1 hover:bg-black/30">
                        <div class="flex justify-between items-end mb-4">
                            <div class="text-white/60"><i data-lucide="server" class="w-5 h-5 mb-2 group-hover:text-white transition-colors"></i><span class="text-[10px] uppercase font-bold tracking-widest block">DB Health</span></div>
                            <div class="text-2xl font-bold font-heading text-white">99<span class="text-sm text-white/40 ml-0.5">%</span></div>
                        </div>
                        <div class="w-full bg-white/5 rounded-full h-1.5 mb-1 overflow-hidden">
                            <div class="bg-white/80 h-1.5 rounded-full relative overflow-hidden" style="width: 99%">
                                <div class="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-full animate-[shimmer_3s_infinite]"></div>
                            </div>
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div class="lg:col-span-2 admin-card rounded-2xl p-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-bold text-forest-dark font-heading">Recent Site Activity</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                        <thead>
                            <tr class="text-xs uppercase tracking-wider text-charcoal/40 font-bold border-b border-forest/10">
                                <th class="pb-3 px-4 pl-0">Title</th>
                                <th class="pb-3 px-4">Type</th>
                                <th class="pb-3 px-4 text-right pr-0">Date</th>
                            </tr>
                        </thead>
                        <tbody id="recent-activity-body" class="divide-y divide-forest/5 text-charcoal/80">
                           <!-- Rows injected below -->
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="admin-card rounded-2xl p-6">
                <h3 class="text-lg font-bold text-forest-dark font-heading mb-6">Quick Actions</h3>
                <div class="space-y-3">
                    ${renderQuickAction('New Event', 'plus-circle', () => openModal('events'))}
                    ${renderQuickAction('New Sermon', 'video', () => openModal('sermons'))}
                    ${renderQuickAction('Add Service', 'clock', () => openModal('weekly_services'))}
                </div>
            </div>
        </div>
    `;

    const recentItems = [
        ...(evs || []).map(x => ({ ...x, _type: 'Event', _date: x.event_date || x.created_at })),
        ...(srms || []).map(x => ({ ...x, _type: 'Sermon', _date: x.date || x.created_at })),
        ...(msgs || []).map(x => ({ ...x, _type: 'Message', _date: x.created_at })),
        ...(prys || []).map(x => ({ ...x, _type: 'Prayer', _date: x.created_at }))
    ].sort((a,b) => new Date(b._date) - new Date(a._date)).slice(0, 8);

    const tbody = document.getElementById('recent-activity-body');
    recentItems.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-forest/5 transition-colors';
        tr.innerHTML = `
            <td class="py-4 px-4 pl-0 font-medium">${item.title || item.name || item.subject}</td>
            <td class="py-4 px-4"><span class="px-2 py-1 rounded text-[10px] font-bold uppercase bg-forest/10 text-forest">${item._type}</span></td>
            <td class="py-4 px-4 pr-0 text-right text-xs opacity-50">${new Date(item._date).toLocaleDateString()}</td>
        `;
        tbody.appendChild(tr);
    });

    lucide.createIcons();
}

function renderStatCard(label, val, icon, color) {
    return `
        <div class="admin-card rounded-2xl p-6 relative overflow-hidden group">
            <div class="flex items-center justify-between mb-4 relative z-10">
                <div class="w-12 h-12 bg-forest/10 text-forest rounded-xl flex items-center justify-center">
                    <i data-lucide="${icon}" class="w-6 h-6"></i>
                </div>
            </div>
            <div>
                <h3 class="text-3xl font-bold text-forest-dark mb-1">${val}</h3>
                <p class="text-xs font-medium text-charcoal/50 uppercase tracking-wider">${label}</p>
            </div>
        </div>
    `;
}

function renderQuickAction(label, icon, onClick) {
    const id = 'qa-' + Math.random().toString(36).substr(2, 9);
    setTimeout(() => {
        const btn = document.getElementById(id);
        if(btn) btn.onclick = onClick;
    }, 0);
    return `
        <button id="${id}" class="w-full flex items-center justify-between p-4 rounded-xl border border-forest/10 hover:border-gold hover:bg-gold/5 transition-all group">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-forest/10 text-forest flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
                    <i data-lucide="${icon}" class="w-5 h-5"></i>
                </div>
                <div class="text-left font-bold text-sm text-charcoal">${label}</div>
            </div>
            <i data-lucide="chevron-right" class="w-4 h-4 text-charcoal/30 group-hover:text-gold"></i>
        </button>
    `;
}

// MODEL MANAGER
async function renderModelManager(model) {
    currentModel = model;
    const config = MODEL_CONFIG[model];
    const container = document.getElementById('main-content-container');
    const data = await fetchFromAPI(model);

    container.innerHTML = `
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-forest text-white rounded-2xl flex items-center justify-center shadow-lg shadow-forest/20">
                    <i data-lucide="${config.icon}" class="w-7 h-7"></i>
                </div>
                <div>
                    <h2 class="font-heading text-3xl font-bold text-forest-dark">${config.title}</h2>
                    <p class="text-xs text-charcoal/40 uppercase tracking-widest font-bold">Manage site ${model.replace('_', ' ')}</p>
                </div>
            </div>
            ${!config.readonly ? `
            <button onclick="openModal('${model}')" class="flex items-center gap-2 px-6 py-3 bg-gold text-white rounded-xl font-bold hover:bg-gold-dark transition-all shadow-lg shadow-gold/20">
                <i data-lucide="plus" class="w-5 h-5"></i> Add New ${config.title.slice(0,-1)}
            </button>
            ` : ''}
        </div>

        <div class="admin-card rounded-3xl overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                        <tr class="bg-forest/5 text-xs uppercase tracking-wider text-charcoal/40 font-bold">
                            <th class="py-4 px-6">Details</th>
                            ${model === 'events' ? '<th class="py-4 px-6">Date & Location</th>' : ''}
                            ${model === 'sermons' ? '<th class="py-4 px-6">Speaker & Date</th>' : ''}
                            ${model === 'users' ? '<th class="py-4 px-6">Role</th>' : ''}
                            ${model === 'prayer_requests' || model === 'contact_messages' ? '<th class="py-4 px-6 text-center">Status</th>' : ''}
                            <th class="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-forest/5">
                        ${data.length === 0 ? '<tr><td colspan="5" class="p-12 text-center text-charcoal/30 italic">No records found.</td></tr>' : ''}
                        ${data.map(item => {
                            let statusHtml = '';
                            if (model === 'prayer_requests') {
                                const active = item.is_answered == 1;
                                statusHtml = `<button onclick="toggleStatus('${model}', ${item.id})" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${active ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">${active ? 'Answered' : 'Pending'}</button>`;
                            } else if (model === 'contact_messages') {
                                const active = item.is_read == 1;
                                statusHtml = `<button onclick="toggleStatus('${model}', ${item.id})" class="px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${active ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}">${active ? 'Read' : 'New'}</button>`;
                            }

                            return `
                                <tr class="hover:bg-forest/5 transition-colors group">
                                    <td class="py-4 px-6">
                                        <div class="font-bold text-charcoal">${item.title || item.name || item.subject || item.username}</div>
                                        <div class="text-[10px] text-charcoal/40 truncate max-w-xs">${item.description || item.message || item.request || ''}</div>
                                    </td>
                                    ${model === 'events' ? `<td class="py-4 px-6 text-xs text-forest font-medium">${item.event_date}<br><span class="text-charcoal/40">${item.location || ''}</span></td>` : ''}
                                    ${model === 'sermons' ? `<td class="py-4 px-6 text-xs text-forest font-medium">${item.speaker}<br><span class="text-charcoal/40">${item.date}</span></td>` : ''}
                                    ${model === 'users' ? `<td class="py-4 px-6 font-bold text-xs uppercase tracking-widest text-gold-dark">${item.role}</td>` : ''}
                                    ${statusHtml ? `<td class="py-4 px-6 text-center">${statusHtml}</td>` : ''}
                                    <td class="py-4 px-6 text-right">
                                        <div class="flex justify-end gap-1">
                                            ${config.readonly ? `<button onclick="openModal('${model}', ${item.id})" class="p-2 text-charcoal/20 hover:text-forest transition-colors"><i data-lucide="eye" class="w-4 h-4"></i></button>` : ''}
                                            ${!config.readonly ? `<button onclick="openModal('${model}', ${item.id})" class="p-2 text-charcoal/20 hover:text-forest transition-colors"><i data-lucide="edit-2" class="w-4 h-4"></i></button>` : ''}
                                            <button onclick="deleteItem('${model}', ${item.id})" class="p-2 text-charcoal/20 hover:text-terracotta transition-colors"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    lucide.createIcons();
}

async function toggleStatus(model, id) {
    const res = await fetchFromAPI(model, 'toggle_status', null, id);
    if (res && res.success) renderModelManager(model);
}

// MODAL & FORMS
async function openModal(model, id = null) {
    currentModel = model;
    currentId = id;
    const config = MODEL_CONFIG[model];
    const form = document.getElementById('crud-form');
    const modalTitle = document.getElementById('modal-title');
    
    modalTitle.innerText = id ? `Edit ${config.title.slice(0,-1)}` : `Create New ${config.title.slice(0,-1)}`;
    form.innerHTML = '';

    let existingData = {};
    if (id) {
        const data = await fetchFromAPI(model);
        existingData = data.find(x => x.id == id) || {};
    }

    config.fields.forEach(f => {
        const fieldDiv = document.createElement('div');
        fieldDiv.innerHTML = `
            <label class="block text-xs font-bold text-forest-dark uppercase tracking-wider mb-2">${f.label}${f.required ? ' *' : ''}</label>
            ${f.type === 'textarea' ? 
                `<textarea name="${f.name}" class="w-full px-4 py-3 bg-ivory border border-forest/10 rounded-xl focus:ring-2 focus:ring-forest/10 outline-none h-32">${existingData[f.name] || ''}</textarea>` :
                `<input type="${f.type}" name="${f.name}" value="${existingData[f.name] || ''}" ${f.required ? 'required' : ''} class="w-full px-4 py-3 bg-ivory border border-forest/10 rounded-xl focus:ring-2 focus:ring-forest/10 outline-none">`
            }
        `;
        form.appendChild(fieldDiv);
    });

    const modal = document.getElementById('crud-modal');
    const saveBtn = document.getElementById('save-btn');
    if (config.readonly) {
        saveBtn.classList.add('hidden');
        modalTitle.innerText = `View ${config.title.slice(0,-1)}`;
    } else {
        saveBtn.classList.remove('hidden');
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('div').classList.remove('scale-95');
    }, 10);
    lucide.createIcons();
}

function closeModal() {
    const modal = document.getElementById('crud-modal');
    modal.classList.add('opacity-0');
    modal.querySelector('div').classList.add('scale-95');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

async function handleSave() {
    const form = document.getElementById('crud-form');
    const formData = new FormData(form);
    const payload = {};
    formData.forEach((value, key) => payload[key] = value);

    const action = currentId ? 'update' : 'create';
    const res = await fetchFromAPI(currentModel, action, payload, currentId);

    if (res && res.success) {
        closeModal();
        if (currentModel === '') renderDashboard();
        else renderModelManager(currentModel);
    } else {
        alert('Error: ' + (res?.error || 'Failed to save'));
    }
}

async function deleteItem(model, id) {
    if (!confirm('Are you sure you want to delete this item? This cannot be undone.')) return;
    const res = await fetchFromAPI(model, 'delete', null, id);
    if (res && res.success) {
        if (currentModel === '') renderDashboard();
        else renderModelManager(currentModel);
    } else {
        alert('Error: ' + (res?.error || 'Failed to delete'));
    }
}

// INIT
document.addEventListener('DOMContentLoaded', async () => {
    // Auth Check
    try {
        const authRes = await fetch('../api/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'check' })
        });
        const authStat = await authRes.json();
        if (!authStat.logged_in) {
            window.location.href = 'login.html';
            return;
        }
        document.getElementById('admin-username').textContent = authStat.user.username;
    } catch (e) {
        console.error('Auth check failed', e);
    }

    switchView('dashboard');

    // Sidebar Listeners
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = btn.id.replace('view-', '');
            switchView(viewId);
        });
    });

    // Modal Save
    document.getElementById('save-btn').onclick = handleSave;

    // Logout
    document.getElementById('logout-btn').onclick = async () => {
        await fetch('../api/auth.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'logout' })
        });
        localStorage.removeItem('church_admin');
        window.location.href = 'login.html';
    };

    // Lucide
    lucide.createIcons();
});
