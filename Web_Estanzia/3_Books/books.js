document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL BUSCADOR EN TIEMPO REAL ---
    const buscador = document.getElementById('inputBuscador');
    const libros = document.querySelectorAll('.tarjeta-libro');
    const bloquesGenero = document.querySelectorAll('.bloque-genero');

    buscador.addEventListener('input', (e) => {
        const termino = e.target.value.toLowerCase().trim();

        bloquesGenero.forEach(bloque => {
            let librosVisiblesEnGenero = 0;
            const librosDelBloque = bloque.querySelectorAll('.tarjeta-libro');

            librosDelBloque.forEach(libro => {
                const titulo = libro.getAttribute('data-titulo').toLowerCase();
                const autor = libro.getAttribute('data-autor').toLowerCase();

                // Si coincide el título o el autor, se muestra
                if (titulo.includes(termino) || autor.includes(termino)) {
                    libro.style.display = 'block';
                    librosVisiblesEnGenero++;
                } else {
                    libro.style.display = 'none';
                }
            });

            // Si un género se queda sin ningún libro que coincida, ocultamos la línea y el título completo del género
            if (librosVisiblesEnGenero === 0 && termino !== '') {
                bloque.style.display = 'none';
            } else {
                bloque.style.display = 'block';
            }
        });
    });


    // --- LÓGICA DEL MODAL E INSERCIÓN AUTOMÁTICA DE ARTÍCULOS ---
    const modal = document.getElementById('modalArticulo');
    const cuerpoArticulo = document.getElementById('cuerpoArticulo');
    const botonCerrar = document.getElementById('cerrarModal');

    libros.forEach(libro => {
        libro.addEventListener('click', async () => {
            const archivoHTML = libro.getAttribute('data-articulo');

            if (archivoHTML) {
                try {
                    // Petición asíncrona para leer el archivo del artículo de forma nativa
                    const respuesta = await fetch(archivoHTML);
                    if (!respuesta.ok) throw new Error('Archivo no encontrado');
                    
                    const textoHTML = await respuesta.text();
                    
                    // Inyectamos el código copiado y pegado directamente en el modal
                    cuerpoArticulo.innerHTML = textoHTML;
                    
                    // Abrimos el rectángulo suave en pantalla
                    modal.classList.add('mostrar');
                } catch (error) {
                    console.error('Error al cargar la crítica:', error);
                    cuerpoArticulo.innerHTML = `<p style="color:red;">Error: No se pudo cargar el artículo "${archivoHTML}". Asegúrate de que el archivo existe en la misma carpeta.</p>`;
                    modal.classList.add('mostrar');
                }
            }
        });
    });

    // Cerrar el modal al pulsar la 'X'
    botonCerrar.addEventListener('click', () => {
        modal.classList.remove('mostrar');
        cuerpoArticulo.innerHTML = ''; // Limpiamos contenido
    });

    // Cerrar el modal si el usuario hace click fuera del rectángulo blanco
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('mostrar');
            cuerpoArticulo.innerHTML = '';
        }
    });
});