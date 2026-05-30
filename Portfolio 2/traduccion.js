// Diccionario de idiomas
const translations = {
    es: {
        // Navegación
        "nav-about": "Sobre mí",
        "nav-experience": "Experiencia",
        "nav-projects": "Proyectos",
        "nav-contact": "Contacto",
        
        // Página 1: Contacto
        "contact-p1": "¡Hola! Me alegro que estés interesado en mi contacto. Si crees que puedo encajar en tu equipo o proyecto no dudes en escribirme vía LinkedIn o Gmail.",
        "contact-p2": "Tú pones la idea, y yo pongo el conocimiento en marcha ;)",
        "contact-btn-cv": "Descargar CV",
        "gmail-btn": "Contactar por Gmail",
        
        // Página 2: Proyectos
        "search-placeholder": "Busca por tecnología (ej. #React, #CSS)...",
        "project1-text": " Aplicación web que através de APIs crea tablas informativas sobre el valor de las monedas en diferentes épocas del año y diferentes rangos.",
        "project2-text": "Aplicación web que a través de API es capaz de dibujar un mapa de las regiones de Finlandia además de asociar a cada una de ellas información sobre la migración. Notas: Se observan flujos de migración positiva en regiones turísticas o de gran actividad económica. Se despoblan regiones aisladas o de duras condiciones climáticas.",
        
        // Página 3: Experiencia
        "exp-p1": "Asimilé los conceptos de ingeniería de software gracias a los profesionales de la UPM, proyectos personales y aprendizaje autodidacta a través de plataformas certificadas.",
        "exp-p2": "Durante mis estudios, me centré en pulir no solamente mis habilidades programáticas, o aquellas en relación a la ingeniería de software, sino que también me centré en trabajar mis \"soft skills\" para el debido desarrollo de proyectos. Con saber programar, no basta para este sector.",
        "exp-p3": "Como consecuencia, acabé realizando un intercambio en el extranjero en colaboración con la universidad finesa de Lappeenrannan-Lahti teknillinen yliopisto (LUT), donde puliría mis habilidades profesionales en inglés y fundamentos de francés junto a la adaptación de entornos internacionales para el desarrollo de proyectos en común.",
        "exp-p4": "Completé mis estudios de Bachillerato en el IES Isaac Peral, instituto de innovación tecnológica y bilingüe de la Comunidad de Madrid. Durante mis estudios desarrollé una curiosidad por el proceso de ingeniería a nivel general, y en específico por las TIC.",
    
        // Página 4: Sobre mi
        "about-greeting": "¡Hola! 👋",
        "about-name": "Soy Alejandro",
        "about-title": "Estudiante de Ingeniería de Software en la UPM",
        "about-tech-intro": "Las tecnologías que domino son las siguientes:",
        "about-goal": "Mi objetivo es ayudarte a traer a la realidad tus ideas de app",
        "about-future": "Mi objetivo es especializarme en Cloud Application Development",
        
    },
    en: {
        // Navigation
        "nav-about": "About Me",
        "nav-experience": "Experience",
        "nav-projects": "Projects",
        "nav-contact": "Contact",
        
        // Page 1: Contact
        "contact-p1": "Hi! I'm glad you are interested in contacting me. If you think I can fit into your team or project, feel free to write to me via LinkedIn or Gmail.",
        "contact-p2": "You bring the idea, and I put the knowledge into action ;)",
        "contact-btn-cv": "Download CV",
        "gmail-btn": "Contact through Gmail",
        
        // Page 2: Projects
        "search-placeholder": "Search by technology (e.g., #React, #CSS)...",
        "project1-text": "Web application that uses APIs to create informative tables about currency values during different times of the year and across various ranges.",
        "project2-text": "Web application that uses an API to draw a map of Finland's regions, while also associating migration data with each of them. Notes: Positive migration flows are observed in tourist regions or areas with high economic activity. Isolated regions or those with harsh climate conditions are experiencing depopulation.",
        
        // Page 3: Experience
        "exp-p1": "I absorbed software engineering concepts thanks to UPM professionals, personal projects, and self-taught learning through certified platforms.",
        "exp-p2": "During my studies, I focused on polishing not only my programming or software engineering skills, but also my soft skills for proper project development. Knowing how to code is not enough in this industry.",
        "exp-p3": "As a result, I ended up doing a study abroad exchange in collaboration with the Finnish university Lappeenrannan-Lahti teknillinen yliopisto (LUT), where I polished my professional skills in English and basics of French, along with adapting to international environments for joint project development.",
        "exp-p4": "I completed my High School studies at IES Isaac Peral, a technological innovation and bilingual institute in the Community of Madrid. During my studies, I developed a curiosity for the engineering process in general, and specifically for ICT.",

        //Page 4: About Me
        "about-greeting": "Hi there! 👋",
        "about-name": "I'm Alejandro",
        "about-title": "Software Engineering Student at UPM",
        "about-tech-intro": "The technologies I master are the following:",
        "about-goal": "My goal is to help you bring your app ideas into reality",
        "about-future": "I am currently aiming to specialize in Cloud Application Development",
    }
};

// Función principal para aplicar la traducción
function applyTranslations(lang) {
    // 1. Traducir elementos de texto normales
    const translateElements = document.querySelectorAll('[data-translate]');
    translateElements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // 2. Traducir placeholders de inputs (como la barra de búsqueda)
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });
    
    // Guardar la preferencia del usuario
    localStorage.setItem('preferredLang', lang);
}

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    // Detectar idioma guardado, o por defecto inglés ('en')
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    const langToggle = document.getElementById('langToggle');

    // Sincronizar el estado del checkbox visualmente si existe en la página actual
    if (langToggle) {
        langToggle.checked = (savedLang === 'en');
        
        // Escuchar cambios en el interruptor
        langToggle.addEventListener('change', (e) => {
            const newLang = e.target.checked ? 'en' : 'es';
            applyTranslations(newLang);
        });
    }

    // Aplicar la traducción correspondiente al entrar a la página
    applyTranslations(savedLang);
});