// Recruiter terminal: i18n, command palette, contact form (WhatsApp), mobile nav.
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var translations = {
        pt: {
            'a11y.skip': 'Pular para o conteúdo',
            'nav.about': 'sobre',
            'nav.projects': 'projetos',
            'nav.contact': 'contato',
            'status.now': 'construindo',
            'status.avail': 'disponível para projetos',
            'hero.first': 'davi',
            'hero.last': 'brito',
            'hero.tagline': 'software engineer em rio branco. <span>java · python · typescript.</span>',
            'about.p1': 'Graduando em Sistemas para Internet pelo IFAC. Ex-desenvolvedor frontend na U:TECH (2022), ex-estagiário de infra e sistemas na Secretaria de Saúde do Acre (2023).',
            'about.p2': 'Foco em APIs robustas e soluções escaláveis — do levantamento de requisitos ao deploy, com Scrum/Kanban e inglês B2.',
            'projects.p1.desc': 'SIGINT offline: captura FM via RTL-SDR, DSP customizado, Whisper local e NLP ontológico. Python · PyQt6 · Edge AI.',
            'projects.p2.desc': 'API reativa de alta performance: Spring WebFlux, Circuit Breaker, Nginx + Docker. Java.',
            'projects.p3.desc': 'Gerenciador de tarefas em TypeScript. Escopo pequeno, código legível.',
            'projects.all': 'ver todos os projetos',
            'form.name_ph': 'seu nome',
            'form.email_ph': 'voce@email.com',
            'form.msg_ph': 'sobre o que quer conversar?',
            'form.hint': 'pressione enter ou clique em enviar — abre o whatsapp com a mensagem pronta.',
            'form.submit': '$ enviar →',
            'form.sending': '$ enviando...',
            'form.err': 'Preencha nome, e-mail válido e mensagem com 10+ caracteres.',
            'form.ok': 'Abrindo o WhatsApp...',
            'palette.ph': 'digite um comando ou busque...',
            '_title': 'Davi Brito · Software Engineer · Rio Branco'
        },
        en: {
            'a11y.skip': 'Skip to content',
            'nav.about': 'about',
            'nav.projects': 'projects',
            'nav.contact': 'contact',
            'status.now': 'building',
            'status.avail': 'available for projects',
            'hero.first': 'davi',
            'hero.last': 'brito',
            'hero.tagline': 'software engineer in rio branco. <span>java · python · typescript.</span>',
            'about.p1': 'Internet Systems undergraduate at IFAC. Former frontend developer at U:TECH (2022), former infrastructure & systems intern at the Acre State Health Department (2023).',
            'about.p2': 'Focused on robust APIs and scalable solutions — from requirements to deploy, with Scrum/Kanban and B2 English.',
            'projects.p1.desc': 'Offline SIGINT: FM capture via RTL-SDR, custom DSP, local Whisper and ontology NLP. Python · PyQt6 · Edge AI.',
            'projects.p2.desc': 'High-performance reactive API: Spring WebFlux, Circuit Breaker, Nginx + Docker. Java.',
            'projects.p3.desc': 'Task manager in TypeScript. Small scope, readable code.',
            'projects.all': 'view all projects',
            'form.name_ph': 'your name',
            'form.email_ph': 'you@email.com',
            'form.msg_ph': 'what is on your mind?',
            'form.hint': 'press enter or click send — opens whatsapp with the message ready.',
            'form.submit': '$ send →',
            'form.sending': '$ sending...',
            'form.err': 'Fill in your name, a valid email and a 10+ character message.',
            'form.ok': 'Opening WhatsApp...',
            'palette.ph': 'type a command or search...',
            '_title': 'Davi Brito · Software Engineer · Rio Branco'
        }
    };

    var currentLang = 'pt';
    try { currentLang = localStorage.getItem('lang') || 'pt'; } catch (e) {}
    if (currentLang !== 'pt' && currentLang !== 'en') currentLang = 'pt';

    function applyTranslations(lang) {
        var dict = translations[lang];
        if (!dict) return;
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) el.textContent = dict[key];
        });
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
        });
        if (dict._title) document.title = dict._title;
        document.documentElement.lang = lang === 'en' ? 'en' : 'pt-br';
    }

    function updateLangBtn(lang) {
        var btn = document.getElementById('lang-toggle');
        if (!btn) return;
        btn.querySelector('.lang-flag').textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
        btn.querySelector('.lang-label').textContent = lang === 'pt' ? 'PT' : 'EN';
        btn.setAttribute('aria-label', lang === 'pt' ? 'Switch to English' : 'Mudar para Português');
    }

    function setLanguage(lang) {
        currentLang = lang;
        try { localStorage.setItem('lang', lang); } catch (e) {}
        applyTranslations(lang);
        updateLangBtn(lang);
    }

    applyTranslations(currentLang);
    updateLangBtn(currentLang);

    var langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', function () {
        setLanguage(currentLang === 'pt' ? 'en' : 'pt');
    });

    // Mobile nav
    var ham = document.getElementById('nav-ham');
    if (ham) ham.addEventListener('click', function () {
        var nav = document.querySelector('.t-nav');
        var open = nav.classList.toggle('open');
        ham.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // ---------- Command palette (Ctrl/Cmd+K) ----------
    var root = document.getElementById('palette-root');
    var input = document.getElementById('palette-input');
    var list = document.getElementById('palette-list');
    var selected = 0;
    var items = [];

    function buildItems() {
        var en = currentLang === 'en';
        items = [
            { label: en ? 'go → whoami' : 'ir → whoami', hint: '#sobre', run: function () { go('#sobre'); } },
            { label: en ? 'go → projects' : 'ir → projetos', hint: '#projetos', run: function () { go('#projetos'); } },
            { label: en ? 'go → contact' : 'ir → contato', hint: '#contato', run: function () { go('#contato'); } },
            { label: 'open → analise-radio-sdr', hint: 'github', run: function () { open('https://github.com/ntcdave/analise-radio-sdr'); } },
            { label: 'open → rinha-de-backend-2025', hint: 'github', run: function () { open('https://github.com/ntcdave/rinha-de-backend-2025-davi-brito'); } },
            { label: 'open → taskmaster', hint: 'github', run: function () { open('https://github.com/ntcdave/taskmaster'); } },
            { label: 'open → github profile', hint: 'github.com/ntcdave', run: function () { open('https://github.com/ntcdave'); } },
            { label: 'open → linkedin', hint: 'in/ntcdave', run: function () { open('https://www.linkedin.com/in/ntcdave/'); } },
            { label: en ? 'copy → email' : 'copiar → e-mail', hint: 'davibrito.tech@gmail.com', run: copyEmail },
            { label: en ? 'toggle → language PT/EN' : 'alternar → idioma PT/EN', hint: 'i18n', run: function () { setLanguage(currentLang === 'pt' ? 'en' : 'pt'); } }
        ];
    }

    function go(sel) {
        var el = document.querySelector(sel);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function open(url) { window.open(url, '_blank', 'noopener'); }
    function copyEmail() {
        var email = 'davibrito.tech@gmail.com';
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(email).catch(function () {});
        }
        note(currentLang === 'en' ? 'Email copied: ' + email : 'E-mail copiado: ' + email);
    }

    function openPalette() {
        buildItems();
        root.hidden = false;
        input.value = '';
        renderPalette('');
        setTimeout(function () { input.focus(); }, 30);
    }
    function closePalette() { root.hidden = true; }

    function renderPalette(q) {
        q = (q || '').toLowerCase();
        var shown = items.filter(function (it) {
            return (it.label + ' ' + it.hint).toLowerCase().indexOf(q) !== -1;
        });
        selected = 0;
        list.innerHTML = '';
        if (!shown.length) {
            var li = document.createElement('li');
            li.innerHTML = '<button type="button" aria-selected="false"><span>' +
                (currentLang === 'en' ? 'no matches' : 'nada encontrado') + '</span></button>';
            list.appendChild(li);
            return;
        }
        shown.forEach(function (it, i) {
            var li = document.createElement('li');
            var b = document.createElement('button');
            b.type = 'button';
            b.setAttribute('role', 'option');
            b.setAttribute('aria-selected', i === selected ? 'true' : 'false');
            b.innerHTML = '<span></span><small></small>';
            b.querySelector('span').textContent = it.label;
            b.querySelector('small').textContent = it.hint;
            b.addEventListener('click', function () { closePalette(); it.run(); });
            b.addEventListener('mousemove', function () { selected = i; paint(); });
            li.appendChild(b);
            list.appendChild(li);
        });
        function paint() {
            Array.prototype.forEach.call(list.querySelectorAll('button'), function (bb, j) {
                bb.setAttribute('aria-selected', j === selected ? 'true' : 'false');
            });
        }
        list._shown = shown;
        list._paint = paint;
    }

    document.addEventListener('keydown', function (e) {
        var mod = e.metaKey || e.ctrlKey;
        if (mod && (e.key === 'k' || e.key === 'K')) {
            e.preventDefault();
            if (root.hidden) openPalette(); else closePalette();
            return;
        }
        if (!root.hidden && e.key === 'Escape') closePalette();
    });
    if (input) input.addEventListener('input', function () { renderPalette(input.value); });
    if (input) input.addEventListener('keydown', function (e) {
        var shown = list._shown || [];
        if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(shown.length - 1, selected + 1); if (list._paint) list._paint(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(0, selected - 1); if (list._paint) list._paint(); }
        if (e.key === 'Enter') { e.preventDefault(); var it = shown[selected]; if (it) { closePalette(); it.run(); } }
    });
    document.querySelectorAll('[data-palette-close]').forEach(function (el) {
        el.addEventListener('click', closePalette);
    });
    ['palette-open', 'palette-fab'].forEach(function (id) {
        var b = document.getElementById(id);
        if (b) b.addEventListener('click', openPalette);
    });

    function note(msg) {
        var fb = document.getElementById('form-validation');
        if (!fb) return;
        fb.textContent = msg;
        fb.className = 'field-validation ok';
        setTimeout(function () { if (fb.textContent === msg) fb.textContent = ''; }, 4000);
    }

    // ---------- Contact form → WhatsApp ----------
    var form = document.getElementById('contact-form');
    function validEmail(v) { return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); }
    if (form) form.addEventListener('submit', function (e) {
        e.preventDefault();
        var dict = translations[currentLang];
        var fb = document.getElementById('form-validation');
        var btn = document.getElementById('submit-btn');
        var btnText = btn ? btn.querySelector('.btn-text') : null;
        var nome = document.getElementById('nome').value.trim();
        var email = document.getElementById('email').value.trim();
        var msg = document.getElementById('mensagem').value.trim();
        if (!nome || !validEmail(email) || msg.length < 10) {
            if (fb) { fb.textContent = dict['form.err']; fb.className = 'field-validation err'; }
            return;
        }
        if (btn) btn.disabled = true;
        if (btnText) btnText.textContent = dict['form.sending'];
        var text = 'Olá Davi, vi seu portfólio e gostaria de conversar!\n*Nome:* ' + nome + '\n*E-mail:* ' + email + '\n\n*Mensagem:*\n' + msg;
        window.open('https://wa.me/5568992475139?text=' + encodeURIComponent(text), '_blank');
        if (fb) { fb.textContent = dict['form.ok']; fb.className = 'field-validation ok'; }
        form.reset();
        setTimeout(function () {
            if (btn) btn.disabled = false;
            if (btnText) btnText.textContent = translations[currentLang]['form.submit'];
        }, 1200);
    });
});
