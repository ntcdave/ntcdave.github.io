// Aguarda o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', function() {


    // 2. STICKY HEADER
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. SCROLL REVEAL ANIMATIONS
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

    // 4. FORM VALIDATION & SUBMISSION CODE
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
            if (assunto === '') {
                showFieldValidation('assunto', true, '');
                return;
            }
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
            if (mensagem === '') {
                showFieldValidation('mensagem', true, '');
                return;
            }
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
            if (email === '') {
                showEmailValidation(true, '');
                return;
            }
            if (email.length < 5) {
                showEmailValidation(false, 'E-mail muito curto');
                return;
            }
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
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 5000);
    }

    function resetButton() {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        if(!submitBtn || !btnText) return;
        
        submitBtn.disabled = false;
        btnText.textContent = 'Enviar Mensagem';
    }

    function showLoading() {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        if(!submitBtn || !btnText) return;
        
        submitBtn.disabled = true;
        btnText.textContent = 'Enviando...';
    }

    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            let hasErrors = false;
            
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
            
            if (hasErrors) {
                return;
            }
            
            showLoading();

            const nome = document.getElementById('nome').value.trim();

            const whatsappMessage = `Olá Davi, vi seu portfólio e gostaria de falar do meu projeto!
*Nome:* ${nome}
*E-mail:* ${email}
*Assunto:* ${assunto}

*Mensagem:*
${mensagem}`;

            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/5568992475139?text=${encodedMessage}`;

            // Abre o WhatsApp em uma nova aba
            window.open(whatsappUrl, '_blank');

            // Feedback visual e limpeza
            showMessage('Redirecionando para o seu WhatsApp...', 'success');
            document.getElementById('contact-form').reset();
            resetButton();
        });
    }
});