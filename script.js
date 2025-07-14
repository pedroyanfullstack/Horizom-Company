document.addEventListener('DOMContentLoaded', function () {
    const reveals = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(section => {
        observer.observe(section);
    });

    // Resto do script principal aqui:
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu-container');
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const themeOptions = document.querySelectorAll('.theme-options button');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(savedTheme);

    menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        this.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            menuToggle.textContent = '☰';
        });
    });

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

    document.querySelectorAll('.theme-toggle i').forEach(icon => {
        icon.className = body.classList.contains('light')
            ? 'fa-solid fa-sun'
            : 'fa-solid fa-moon';
    });
    const fadeElements = document.querySelectorAll('.fade-in');

    function handleFadeIn() {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50 && rect.bottom > 100) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', handleFadeIn);
    window.addEventListener('load', handleFadeIn);
    document.addEventListener('DOMContentLoaded', () => {
        const fadeEls = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.15
        });

        fadeEls.forEach(el => observer.observe(el));
    });

});

