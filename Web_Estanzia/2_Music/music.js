document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DEL DOM ---
    const menuLateral = document.getElementById('menuLateral');
    const btnDesplegar = document.getElementById('btnDesplegar');
    const iconoFlecha = document.getElementById('iconoFlecha');
    const buscador = document.getElementById('buscadorMusica');
    const listaAlbumes = document.getElementById('listaAlbumes');
    const itemsAlbum = document.querySelectorAll('.item-album');

    const tituloAlbumActivo = document.getElementById('tituloAlbumActivo');
    const vinilo = document.getElementById('viniloElemento');
    const centroVinilo = document.getElementById('centroVinilo');
    const brazo = document.getElementById('brazoElemento');
    const btnMasInfo = document.getElementById('btnMasInfo');
    const enlaceEscucha = document.getElementById('enlaceEscucha');

    const modal = document.getElementById('modalMusica');
    const cuerpoArticulo = document.getElementById('cuerpoArticuloMusica');
    const botonCerrarModal = document.getElementById('cerrarModalMusica');

    let articuloUrlActivo = ""; // Almacena el html del álbum seleccionado

    // --- 1. DESPLEGAR / RECOGER MENÚ ---
    btnDesplegar.addEventListener('click', () => {
        menuLateral.classList.toggle('abierto');
        
        // Cambia la flecha de dirección según el estado
        if (menuLateral.classList.contains('abierto')) {
            iconoFlecha.className = 'fas fa-chevron-right';
        } else {
            iconoFlecha.className = 'fas fa-chevron-left';
        }
    });

    // --- 2. BUSCADOR SIMULTÁNEO (TÍTULO Y GÉNERO) ---
    buscador.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase().trim();

        itemsAlbum.forEach(item => {
            const titulo = item.getAttribute('data-titulo').toLowerCase();
            const genero = item.getAttribute('data-genero').toLowerCase();

            if (titulo.includes(termino) || genero.includes(termino)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // --- 3. SELECCIÓN DE ÁLBUM (MECÁNICA DEL TOCADISCOS) ---
    itemsAlbum.forEach(item => {
        item.addEventListener('click', () => {
            // Extraer metadatos del elemento pulsado
            const titulo = item.getAttribute('data-titulo');
            const portadaUrl = item.getAttribute('data-portada');
            const linkStreaming = item.getAttribute('data-link');
            articuloUrlActivo = item.getAttribute('data-articulo');

            // Resetear animaciones para reiniciarlas fluidamente
            vinilo.classList.remove('girando');
            brazo.classList.remove('activo');

            // Intercambiar datos en el tocadiscos (Cerrar menú en un breve delay)
            setTimeout(() => {
                tituloAlbumActivo.textContent = titulo;
                centroVinilo.style.backgroundImage = `url('${portadaUrl}')`;
                
                // Mover brazo e iniciar giro de disco
                brazo.classList.add('activo');
                vinilo.classList.add('girando');

                // Activar botón de información y el link de streaming
                btnMasInfo.disabled = false;
                enlaceEscucha.href = linkStreaming;
                enlaceEscucha.classList.remove('desactivado');

                // Cerrar menú automáticamente tras elegir
                menuLateral.classList.remove('abierto');
                iconoFlecha.className = 'fas fa-chevron-left';
            }, 150);
        });
    });

    // --- 4. INYECCIÓN DEL WORD -> HTML (MODAL DE MÁS INFO) ---
    btnMasInfo.addEventListener('click', async () => {
        if (!articuloUrlActivo) return;

        try {
            const respuesta = await fetch(articuloUrlActivo);
            if (!respuesta.ok) throw new Error('Archivo de artículo no localizado.');
            
            const htmlTexto = await respuesta.text();
            cuerpoArticulo.innerHTML = htmlTexto;
            modal.classList.add('mostrar');
        } catch (error) {
            console.error(error);
            cuerpoArticulo.innerHTML = `<p style="color:red; font-weight:bold;">Error: El archivo "${articuloUrlActivo}" no se encuentra en el directorio raíz.</p>`;
            modal.classList.add('mostrar');
        }
    });

    // Cerrar Modal
    botonCerrarModal.addEventListener('click', () => {
        modal.classList.remove('mostrar');
        cuerpoArticulo.innerHTML = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('mostrar');
            cuerpoArticulo.innerHTML = '';
        }
    });
});