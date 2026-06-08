document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOTOR DE BÚSQUEDA POR TÍTULO ---
    const buscador = document.getElementById('buscadorDeportes');
    const posts = document.querySelectorAll('.tarjeta-post');

    buscador.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase().trim();

        posts.forEach(post => {
            const titulo = post.getAttribute('data-titulo').toLowerCase();

            // Oculta o muestra la tarjeta completa en función de la búsqueda
            if (titulo.includes(termino)) {
                post.style.display = 'flex';
            } else {
                post.style.display = 'none';
            }
        });
    });

    // --- 2. MECÁNICA DEL CARRUSEL DE DIAPOSITIVAS ---
    const carruseles = document.querySelectorAll('.carrusel-instagram');

    carruseles.forEach(carrusel => {
        const carrete = carrusel.querySelector('.carrete-post');
        const diapositivas = carrusel.querySelectorAll('.carrete-post img');
        const btnSiguiente = carrusel.querySelector('.btn-post-siguiente');
        
        let indiceActual = 0;
        const totalDiapositivas = diapositivas.length;

        btnSiguiente.addEventListener('click', () => {
            // Avanza al siguiente índice de imagen; si llega al final, regresa a la primera (0)
            indiceActual = (indiceActual + 1) % totalDiapositivas;
            
            // Aplica el desplazamiento horizontal en base a porcentajes
            const desplazamiento = indiceActual * -100;
            carrete.style.transform = `translateX(${desplazamiento}%)`;
        });
    });

});