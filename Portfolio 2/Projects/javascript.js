// Esperamos a que todo el HTML esté cargado antes de ejecutar la lógica
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos el input del buscador
    const searchInput = document.getElementById('searchTech');

    // Comprobamos que el buscador exista en esta página para evitar errores
    if (searchInput) {
        // Añadimos el evento que "escucha" cada vez que escribes
        searchInput.addEventListener('input', function() {
            
            // Convertimos el texto a minúsculas
            const searchTerm = searchInput.value.toLowerCase();
            
            // Seleccionamos todos los bloques de proyectos
            const projects = document.querySelectorAll('.project-wrapper');

            // Filtramos cada proyecto
            projects.forEach(function(wrapper) {
                // Sacamos el texto de las etiquetas de ese proyecto
                const tags = wrapper.querySelector('.project-tags').textContent.toLowerCase();

                // Mostramos u ocultamos según coincida
                if (tags.includes(searchTerm)) {
                    wrapper.style.display = 'block'; 
                } else {
                    wrapper.style.display = 'none';  
                }
            });
        });
    }
});