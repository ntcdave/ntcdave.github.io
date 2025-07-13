// Aguarda o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do EmailJS
    emailjs.init({
        publicKey: "3UeNtj3oheb7Vckml", 
    });

    // Função para validar email
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Função para mostrar validação de email
    function showEmailValidation(isValid, message) {
        const validationElement = document.getElementById('email-validation');
        const emailInput = document.getElementById('email');
        
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

    // Função para mostrar validação de campo
    function showFieldValidation(fieldId, isValid, message) {
        const validationElement = document.getElementById(fieldId + '-validation');
        const fieldInput = document.getElementById(fieldId);
        
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

    // Validação de assunto em tempo real
    document.getElementById('assunto').addEventListener('input', function() {
        const assunto = this.value.trim();
        
        if (assunto === '') {
            showFieldValidation('assunto', true, '');
            return;
        }
        
        if (assunto.length < 10) {
            showFieldValidation('assunto', false, `Assunto deve ter pelo menos 10 caracteres (${assunto.length}/10)`);
        } else {
            showFieldValidation('assunto', true, '✓ Assunto válido');
        }
    });

    // Validação de mensagem em tempo real
    document.getElementById('mensagem').addEventListener('input', function() {
        const mensagem = this.value.trim();
        
        if (mensagem === '') {
            showFieldValidation('mensagem', true, '');
            return;
        }
        
        if (mensagem.length < 10) {
            showFieldValidation('mensagem', false, `Mensagem deve ter pelo menos 10 caracteres (${mensagem.length}/10)`);
        } else {
            showFieldValidation('mensagem', true, '✓ Mensagem válida');
        }
    });

    // Validação de email em tempo real
    document.getElementById('email').addEventListener('input', function() {
        const email = this.value.trim();
        
        if (email === '') {
            showEmailValidation(true, '');
            return;
        }
        
        if (email.length < 5) {
            showEmailValidation(false, 'E-mail deve ter pelo menos 5 caracteres');
            return;
        }
        
        if (validateEmail(email)) {
            showEmailValidation(true, '✓ E-mail válido');
        } else {
            showEmailValidation(false, '✗ Digite um e-mail válido');
        }
    });

    // Função para mostrar mensagens
    function showMessage(message, type) {
        const messageElement = document.getElementById('form-message');
        messageElement.textContent = message;
        messageElement.className = `form-message ${type} show`;
        
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 5000);
    }

    // Função para resetar o botão
    function resetButton() {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.textContent = 'Enviar Mensagem';
    }

    // Função para mostrar carregamento no botão
    function showLoading() {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        btnText.textContent = 'Enviando...';
    }

    // Event listener para o formulário
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validar todos os campos antes de enviar
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

        // Parâmetros do template de email
        const templateParams = {
            user_name: document.getElementById('nome').value,
            user_email: document.getElementById('email').value,
            subject: document.getElementById('assunto').value,
            message: document.getElementById('mensagem').value,
            to_name: 'Davi Brito', // Seu nome
            reply_to: document.getElementById('email').value
        };

        // Enviar email usando EmailJS
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

    // Validação em tempo real para todos os campos
    document.querySelectorAll('input, textarea').forEach(function(element) {
        element.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('valid');
                
                // Validações específicas
                if (this.id === 'email') {
                    const email = this.value.trim();
                    if (validateEmail(email)) {
                        showEmailValidation(true, '✓ E-mail válido');
                    } else {
                        showEmailValidation(false, '✗ Digite um e-mail válido');
                    }
                } else if (this.id === 'assunto') {
                    const assunto = this.value.trim();
                    if (assunto.length >= 10) {
                        showFieldValidation('assunto', true, '✓ Assunto válido');
                    } else {
                        showFieldValidation('assunto', false, `Assunto deve ter pelo menos 10 caracteres (${assunto.length}/10)`);
                    }
                } else if (this.id === 'mensagem') {
                    const mensagem = this.value.trim();
                    if (mensagem.length >= 10) {
                        showFieldValidation('mensagem', true, '✓ Mensagem válida');
                    } else {
                        showFieldValidation('mensagem', false, `Mensagem deve ter pelo menos 10 caracteres (${mensagem.length}/10)`);
                    }
                }
            } else {
                this.classList.remove('valid');
            }
        });
    });
});