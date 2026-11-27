# T-014: game — piazzamento e assegnazione colori

Stato: chiuso
Esecutore: qa (passo 1), poi developer (passo 2)
Milestone: 5
Dipendenze: T-012

## Obiettivo
Implementare nel modulo `game` il piazzamento delle gocce dinamiche e l'assegnazione dei colori, guidati da test di accettazione scritti prima dal QA. Il QA scrive ed esegue i test, che devono fallire prima dell'implementazione; il Developer li fa passare senza modificare i test.

## Riferimenti
- `docs/acceptance/US-001-creazione-gocce.md`: solo i criteri US-1.1–US-1.6 e US-2.1–US-2.5.
- `docs/adr/ADR-002-contratto-game.md`: regole 1, 2 e 4; sezione «Contratto»; conseguenze (`DRAG_THRESHOLD`); assunzione A7.
- `docs/requirements.md`: paragrafo «Un tentativo di piazzamento è valutato in quest'ordine» (con la frase conclusiva «In tutti gli altri casi la goccia viene creata.»); sezione «Creazione delle gocce» per quota, distanze e palette richiamate dai criteri.
- `src/shared/game-contract.ts` e `src/shared/constants.ts`: tipi e costanti prodotti da T-012.
- `docs/tasks/roadmap.md`: Milestone 5.

## Criteri di accettazione

### Passo 1 — QA (prima)
- Crea `src/game/placement.acceptance.test.ts` (il file importa `createGame` da `./createGame`); nessun altro file.
- Un tocco è `pointerDown(p)` seguito da `pointerUp(p)` nello stesso punto, in unità logiche.
- Almeno un test per ogni criterio nel perimetro. Riporta integralmente in `## Esito` la tabella seguente, compilata, e l'elenco dei criteri non coperti:

| Criterio | Test |
| --- | --- |
| US-1.1 — fuori dal finestrino: nessuna goccia e nessun messaggio | |
| US-1.2 — 8 gocce: `dropletLimitReached`, nessuna goccia creata | |
| US-1.3 — aggancio a x = 3 oppure x = 97 | |
| US-1.4 — distanza tra 3 e 9 unità: `positionTooClose` | |
| US-1.5 — punto libero valido: goccia creata all'istante | |
| US-1.6 — la y del tocco non influisce sulla x risultante | |
| US-2.1 — palette di 8 colori distinti | |
| US-2.2 — colori usati dalle gocce presenti non selezionabili | |
| US-2.3 — colore scelto per la goccia successiva | |
| US-2.4 — nessuna scelta: primo colore non utilizzato | |
| US-2.5 — dopo il piazzamento la scelta viene rimossa | |
| Regola 1 — comandi validi nello stato iniziale `configuring` | |
| Regola 2 — tocco entro `DRAG_THRESHOLD` su punto libero | |
| Regola 4 e paragrafo dell'ordine di valutazione | |
| Stato iniziale restituito da `getView` | |
| Criteri non coperti | (dichiarare esplicitamente, anche se vuoti) |

- Indicazioni per costruire i casi:
  - Per `positionTooClose` (US-1.4) usa distanze tra i centri **maggiori di `DROPLET_RADIUS`** e **minori di `MIN_CENTER_DISTANCE`**. A distanza minore o uguale al raggio il tocco cade sulla goccia: è selezione, tema di T-015, fuori perimetro.
  - Per riempire fino a otto gocce, piazzale a distanza `MIN_CENTER_DISTANCE` l'una dall'altra, ben dentro il finestrino, così la fascia di aggancio non falsa i casi.
  - Con otto gocce, un tocco troppo vicino a un'altra goccia deve dare `dropletLimitReached`: il limite si valuta prima della distanza, come nel paragrafo dell'ordine di valutazione.
  - US-1.6: la quota della goccia non è osservabile nella vista di configurazione; verifica solo che la `y` del tocco non influisca sulla `x` risultante. Il resto va in «Da decidere».
  - US-1.7 è fuori perimetro: non scrivere test.
  - `chooseColor` con un colore non selezionabile non è specificato: riportalo in «Da decidere» senza testarlo.
- Esegui i test prima dell'implementazione e riporta l'output grezzo in `## Esito`: i test devono fallire.

### Passo 2 — Developer (dopo)
- Crea `src/game/createGame.ts` e, se servono, file di supporto in `src/game/`.
- Implementa solo `getView`, `pointerDown`, `pointerUp` (tocco su un punto libero, entro `DRAG_THRESHOLD`) e `chooseColor` (solo per la goccia successiva, senza goccia selezionata).
- Il piazzamento usa il punto di pointerUp.
- Stato iniziale: nessuna goccia; `windowHeight = WINDOW_HEIGHT_DEFAULT`; `obstacleLevel = DEFAULT_OBSTACLE_LEVEL`; palette `PALETTE_COLOR_IDS` tutta `selectable`; `selectedDropletId = null`; `nextDropletColorId = null`; `canStart = false`.
- Gli altri metodi di `Game` sollevano `Error('not implemented')`.
- `chooseColor` con un colore non selezionabile non produce effetti né eventi (confermato).
- Nessun uso di `createRace` in questo task.
- Tutti i test di accettazione passano; `npm test`, `npm run typecheck` e `npm run build` passano, con output riportato.
- Nessun file fuori da `src/game/`; nessun file `*.acceptance.test.ts` modificato.
- Nessuna regola oltre il perimetro; nessun `Math.random`, `Date`, timer né import da React o dal DOM.

## Fuori perimetro
- Selezione, trascinamento, ricolorazione, eliminazione: inclusi US-1.7, US-2.6, US-2.7 e US-3.x, nonché `pointerMove`, `pointerCancel` e il gesto che supera `DRAG_THRESHOLD`.
- Fasi, conto alla rovescia, motore: `advance`, `startCountdown`, `startNewGame`, `createRace` e la creazione del motore.
- Modifica di altezza e livello degli ostacoli oltre i valori iniziali (`setWindowHeight`, `setObstacleLevel`).
- Qualsiasi modifica a requisiti, ADR, roadmap, `AGENTS.md`, template o altri file fuori da `src/game/` (QA: solo il file di test; Developer: solo `src/game/`).
- Approvazione o chiusura del task.

## Da decidere
- US-1.6: la quota fissa delle gocce (centro a 7 unità dal bordo superiore, bordo inferiore sulla linea di partenza a 10) non è osservabile nella vista di configurazione definita in ADR-002. Come si intende verificarla o visualizzarla? Il QA verifica per ora solo l'indipendenza della `x` dalla `y` del tocco.

## Esito
Da registrare dal committente con l'output integrale del QA e poi del Developer (l'Orchestrator non delega: QA e Developer sono agenti primari avviati dal committente).
- Passo 1 — QA: output integrale, tabella criterio → test compilata, criteri non coperti, output grezzo dei test prima dell'implementazione.
- Passo 2 — Developer: output integrale, output di `npm test`, `npm run typecheck` e `npm run build`.

Implementato dal Developer; test di accettazione del QA in due round; mutazioni verificate a mano

## Revisione
Da registrare dal committente. L'Orchestrator non approva né chiude il task senza conferma esplicita.

## Costo
Deleghe effettuate: 0 (nessuna delega richiesta: QA e Developer sono agenti primari avviati dal committente). Deleghe a vuoto: 0.
