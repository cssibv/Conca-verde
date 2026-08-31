# Proiect Conca Verde — instrucțiuni Claude

## 📓 CITEȘTE PRIMA DATĂ jurnalul complet

**Înainte să faci orice în acest proiect, deschide și citește jurnalul:**

```
D:\Git\Conca-verde\ADMIN-CONCA-VERDE-JURNAL.md
```

Conține:
- Toată arhitectura (tech stack, URLs, cheile secrete, cont Vercel)
- Structura completă pe disc (unde e adminul, poze, scripturi)
- Ce e implementat pe fiecare rol (recepție/bucătar/ospătar/manager/cameristă)
- Workflow tehnic complet (cum se face deploy, cum se rulează migrări DB, cum se conectează Vercel)
- Backlog cu task-uri prioritizate
- Probleme cunoscute + workarounds
- Istoric detaliat pentru toate sesiunile anterioare

## ✍️ ACTUALIZEAZĂ jurnalul la FINAL

După fiecare sesiune de lucru pe admin:
1. Adaugă intrare nouă în „Istoric sesiuni" (data + ce ai făcut + rezultat)
2. Bifează task-uri terminate în backlog, adaugă cele noi descoperite
3. Actualizează linia „Ultima actualizare" din capul fișierului
4. Dacă ai schimbat arhitectura, structura DB, sau ai adăugat comenzi noi de workflow — actualizează și acele secțiuni

## 🗣️ Reguli conversație cu David (patronul)

- **Non-programator** — vorbește simplu, în română, fără jargon tehnic
- Preferă exemplu concret > explicație abstractă
- Confirmă înainte de operații riscante (delete DB, rotare chei, git push, etc.)
- Prezintă opțiuni când e cazul, cu recomandare clară, dar lasă-l să decidă
- La final: pas cu pas ce să verifice pe telefon

## 🎯 Structura proiectului pe scurt

- `D:\Git\Conca-verde\` — site public conca-verde.ro (HTML/CSS)
- `D:\Git\Conca-verde\.claude\worktrees\trusting-goldwasser-36d81f\admin\` — codul adminului (React + Supabase, deploy pe Vercel)
- `D:\Git\Conca-verde\ADMIN-CONCA-VERDE-JURNAL.md` — jurnalul complet
