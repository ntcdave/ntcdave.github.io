// Aguarda o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. INTERNACIONALIZAÇÃO (i18n)
    // ==========================================
    const translations = {
        pt: {
            // Navbar
            'nav.services':  'Soluções',
            'nav.about':     'Sobre Mim',
            'nav.projects':  'Projetos',
            'nav.contact':   'Contato',

            // Hero
            'hero.badge':         'Disponível para Projetos',
            'hero.headline':      'Transformando ideias em <br><span class="gradient-text">software seguro e escalável</span>',
            'hero.subtitle':      'Engenheiro de Software focado em criar aplicações web robustas, APIs seguras e soluções que impulsionam negócios. Do levantamento de requisitos ao deploy.',
            'hero.cta_primary':   'Solicitar Orçamento',
            'hero.cta_secondary': 'Ver Projetos',

            // Services
            'services.title':    'Como posso ajudar seu negócio',
            'services.subtitle': 'Entrega de software de ponta a ponta com foco em qualidade e segurança.',
            'services.s1.title': 'Desenvolvimento Full-Stack',
            'services.s1.desc':  'Criação de aplicações web responsivas e dinâmicas (React, Angular) com back-ends robustos baseados em Java ou Python.',
            'services.s2.title': 'APIs Seguras & Integrações',
            'services.s2.desc':  'Desenvolvimento e consumo de APIs RESTful usando Spring Boot e Django. Autenticação, autorização e arquitetura baseada em microsserviços.',
            'services.s3.title': 'Consultoria em Software',
            'services.s3.desc':  'Análise de requisitos, modelagem de banco de dados e modernização de plataformas legadas com metodologias ágeis (Scrum/Kanban).',

            // Projects
            'projects.title':       'Projetos em Destaque',
            'projects.subtitle':    'Casos práticos de problemas resolvidos com tecnologia.',
            'projects.p1.title':    'Portal de Transparência',
            'projects.p1.desc':     'Desenvolvimento de fluxo de dados abertos para visualização de estatísticas públicas de forma segura e acessível.',
            'projects.tag.security':'Segurança',
            'projects.p2.title':    'Aplicações Web Otimizadas',
            'projects.p2.desc':     'Construção de sites e portais com excelentes práticas de UX/UI, convertendo visitantes em clientes, sob metodologias ágeis.',
            'projects.github_cta':  'Explorar Repositórios no GitHub',

            // About
            'about.title':          'Sobre Mim',
            'about.p1':             'Sou estudante de Sistemas para Internet pelo IFAC, com mais de dois anos de experiência prática na engenharia de software.',
            'about.p2':             'No meu percurso profissional, da U:TECH à Secretaria de Saúde do Acre, ajudei a desenhar arquiteturas, dar suporte à infraestrutura e entregar funcionalidades escaláveis para portais web.',
            'about.item1':          'Nível de Inglês: B2 (Intermediário-avançado)',
            'about.item2':          'Dominância ágil: Scrum / Kanban',
            'about.item3':          'Foco na resolução de problemas complexos',
            'about.timeline_title': 'Trajetória Tecnológica',
            'about.t1.title':       'Graduação em Sistemas para Internet (5º Período)',
            'about.t1.org':         'Instituto Federal do Acre',
            'about.t2.title':       'Estagiário | Infra e Sistemas',
            'about.t2.org':         'Secretária de Saúde do Estado do Acre (2023)',
            'about.t3.title':       'Desenvolvedor Frontend',
            'about.t3.org':         'U:TECH - Empresa Júnior de TI (2022)',
            'about.t4.title':       'Suporte Técnico',
            'about.t4.org':         'Nogueira & Brito LTDA (2020)',

            // Contact
            'contact.heading':        'Vamos construir <br><span class="gradient-text">algo incrível juntos?</span>',
            'contact.desc':           'Estou disponível para novos projetos, parcerias ou propostas de desenvolvimento de software. Mande uma mensagem pelo formulário ou conecte-se diretamente através das minhas redes.',
            'contact.location_label': 'Local Base',

            // Form
            'form.name_label':         'Nome Completo',
            'form.name_placeholder':   'Digite seu nome',
            'form.email_label':        'E-mail Comercial',
            'form.email_placeholder':  'seu.email@exemplo.com',
            'form.subject_label':      'Motivo do Contato',
            'form.subject_placeholder':'Assunto (mínimo 10 caracteres)',
            'form.message_label':      'Mensagem / Escopo do Projeto',
            'form.message_placeholder':'Conte-me sobre os desafios do seu negócio...',
            'form.submit':             'Enviar Mensagem',

            // Footer
            'footer.copy': '© 2026 Direitos Reservados. Projetado para conversão & escalabilidade.',

            // Page title
            '_title': 'Davi Brito | Software Seguro e Escalável',
        },

        en: {
            // Navbar
            'nav.services':  'Services',
            'nav.about':     'About Me',
            'nav.projects':  'Projects',
            'nav.contact':   'Contact',

            // Hero
            'hero.badge':         'Available for Projects',
            'hero.headline':      'Turning ideas into <br><span class="gradient-text">secure and scalable software</span>',
            'hero.subtitle':      'Software Engineer focused on building robust web applications, secure APIs, and solutions that drive businesses. From requirements gathering to deployment.',
            'hero.cta_primary':   'Request a Quote',
            'hero.cta_secondary': 'View Projects',

            // Services
            'services.title':    'How I can help your business',
            'services.subtitle': 'End-to-end software delivery with a focus on quality and security.',
            'services.s1.title': 'Full-Stack Development',
            'services.s1.desc':  'Building responsive and dynamic web applications (React, Angular) with robust back-ends based on Java or Python.',
            'services.s2.title': 'Secure APIs & Integrations',
            'services.s2.desc':  'Development and consumption of RESTful APIs using Spring Boot and Django. Authentication, authorization, and microservices-based architecture.',
            'services.s3.title': 'Software Consulting',
            'services.s3.desc':  'Requirements analysis, database modeling, and modernization of legacy platforms using agile methodologies (Scrum/Kanban).',

            // Projects
            'projects.title':        'Featured Projects',
            'projects.subtitle':     'Real-world cases of problems solved with technology.',
            'projects.p1.title':     'Transparency Portal',
            'projects.p1.desc':      'Development of an open data pipeline for visualizing public statistics in a secure and accessible way.',
            'projects.tag.security': 'Security',
            'projects.p2.title':     'Optimized Web Applications',
            'projects.p2.desc':      'Building websites and portals with excellent UX/UI practices, converting visitors into clients, under agile methodologies.',
            'projects.github_cta':   'Explore Repositories on GitHub',

            // About
            'about.title':          'About Me',
            'about.p1':             'I am an Internet Systems student at IFAC, with over two years of hands-on experience in software engineering.',
            'about.p2':             'Throughout my professional journey, from U:TECH to the Acre State Health Department, I helped design architectures, support infrastructure, and deliver scalable features for web portals.',
            'about.item1':          'English Proficiency: B2 (Upper-Intermediate)',
            'about.item2':          'Agile fluency: Scrum / Kanban',
            'about.item3':          'Focused on solving complex problems',
            'about.timeline_title': 'Tech Journey',
            'about.t1.title':       'B.Sc. in Internet Systems (5th semester)',
            'about.t1.org':         'Federal Institute of Acre',
            'about.t2.title':       'Intern | Infrastructure & Systems',
            'about.t2.org':         'Acre State Health Department (2023)',
            'about.t3.title':       'Frontend Developer',
            'about.t3.org':         'U:TECH - Junior IT Company (2022)',
            'about.t4.title':       'Technical Support',
            'about.t4.org':         'Nogueira & Brito LTDA (2020)',

            // Contact
            'contact.heading':        'Let\'s build <br><span class="gradient-text">something amazing together?</span>',
            'contact.desc':           'I\'m available for new projects, partnerships, or software development proposals. Send a message through the form or connect directly through my networks.',
            'contact.location_label': 'Base Location',

            // Form
            'form.name_label':         'Full Name',
            'form.name_placeholder':   'Enter your name',
            'form.email_label':        'Business Email',
            'form.email_placeholder':  'your.email@example.com',
            'form.subject_label':      'Reason for Contact',
            'form.subject_placeholder':'Subject (minimum 10 characters)',
            'form.message_label':      'Message / Project Scope',
            'form.message_placeholder':'Tell me about your business challenges...',
            'form.submit':             'Send Message',

            // Footer
            'footer.copy': '© 2026 All Rights Reserved. Designed for conversion & scalability.',

            // Page title
            '_title': 'Davi Brito | Secure and Scalable Software',
        }
    };

    let currentLang = localStorage.getItem('lang') || 'pt';

    function applyTranslations(lang) {
        const dict = translations[lang];
        if (!dict) return;

        // Plain text nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) el.textContent = dict[key];
        });

        // HTML nodes (allow inline HTML like <br> and <span>)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key] !== undefined) el.innerHTML = dict[key];
        });

        // Placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) el.placeholder = dict[key];
        });

        // Page title & html lang
        if (dict['_title']) document.title = dict['_title'];
        document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';
    }

    function updateToggleBtn(lang) {
        const btn = document.getElementById('lang-toggle');
        if (!btn) return;
        const flag  = btn.querySelector('.lang-flag');
        const label = btn.querySelector('.lang-label');

        if (lang === 'pt') {
            flag.textContent  = '🇧🇷';
            label.textContent = 'PT';
            btn.classList.remove('is-en');
            btn.setAttribute('aria-label', 'Switch to English');
        } else {
            flag.textContent  = '🇺🇸';
            label.textContent = 'EN';
            btn.classList.add('is-en');
            btn.setAttribute('aria-label', 'Mudar para Português');
        }
    }

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations(lang);
        updateToggleBtn(lang);
    }

    // Init
    setLanguage(currentLang);

    // Toggle handler
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'pt' ? 'en' : 'pt');
        });
    }

    // ==========================================
    // 2. STICKY HEADER
    // ==========================================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 3. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // ==========================================
    // 4. FORM VALIDATION & SUBMISSION
    // ==========================================
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    function showEmailValidation(isValid, message) {
        const validationElement = document.getElementById('email-validation');
        const emailInput = document.getElementById('email');
        if(!validationElement || !emailInput) return;

        if (isValid) {
            validationElement.textContent = message;
            validationElement.className = 'email-validation valid';
            emailInput.classList.remove('invalid');
        } else {
            validationElement.textContent = message;
            validationElement.className = 'email-validation invalid';
            emailInput.classList.add('invalid');
        }
    }

    function showFieldValidation(fieldId, isValid, message) {
        const validationElement = document.getElementById(fieldId + '-validation');
        const fieldInput = document.getElementById(fieldId);
        if(!validationElement || !fieldInput) return;

        if (isValid) {
            validationElement.textContent = message;
            validationElement.className = 'field-validation valid';
            fieldInput.classList.remove('invalid');
        } else {
            validationElement.textContent = message;
            validationElement.className = 'field-validation invalid';
            fieldInput.classList.add('invalid');
        }
    }

    // Real-time Subject
    const assuntoInput = document.getElementById('assunto');
    if(assuntoInput) {
        assuntoInput.addEventListener('input', function() {
            const assunto = this.value.trim();
            if (assunto === '') { showFieldValidation('assunto', true, ''); return; }
            if (assunto.length < 10) {
                showFieldValidation('assunto', false, `Mínimo de 10 caracteres (${assunto.length}/10)`);
            } else {
                showFieldValidation('assunto', true, '✓ Válido');
            }
        });
    }

    // Real-time Message
    const mensagemInput = document.getElementById('mensagem');
    if(mensagemInput) {
        mensagemInput.addEventListener('input', function() {
            const mensagem = this.value.trim();
            if (mensagem === '') { showFieldValidation('mensagem', true, ''); return; }
            if (mensagem.length < 10) {
                showFieldValidation('mensagem', false, `Mínimo de 10 caracteres (${mensagem.length}/10)`);
            } else {
                showFieldValidation('mensagem', true, '✓ Válido');
            }
        });
    }

    // Real-time Email
    const emailInput = document.getElementById('email');
    if(emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            if (email === '') { showEmailValidation(true, ''); return; }
            if (email.length < 5) { showEmailValidation(false, 'E-mail muito curto'); return; }
            if (validateEmail(email)) {
                showEmailValidation(true, '✓ E-mail válido');
            } else {
                showEmailValidation(false, '✗ Digite um e-mail válido');
            }
        });
    }

    function showMessage(message, type) {
        const messageElement = document.getElementById('form-message');
        if(!messageElement) return;
        messageElement.textContent = message;
        messageElement.className = `form-message ${type} show`;
        setTimeout(() => { messageElement.classList.remove('show'); }, 5000);
    }

    function resetButton() {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        if(!submitBtn || !btnText) return;
        submitBtn.disabled = false;
        btnText.textContent = translations[currentLang]['form.submit'];
    }

    function showLoading() {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
        if(!submitBtn || !btnText) return;
        submitBtn.disabled = true;
        btnText.textContent = currentLang === 'en' ? 'Sending...' : 'Enviando...';
    }

    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email   = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const mensagem= document.getElementById('mensagem').value.trim();

            let hasErrors = false;

            if (!validateEmail(email)) {
                showMessage(
                    currentLang === 'en'
                        ? 'Please enter a valid e-mail before submitting.'
                        : 'Por favor, digite um e-mail válido antes de enviar.',
                    'error'
                );
                hasErrors = true;
            }
            if (assunto.length < 10) {
                showMessage(
                    currentLang === 'en'
                        ? 'Subject must be at least 10 characters.'
                        : 'O assunto deve ter pelo menos 10 caracteres.',
                    'error'
                );
                hasErrors = true;
            }
            if (mensagem.length < 10) {
                showMessage(
                    currentLang === 'en'
                        ? 'Message must be at least 10 characters.'
                        : 'A mensagem deve ter pelo menos 10 caracteres.',
                    'error'
                );
                hasErrors = true;
            }

            if (hasErrors) return;

            showLoading();

            const nome = document.getElementById('nome').value.trim();

            const whatsappMessage = `Olá Davi, vi seu portfólio e gostaria de falar do meu projeto!\n*Nome:* ${nome}\n*E-mail:* ${email}\n*Assunto:* ${assunto}\n\n*Mensagem:*\n${mensagem}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/5568992475139?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');

            showMessage(
                currentLang === 'en'
                    ? 'Redirecting to WhatsApp...'
                    : 'Redirecionando para o seu WhatsApp...',
                'success'
            );
            document.getElementById('contact-form').reset();
            resetButton();
        });
    }
});