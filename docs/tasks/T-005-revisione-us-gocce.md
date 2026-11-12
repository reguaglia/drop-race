# T-005: Revisione delle user story sulla creazione delle gocce

Stato: chiuso
Esecutore: code-reviewer
Milestone: 4
Dipendenze: T-004

## Obiettivo
Rivedere le tre user story prodotte in T-004 rispetto a `docs/requirements.md` (versione 0.7), sezione "Creazione delle gocce". Per gli stati ammessi si legge anche la sezione "Svolgimento della gara".

## Riferimenti
- `docs/tasks/T-004-user-story-gocce.md`, sezione "Esito": le tre user story da rivedere.
- `docs/requirements.md` (versione 0.7), sezione "### Creazione delle gocce": dal titolo "Creazione delle gocce" al titolo "Configurazione del finestrino" (escluso).
- `docs/requirements.md` (versione 0.7), sezione "### Svolgimento della gara": solo per gli stati ammessi.
- `docs/tasks/roadmap.md`: Milestone 4 e vincoli di processo.
- `docs/tasks/TEMPLATE.md`: formato dei task.
- `AGENTS.md`.

## Criteri di accettazione
- Massimo 8 voci, ciascuna con gravità, citazione testuale, criterio incriminato e correzione di al massimo 3 righe.
- Gravità Alta solo se un criterio è falso in uno stato ammesso dai requisiti o contraddice un altro criterio.
- Per ogni criterio, verificare questi stati: 0, 1, 7 e 8 gocce presenti; configurazione, conto alla rovescia e gara in corso; click dentro il finestrino, fuori, troppo vicino a un'altra goccia, vicino a un bordo.
- Non riproporre le tre domande aperte del product-owner.
- Nessuna modifica ai file, nessuna nuova regola.

## Fuori perimetro
- Modifica di `docs/requirements.md`, `docs/tasks/roadmap.md`, `AGENTS.md`, delle user story in T-004 o di qualsiasi altro file.
- Proposta di nuove regole, valori o funzionalità.
- Riformulazione completa delle user story.
- Le tre domande aperte del product-owner, già in "Da decidere" di T-004.
- Le scelte tecniche già lasciate fuori dal product-owner (meccanica e area di presa del trascinamento, ordine e valori della palette, resa dei messaggi, hit-testing del finestrino).

## Da decidere
- Promozione delle user story in `docs/acceptance/` in sostituzione di `US-001-creazione-gocce.md`: spetta al committente.
- Accoglimento o meno dei rilievi del revisore e relativa correzione delle user story: spetta al committente.
- Le tre domande aperte del product-owner restano in "Da decidere" di T-004: la risoluzione spetta al committente.

## Esito
8 voci; accettate 1-4 e 6-8, scartata la 5; correzioni applicate in US-001, vedi T-004

## Revisione

## Costo
Deleghe effettuate: 4 (le prime tre con output vuoto; la quarta, ripresa della terza sessione, ha prodotto la revisione riportata nell'Esito)
