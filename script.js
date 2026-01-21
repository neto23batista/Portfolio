// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Inicializar EmailJS
(function () {
    emailjs.init('-6k34mdOcWSzYRYEq');
})();

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitButton = e.target.querySelector('button[type="submit"]');

    // Desabilitar o botão durante o envio
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    // Parâmetros para o template do EmailJS
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'joaofrazao054@gmail.com'
    };

    // Enviar email usando EmailJS
    emailjs.send('service_q3tog74', 'template_p3dzdi5', templateParams)
        .then(function (response) {
            console.log('Email enviado com sucesso!', response.status, response.text);
            alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
            document.getElementById('contactForm').reset();
        }, function (error) {
            console.error('Erro ao enviar email:', error);
            alert('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.');
        })
        .finally(function () {
            // Reabilitar o botão
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensagem';
        });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards (tanto os cards de tipo quanto os cards reais)
document.querySelectorAll('.project-card, .real-project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Add click animation to project type cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function () {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(-10px)';
        }, 150);
    });
});

// Floating animation for hero image
const profileImg = document.querySelector('.profile-img');
let floatDirection = 1;
setInterval(() => {
    const currentTransform = profileImg.style.transform || 'translateY(0px)';
    const currentY = parseInt(currentTransform.match(/-?\d+/) || [0])[0];

    if (currentY >= 10) floatDirection = -1;
    if (currentY <= -10) floatDirection = 1;

    profileImg.style.transform = `translateY(${currentY + floatDirection * 0.5}px)`;
}, 100);