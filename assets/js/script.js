document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       1. ELEMENTE
    ───────────────────────────────────────── */
    const header    = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');
    const navItems  = document.querySelectorAll('.nav-links a');
    const rootEl    = document.documentElement;

    function updateHeaderOffset(){
        if(!header) return;
        rootEl.style.setProperty('--header-offset', header.offsetHeight + 'px');
        // Also compute a "scrolled" offset for sticky elements like the restaurant menu nav
        // When scrolled, the header shrinks (smaller logo), so we need a smaller top value
        const scrolled = header.classList.contains('scrolled');
        if (scrolled) {
            rootEl.style.setProperty('--header-offset-scrolled', header.offsetHeight + 'px');
        } else {
            // Estimate scrolled height (header shrinks ~30% when scrolled)
            const estimated = Math.round(header.offsetHeight * 0.7);
            rootEl.style.setProperty('--header-offset-scrolled', estimated + 'px');
        }
    }

    /* Cream overlay-ul dinamic si il adaugam in <body> */
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    updateHeaderOffset();
    window.addEventListener('resize', updateHeaderOffset);


    /* ─────────────────────────────────────────
       2. DESCHIDE / INCHIDE MENIU MOBIL
    ───────────────────────────────────────── */
    function openMenu() {
        navLinks.classList.add('active');
        hamburger.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        navLinks.classList.contains('active') ? closeMenu() : openMenu();
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);


    /* ─────────────────────────────────────────
       3. INCHIDE LA CLICK PE OVERLAY
    ───────────────────────────────────────── */
    overlay.addEventListener('click', closeMenu);


    /* ─────────────────────────────────────────
       4. INCHIDE LA CLICK PE UN LINK
    ───────────────────────────────────────── */
    navItems.forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });


    /* ─────────────────────────────────────────
       5. INCHIDE LA ESC
    ───────────────────────────────────────── */
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMenu();
    });


    /* ─────────────────────────────────────────
       6. STICKY HEADER + SCROLL DIRECTION
    ───────────────────────────────────────── */
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        header.classList.toggle('scrolled', currentScroll > 50);

        // Recalculate offset after scrolled class changes
        updateHeaderOffset();

        if (window.innerWidth <= 1024) {
            if (currentScroll > lastScroll && currentScroll > 120) {
                header.classList.add('hidden');
                // Header e ascuns → sticky nav trebuie să urce la top: 0
                rootEl.style.setProperty('--header-offset-scrolled', '0px');
            } else {
                header.classList.remove('hidden');
                // Header e vizibil → recalculăm offset-ul real
                updateHeaderOffset();
            }
        }

        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });


    /* ─────────────────────────────────────────
       7. LINK ACTIV automat dupa sectiunea vizibila
    ───────────────────────────────────────── */
    const sections = document.querySelectorAll('section[id]');

    if (sections.length > 0) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        }, { threshold: 0.45 });

        sections.forEach(s => sectionObserver.observe(s));
    }


    /* ─────────────────────────────────────────
       8. SMOOTH SCROLL pentru anchor-uri interne
    ───────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = header ? header.offsetHeight + 12 : 80;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });


    /* ─────────────────────────────────────────
       9. RESIZE — inchide meniu daca se mareste fereastra
    ───────────────────────────────────────── */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) closeMenu();
    }, { passive: true });


    /* ─────────────────────────────────────────
       10. WHATSAPP FORM HANDLER
       Trimite datele din formulare direct pe WhatsApp
    ───────────────────────────────────────── */
    const WA_NUMBER = '40799597083';

    document.querySelectorAll('.js-wa-lead').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const leadType = this.dataset.leadType || 'general';
            const formData = new FormData(this);
            const data = {};

            formData.forEach((value, key) => {
                if (value.trim()) data[key] = value.trim();
            });

            // Build WhatsApp message based on lead type
            let message = 'Bună ziua! ';

            if (leadType === 'eveniment') {
                message += 'Doresc o ofertă pentru organizarea unui eveniment la Conca Verde.\n\n';
                if (data.name) message += '👤 Nume: ' + data.name + '\n';
                if (data.phone) message += '📞 Telefon: ' + data.phone + '\n';
                if (data.eventType) message += '🎉 Tip: ' + data.eventType + '\n';
                if (data.date) message += '📅 Dată: ' + data.date + '\n';
                if (data.guests) message += '👥 Persoane: ' + data.guests + '\n';
            } else if (leadType === 'contact') {
                message += 'Am un mesaj pentru Conca Verde.\n\n';
                if (data.name) message += '👤 Nume: ' + data.name + '\n';
                if (data.phone) message += '📞 Telefon: ' + data.phone + '\n';
                if (data.message) message += '💬 Mesaj: ' + data.message + '\n';
            } else if (leadType === 'corporate') {
                message += 'Doresc o ofertă corporate la Conca Verde.\n\n';
                if (data.name) message += '👤 Nume: ' + data.name + '\n';
                if (data.company) message += '🏢 Companie: ' + data.company + '\n';
                if (data.phone) message += '📞 Telefon: ' + data.phone + '\n';
                if (data.email) message += '✉️ Email: ' + data.email + '\n';
                if (data.eventType) message += '📋 Tip: ' + data.eventType + '\n';
                if (data.guests) message += '👥 Persoane: ' + data.guests + '\n';
                if (data.date) message += '📅 Dată: ' + data.date + '\n';
                if (data.details) message += '💬 Detalii: ' + data.details + '\n';
            } else {
                message += 'Am o solicitare.\n\n';
                Object.entries(data).forEach(([key, val]) => {
                    message += key + ': ' + val + '\n';
                });
            }

            message += '\nMulțumesc!';

            // Show success message
            const successEl = this.closest('.form-container, div')?.querySelector('.contact-success');
            if (successEl) {
                successEl.style.display = 'block';
            }

            // Open WhatsApp
            const waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
            
            setTimeout(() => {
                window.open(waUrl, '_blank');
            }, 400);
        });
    });


    /* ─────────────────────────────────────────
       11. REVEAL ANIMATIONS (Intersection Observer)
    ───────────────────────────────────────── */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(el => revealObserver.observe(el));
    }


    /* ─────────────────────────────────────────
       12. ROOM IMAGE CAROUSEL
       Săgeți stânga/dreapta + dots + swipe mobil
    ───────────────────────────────────────── */
    document.querySelectorAll('.room-carousel').forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.carousel-dots .dot');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let current = 0;
        const total = slides.length;

        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = index;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goTo(i));
        });

        // Touch swipe support
        let touchStartX = 0;
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 40) {
                goTo(diff > 0 ? current + 1 : current - 1);
            }
        }, { passive: true });
    });

});

/* ========================================
   FAQ ACCORDION
   Adaugă la sfârșitul fișierului assets/js/script.js
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            faqQuestions.forEach(function(q) {
                q.setAttribute('aria-expanded', 'false');
                q.nextElementSibling.classList.remove('open');
            });
            
            // Toggle current
            if (!isOpen) {
                this.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            }
        });
    });
});