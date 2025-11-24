document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const triggers = document.querySelectorAll('.cta-trigger');
    const closeBtn = document.querySelector('.close-modal');

    // Open Modal
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close on Outside Click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
