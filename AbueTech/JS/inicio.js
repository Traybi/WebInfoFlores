// Variables globales para accesibilidad
let textSizeLevel = 0; // 0 = normal, 1 = large, 2 = extra-large
let highContrastEnabled = false;
let speechSynthesis = window.speechSynthesis;

// Toggle menú móvil
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const isOpen = menu.classList.contains('active');
    
    menu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', !isOpen);
    hamburger.innerHTML = isOpen ? '☰' : '✕';
}

// Alto contraste
function toggleHighContrast() {
    const body = document.body;
    const btn = document.getElementById('contrast-btn');
    
    highContrastEnabled = !highContrastEnabled;
    body.classList.toggle('high-contrast', highContrastEnabled);
    btn.classList.toggle('active', highContrastEnabled);
    btn.innerHTML = highContrastEnabled ? '🔅 Contraste normal' : '🔆 Alto contraste';
    
    // Guardar preferencia
    localStorage.setItem('highContrast', highContrastEnabled);
}

// Aumentar tamaño de texto
function increaseTextSize() {
    if (textSizeLevel < 2) {
textSizeLevel++;
updateTextSize();
    }
}

// Reducir tamaño de texto
function decreaseTextSize() {
    if (textSizeLevel > 0) {
textSizeLevel--;
updateTextSize();
    }
}

// Actualizar tamaño de texto
function updateTextSize() {
    const body = document.body;
    body.classList.remove('large-text', 'extra-large-text');
    
    if (textSizeLevel === 1) {
body.classList.add('large-text');
    } else if (textSizeLevel === 2) {
body.classList.add('extra-large-text');
    }
    
    // Guardar preferencia
    localStorage.setItem('textSize', textSizeLevel);
}

// Función de lectura en voz alta
function speakText() {
    if (speechSynthesis.speaking) {
speechSynthesis.cancel();
return;
    }

    const textToRead = `
Bienvenido a AbueTech punto com. 
Tecnología sin miedo. Apréndela paso a paso.
Te acompañamos en tu aventura tecnológica con paciencia, cariño y explicaciones claras que realmente entiendas.

Puedes aprender a usar tu celular, hacer videollamadas con tus nietos, y mantener tu seguridad online sin complicaciones.

Para más información, explora nuestras guías paso a paso y cursos.
    `;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.8; // Velocidad más lenta
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    // Intentar usar una voz en español
    const voices = speechSynthesis.getVoices();
    const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
    if (spanishVoice) {
utterance.voice = spanishVoice;
    }
    
    speechSynthesis.speak(utterance);
}

// Suscripción al newsletter
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Simulación de suscripción exitosa
    alert(`¡Gracias! Te has suscrito exitosamente con el email: ${email}\n\nRecibirás nuestras guías cada semana en tu correo.`);
    event.target.reset();
}

// Envío del formulario de contacto
function submitContact(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    alert(`Gracias, ${name}! Hemos recibido tu mensaje y te responderemos pronto al correo: ${email}`);
    form.reset();
}

// Animaciones al hacer scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
const elementTop = element.getBoundingClientRect().top;

if (elementTop < windowHeight - 50) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}
    });
}

// Cargar preferencias guardadas
function loadPreferences() {
    // Cargar alto contraste
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    if (savedHighContrast) {
toggleHighContrast();
    }
    
    // Cargar tamaño de texto
    const savedTextSize = parseInt(localStorage.getItem('textSize')) || 0;
    textSizeLevel = savedTextSize;
    updateTextSize();
}

// Navegación suave
function smoothScroll() {
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
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    loadPreferences();
    smoothScroll();
    
    // Configurar animaciones iniciales
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
element.style.opacity = '0';
element.style.transform = 'translateY(30px)';
element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Trigger inicial de animaciones
    setTimeout(handleScrollAnimations, 100);
});

// Listener para scroll
window.addEventListener('scroll', handleScrollAnimations);

// Cargar voces para text-to-speech
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = function() {
// Las voces están cargadas
    };
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const menu = document.getElementById('nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (menu.classList.contains('active') && 
!menu.contains(event.target) && 
!hamburger.contains(event.target)) {
toggleMenu();
    }
});

// Soporte para teclado en el menú
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
const menu = document.getElementById('nav-menu');
if (menu.classList.contains('active')) {
    toggleMenu();
}
    }
});

// Procesar pago simulado
function processPayment(event) {
    event.preventDefault();
    const form = event.target;
    const params = new URLSearchParams(window.location.search);
    const course = params.get('course');
    const name = form.querySelector('input[name="name"]').value;
    alert(`\u00a1Gracias, ${name}! Tu pago se ha realizado correctamente.`);
    if (course) {
        window.location.href = course;
    } else {
        form.reset();
    }
}
