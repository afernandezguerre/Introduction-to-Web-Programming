document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos el botón de descarga por su ID
    const downloadBtn = document.getElementById('downloadBtn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            
            // Guardamos el texto original
            const originalText = this.textContent;
            
            // Cambiamos el estilo y el texto temporalmente para simular feedback
            this.textContent = "¡Abriendo CV! 📄";
            this.style.backgroundColor = "#28a745"; // Cambia a verde éxito
            
            // Tras 2.5 segundos, devolvemos el botón a su estado original
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = ""; // Restaura el azul del CSS
            }, 2500);
        });
    }
});