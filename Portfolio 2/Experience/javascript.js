document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos todos los botones de la línea de tiempo
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            // Alternamos la clase activa en el botón (para rotar la flecha y estilos)
            this.classList.toggle('active');
            
            // Seleccionamos el panel de texto que va justo después del botón
            const contentPanel = this.nextElementSibling;
            
            // Si ya está abierto, lo cerramos
            if (contentPanel.style.maxHeight) {
                contentPanel.style.maxHeight = null;
            } else {
                // Si está cerrado, calculamos su altura real en píxeles y se la aplicamos
                contentPanel.style.maxHeight = contentPanel.scrollHeight + "px";
            }
        });
    });
});