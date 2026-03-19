/* ═══════════════════════════════════════════════
   PROMO CONFIG — Conca Verde
   Editează doar acest fișier pentru a schimba promoția!
   După editare: git add -A && git commit -m "Update promo" && git push
   ═══════════════════════════════════════════════ */
var CV_PROMO = {
    active: true,                    // true = popup activ, false = popup dezactivat
    discount: 5,                     // procentul de reducere (ex: 5, 10, 15)
    code: "VERDE5",                  // codul de reducere
    title_ro: "Reducere la Prima Rezervare",
    title_en: "Discount on First Booking",
    delay_seconds: 8,                // după câte secunde apare popup-ul
    scroll_trigger: 35,              // sau la ce % de scroll
    cookie_days_close: 7,            // nu mai apare X zile după închidere
    cookie_days_signup: 30           // nu mai apare X zile după abonare
};
