# T-012: shared e stub

Stato: proposto
Esecutore: developer
Milestone: 5
Dipendenze: nessuna

## Obiettivo
Implementare in `src/` i tipi dei contratti, le costanti dei requisiti e lo stub del motore.

## Riferimenti
- `docs/adr/ADR-001-architettura-iniziale.md`: sezione «Contratto della simulazione» (blocco TypeScript da copiare in `src/shared/contract.ts`), struttura e dipendenze, assunzione A4 (`elapsedMs` finito e non negativo).
- `docs/adr/ADR-002-contratto-game.md`: sezione «Contratto» (blocco TypeScript da copiare in `src/shared/game-contract.ts`), decisione G1-B e conseguenze (`COUNTDOWN_MS`, `DRAG_THRESHOLD` provvisorio).
- `docs/requirements.md`: sezione «Creazione delle gocce» (limiti, raggio, distanze, linea/posizione di partenza, palette 8 colori distinti e ordine di assegnazione); sezione «Configurazione del finestrino» (larghezza 100, altezza 250–1000, predefinito 700, livelli ostacoli); sezione «Svolgimento della gara» (conto alla rovescia 3 secondi). I valori colore della palette sono del rendering e non si decidono qui.
- `docs/tasks/roadmap.md`: Milestone 5.

## Criteri di accettazione

### 1. Contratti (`src/shared/`)
- `src/shared/contract.ts`: copia esatta del blocco TypeScript di `docs/adr/ADR-001-architettura-iniziale.md` (sezione «Contratto della simulazione»).
- `src/shared/game-contract.ts`: copia esatta del blocco TypeScript di `docs/adr/ADR-002-contratto-game.md` (sezione «Contratto»).
- Le dichiarazioni di `createRace` e `createGame` sono solo firme: le implementazioni vivono rispettivamente in `simulation` e `game`.

### 2. Costanti (`src/shared/constants.ts`)
- Definire le costanti dei requisiti; ciascuna deve avere accanto un commento con la citazione testuale tra `«»` tratta da `docs/requirements.md`:
  - `WINDOW_WIDTH` = 100
  - `WINDOW_HEIGHT_MIN` = 250, `WINDOW_HEIGHT_MAX` = 1000, `WINDOW_HEIGHT_DEFAULT` = 700
  - `DROPLET_RADIUS` = 3
  - `MIN_DROPLETS` = 2, `MAX_DROPLETS` = 8
  - `MIN_CENTER_DISTANCE` = 9
  - `SIDE_MARGIN` = 3
  - `START_LINE_Y` = 10
  - `DROPLET_START_Y` = 7
  - `COUNTDOWN_MS` = 3000
  - `DEFAULT_OBSTACLE_LEVEL` = `'medium'`
  - `PALETTE_COLOR_IDS`: otto identificativi neutri `'color-1'` ... `'color-8'` (l'ordine è l'ordine di assegnazione; i valori colore sono del rendering e non si decidono qui)
  - `DRAG_THRESHOLD` = 1 con commento `«provvisorio, da tarare in M5»`

### 3. Stub del motore (`src/simulation/`)
- Implementare `createRace` con lo stub:
  - la configurazione genera le gocce dinamiche (x dalla configurazione, y = `DROPLET_START_Y`, raggio `DROPLET_RADIUS`, potenza 0, non bloccate);
  - nessun ostacolo;
  - esito `null`;
  - tick 0.
- `advance(elapsedMs)` solleva un errore se `elapsedMs` non è finito o è negativo; altrimenti non cambia nulla e restituisce lo snapshot corrente con eventi vuoti.
- Il generatore si ottiene da `deps.createRng(seed)`; `getRngState` lo riporta.
- Nessuna fisica, nessun valore fisico inventato, nessun `Math.random`.

### 4. Test (Vitest, accanto al codice)
- Stesso seed e stessa configurazione danno snapshot uguali.
- `createRng` chiamato con il seed.
- Modificare uno snapshot ricevuto non altera il motore.
- `elapsedMs` `NaN`, `Infinity` e negativo sollevano errore.
- `Math.random` mai chiamato.
- Le costanti rispettano le relazioni dei requisiti (per esempio che otto gocce stanno nella larghezza: `7 * MIN_CENTER_DISTANCE + 2 * DROPLET_RADIUS <= WINDOW_WIDTH`).

### 5. Verifica e vincoli
- `npm run typecheck`, `npm test` e `npm run build` passano; l'output reale va riportato nel report del Developer.
- Nessun file modificato o creato fuori da `src/`.
- Nessun React, DOM o dipendenza nuova.
- Nessuna funzionalità oltre il perimetro.
- Ogni costante ha la sua citazione.

## Fuori perimetro
- Il modulo `game`.
- La fisica e il modello matematico.
- Il generatore pseudo-casuale reale.
- Interfaccia utente e rendering.
- Qualsiasi modifica a requisiti, ADR, roadmap, `AGENTS.md` o altri file fuori da `src/`.

## Da decidere
- Nessuna.

## Esito
Da registrare dal committente con l'output integrale del Developer (l'Orchestrator non delega: il Developer è un agente primario avviato dal committente).

## Revisione
Da assegnare dopo l'esito.

## Costo
Deleghe effettuate: 0 (task creato dall'Orchestrator senza deleghe, come richiesto).
