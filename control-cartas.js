class CardComponent {
    constructor(cardId, buttonId) {
        this.cardId = cardId;
        this.buttonId = buttonId;
        this.init();
    }

    init() {
        const button = document.getElementById(this.buttonId);

        // Crear y añadir dinámicamente las imágenes al botón
        const imgOn = document.createElement('img');
        imgOn.src = './img/toggle-on.svg';
        imgOn.classList.add('hidden'); // Inicia oculto

        const imgOff = document.createElement('img');
        imgOff.src = './img/toggle-off.svg';

        button.appendChild(imgOn);
        button.appendChild(imgOff);

        button.addEventListener('click', () => {
            this.toggleVisibility();
            this.toggleButtonImages(button);
        });
    }

    toggleVisibility() {
        const element = document.getElementById(this.cardId);
        element.classList.toggle('hidden');
    }

    toggleButtonImages(button) {
        const images = button.querySelectorAll('img');
        images.forEach(img => {
            img.classList.toggle('hidden');
        });
    }
}