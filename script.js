document.addEventListener('DOMContentLoaded', function() {

    // ── EmailJS ─────────────────────────────────────────────────────────────
    emailjs.init({ publicKey: "3UeNtj3oheb7Vckml" });

    // ── Sticky nav shadow on scroll ──────────────────────────────────────────
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    }, { passive: true });

    // ── Mobile nav toggle ────────────────────────────────────────────────────
    var navToggle = document.getElementById('nav-toggle');
    var navLinks  = document.getElementById('nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
        });
    });

    // ── Active nav link based on scroll position ─────────────────────────────
    var sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        var scrollY = window.scrollY + 80;
        sections.forEach(function(section) {
            var link = document.querySelector('.nav-link[href="#' + section.id + '"]');
            if (!link) return;
            if (section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY) {
                document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
                link.classList.add('active');
            }
        });
    }

    // ── Scroll-triggered fade-in ─────────────────────────────────────────────
    var fadeEls = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeEls.forEach(function(el) { observer.observe(el); });
    } else {
        // Fallback for browsers without IntersectionObserver
        fadeEls.forEach(function(el) { el.classList.add('visible'); });
    }

    // ── Form validation helpers ───────────────────────────────────────────────
    var EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

    function validateEmail(email) {
        return EMAIL_REGEX.test(email);
    }

    function showEmailValidation(isValid, message) {
        var el    = document.getElementById('email-validation');
        var input = document.getElementById('email');
        el.textContent = message;
        el.className   = 'email-validation ' + (isValid ? 'valid' : 'invalid');
        input.classList.toggle('invalid', !isValid);
    }

    function showFieldValidation(fieldId, isValid, message) {
        var el    = document.getElementById(fieldId + '-validation');
        var input = document.getElementById(fieldId);
        el.textContent = message;
        el.className   = 'field-validation ' + (isValid ? 'valid' : 'invalid');
        input.classList.toggle('invalid', !isValid);
    }

    // ── Real-time field validation ────────────────────────────────────────────
    document.getElementById('email').addEventListener('input', function() {
        var email = this.value.trim();
        if (!email) { showEmailValidation(true, ''); return; }
        if (email.length < 5) { showEmailValidation(false, 'E-mail deve ter pelo menos 5 caracteres'); return; }
        if (validateEmail(email)) {
            showEmailValidation(true, '✓ E-mail válido');
        } else {
            showEmailValidation(false, '✗ Digite um e-mail válido');
        }
    });

    document.getElementById('assunto').addEventListener('input', function() {
        var v = this.value.trim();
        if (!v) { showFieldValidation('assunto', true, ''); return; }
        if (v.length < 10) {
            showFieldValidation('assunto', false, 'Assunto deve ter pelo menos 10 caracteres (' + v.length + '/10)');
        } else {
            showFieldValidation('assunto', true, '✓ Assunto válido');
        }
    });

    document.getElementById('mensagem').addEventListener('input', function() {
        var v = this.value.trim();
        if (!v) { showFieldValidation('mensagem', true, ''); return; }
        if (v.length < 10) {
            showFieldValidation('mensagem', false, 'Mensagem deve ter pelo menos 10 caracteres (' + v.length + '/10)');
        } else {
            showFieldValidation('mensagem', true, '✓ Mensagem válida');
        }
    });

    // Blur validation
    document.querySelectorAll('input, textarea').forEach(function(el) {
        el.addEventListener('blur', function() {
            if (!this.value.trim()) { this.classList.remove('valid'); return; }
            this.classList.add('valid');
            if (this.id === 'email') {
                var isValid = validateEmail(this.value.trim());
                showEmailValidation(isValid, isValid ? '✓ E-mail válido' : '✗ Digite um e-mail válido');
            } else if (this.id === 'assunto') {
                var v = this.value.trim();
                showFieldValidation('assunto', v.length >= 10, v.length >= 10 ? '✓ Assunto válido' : 'Assunto deve ter pelo menos 10 caracteres (' + v.length + '/10)');
            } else if (this.id === 'mensagem') {
                var v = this.value.trim();
                showFieldValidation('mensagem', v.length >= 10, v.length >= 10 ? '✓ Mensagem válida' : 'Mensagem deve ter pelo menos 10 caracteres (' + v.length + '/10)');
            }
        });
    });

    // ── Form submission ───────────────────────────────────────────────────────
    function showMessage(message, type) {
        var el = document.getElementById('form-message');
        el.textContent = message;
        el.className   = 'form-message ' + type + ' show';
        setTimeout(function() { el.classList.remove('show'); }, 5000);
    }

    function showLoading() {
        var btn = document.getElementById('submit-btn');
        btn.querySelector('.btn-text').innerHTML = '<i class="fas fa-spinner"></i> Enviando...';
        btn.classList.add('loading');
        btn.disabled = true;
    }

    function resetButton() {
        var btn = document.getElementById('submit-btn');
        btn.querySelector('.btn-text').innerHTML = '<i class="fas fa-paper-plane"></i> Entre em contato';
        btn.classList.remove('loading');
        btn.disabled = false;
    }

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        var email   = document.getElementById('email').value.trim();
        var assunto = document.getElementById('assunto').value.trim();
        var mensagem= document.getElementById('mensagem').value.trim();
        var hasErrors = false;

        if (!validateEmail(email)) {
            showMessage('Por favor, digite um e-mail válido antes de enviar.', 'error');
            hasErrors = true;
        }
        if (assunto.length < 10) {
            showMessage('O assunto deve ter pelo menos 10 caracteres.', 'error');
            hasErrors = true;
        }
        if (mensagem.length < 10) {
            showMessage('A mensagem deve ter pelo menos 10 caracteres.', 'error');
            hasErrors = true;
        }
        if (hasErrors) return;

        showLoading();

        var templateParams = {
            user_name:  document.getElementById('nome').value,
            user_email: email,
            subject:    assunto,
            message:    mensagem,
            to_name:    'Davi Brito',
            reply_to:   email
        };

        emailjs.send('service_mhhifmg', 'template_bt5ov3n', templateParams)
            .then(function(response) {
                console.log('Email enviado com sucesso!', response.status, response.text);
                showMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                document.getElementById('contact-form').reset();
            }, function(error) {
                console.error('Erro ao enviar email:', error);
                showMessage('Erro ao enviar mensagem. Tente novamente ou entre em contato diretamente.', 'error');
            })
            .finally(function() {
                resetButton();
            });
    });

});