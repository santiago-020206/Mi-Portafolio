/**
 * PORTAFOLIO SANTIAGO GARCÍA
 * Archivo principal de JavaScript
 * Requisitos: ES6+, sin jQuery, validaciones, animaciones, manejo de DOM.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MODO OSCURO / CLARO ---
    const htmlElement = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Revisar preferencia guardada
    const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('portfolioTheme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('bi-moon-stars-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-stars-fill');
        }
    }

    // --- 2. MENSAJE DE BIENVENIDA (TOAST) ---
    // Se muestra solo si es la primera vez en la sesión
    if (!sessionStorage.getItem('welcomeShown')) {
        const welcomeToastEl = document.getElementById('welcomeToast');
        const welcomeToast = new bootstrap.Toast(welcomeToastEl, { delay: 5000 });
        welcomeToast.show();
        sessionStorage.setItem('welcomeShown', 'true');
    }

    // --- 3. AÑO AUTOMÁTICO EN EL FOOTER ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 4. INICIALIZAR TOOLTIPS ---
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // --- 5. SCROLL SUAVE Y CIERRE AUTOMÁTICO DEL MENÚ RESPONSIVE ---
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarNav');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Cierre del menú móvil al hacer clic
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }

            // Scroll suave (comportamiento nativo css scroll-behavior no siempre funciona bien con fixed-top)
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 6. ANIMACIONES AL HACER SCROLL (REVEAL & PROGRESS BARS) ---
    const revealElements = document.querySelectorAll('.reveal');
    const progressBars = document.querySelectorAll('.progress-bar');

    const scrollObserverOptions = {
        root: null,
        threshold: 0.15, // Ejecuta cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar aparición del contenedor
                entry.target.classList.add('active');
                
                // Si el contenedor tiene barras de progreso, animarlas
                const bars = entry.target.querySelectorAll('.progress-bar');
                bars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                });

                // Dejar de observar el elemento una vez animado
                observer.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    revealElements.forEach(el => scrollObserver.observe(el));

    // --- 7. BOTÓN VOLVER ARRIBA ---
    const backToTopBtn = document.getElementById('btn-back-to-top');
    
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- 8. VALIDACIÓN DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que la página recargue siempre
            
            if (!contactForm.checkValidity()) {
                event.stopPropagation();
                contactForm.classList.add('was-validated');
            } else {
                // Simulación de envío exitoso
                contactForm.classList.remove('was-validated');
                
                // Mostrar Toast de éxito
                const formToastEl = document.getElementById('formToast');
                const formToast = new bootstrap.Toast(formToastEl);
                formToast.show();
                
                // Limpiar formulario
                contactForm.reset();
            }
        }, false);
    }
});