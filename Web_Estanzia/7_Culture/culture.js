document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS GENERALES ---
    const buscador = document.getElementById('buscadorDeportes');
    const carreteGlobal = document.getElementById('carreteGlobal');
    const btnColeccionPrev = document.getElementById('btnColeccionPrev');
    const btnColeccionSig = document.getElementById('btnColeccionSig');
    
    let tarjetasVivas = Array.from(document.querySelectorAll('.tarjeta-vertical'));
    let indiceGlobal = 0;

    // --- FUNCIÓN REDIBUJAR SLIDER DE COLECCIÓN ---
    function actualizarPosicionGlobal() {
        if (tarjetasVivas.length === 0) return;
        const desplazamiento = indiceGlobal * -100;
        carreteGlobal.style.transform = `translateX(${desplazamiento}%)`;
    }

    // --- 1. NAVEGACIÓN ENTRE TARJETAS VERTICALES ---
    btnColeccionSig.addEventListener('click', () => {
        if (tarjetasVivas.length === 0) return;
        indiceGlobal = (indiceGlobal + 1) % tarjetasVivas.length;
        actualizarPosicionGlobal();
    });

    btnColeccionPrev.addEventListener('click', () => {
        if (tarjetasVivas.length === 0) return;
        indiceGlobal = (indiceGlobal - 1 + tarjetasVivas.length) % tarjetasVivas.length;
        actualizarPosicionGlobal();
    });

    // --- 2. FILTRADO INTELIGENTE DESDE EL BUSCADOR ---
    buscador.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase().trim();
        const todasLasTarjetas = document.querySelectorAll('.tarjeta-vertical');

        todasLasTarjetas.forEach(tarjeta => {
            const titulo = tarjeta.getAttribute('data-titulo').toLowerCase();
            
            if (titulo.includes(termino)) {
                tarjeta.style.display = 'flex';
            } else {
                tarjeta.style.display = 'none';
            }
        });

        tarjetasVivas = Array.from(document.querySelectorAll('.tarjeta-vertical')).filter(t => t.style.display !== 'none');
        indiceGlobal = 0; 
        actualizarPosicionGlobal();
    });

    // --- 3. MECÁNICA DE DIAPOSITIVAS DE TEXTO INTERNAS ---
    document.body.addEventListener('click', (e) => {
        const botonPlay = e.target.closest('.btn-post-siguiente');
        if (!botonPlay) return;

        const carrusel = botonPlay.closest('.carrusel-instagram');
        const carreteInterno = carrusel.querySelector('.carrete-post');
        const diapositivas = carrusel.querySelectorAll('.diapositiva-documento');
        
        let indiceInterno = parseInt(carrusel.dataset.indiceInterno || '0', 10);
        
        indiceInterno = (indiceInterno + 1) % diapositivas.length;
        carrusel.dataset.indiceInterno = indiceInterno;

        const desplazarInterno = indiceInterno * -100;
        carreteInterno.style.transform = `translateX(${desplazarInterno}%)`;
    });

});