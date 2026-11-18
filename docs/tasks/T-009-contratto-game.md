# T-009: Contratto del modulo `game`

Stato: chiuso
Esecutore: architect
Milestone: 5
Dipendenze: nessuna

## Obiettivo
Proporre il contratto del modulo `game` previsto dalla decisione R2 di ADR-001 — cioè cosa l'utente può fare (comandi) e cosa può vedere (vista) — in tre decisioni (G1, G2, G3), ciascuna con due alternative, trade-off e raccomandazione, da sottoporre al committente.

## Riferimenti
- `docs/adr/ADR-001-architettura-iniziale.md`: decisione R2 (perimetro di `game`), R3 (il colore sta in `game`), R5 (snapshot immutabili, comportamento dopo l'esito), A2 (entropia del seed iniettata da `app`), A3 (conto alla rovescia in `game`, motore non ancora esistente), «Rimandato» (contratto di `game` a M5).
- `docs/acceptance/US-001-creazione-gocce.md`: US-1, US-2, US-3, US-4 e «Non coperto».
- `docs/requirements.md`: sezione «Creazione delle gocce» e paragrafo «Selezione e modifica» al suo interno; per le fasi, «Svolgimento della gara» (avvio, congelamento, esito, nuova partita).
- `docs/tasks/roadmap.md`: Milestone 5 e vincoli di processo.
- `docs/tasks/TEMPLATE.md`.

## Criteri di accettazione
- Al massimo 150 righe; per ogni decisione al massimo due alternative.
- Per ogni alternativa: una spiegazione di 3 righe comprensibile a un non specialista e un flusso di 5 righe.
- Una tabella «stato × comando» per la fase di configurazione: per ogni comando e per gli stati rilevanti (gocce presenti 0, 1, 7, 8; goccia selezionata sì/no; scelta del colore sì/no) l'esito atteso, coerente con i criteri di US-001 e con il paragrafo «Selezione e modifica».
- Un percorso completo di una partita (configurazione, conto alla rovescia, gara, esito, nuova partita) con il modulo che agisce a ogni passo.
- Solo tipi e firme TypeScript, nessun codice di implementazione, nessun valore fisico, nessun riferimento a React o al DOM.
- Le ambiguità dei requisiti sono segnalate, non risolte; nessuna libreria esterna.
- Nessun file creato né modificato oltre al task.

Contenuto atteso delle tre decisioni:
- G1. Superficie dei comandi: comandi semantici (piazza, seleziona, sposta, scegli colore, elimina, avvia) oppure eventi grezzi del puntatore; chi traduce le coordinate dello schermo in unità logiche e chi stabilisce quale goccia è stata cliccata.
- G2. Vista: cosa leggono `ui` e `render` (fase, gocce con colore e selezione, palette con colori disponibili, conto alla rovescia, esito, messaggi), in un'unica vista oppure divisa; come viaggiano i messaggi «numero massimo» e «posizione troppo vicina»: campo di stato o evento.
- G3. Tempo e fasi: come `advance(elapsedMs)` gestisce conto alla rovescia, creazione del motore con seed iniettato (assunzione A2) e nuova partita.

## Fuori perimetro
- Codice di implementazione, valori fisici, formule, algoritmi di generazione.
- Modifica di requisiti, roadmap, `AGENTS.md`, ADR, `docs/acceptance/` o altri file.
- Scelte che i requisiti demandano al committente (adozione di G1/G2/G3, promozione in ADR).

## Da decidere
- G1: superficie dei comandi e ripartizione della traduzione coordinate/aggancio della goccia.
- G2: forma della vista e percorso dei messaggi.
- G3: gestione del tempo e delle fasi in `advance(elapsedMs)`.
- Le ambiguità dei requisiti segnalate dall'Architect restano da decidere: la proposta non le risolve.
- Promozione del contratto approvato in `docs/adr/`.

## Esito
Proposta G1-B, G2-B, G3-A approvata e registrata in docs/adr/ADR-002-contratto-game.md

## Revisione
Da assegnare dopo l'esito.

## Costo
Deleghe effettuate: 2 (1 a vuoto: la prima chiamata all'architect è tornata senza output; la seconda, ripresa della stessa sessione, ha prodotto la proposta riportata sopra)

Commento dell'Orchestrator: esito ricevuto alla seconda delega; la prima è tornata vuota ed è stata ripetuta una sola volta riprendendo la stessa sessione, come da regola. Ho incollato l'output integrale senza modifiche. Verifica formale: tre decisioni G1/G2/G3 con due alternative ciascuna, ognuna con spiegazione in tre righe e flusso in cinque; tabella «stato × comando» con gli stati richiesti; percorso completo in otto passi; contratto con soli tipi e firme, senza React, DOM o valori fisici; sei ambiguità segnalate e non risolte; nessuna libreria proposta. Non ho valutato nel merito la proposta né le raccomandazioni: restano da sottoporre al committente.
