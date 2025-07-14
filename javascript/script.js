
document.addEventListener('DOMContentLoaded', function () {
    // Elementos do DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu-container');
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const themeOptions = document.querySelectorAll('.theme-options button');
    const body = document.body;

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(savedTheme);

    // Menu Mobile
    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        this.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
    });

    // Fechar menu ao clicar nos links
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });

    // Theme Switcher
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = toggle.closest('.theme-dropdown, .desktop-theme-dropdown');
            dropdown.querySelector('.theme-options').classList.toggle('show');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.theme-dropdown') && !e.target.closest('.desktop-theme-dropdown')) {
            document.querySelectorAll('.theme-options').forEach(options => {
                options.classList.remove('show');
            });
        }
    });

    themeOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            body.className = option.dataset.theme;
            localStorage.setItem('theme', option.dataset.theme);

            // Atualiza os ícones dos toggles
            document.querySelectorAll('.theme-toggle i').forEach(icon => {
                icon.className = body.classList.contains('light')
                    ? 'fa-solid fa-sun'
                    : 'fa-solid fa-moon';
            });

            document.querySelectorAll('.theme-options').forEach(options => {
                options.classList.remove('show');
            });
        });
    });

    // Inicializa os ícones corretamente
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
        icon.className = body.classList.contains('light')
            ? 'fa-solid fa-sun'
            : 'fa-solid fa-moon';
    });
});