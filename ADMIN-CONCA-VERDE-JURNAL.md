# 📓 Admin Conca Verde — Analiza & Jurnal

> **Documentul viu al proiectului.** Claude îl deschide la începutul fiecărei sesiuni și îl completează la sfârșit. David îl poate consulta oricând ca să vadă starea proiectului.

**Ultima actualizare:** 17 august 2026 · sesiunea 19  
**Data pornirii proiectului:** ~20 mai 2026 (contul Vercel creat la 20 mai)  
**Durata activă:** ~2 luni  

---

## 🎯 CE ESTE

Un **panou de administrare (admin panel) pentru Complexul Turistic Conca Verde** din Râșnov. E o aplicație web (React + Supabase) care rulează pe telefon și laptop, folosită zilnic de:

- **Manager** (David) — vede banii, ocuparea, ia decizii
- **Recepție** (Maria) — check-in/out, rezervări cazare + evenimente
- **Bucătar principal + 3 ajutoare** — vezi comenzi live, stoc, rețete, cumpărături
- **2 ospătari + barman** — iau comenzi la mese, împart nota
- **Cameristă** — vede camerele de făcut, marchează "gata", raportează probleme

Total: **10 angajați activi**, **5 tipuri de ecrane** diferite, **17 tabele** de date.

Scopul: să înlocuiască hârtia, mesajele WhatsApp și Excel-urile improvizate cu o interfață unică, sincronizată în timp real, ușoară de folosit chiar și pentru personalul non-tehnic.

---

## 📊 STAREA CURENTĂ ÎN CIFRE

### Cod
| | |
|---|---|
| Ecrane distincte (fișiere .jsx) | **33** |
| Componente reutilizabile | **8** |
| Total fișiere React (.jsx) | **44** |
| Total linii de cod scrise | **~6,336** |
| Endpoint-uri API server-side | **3** |
| Scripturi bază de date (.sql + .mjs) | **14** |
| Poze integrate | **9** |

### Bază de date (Supabase — extras LIVE azi)
| Tabel | Rânduri | Ce ține |
|---|---:|---|
| `retete` | 401 | ingrediente per preparat |
| `meniu` | 147 | preparate restaurant |
| `ingrediente` | 95 | stoc bucătărie |
| `mese` | 44 | mese restaurant + terasă |
| `camere` | 20 | camere reale conca-verde.ro |
| `angajati` | 11 | conturi angajați |
| `comenzi` | 9 | comenzi restaurant (test) |
| `oaspeti` | 7 | oaspeți check-in |
| `setari` | 6 | program restaurant, muzică, etc. |
| `rezervari` | 4 | rezervări cazare |
| `sali_evenimente` | 3 | Sală Mare, Privată, Conferință |
| `probleme_camere` | 0 | (începe când raportează cineva) |
| `rezervari_evenimente` | 0 | (începe cu prima rezervare) |
| `rezervari_biliard` | 0 | (începe cu prima rezervare) |
| `specialitatea_zilei` | 0 | (bucătarul o setează zilnic) |
| `miscari_stoc` | 0 | (începe cu prima mișcare) |
| `log_autentificari` | 0 | (începe la primul login pe deploy nou) |
| `liste_cumparaturi` | dinamic | liste bucătar → istoric manager |
| `rezervari_mese` | dinamic | rezervări mese restaurant |
| `log_curatenie` | dinamic | istoric activitate cameristă |
| **TOTAL** | **760+** | |

### Infrastructură
- **Hosting:** Vercel — plan Hobby (gratuit, sub limite)
- **Bază de date + Auth:** Supabase — plan Free (500MB, 50MB storage, 50k autentificări/lună — suficient pentru un complex hotelier mic)
- **Domeniu:** `conca-verde-admin.vercel.app` (nu ai domeniu propriu — poate se leagă la `admin.conca-verde.ro` mai târziu)

---

## 🏗️ ARHITECTURA

```
┌─────────────────────────────────────────────────┐
│  Telefon / Laptop angajat                       │
│  (Chrome, Safari — sau PWA instalată)           │
└──────────────────┬──────────────────────────────┘
                   │ HTTPS
                   ▼
┌─────────────────────────────────────────────────┐
│  VERCEL — conca-verde-admin.vercel.app          │
│  ┌──────────────────────────────────────────┐   │
│  │ Frontend static (Vite build)             │   │
│  │  - HTML/CSS/JS + PWA + poze              │   │
│  │  - Poppins font                          │   │
│  └──────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────┐   │
│  │ Serverless functions (/api/personal/*)   │   │
│  │  - creare-cont  · foloseste SECRET_KEY   │   │
│  │  - resetare-parola                       │   │
│  └──────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────┘
                   │ PostgREST + JWT
                   ▼
┌─────────────────────────────────────────────────┐
│  SUPABASE — proiect awrwzfrpeubztflvbwzj        │
│  ┌──────────────────────────────────────────┐   │
│  │ auth.users (10 conturi)                  │   │
│  │ public.angajati (leagă auth de rol)      │   │
│  │ 17 tabele cu RLS strict per rol          │   │
│  │ Realtime pentru: camere, rezervari,      │   │
│  │   comenzi, rezervari_evenimente          │   │
│  │ 40+ politici RLS                         │   │
│  │ Helper functions: rolul_meu(), etc.      │   │
│  │ Trigger: protejeaza_coloane_angajati()   │   │
│  │ RPC: log_autentificare_reusita()         │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**De ce așa:** este cel mai simplu și ieftin stack care rezolvă problema — nu trebuie server propriu, backup-uri automate, sincronizare între ecrane e nativă (realtime), și tot merge offline pe telefon (PWA).

---

## 🌐 ADRESE LIVE

| | |
|---|---|
| **Admin** | https://conca-verde-admin.vercel.app |
| **Admin URL de urgență** (curăță cache) | https://conca-verde-admin.vercel.app/?reset=1 |
| **Site public** | https://conca-verde.ro (proiect separat) |
| **Dashboard Vercel** | https://vercel.com/admin-david-conca/conca-verde-admin |
| **Dashboard Supabase** | https://supabase.com/dashboard/project/awrwzfrpeubztflvbwzj |
| **API keys Supabase** | https://supabase.com/dashboard/project/awrwzfrpeubztflvbwzj/settings/api-keys |
| **Env vars Vercel** | https://vercel.com/admin-david-conca/conca-verde-admin/settings/environment-variables |

**Cont Vercel:** bosulicadd@gmail.com (probabil autentificat prin Google)

---

## 📁 UNDE E PROIECTUL PE DISC

| Ce | Cale |
|---|---|
| **Codul adminului (activ)** | `D:\Git\Conca-verde\.claude\worktrees\trusting-goldwasser-36d81f\admin\` |
| **Legătura la Vercel** | `…\admin\.vercel\project.json` (folder ascuns) |
| **Credentialele celor 10 angajați** | `…\admin\scripts-temp\credentiale-conca-verde.json` |
| **Poze integrate** | `…\admin\public\poze\` (9 fișiere .webp) |
| **Poze sursă (originale)** | `D:\Git\Conca-verde\assets\img\` (logo) + `D:\Git\Conca-verde\public\` (camere/săli) |
| **Scripturi DB** | `…\admin\scripts-temp\` (14 fișiere) |
| **Site public conca-verde.ro** | `D:\Git\Conca-verde\` (fișiere .html — NU se atinge de admin) |
| **Jurnal (acest fișier)** | `D:\Git\Conca-verde\ADMIN-CONCA-VERDE-JURNAL.md` |

**⚠️ Adminul NU e commituit în git.** Trăiește doar pe disc + Vercel. Zi-mi "commit admin" într-o sesiune viitoare ca să-l pun în siguranță.

---

## ✅ CE E IMPLEMENTAT (funcțional)

### 🔐 Autentificare
- 10 conturi Auth Supabase cu parole simple/memorabile (format `Rol2026!` — vezi sesiunea 14)
- Login page cu logo Conca Verde + gradient soft
- Tabel `angajati` leagă `auth.user_id` de rol + nume
- **40+ politici RLS strict** per rol (fiecare rol vede doar ce trebuie)
- Trigger DB: non-manageri nu pot schimba decât telefonul (nu rol/nume/email/activ)
- **Log automat al autentificărilor** (RPC `log_autentificare_reusita`)
- Protecții anti-blocare: timeout 8s pe query + fallback 10s + URL magic `?reset=1`

### 🛎️ Ecran Recepție (Maria)
- **Acasă** cu 4 KPI (ocupare, sosiri, plecări, disponibile) + notificare rezervări Booking noi
- **Toate camerele** — 20 camere reale cu poze thumbnail, filtre pe status (liberă / ocupată / curățenie / rezervată)
- **Check-in** — sosiri de azi, procesare rapidă
- **Check-out** — plecări de azi
- **Rezervare cameră nouă** (walk-in / telefon)
- **Evenimente** — listă rezervări cu KPI săptămâna viitoare + info card săli cu poze
- **Rezervare eveniment nou** — buget auto-calculat (ore × preț/oră, min. eveniment)
- **Detalii eveniment** — modal cu status, avans, ștergere

### 👨‍🍳 Ecran Bucătar (Ion + 3 ajutoare)
- **Acasă** cu tile-uri navigare
- **Comenzi acum** — realtime de la ospătari
- **Cumpărături** — listă persistentă în DB (jsonb items), la TRIMITE se marchează + se creează listă nouă goală
- **Stoc** (cămara digitală) — actualizat automat prin `retete` când se plătește o comandă
- **Rețete** — ingrediente per preparat + cost + profit
- **Expirări** — alerte pentru produse aproape de termen
- **Rapoarte** lunare

### 🍽️ Ecran Ospătar / Barman (Andrei + Ospătar 2 + Barman)
- **Harta meselor** color-coded (liberă / ocupată / plătită)
- **Ecran masă** — meniu pe categorii, cantități, note speciale
- **Acțiuni masă** — trimite la bucătărie, cere nota, plătește, împarte nota
- **RLS filtrează** — fiecare ospătar vede doar propriile comenzi (după `numele_meu()`)

### 🧹 Ecran Cameristă
- **Design mare, foarte simplu** — un ecran, o acțiune
- Lista camere în curățenie ca **card-uri XL** cu buton verde uriaș "GATA — CAMERA E CURATĂ"
- Buton roșu XL "🚨 AM O PROBLEMĂ — SUNĂ PATRON"
- Flux raportare problemă în **3 pași numerotați** (cameră → tip → descriere)
- Mesaje prietenoase ("Bună treabă! 🌿", "Nu ai camere de făcut momentan 🌿")

### 👔 Ecran Manager (David)
- **Banii de azi** — încasări, cheltuieli estimate, profit (card verde mare)
- **Alerte active** — probleme raportate de personal
- **Stare complex** — 4 KPI live
- **Sfatul zilei** — sfat automat pe baza ocupării
- **4 widget-uri noi** (adăugate P7):
  - 🎉 Evenimente săptămâna viitoare (număr + invitați + venit)
  - 📈 Sursa venitului luna asta (Cazare/Restaurant/Evenimente %)
  - 📅 Ocupare săli săptămâna asta (bară procent per sală)
  - 🕐 Program Conca Verde (citit din `setari`)
- **Detalii** (submenu 8 tile-uri): Profit, Monitorizare, Prețuri, Sezon, Rapoarte, Coach, **Personal**, **Cumpărături**
- **Personal** — pagină completă (creare/editare/reset/dezactivare angajați)
- **Cumpărături bucătărie** — 3 secțiuni:
  - Statistici (liste luna, produse comandate, de rezolvat, ultima listă)
  - Liste pending cu 3 acțiuni: **Cumpărat** (dialog cu preț + observații), **Editează** (modifică cantități/produse — bucătarul vede realtime), **Anulează** (motiv obligatoriu, bucătarul primește notificare)
  - Istoric cu filtre (săptămâna / luna asta / 3 luni / toate) — arată prețul plătit, motiv anulare, observații
- **Widget dashboard "Cheltuieli bucătărie luna asta"** — total lei, bare pe 4 săptămâni, top 5 produse cerute, comparație % vs luna trecută
- **Alerte inteligente automate:**
  - 🔴 Cheltuieli +15%+ față de luna trecută
  - 🟡 Produs comandat de 3+ ori în ultima săptămână (posibil risipă/furt)
  - 🟢 Economie ≥ 10% față de luna trecută
  - 🛒 Liste pending de rezolvat

### ☁️ Vercel Functions (server-side)
- `POST /api/personal/creare-cont` — creează în `auth.users` + `angajati`, generează parolă 16 caractere
- `POST /api/personal/resetare-parola` — parolă nouă
- Ambele: verifică că apelantul e manager (JWT + rol check), folosesc `SUPABASE_SECRET_KEY`

### 🎨 Design vibrant (iulie 2026)
- **Font Poppins** (rotund, prietenos, ușor de citit)
- Body **18px minim**, line-height 1.6
- Fundal cald crem #FEF9F0
- Culori vibrant semantice: verde #22C55E (bun), roșu #EF4444 (stop), galben #F59E0B (atenție), albastru #3B82F6 (info)
- Butoane cu **gradient** + shadow colorat + scale la tap (feedback vizual)
- Card-uri rotunjite 20-32px care **se ridică la hover**
- Toast auto-detectează tipul (succes/atenție/eroare) cu iconițe + gradient
- **Componentă nouă `Buton`** cu 6 variante × 3 dimensiuni + confirmare integrată
- **Ecran Cameristă** rescris cu pași 1/2/3 numerotați și butoane XL

### 📸 Poze
- 9 poze copiate din site: apartament, dubla-matrimoniala, dubla-twin, studio, sala-mare, sala-privata, sala-conferinta, restaurant + apartament-living
- **Mapping** tip cameră / sală → poză în `src/conectare/poze.js`
- Thumbnail-uri afișate în ListaCamere + card-uri săli Evenimente

### 🌿 Logo Conca Verde
- Peste tot: login (144px), header dashboard (56px)
- Favicon browser (SVG + PNG 32)
- PWA icons 192 + 512 + maskable
- Apple touch icon 180
- Iconițele generate cu `sharp` din `assets/img/logo.png`

### 🛡️ Îmbunătățiri finale (fix loading)
- URL magic `?reset=1` — curăță cache PWA + sesiune + reload
- Timeout 8s pe fetch angajat
- Fallback absolut 10s (nu se mai blochează niciodată pe "Se încarcă…")

---

## 🧠 ANALIZA — CE A MERS BINE, CE NU

### ✅ Ce a mers foarte bine

1. **Supabase RLS a fost decizia corectă** — securitate pe nivelul bazei de date, nu pe frontend. Chiar dacă cineva ar hack-ui codul JS, tot n-ar putea vedea date care nu-i aparțin. 40+ politici scrise, funcționează.

2. **Realtime nativ** — camere, comenzi, rezervări se actualizează instant pe toate telefoanele fără să reîmprospeteze pagina. Zero cod extra.

3. **PWA instalabilă** — arată și se comportă ca o app nativă pe telefonele angajaților.

4. **Componenta `Buton`** cu confirmare integrată — reduce boilerplate-ul, previne click-uri accidentale pe operații distructive.

5. **Vercel deploy** cu un singur comand — 30 secunde de la modificare la producție.

6. **Roluri clar separate** — fiecare tip de angajat vede doar ecranul lui. Ospătarul nu poate greși în stoc, cameristele nu văd rezervări.

### ⚠️ Ce a fost dificil / probleme reale întâlnite

1. **Migrare de urgență** — vechiul proiect Supabase (`bkwibjnjhtslymrenixq`) a fost șters accidental între sesiuni. Am reconstruit tot: schema + ~600 rânduri date + auth + poze. Noroc că 99% erau în scripturile locale.

2. **Cache PWA blochează app-ul după deploy** — problemă clasică. Rezolvat cu `?reset=1` + timeout la loading + skipWaiting în service worker.

3. **Cheia secretă expusă** — David a lipit-o în chat de mai multe ori. A trebuit să o rotim, iar cheia veche a rămas ca amenințare până a fost rotată în Supabase.

4. **`loading="lazy"` la img blocase încărcarea în grid-uri** — bug ciudat, rezolvat prin eliminarea atributului.

5. **Vercel Functions nu rulează local cu `vite dev`** — pentru testare completă e nevoie de `vercel dev`. Momentan testăm creare cont / reset parolă doar pe producție.

### 💡 Lecții pentru viitor

- Nu expune niciodată cheia secretă în chat (nici a mea, nici a lui David).
- Fac backup periodic al datelor Supabase (export SQL) — până la primul incident cu date pierdute.
- Dacă adminul se blochează vreodată, prima încercare: `?reset=1`.
- Pentru operații critice (create/delete cont), folosesc `SERVER-side` cu cheia secretă, niciodată din browser.

---

## ⏳ TASK-URI DE FĂCUT (BACKLOG)

### 🔴 Prioritate mare
- [ ] **Rotația cheii secrete** `sb_secret_VEZI_GOOGLE_DRIVE` (expusă în chat) — David → Supabase Dashboard → Roll → paste nouă în Vercel env `SUPABASE_SECRET_KEY` → redeploy
- [ ] **Commit adminul în git** — trăiește doar pe disc + Vercel; risc de pierdere dacă se șterge worktree

### 🟡 Prioritate medie
- [ ] Bucătar redesign detaliat (colorare pe cronometru, sunet + vibrație la comandă nouă)
- [ ] Ospătar redesign detaliat (poze în meniu, împărțire notă mai vizuală)
- [ ] Poze diferite pentru `dubla_matrimoniala` vs `dubla_twin` (acum folosesc aceeași imagine)
- [ ] `restaurant-card.webp` copiat dar nefolosit — se poate afișa pe Acasa recepție
- [ ] Widget "Coach manager" — momentan doar tile "în curând"
- [ ] Sincronizare reală Booking.com — momentan doar KPI hardcoded după `sursa='booking'`
- [ ] **Șterge rândul de test din `angajati`** — sunt 11, ar trebui 10. Investighează care e extra.
- [ ] Notificare push/SMS către manager când bucătarul trimite listă cumpărături (momentan doar Toast local + apariția în istoric)

### 🟢 Prioritate mică / idei
- [ ] Notificări push (când vine comandă nouă la bucătar, sună telefonul)
- [ ] Fotografii încărcabile pentru probleme cameristă (buton "📷 Adaugă o poză" dezactivat momentan)
- [ ] Rapoarte PDF exportabile
- [ ] Backup automat DB (Supabase Point-in-time recovery e pe plan Pro — plan curent probabil Free)
- [ ] Domeniu propriu `admin.conca-verde.ro`
- [ ] Editor meniu direct în admin (adaugă/scoate preparate fără să atingi DB direct)
- [ ] Dark mode (opțional)
- [ ] Traducere engleză (pentru turiști internaționali? — puțin probabil, majoritatea angajaților sunt români)

---

## 🐛 PROBLEME CUNOSCUTE

| Problemă | Impact | Workaround |
|---|---|---|
| Cache PWA vechi blochează app la deploy nou | Uneori după deploy trebuie reinstalat PWA | Deschide `?reset=1` sau incognito |
| `SUPABASE_SECRET_KEY` expusă în chat | Cineva cu acces la istoric o poate folosi | Trebuie rotită (vezi backlog) |
| Adminul nu e în git | Risc pierdere date dacă se șterge worktree | Cere "commit admin" |
| `loading="lazy"` la img rupe încărcarea în grid | Fixat unde s-a văzut | Nu folosi lazy pe grid-uri |
| Vercel Functions nu rulează cu `vite dev` | Testarea completă doar pe prod | `vercel dev` sau deploy preview |

---

## 📅 ISTORIC SESIUNI

### Sesiunea 19 — Proiect NOU: „Agency Admin” (meta-adminul lui David) (17 august 2026)
**Ce a cerut David:** o aplicație separată, doar pentru el, cu care să construiască admin-uri
pentru alți clienți ca serviciu. 9 secțiuni, single-user, Supabase nou, deploy pe Vercel.

**Unde e:** `D:\Git\Conca-verde\agency-admin\` — proiect complet separat de Conca Verde
(alt cod, alt Supabase, alt deploy). Jurnalul lui propriu:
`D:\Git\Conca-verde\agency-admin\AGENCY-ADMIN-JURNAL.md`, ghidul lui David: `D:\Git\Conca-verde\agency-admin\README.md`.

**Nu s-a atins nimic din adminul Conca Verde** în această sesiune.

**De reținut aici:** Conca Verde e acum și „clientul zero” — experiența din el (RLS strict,
`?reset=1`, design 18px pentru non-tehnici, fluxurile hotel/restaurant) a intrat direct în
librăria de prompturi și în template-urile din agency-admin.

---

### Sesiunea 1 — Migrare bază de date + autentificare (mai/iunie 2026)
**Ce s-a făcut:**
- Migrare completă schema + ~600 rânduri din vechiul proiect Supabase în noul proiect `awrwzfrpeubztflvbwzj`
- 10 conturi Auth create cu parole puternice
- 40+ politici RLS stricte per rol
- Login page + protecție rute
- Deploy inițial pe Vercel

**Rezultat:** Admin funcțional cu autentificare pentru toate cele 5 roluri.

---

### Sesiunea 2 — Actualizare la realitate + evenimente + widget-uri manager (iulie 2026)
**Ce s-a făcut:**
- **P1:** 20 camere reale Conca Verde (înlocuit cele 22 fictive) — 2 matrimoniale @250 lei, 15 twin @213 lei, 2 studio @320 lei, 1 apartament @450 lei
- **P2:** Tabele `sali_evenimente` + `rezervari_evenimente` + RLS + realtime + 3 săli seed
- **P3:** UI React evenimente — listă cu KPI, formular rezervare cu buget auto-calculat, modal detalii cu edit avans/status
- **P4:** Tabel `setari` (6 chei — program restaurant, recepție, muzică live)
- **P5:** Tabel `rezervari_biliard` cu RLS
- **P6:** Tabel `specialitatea_zilei` + verificare meniu (147 preparate)
- **P7:** 4 widget-uri noi pe dashboard Manager

**Rezultat:** Adminul reflectă realitatea complexului, plus 4 widget-uri live pentru decizii manageriale.

---

### Sesiunea 3 — Personal + poze + logo (iulie 2026)
**Ce s-a făcut:**
- **Pagina Personal** completă:
  - Statistici (total angajați, ultimul adăugat, logări recente)
  - Buton adăugare cont nou (Vercel Function server-side cu SECRET_KEY)
  - Tabel cu filtre (activi/inactivi) + search
  - Reset parolă, editare, dezactivare/reactivare cu motiv
  - Dialog credentiale copiabile o singură dată
- **Tabel `log_autentificari`** + RPC pentru log automat la fiecare login
- **RLS** pe angajati: manager tot, alții propriul rând, trigger blochează schimbări coloane
- **Vercel Functions** `/api/personal/creare-cont` + `resetare-parola`
- **Copiere + integrare 9 poze** camere și săli
- **Mapping tip → poză** în `src/conectare/poze.js`
- **Logo Conca Verde** peste tot: login (144px), header (56px), favicon, PWA icons (192/512/maskable), apple-touch, splash

**Rezultat:** Admin brand-aware, cu vizual profesional. Managerul poate gestiona angajați fără să atingă baza de date.

---

### Sesiunea 15 — Editare gramaj + adăugare preparat nou la Bucătar (28 iulie 2026)
**Ce a cerut David:** buton de edit pentru meniu (să schimbe gramajul la rețete) + buton de adăugare preparat nou direct din aplicație (nume + gramajele rețetei), pentru bucătar.

**Decizii luate cu David (întrebări clarificatoare):**
- Prețul preparatului nou îl pune tot bucătarul (nu exista niciun ecran de manager pentru editat prețuri, ar fi rămas preparatele blocate la 0 lei)
- Ingredientele din rețetă se aleg DOAR din lista existentă de 95 (fără scriere liberă, evită duplicate în stoc)
- Ștergerea unui preparat rămâne doar la manager (siguranță)

**Ce s-a făcut:**
- **DB (RLS):** `scripts-temp/p26-meniu-retete-bucatar-rls.sql` — politici noi `meniu_insert_bucatar`, `retete_insert_bucatar`, `retete_update_bucatar` (bucătarul poate acum insera preparate + rețete, și edita cantități; DELETE rămâne doar manager)
- **`bucatar/Retete.jsx` rescris:**
  - Buton **✏️ Editează gramaj** pe fiecare card → modal cu toate ingredientele preparatului, cantitate + unitate editabile, salvează cu UPDATE pe `retete`
  - Buton **➕ Adaugă preparat** (sus, lângă filtre) → modal cu emoji + nume + categorie + preț + rânduri dinamice de ingrediente (select din listă + cantitate + unitate auto-completată din unitatea implicită a ingredientului) → INSERT în `meniu` apoi INSERT în `retete`
  - Fetch nou de `ingrediente` (id, nume, unitate, categorie) la montare, pentru dropdown-ul de selecție
- **`.claude/launch.json`** creat (config dev server pentru testare în browser)

**Test complet (verificat local, cu login real bucătar + RLS real):**
1. Login `bucatar@conca-verde.local` → Rețete/Meniu → editat gramaj Busuioc la "Bruschetta" de la 5g la 7g → salvat, apare 7g pe card ✓
2. Adăugat preparat test "Supă Test QA" (19 lei, categoria Supe, Cartofi 200g + Sare 3g) → apărut instant în listă (147→148 feluri) ✓
3. Cleanup: șters preparatul test + revenit Busuioc la 5g direct în DB (script node+pg)

**Deploy:** făcut pe producție, `npx vercel deploy --prod` — live pe `conca-verde-admin.vercel.app`.

---

### Sesiunea 16 — Nume + telefon obligatorii la Rezervare nouă și Check-in (28 iulie 2026)
**Ce a cerut David:** la recepție, când se face check-in sau se rezervă o cameră nouă, numele și numărul de telefon să fie obligatorii — fără ele, formularul să nu meargă mai departe.

**Ce s-a făcut:**
- **`receptie/RezervareNoua.jsx`:** câmpul Telefon are acum `required` + validare la submit (`!form.telefon.trim()`) + butonul „CONFIRMĂ REZERVAREA" e dezactivat dacă lipsește numele sau telefonul (numele era deja obligatoriu; telefonul era opțional înainte)
- **`receptie/CheckIn.jsx` (DialogCheckIn):** câmpul Telefon are acum `required` + validare la submit + butonul „Confirmă check-in" dezactivat dacă lipsește numele sau telefonul
- Nu s-a atins schema bazei de date (`oaspeti.telefon` rămâne nullable la nivel DB) — validarea e doar la nivel de aplicație, la fel ca numele existent

**Test complet (verificat local, cu login real recepție):**
1. Rezervare nouă: ales cameră + completat doar numele → buton tot dezactivat; completat și telefonul → buton activ ✓
2. Creat o rezervare test reală "QA CheckIn Test" → mers la Check-in → șters telefonul din dialog → buton dezactivat; repus telefonul → buton activ ✓
3. Cleanup: șters rezervarea + oaspetele test din DB, camera 101 revenită la „liberă"

**Deploy:** făcut pe producție.

---

### Sesiunea 18 — Raport lunar pe luni selectabile la Manager (30 iulie 2026)
**Ce a cerut David:** raportul lunar din admin (Manager → Detalii → Rapoarte) să nu mai fie fix pe „ultimele 30 de zile", ci să poată alege orice lună calendaristică vrea.

**Ce s-a făcut:**
- **`manager/Rapoarte.jsx` rescris:** secțiunea „Luna asta" (fixă, ultimele 30 zile) înlocuită cu card „📊 Raport lunar" cu săgeți ‹ › pentru navigare între luni calendaristice (ex: Iunie 2026, Iulie 2026)
- Pentru luna aleasă: total încasări, defalcare Hotel/Restaurant/Evenimente (sumă + %), bară grafică proporțională, medie/zi (calculată pe zilele scurse dacă e luna curentă, sau pe toată luna dacă e o lună trecută), comparație % față de luna precedentă (↑/↓)
- Navigarea înainte („›") se blochează automat la luna curentă — nu poți vedea „raportul" pentru viitor
- Cardurile „Astăzi" și „Săptămâna asta" (ultimele 7 zile) au rămas neschimbate

**Test complet (verificat local, login real manager):**
1. Deschis Rapoarte → arată "Iulie 2026" cu 4.042 lei (87% hotel, 13% restaurant, 0% evenimente) ✓
2. Apăsat ‹ → "Iunie 2026" → "Nicio încasare înregistrată în Iunie 2026" (corect, fără date istorice) ✓
3. Apăsat › → revine la "Iulie 2026" cu aceleași cifre, buton › dezactivat pe luna curentă ✓

**Deploy:** făcut pe producție.

---

### Sesiunea 17 — Fix „147 vs 81" la Rețete + rețete pentru toate preparatele (28 iulie 2026)
**Bug raportat de David:** ecranul Acasă bucătar arăta „147 feluri" la tile-ul Rețete, dar la intrare apăreau doar 81 preparate.

**Cauza:** `Retete.jsx` filtra din start doar preparatele care aveau deja măcar un rând în `retete` (81 din 147) — celelalte 66 (mai ales băuturi: bere/vin/cocktail/whiskey/lichioruri, plus câteva mâncăruri) nu au avut niciodată ingrediente completate, încă de la migrarea inițială din mai 2026.

**Decizie cu David:** arată toate cele 147 în ecranul Rețete, cu preparatele fără rețetă marcate clar „Fără rețetă încă" + buton „➕ Adaugă rețetă", ca să poată completa treptat golurile.

**Ce s-a făcut:**
- **`bucatar/Retete.jsx`:** eliminat filtrul care ascundea preparatele fără rețetă; card-urile fără rețetă arată acum „Fără rețetă încă" + buton verde „➕ Adaugă rețetă" (în loc de „✏️ Editează rețetă")
- Adăugate etichete lipsă pentru categoriile de băuturi (bauturi_calde, bauturi_reci, bere, cocktail, lichioruri, vin, whiskey) care nu erau în dicționarul de etichete și apăreau ca text brut din DB
- **Dialogul de editare rescris** (`DialogEditareReteta`, înlocuiește `DialogEditareGramaj`): acum permite și **adăugarea** de ingrediente noi la un preparat existent (nu doar corectarea gramajului) și **ștergerea** unui ingredient greșit din rețetă
- **Bug găsit și reparat în timpul testării:** ștergerea unui ingredient din rețetă „reușea" vizual dar nu se salva de fapt — bucătarul avea drept de INSERT/UPDATE pe `retete` dar nu și de DELETE. Adăugată migrarea `scripts-temp/p27-retete-delete-bucatar-rls.sql` (politică `retete_delete_bucatar`). Ștergerea unui preparat întreg din meniu rămâne exclusiv la manager.

**Test complet (verificat local, login real bucătar):**
1. Contor "147 preparate în meniu · 66 încă nu au rețetă completată" ✓ (corect, category labels frumoase pentru băuturi)
2. "Ardei Iute" (fără rețetă) → Adaugă rețetă → Ardei iute 50g → salvat, apare pe card, contor scade la 65 ✓
3. Editează rețetă → șters "Ardei iute" → Salvează → prima încercare NU a șters nimic din DB (RLS lipsă) → aplicat p27 → retestat → de data asta s-a șters corect, preparatul revine la "Fără rețetă încă", contor revine la 66 ✓

**Deploy:** făcut pe producție.

---

### Sesiunea 14 — Schimbare parole toate cele 10 conturi (24 iulie 2026)
**Ce a cerut David:** parole simple, memorabile, pentru toate conturile — după rol.

**Parole noi (după rol, format `Rol2026!`):**
- david@ → **Manager2026!**
- receptie@ → **Receptie2026!**
- bucatar@ + ajutor1/2/3@ → **Bucatar2026!** (bucătarii au aceeași parolă)
- ospatar1/2@ → **Ospatar2026!** (ospătarii au aceeași parolă)
- barman@ → **Barman2026!**
- camerista@ → **Camerista2026!**

**Ce s-a făcut:**
- Update prin Supabase Admin API (secret key)
- 2 conturi au dat eroare tranzitorie „invalid JWT" la primul try — retry a rezolvat
- Login testat pentru toate: **10/10 OK** ✓
- Actualizat `credentiale-conca-verde.json` cu noile parole

**Notă securitate:** Parolele sunt mai slabe decât cele generate anterior (16 caractere random). E OK pentru un complex hotelier mic, dar dacă apar utilizatori suplimentari sau atacatori care ghicesc pattern-ul, se recomandă rotire.

---

### Sesiunea 13 — Clarificare text CHECK-OUT tile (24 iulie 2026)
**Feedback David:** După sesiunea 12, contorul CHECK-OUT arăta corect toți cei cazați, dar textul zicea „plecări de procesat azi" — derutant când te uiți la un oaspete care are plecarea programată peste 3 zile dar vrea early check-out.

**Ce s-a făcut:** Text nou care distinge cei cazați total vs cei cu plecare azi:
- „Nicio sosire de procesat" / „N sosire(i) de procesat"
- „Niciun oaspete cazat"
- „N oaspeți cazați · pot pleca oricând" (dacă niciunul nu are plecare azi)
- „N oaspeți cazați · M pleacă azi" (dacă unii au plecare azi)
- Accent tile activ doar când sunt plecări azi

**Test verificat:** Am inserat 2 rezervări — una cu plecare peste 3 zile, alta cu plecare azi. Tile arată „2 oaspeți cazați · 1 pleacă azi". Cleanup făcut.

---

### Sesiunea 12 — Fix contor CHECK-IN / CHECK-OUT pe dashboard recepție (24 iulie 2026)
**Bug raportat de David:** Tile-urile „CHECK-IN 0 sosiri" și „CHECK-OUT 0 plecări" — dar când intram efectiv în ecran, apăreau restanțe. Contorul minte.

**Cauza:** `receptie/Acasa.jsx` folosea încă filtre stricte pe data de azi (`.eq('data_sosire', dataAzi)`), în timp ce ecranele CheckIn/CheckOut au fost updatate în sesiunea 10 să afișeze restanțele. Deci contorul și lista efectivă nu erau consistente.

**Ce s-a făcut:**
- `receptie/Acasa.jsx` folosește aceeași logică:
  - Sosiri = `.lte('data_sosire', azi).eq('status', 'rezervata')` — include restanțele
  - Plecări = `.eq('status', 'check_in')` — toți cazații (inclusiv depășiți)

**Test (verificat local):**
- Inserat 2 rezervări test: 1 restantă cu data 22 iulie + 1 check_in
- Tile-urile arată instant „1 sosiri de procesat azi" și „1 plecări de procesat azi" ✓
- Cleanup făcut după test

---

### Sesiunea 11 — Fix sincronizare cameristă → recepție (24 iulie 2026)
**Bug raportat de David:** După ce camerista apasă GATA pe o cameră, camera rămâne pe lista ei; recepția nu vede update-ul; pagina Camere nu se actualizează.

**Cauza reală (RLS ascuns):** Policy-ul `camere_select` permitea cameristei să vadă DOAR camere cu `status='curatenie'`. După UPDATE la 'libera', Realtime aplică RLS pe fiecare event → camera în stare nouă NU trece filtrul → cameristа nu primea eventul niciodată → camera rămânea pe ecran vizual.

**Ce s-a făcut:**
- **DB fix RLS:** `camere_select` permite acum SELECT pentru toate rolurile (manager/recepție/ospătar/barman/cameristă/bucătar). UPDATE rămâne restrictiv (cameristа poate face doar `status='libera'`).
- **Tabel nou `log_curatenie`** (bonus cerut): id, camera_id, camerista_id, start_la, gata_la, durata_minute (calculată automat prin trigger)
- **EcranCamerista.jsx:**
  - **Optimistic update** — camera dispare INSTANT din listă la apăsarea GATA (feedback imediat), nu așteptăm realtime
  - INSERT în `log_curatenie` cu camerista_id + timestamp (best-effort)
  - Empty state schimbat: **🎉 BRAVO! Ai terminat toate camerele!** (era 🌿 „Toate camerele sunt curate")
  - La eroare: rollback prin `reincarca()`
- **EcranReceptie.jsx / receptie/Acasa.jsx:**
  - Acasa recepție primește `onToast` prop
  - Realtime subscription detectează event `UPDATE` unde `old.status='curatenie'` și `new.status='libera'` → toast: „🟢 Camera X e gata! Poți caza următorul oaspete"

**Test complet (verificat pe local — realtime în același browser):**
1. Login cameristă → 4 camere de făcut (101, 105, 111, 118)
2. Apas GATA pe Camera 101 → **dispare instant** (după 500ms), rămân 3 ✓
3. Toast „Camera 111 gata! Recepția vede automat ✨" ✓
4. Termin toate → apare empty state **🎉 BRAVO! Ai terminat toate camerele!** ✓
5. (În alt tab cu Maria) Recepția ar primi toast „🟢 Camera X e gata!" — cod verificat, nu testat direct din cauza limitării de share localStorage între tab-uri în browser embedded

**Bonus istoric:** Managerul poate vedea în tabelul `log_curatenie` cine a curățat ce cameră, când și cât a durat (durata_minute e calculată automat). UI-ul pentru asta se face separat când vrei — momentan datele se colectează.

**Rezultat:** Fluxul complet sincronizat între cameristă și recepție. Sub 1 secundă latență.

---

### Sesiunea 10 — Bug critic: Check-in / Check-out repărat (24 iulie 2026)
**Bug raportat de David:** „Butoanele CHECK-IN / CHECK-OUT nu funcționează, fluxul hotel e blocat".

**Cauza reală (după investigație):**
1. `citesteSosiri()` folosea `.eq('data_sosire', azi())` — arăta DOAR rezervările cu sosire strict azi. Rezervările restante din trecut (ex: id=5 din 21 iulie) nu apăreau NICĂIERI.
2. `RezervareNoua.jsx` avea logică: `status: form.data_sosire === azi() ? 'check_in' : 'rezervata'` — orice rezervare cu sosire azi era **automat check-in**, deci NU mai apărea pe ecranul CheckIn niciodată.
3. `citestePlecari()` similar cu `.eq('data_plecare', azi())` — dacă cineva depășea, dispărea.
Butoanele fizic funcționau, dar listele erau goale → David credea că butoanele sunt stricate.

**Ce s-a făcut:**
- `queries.js`:
  - `citesteSosiri` folosește `.lte('data_sosire', azi())` — include și restanțele
  - `citestePlecari` afișează TOATE cele cu `status='check_in'` (sortate după data_plecare)
- `RezervareNoua.jsx`: eliminat auto-check-in. Rezervarea rămâne mereu `status='rezervata'` (camera devine `rezervata`). Check-in-ul e explicit din ecran CheckIn.
- `CheckIn.jsx`: rescris cu dialog complet (cum a cerut David) — Camera + perioada, câmpuri edit-abile pentru **CNP**, **telefon**, **cardul de acces**, **observații**. Butoanele mari + gradient verde. Restanțele marcate cu ⚠ „(restanță)" în roșu.

**Test complet (verificat pe local):**
1. Rezervarea restantă id=5 (sosire 22 iulie, azi e 24) → **apare acum** cu ⚠ „restanță"
2. Apas „✅ PORNEȘTE CHECK-IN" → dialog complet cu date pre-populate
3. Confirm → toast „sdsdsd cazat la Camera 118", lista se golește ✓
4. Merg la CheckOut → oaspetele apare cu detaliile corecte
5. Apas PORNEȘTE CHECK-OUT → aleg CARD → ÎNCASEAZĂ → toast „320 lei încasați (CARD). Camerista a primit notificare." ✓
6. Camera trece automat în CURĂȚENIE (cameristа o vede)

**Rezultat:** Fluxul complet hotel funcționează: Rezervare → Check-in explicit → Camera OCUPATĂ → Check-out cu plată → Camera CURĂȚENIE.

---

### Sesiunea 9 — Auto-selectare cameră la rezervare (23 iulie 2026)
**Bug UX raportat de David:** Când apasă pe o cameră liberă → „Rezervare nouă pentru această cameră", formularul se deschidea cu câmpul „Cameră" gol; trebuia să aleagă din nou. Redundant.

**Ce s-a făcut:**
- `EcranReceptie.jsx` — `setEcran(nume)` înlocuit cu `navigare(nume, params)` care ține și un state `paramsEcran` (obiect cu date suplimentare per navigare)
- `ActiuniCamera.jsx` — buton „Rezervare nouă pentru această cameră" apelează acum `onNavigare('rezervare', { cameraId: camera.id })`
- `RezervareNoua.jsx` — acceptă prop nou `cameraPreselectataId`; după fetch camere libere, dacă id-ul e în listă, îl setează automat în form.camera_id

**Test complet (verificat pe local):**
1. Recepție → Toate camerele → click Cam. 101 (liberă) → dialog acțiuni → „Rezervare nouă pentru această cameră"
2. Formularul apare cu dropdown-ul pre-completat: „Cam. 101 · Matrimonială · 2 loc · 250 lei/noapte" (select value=23)
3. Navigare directă din meniu Acasă → tile „Rezervare nouă (Walk-in)" → formularul apare cu dropdown gol („— alege o cameră liberă —") ✓
4. Utilizatorul poate schimba camera din dropdown dacă vrea (nu e blocată)

**Rezultat:** UX îmbunătățit — 2 click-uri mai puțin per rezervare de cameră (când vine dintr-o cameră specifică).

---

### Sesiunea 8 — Flux restaurant complet: MĂNÂNCĂ manual + rezervări mese (23 iulie 2026)
**Ce a cerut David:** 3 îmbunătățiri la fluxul restaurant:
1. Status „MĂNÂNCĂ" cu control manual (buton apare doar când o comandă e „gata")
2. Rezervări mese cu formular (nume, telefon, dată, oră, persoane)
3. Card „REZERVAT" cu info + „OASPETELE A VENIT" / no-show / anulează

**Ce s-a făcut:**
- **DB:** tabel `rezervari_mese` + `mese.rezervare_activa_id` (FK) + RLS (manager/recepție/ospătari/barman) + realtime
- **HartaMese.jsx:** culori actualizate conform spec-ului David:
  - 🟢 LIBERĂ (verde) → 🟡 COMANDĂ (galben) → 🟠 MĂNÂNCĂ (**portocaliu** — era albastru înainte) → 🔴 PLATĂ (**roșu** — era portocaliu) → 🟢 LIBERĂ
  - 🟣 REZERVAT (violet)
  - Card masă rezervată arată nume oaspete, dată+oră, nr persoane
  - Buton **🟣 REZERVĂ** pe fiecare masă liberă → deschide dialogul
- **DialogRezervareMasa.jsx** (nou): formular complet cu validări:
  - Nume min 3 caractere
  - Data minim azi (calendar picker)
  - Oră HH:MM
  - Nr persoane ≤ capacitate masă
  - Telefon + observații opționale
- **ActiuniMasa.jsx** extins cu 3 fluxuri noi:
  - Buton **🟠 MĂNÂNCĂ (am livrat)** — apare DOAR dacă vreo comandă are `status='gata'`; marcaj manual
  - Când masa e rezervată: card cu info rezervare + 3 butoane:
    - **👋 OASPETELE A VENIT** (verde, mare) → rezervare 'sosit', masa 'comanda'
    - **🚫 Nu s-a prezentat** (roșu) → rezervare 'no-show', masa liberă
    - **🗑️ Anulează** (neutru) → rezervare 'anulata', masa liberă
  - Butonul CERE NOTA acum e gradient roșu (spec)

**Test complet (verificat pe local):**
1. Ospătar apasă „🟣 REZERVĂ" pe Masa 1 → dialog cu formular
2. Completat „Familia Popescu · 0722123456 · 19:00 · 2 persoane" → confirmat
3. Contor „1 rezervate" · Masa 1 devine 🟣 REZERVAT cu info afișate pe card
4. Click pe Masa 1 → dialog cu date rezervare + 3 butoane
5. Apas „👋 OASPETELE A VENIT" → rezervare marcată 'sosit', Masa 1 devine 🟡 COMANDĂ
6. Fluxul comandă → mănâncă → plată funcționează normal

**Rezultat:** Flux restaurant complet: liberă → comandă → mănâncă (manual) → plată → liberă, plus flow rezervare (rezervat → sosit → comandă).

---

### Sesiunea 7 — Fix Acasa bucătar (cifre reale) (23 iulie 2026)
**Bug raportat de David:** Tile-ul „Comenzi acum" arăta „4 active · 1 nouă" chiar și când nu exista nicio comandă. La fel: „3 produse pe roșu", „42 feluri", „S-a terminat carnea de vită" — toate hardcodate în cod.

**Cauza:** `src/ecrane/bucatar/Acasa.jsx` avea constanta `TILES` cu text hardcoded, fără să apeleze DB.

**Ce s-a făcut:**
- Rescris `Acasa.jsx` cu `useEffect` + 4 queries paralele la DB:
  - `comenzi` cu status ∈ (nou, in_lucru, intarziat) → cifra reală active + noi
  - `liste_cumparaturi` pending → indică bucătarului că are listă la manager
  - `ingrediente` cu stoc < stoc_minim → produse pe roșu; stoc == 0 → epuizate
  - `meniu` cu disponibil=true → feluri active
- Alerta „S-a terminat X" apare **doar** când există ingrediente cu `cantitate_stoc = 0` (afișează numele reale)
- Realtime pe cele 4 tabele — se actualizează instant

**Rezultat verificat:** „Comenzi acum → Nicio comandă activă", „Stoc → Totul e în regulă 🌿", „Rețete → 147 feluri" (real din DB), alerta a dispărut.

---

### Sesiunea 6 — Extindere Cumpărături manager (23 iulie 2026)
**Ce a cerut David:** partea de manager cu funcționalități complete (edit, anulare, preț, statistici, widget dashboard, alerte).

**Ce s-a făcut:**
- **DB:** `ALTER TABLE liste_cumparaturi` adăugat 5 coloane: `pret_total`, `observatii`, `anulata_la`, `anulata_de`, `motiv_anulare` + 2 indexuri noi
- **IstoricCumparaturi.jsx rescris complet:**
  - Secțiunea 1: 4 KPI (liste luna, produse comandate, pending, ultima listă)
  - Secțiunea 2: liste pending cu 3 butoane per listă (Cumpărat / Editează / Anulează)
  - Secțiunea 3: istoric cu 4 filtre de dată + detalii collapsable
  - 3 dialoguri: **Cumpărat** (preț opțional + observații), **Editează** (modifică nume/cantitate/șterge), **Anulează** (motiv obligatoriu)
- **Widget nou pe Acasa manager: "🛒 Cheltuieli bucătărie luna asta":**
  - Total lei
  - Bare grafic pe 4 săptămâni (gradient verde)
  - Top 5 produse cel mai des comandate
  - Comparație % vs luna trecută (roșu dacă +, verde dacă −)
- **Alerte automate pe dashboard:**
  - Pending: X listă cumpărături de rezolvat
  - Cheltuieli +15%+ vs luna trecută
  - Produse comandate de 3+ ori săpt. asta (semnal de risipă)
  - Economie -10% vs luna trecută
- **Bucătar (Cumparaturi.jsx):** feedback contextual după TRIMITE:
  - 📤 "Trimisă la manager · așteaptă cumpărare" (pending)
  - ✅ "Cumpărată! · X lei" (după marcaj cumpărat)
  - 🗑️ "Anulată de manager · Motiv: ..." (după anulare)

**Test complet (verificat pe local):**
1. Bucătar trimite listă (Cartofi 20 kg + Ceapă 5 kg) → apare la manager ca pending
2. Manager apasă "Cumpărat" → dialog cu preț → 285.50 lei → confirmă
3. Lista se mută în istoric cu "💰 Plătit: 285,5 lei"
4. Widget dashboard afișează: Total 285,5 lei, bară pe săpt. asta 286 lei, Top 5 produse listate
5. Bucătarul (dacă reintră pe Cumpărături) vede "✅ Lista precedentă a fost cumpărată! · 285,5 lei"

**Rezultat:** Fluxul complet închis între bucătar și manager. Manager are vizibilitate totală și controlul asupra listelor.

---

### Sesiunea 5 — Fix listă cumpărături bucătar + istoric manager (23 iulie 2026)
**Problema raportată:** După TRIMITE, produsele rămâneau pe lista bucătarului (era doar local, fără persistență); risc de dublă comandă.

**Ce s-a făcut:**
- **DB:** tabel nou `liste_cumparaturi` cu `items jsonb`, coloane `trimisa_la`, `trimisa_de`, `cumparata_la`, `cumparata_de` + RLS (manager+bucătari citesc, doar manager șterge fizic) + realtime
- **Frontend bucătar (Cumparaturi.jsx):** rescris cu persistență DB:
  - La montare: încarcă lista draft curentă (sau creează una goală)
  - Adaugă/șterge produse → auto-save optimistic în DB
  - TRIMITE: marchează `trimisa_la` + `trimisa_de`, apoi creează listă nouă goală
  - Banner verde de confirmare "Lista precedentă a fost trimisă cu succes! · acum X min · N produse"
  - Empty state prietenos cu 🛒 și instrucțiuni
- **Ecran nou manager (IstoricCumparaturi.jsx):** listă toate cererile trimise, filtre (De cumpărat / Cumpărate / Toate), statistici sus, buton verde XL „MARCHEAZĂ CA CUMPĂRAT" per listă
- **Tile nou pe dashboard Manager** „🛒 Cumpărături — Cereri de la bucătărie" în submenu Detalii

**Test integrat (verificat pe local):**
1. Bucătar: adăugat Ulei + Roșii + Făină → contorul arată "3"
2. Bucătar apasă TRIMITE → lista devine goală, apare banner "Trimisă acum câteva secunde · 3 produse"
3. Manager deschide Cumpărături → vede "Total: 1 · Neîncumpărate: 1", card cu cele 3 produse, buton MARCHEAZĂ

**Rezultat:** Fluxul complet funcțional cu persistență reală + istoric permanent.

---

### Sesiunea 4 — Redesign vibrant + fix loading (22 iulie 2026)
**Ce s-a făcut:**
- **Font Poppins** peste tot (via Google Fonts CDN)
- **Culori vibrant** — verde/roșu/galben/albastru cu semnificație clară
- **Fundal cald** #FEF9F0 (crem cu galben subtil)
- **Body 18px minim**, line-height 1.6 (lizibilitate maximă)
- **Componentă `Buton`** reutilizabilă (6 variante × 3 dimensiuni + confirmare integrată)
- **Tile / Pill / Toast** rescrise mai mari, mai rotunjite, cu gradient și hover
- **Login page** cu gradient soft + input focus 4px
- **Ecran Cameristă** rescris cu pași 1/2/3 numerotați, butoane XL, mesaje prietenoase
- **Fix critic loading blocat:** timeout 8s + fallback 10s + URL magic `?reset=1` — nu se mai blochează la deploy nou
- **Jurnal proiect** creat (acest fișier) + intrare memorie pentru sesiuni viitoare

**Rezultat:** Aspect prietenos, ușor de folosit pentru non-tehnici. Angajații pot deschide adminul fără să se sperie.

---

## 🛠️ WORKFLOW TEHNIC COMPLET

### 🔑 Secrete și tokene (NU comita nicăieri!)

Toate secretele necesare pentru a lucra la admin sunt aici:

| Ce | Unde e stocat | Cum se folosește |
|---|---|---|
| **Vercel Token** | Nu e în cod. Se ia din Vercel Dashboard → Settings → Tokens → Create Token. Valoarea folosită acum: `vcp_VEZI_GOOGLE_DRIVE` | Export env var `$VERCEL_TOKEN` înainte de `npx vercel deploy --token=$VERCEL_TOKEN` |
| **Supabase Publishable Key** (client, safe) | `admin/.env.local` → `VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_5P8b9nG8GqIBnOTDGgh3_w_CcqlbKIs` + Vercel env var cu același nume | Automat de Vite la build; pentru client-side Supabase |
| **Supabase Secret Key** (server, SENSIBIL) | DOAR pe Vercel: env var `SUPABASE_SECRET_KEY=sb_secret_VEZI_GOOGLE_DRIVE`. NU în `.env.local` | Folosită de `admin/api/personal/*.js` (Vercel Functions) pentru creare cont + reset parolă |
| **Postgres direct URL** (pentru DDL scripts) | **NU mai e în cod** (scos din git în august 2026). Parola e în Google Drive. Scripturile `admin/scripts-temp/*.mjs` o citesc din variabila `DATABASE_URL` | Înainte de a rula un script: `export DATABASE_URL="postgresql://postgres.awrwzfrpeubztflvbwzj:PAROLA@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"` |
| **Credențialele celor 10 angajați** | `admin/scripts-temp/credentiale-conca-verde.json` (local, NU comit) | David are backup pe Google Drive |

---

### 📁 Structura folderelor active

```
D:\Git\Conca-verde\
├── ADMIN-CONCA-VERDE-JURNAL.md      ← ACEST FIȘIER
├── .claude/worktrees/trusting-goldwasser-36d81f/
│   └── admin/                        ← CODUL ADMINULUI (activ)
│       ├── .env.local                ← env vars locale (VITE_*)
│       ├── .vercel/project.json      ← legătură la proiect Vercel (id-uri)
│       ├── vercel.json               ← config framework
│       ├── vite.config.js            ← PWA config + build
│       ├── package.json              ← dependencies + scripts
│       ├── src/                      ← codul React
│       │   ├── App.jsx               ← router principal
│       │   ├── conectare/            ← supabase, auth, queries, poze
│       │   ├── componente/           ← Buton, Tile, Pill, Toast, Card, Topbar
│       │   └── ecrane/               ← 33 fișiere per rol (recepție/bucătar/ospătar/manager/cameristă)
│       ├── api/personal/             ← Vercel Functions (server-side)
│       │   ├── _helpers.js           ← auth check + admin client
│       │   ├── creare-cont.js
│       │   └── resetare-parola.js
│       ├── public/                   ← poze, logo, PWA icons, favicon
│       └── scripts-temp/             ← migrări DB + seed data
│           ├── credentiale-conca-verde.json
│           ├── schema-full.sql       ← schema completă
│           ├── rls-strict.sql        ← 40+ politici RLS
│           ├── p22-liste-cumparaturi.sql   ← migrări incrementale (p22, p23, p24, p25)
│           └── *.mjs                 ← scripturi Node de aplicat migrări
```

---

### 🚀 Cum se face un deploy nou (workflow standard)

**Pas 1** — Modifică fișierele din `admin/src/` (sau `admin/api/` pentru server-side).

**Pas 2** — Verifică local:
```bash
cd D:\Git\Conca-verde\.claude\worktrees\trusting-goldwasser-36d81f\admin
npm run dev
```
Deschide http://localhost:5173 și testează.

**Pas 3** — Build check (opțional dar recomandat):
```bash
npm run build
```

**Pas 4** — Deploy pe producție Vercel:
```bash
export VERCEL_TOKEN="vcp_VEZI_GOOGLE_DRIVE"
npx vercel deploy --prod --yes --token=$VERCEL_TOKEN
```

**Pas 5** — Verifică live: https://conca-verde-admin.vercel.app/?reset=1

**Deploy-ul durează ~30 secunde.** Vercel returnează un URL de deployment nou, iar aliasul `conca-verde-admin.vercel.app` e actualizat automat.

---

### 🗄️ Cum se rulează o migrare DB nouă

**Pas 1** — Creează fișierul SQL: `admin/scripts-temp/pXX-nume-descriptiv.sql`

Exemplu:
```sql
ALTER TABLE mese ADD COLUMN IF NOT EXISTS nou_camp text;
CREATE INDEX IF NOT EXISTS idx_mese_nou ON mese(nou_camp);
```

**Pas 2** — Rulează cu Node inline (fără să scrii un fișier .mjs separat):
```bash
cd D:\Git\Conca-verde\.claude\worktrees\trusting-goldwasser-36d81f\admin
node -e "
import('pg').then(async ({default: pg}) => {
  const fs = await import('fs');
  const SQL = fs.readFileSync('scripts-temp/pXX-nume.sql', 'utf8');
  const c = new pg.Client({ connectionString: 'postgresql://postgres.awrwzfrpeubztflvbwzj:PAROLA_VEZI_GOOGLE_DRIVE@aws-0-eu-central-1.pooler.supabase.com:5432/postgres', ssl:{rejectUnauthorized:false} });
  await c.connect();
  try { await c.query(SQL); console.log('✅ Aplicat'); }
  finally { await c.end(); }
});
"
```

**Reguli:**
- Folosește mereu `IF NOT EXISTS` / `DROP IF EXISTS` — scripturile trebuie să fie idempotente
- Adaugă noile tabele la `supabase_realtime` publication dacă vrei sync live
- Pentru RLS: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` + policy explicit

---

### 🔌 Cum se conectează un Claude nou (pe alt PC) la Vercel

Dacă adminul e deja pe disc dar folderul `.vercel` a fost șters sau lipsește:

```bash
cd D:\Git\Conca-verde\.claude\worktrees\.../admin
npx vercel link --token=$VERCEL_TOKEN
# alege: "David's projects" → "conca-verde-admin"
```

Asta re-creează `.vercel/project.json` cu id-urile corecte:
```json
{
  "projectId": "prj_Ui6xTLu3lT2DQ0ergCfstPGVXCp7",
  "orgId": "team_cHYrU8wehn8HM9LjgKUb0F2D",
  "projectName": "conca-verde-admin"
}
```

Fără acest fișier, `vercel deploy` nu știe unde să publice.

---

### 📦 Cum se face setup complet pe un PC nou (de la 0)

Ipoteză: adminul nu există local, doar pe Vercel.

```bash
# 1. Clonează site-ul (adminul e într-o ramură separată)
git clone https://github.com/cssibv/Conca-verde.git D:\Git\Conca-verde
cd D:\Git\Conca-verde
git checkout claude/trusting-goldwasser-36d81f  # ramura cu adminul (dacă e commituit)

# 2. Instalează dependencies admin
cd admin
npm install

# 3. Creează .env.local cu:
#    VITE_SUPABASE_URL=https://awrwzfrpeubztflvbwzj.supabase.co
#    VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_5P8b9nG8GqIBnOTDGgh3_w_CcqlbKIs

# 4. Link la proiect Vercel (dacă vrei să faci deploy)
npx vercel link --token=$VERCEL_TOKEN

# 5. Test local
npm run dev
```

**⚠️ Notă critică:** Adminul NU e commituit în git (vezi backlog). Deci pasul 1 nu funcționează încă — trebuie să copiezi folderul `admin/` manual până când David dă „commit admin".

---

### 🔐 Configurare env vars Vercel (când adaugi ceva nou)

```bash
# Listare
npx vercel env ls production --token=$VERCEL_TOKEN

# Adăugare (interactiv sau prin stdin)
echo "valoare_secretă" | npx vercel env add NUME_ENV production --token=$VERCEL_TOKEN

# Ștergere
npx vercel env rm NUME_ENV production --yes --token=$VERCEL_TOKEN
```

**Env vars curente pe Vercel:**
- `VITE_SUPABASE_URL` — public, folosit de client
- `VITE_SUPABASE_PUBLISHABLE_KEY` — public, folosit de client
- `SUPABASE_SECRET_KEY` — SENSIBIL, folosit de Vercel Functions

---

### 🐛 Debug pe producție

**Log-uri deploy + runtime:**
```bash
npx vercel logs --token=$VERCEL_TOKEN
```

**Inspect ultimul deploy:**
```bash
npx vercel inspect --token=$VERCEL_TOKEN
```

**Rollback la deploy anterior** (Dashboard Vercel → Deployments → click ... → Promote to Production).

**Când adminul „nu se încarcă"** pe telefon: prima încercare e `https://conca-verde-admin.vercel.app/?reset=1` (curăță cache PWA).

---

### 🧪 Testare fluxuri (browser automation în Claude)

Când Claude testează în browser, folosește tab-ul `seed` (predefinit) + login cu credențiale din `credentiale-conca-verde.json`. Toate testele se fac PE LOCAL (`http://localhost:5173`) înainte de deploy. După deploy, verificare pe prod cu `?reset=1`.

---

### 🔄 Realtime — cum funcționează

Supabase Realtime trimite event-uri WebSocket la clienți când se modifică date. Pentru un tabel:

1. **DB** — adaugă la publication: `ALTER PUBLICATION supabase_realtime ADD TABLE nume_tabel;`
2. **Client React** — subscribe:
```js
const canal = supabase
  .channel('nume-canal')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'nume_tabel' }, callback)
  .subscribe()
return () => supabase.removeChannel(canal)
```
3. **RLS** — Realtime aplică RLS SELECT policy pe fiecare event. Dacă clientul nu are drept SELECT pe rândul modificat, NU primește event-ul. **Atenție** — bug clasic (vezi sesiunea 11).

---

## 🔧 COMENZI UTILE (scurte)

**Deploy nou:**
```bash
cd D:\Git\Conca-verde\.claude\worktrees\trusting-goldwasser-36d81f\admin
npx vercel deploy --prod --yes --token=$VERCEL_TOKEN
```

**Verifică env vars Vercel:**
```bash
npx vercel env ls production
```

**Deschide adminul în browser cu curățare cache:**
```
https://conca-verde-admin.vercel.app/?reset=1
```

**Vezi log-urile de producție:**
```bash
npx vercel logs
```

---

## 📞 PENTRU CLAUDE-UL DIN URMĂTOAREA SESIUNE

**Instrucțiuni pentru tine:**

1. **ÎNCEPUT sesiune:** Deschide ACEST FIȘIER (`D:\Git\Conca-verde\ADMIN-CONCA-VERDE-JURNAL.md`) → ai contextul complet.
2. **În timpul sesiunii:** Lucrează pe adminul din worktree `D:\Git\Conca-verde\.claude\worktrees\trusting-goldwasser-36d81f\admin\`.
3. **La FINAL sesiune:** Adaugă o intrare nouă în "Istoric sesiuni" (data + ce s-a făcut + rezultat), bifează task-uri terminate, adaugă task-uri noi descoperite. Actualizează "Ultima actualizare" sus.

**Reguli de conversație cu David:**
- Non-programator — vorbește simplu, în română, fără jargon
- Preferă exemplu concret > explicație abstractă
- Confirmă înainte de operații riscante (delete DB, rotare chei, git push, etc.)
- Prezintă opțiuni când e cazul, cu recomandare, dar lasă-l să decidă
