/* ═══════════════════════════════════════════════
   CONCA VERDE — Newsletter Popup + Lead Capture
   Fișier autonom: include pe orice pagină cu:
   <script src="assets/js/newsletter-popup.js"></script>
   ═══════════════════════════════════════════════ */

(function(){
    'use strict';

    // CONFIG
    var DELAY_SECONDS = 8;
    var SCROLL_TRIGGER = 35;
    var COOKIE_DAYS = 7;
    var WA_NUMBER = '40799597083';
    var EMAIL_TO = 'receptie@conca-verde.ro';

    // Nu afișa dacă deja a fost închis recent
    function getCookie(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
    function setCookie(name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
    }

    if (getCookie('cv_newsletter_closed')) return;

    // INJECT CSS
    var style = document.createElement('style');
    style.textContent = '.cv-popup-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:10000;opacity:0;visibility:hidden;transition:opacity .35s ease,visibility .35s ease;display:flex;align-items:center;justify-content:center;padding:16px;}.cv-popup-overlay.active{opacity:1;visibility:visible;}.cv-popup{background:#fff;border-radius:16px;max-width:520px;width:100%;position:relative;overflow:hidden;transform:translateY(30px) scale(0.95);transition:transform .4s cubic-bezier(.4,0,.2,1);box-shadow:0 25px 60px rgba(0,0,0,0.25);}.cv-popup-overlay.active .cv-popup{transform:translateY(0) scale(1);}.cv-popup-close{position:absolute;top:12px;right:14px;width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:50%;cursor:pointer;font-size:18px;color:#666;display:flex;align-items:center;justify-content:center;transition:background .2s;z-index:2;line-height:1;}.cv-popup-close:hover{background:rgba(0,0,0,0.12);color:#333;}.cv-popup-header{background:linear-gradient(135deg,#1e3a29 0%,#2d5a3f 100%);padding:28px 28px 24px;color:#fff;text-align:center;}.cv-popup-header .cv-badge{display:inline-block;background:rgba(197,160,89,0.2);border:1px solid rgba(197,160,89,0.4);color:#c5a059;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:2px;padding:4px 14px;border-radius:20px;margin-bottom:12px;}.cv-popup-header h3{font-family:"Playfair Display",Georgia,serif;font-size:1.5rem;font-weight:700;margin:0 0 8px;line-height:1.3;}.cv-popup-header p{font-size:.9rem;opacity:.85;margin:0;line-height:1.5;}.cv-popup-body{padding:24px 28px 28px;}.cv-popup-perks{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:20px;}.cv-popup-perk{font-size:.78rem;color:#555;background:#f8f5f0;padding:5px 12px;border-radius:20px;white-space:nowrap;}.cv-popup-form{display:flex;flex-direction:column;gap:12px;}.cv-popup-input{width:100%;padding:13px 16px;border:1.5px solid #e0dcd6;border-radius:10px;font-family:"Poppins",sans-serif;font-size:.95rem;color:#333;outline:none;transition:border-color .2s;box-sizing:border-box;}.cv-popup-input:focus{border-color:#c5a059;}.cv-popup-input::placeholder{color:#aaa;}.cv-popup-btn{width:100%;padding:14px;border:none;border-radius:10px;background:linear-gradient(135deg,#c5a059,#d4b068);color:#fff;font-family:"Poppins",sans-serif;font-size:1rem;font-weight:600;cursor:pointer;transition:transform .15s,box-shadow .2s;letter-spacing:.5px;}.cv-popup-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(197,160,89,0.35);}.cv-popup-btn:active{transform:translateY(0);}.cv-popup-note{text-align:center;font-size:.72rem;color:#aaa;margin-top:10px;line-height:1.4;}.cv-popup-note a{color:#c5a059;text-decoration:underline;}.cv-popup-success{text-align:center;padding:40px 28px;}.cv-popup-success .cv-check{font-size:3rem;margin-bottom:12px;}.cv-popup-success h3{font-family:"Playfair Display",Georgia,serif;font-size:1.3rem;color:#1e3a29;margin:0 0 8px;}.cv-popup-success p{font-size:.9rem;color:#666;margin:0 0 16px;line-height:1.5;}.cv-popup-success .cv-btn-wa{display:inline-flex;align-items:center;gap:8px;background:#25d366;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600;font-size:.95rem;transition:background .2s;}.cv-popup-success .cv-btn-wa:hover{background:#1da851;}@media(max-width:480px){.cv-popup-header{padding:22px 20px 18px;}.cv-popup-header h3{font-size:1.25rem;}.cv-popup-body{padding:18px 20px 22px;}.cv-popup-perks{gap:6px;}.cv-popup-perk{font-size:.72rem;padding:4px 10px;}}';
    document.head.appendChild(style);

    // INJECT HTML
    var overlay = document.createElement('div');
    overlay.className = 'cv-popup-overlay';
    overlay.id = 'cvNewsletter';
    overlay.innerHTML = '<div class="cv-popup"><button class="cv-popup-close" aria-label="Închide" id="cvPopupClose">&times;</button><div id="cvPopupContent"><div class="cv-popup-header"><div class="cv-badge">Ofertă Exclusivă</div><h3>10% Reducere la Prima Rezervare</h3><p>Abonează-te și primești codul de reducere direct pe email, plus oferte speciale și noutăți.</p></div><div class="cv-popup-body"><div class="cv-popup-perks"><span class="cv-popup-perk">🏷️ Cod -10%</span><span class="cv-popup-perk">📧 Oferte exclusive</span><span class="cv-popup-perk">🎁 Pachete sezoniere</span><span class="cv-popup-perk">🚫 Fără spam</span></div><form class="cv-popup-form" id="cvNewsletterForm"><input type="text" class="cv-popup-input" id="cvName" placeholder="Numele tău" autocomplete="given-name"><input type="email" class="cv-popup-input" id="cvEmail" placeholder="Adresa ta de email *" required autocomplete="email"><button type="submit" class="cv-popup-btn">Vreau Reducerea de 10% →</button></form><p class="cv-popup-note">🔒 Datele tale sunt în siguranță. <a href="/politica-confidentialitate">Politica de confidențialitate</a></p></div></div></div>';
    document.body.appendChild(overlay);

    // LOGIC
    var shown = false;

    function showPopup() {
        if (shown) return;
        shown = true;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (typeof gtag === 'function') {
            gtag('event', 'newsletter_popup_shown', { event_category: 'engagement', page: location.pathname });
        }
    }

    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setCookie('cv_newsletter_closed', '1', COOKIE_DAYS);
    }

    // Close handlers
    document.getElementById('cvPopupClose').addEventListener('click', closePopup);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closePopup();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
    });

    // Trigger: after delay
    setTimeout(showPopup, DELAY_SECONDS * 1000);

    // Trigger: on scroll
    function onScroll() {
        var scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= SCROLL_TRIGGER) {
            showPopup();
            window.removeEventListener('scroll', onScroll);
        }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // Form submit
    document.getElementById('cvNewsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var name = document.getElementById('cvName').value.trim();
        var email = document.getElementById('cvEmail').value.trim();

        if (!email) return;

        if (typeof gtag === 'function') {
            gtag('event', 'newsletter_signup', { event_category: 'lead', event_label: email, page: location.pathname });
        }

        var waMessage = 'Bună ziua! Abonare newsletter Conca Verde.\n\n';
        if (name) waMessage += '👤 Nume: ' + name + '\n';
        waMessage += '✉️ Email: ' + email + '\n';
        waMessage += '🏷️ Solicită codul de reducere -10%\n\nMulțumesc!';
        var waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(waMessage);

        var content = document.getElementById('cvPopupContent');
        content.innerHTML = '<div class="cv-popup-success"><div class="cv-check">🎉</div><h3>Mulțumim' + (name ? ', ' + name : '') + '!</h3><p>Codul tău de reducere <strong>VERDE10</strong> a fost trimis.<br>Folosește-l la următoarea rezervare pentru <strong>10% discount</strong>.</p><a href="' + waUrl + '" target="_blank" rel="noopener" class="cv-btn-wa"><svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>Rezervă cu -10% pe WhatsApp</a></div>';

        setCookie('cv_newsletter_closed', 'subscribed', 30);
    });

})();
