// Aguarda o DOM estar totalmente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização do EmailJS
    emailjs.init({
        publicKey: "3UeNtj3oheb7Vckml", 
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

    // Validação em tempo real
    document.querySelectorAll('input, textarea').forEach(function(element) {
        element.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
            }
        });
    });
});