# ADR-002 — Contratto del modulo `game`

Stato: aprovato
Data: 18 novembre 2026
Origine: T-009 (proposta dell'Architect), T-010 (revisione), decisioni G1-B, G2-B, G3-A del committente
Requisiti: versione 1.0

## Contesto
ADR-001 (R2) assegna a `game` le regole di configurazione e le fasi. Questo ADR ne definisce comandi, vista ed eventi, a partire da `docs/acceptance/US-001-creazione-gocce.md`.

## Decisioni
- **G1-B. Eventi del puntatore normalizzati.** L'interfaccia traduce le coordinate dello schermo in unità logiche e inoltra giù, muovi, su e annulla. `game` decide cosa è un tocco e cosa un trascinamento, quale goccia è stata colpita, la selezione e il piazzamento. La soglia tra tocco e trascinamento sta in `shared`.
- **G2-B. Vista a unione per fase, messaggi come eventi.** La vista ha quattro forme: configurazione (gocce, colori, selezione, palette), conto alla rovescia (configurazione e tempo residuo), gara (snapshot e colori) ed esito (gara e vincitore oppure timeout). I messaggi sono eventi, non stato.
- **G3-A. `advance` consapevole della fase.** Un solo ingresso per il tempo reale. Alla scadenza del conto alla rovescia `game` crea il motore e inizia la gara nella stessa chiamata.

## Regole del contratto (verificabili senza browser)
1. **Fasi.** I comandi dell'utente sono validi solo in `configuring`; `startNewGame` solo in `finished`. Fuori fase il comando è rifiutato: la vista non cambia e non viene emesso alcun evento. `startCountdown` con `canStart` falso è rifiutato allo stesso modo.
2. **Gesto.** `pointerDown` apre un gesto. Se il punto resta entro `DRAG_THRESHOLD` fino a `pointerUp`, è un tocco: su una goccia la seleziona (o la deseleziona se già selezionata), su un punto libero tenta il piazzamento. Se supera la soglia partendo da una goccia, è un trascinamento: seleziona e sposta la goccia. Un gesto che supera la soglia partendo da un punto libero non produce effetti.
3. **Annullamento.** `pointerCancel`, oppure l'ingresso in una fase diversa da `configuring` durante un gesto, annulla il gesto: la goccia torna alla posizione precedente, senza messaggi e senza piazzamenti.
4. **Piazzamento.** Ordine di valutazione e rilascio non valido come da requisiti («Creazione delle gocce»).
5. **Tempo.** `advance(elapsedMs)` solleva un errore se `elapsedMs` non è finito o è negativo, in ogni fase. In `countdown` scala `remainingMs` a partire da `COUNTDOWN_MS`. Alla scadenza crea il motore con `nextSeed()`, passa a `racing` al tick 0 e scarta il tempo eccedente. In `finished` non modifica nulla e non emette eventi (R5 di ADR-001).
6. **Messaggi.** `dropletLimitReached` e `positionTooClose` sono eventi; quanto restano visibili è deciso dall'interfaccia.
7. **Colore.** Il motore non lo riceve (R3 di ADR-001); `game` lo unisce allo snapshot in `RaceView`. `selectable` vale per i colori non utilizzati da altre gocce presenti; il colore proprio della goccia selezionata resta selezionabile e sceglierlo non cambia nulla.

## Contratto
```ts
import type { LogicalUnit, DropletId, ObstacleLevel, RaceSnapshot, RaceDependencies, Seed } from './contract';
export type DropColorId = string;
export interface Point { readonly x: LogicalUnit; readonly y: LogicalUnit }
export interface ConfiguredDropletView { readonly id: DropletId; readonly x: LogicalUnit; readonly colorId: DropColorId }
export interface PaletteEntryView { readonly colorId: DropColorId; readonly selectable: boolean }
export interface ConfigurationView { readonly windowHeight: LogicalUnit; readonly obstacleLevel: ObstacleLevel; readonly droplets: readonly ConfiguredDropletView[]; readonly selectedDropletId: DropletId | null; readonly nextDropletColorId: DropColorId | null; readonly palette: readonly PaletteEntryView[]; readonly canStart: boolean }
export interface RaceDropletColor { readonly dropletId: DropletId; readonly colorId: DropColorId }
export interface RaceView { readonly snapshot: RaceSnapshot; readonly colors: readonly RaceDropletColor[] }
export type GameOutcomeView = { readonly kind: 'winner'; readonly dropletId: DropletId; readonly colorId: DropColorId } | { readonly kind: 'timeout' };
export type GameView = { readonly phase: 'configuring'; readonly configuration: ConfigurationView } | { readonly phase: 'countdown'; readonly configuration: ConfigurationView; readonly remainingMs: number } | { readonly phase: 'racing'; readonly race: RaceView } | { readonly phase: 'finished'; readonly race: RaceView; readonly outcome: GameOutcomeView };
export type GameMessage = { readonly type: 'dropletLimitReached' } | { readonly type: 'positionTooClose' };
export type GameEvent = { readonly type: 'message'; readonly message: GameMessage } | { readonly type: 'absorbed'; readonly absorberId: DropletId; readonly absorbedId: DropletId } | { readonly type: 'finished'; readonly outcome: GameOutcomeView };
export interface GameStep { readonly view: GameView; readonly events: readonly GameEvent[] }
export interface GameDependencies { readonly nextSeed: () => Seed; readonly race: RaceDependencies }
export interface Game { getView(): GameView; advance(elapsedMs: number): GameStep; pointerDown(point: Point): GameStep; pointerMove(point: Point): GameStep; pointerUp(point: Point): GameStep; pointerCancel(): GameStep; chooseColor(colorId: DropColorId): GameStep; deleteSelectedDroplet(): GameStep; setWindowHeight(value: LogicalUnit): GameStep; setObstacleLevel(level: ObstacleLevel): GameStep; startCountdown(): GameStep; startNewGame(): GameStep }
export declare function createGame(dependencies: GameDependencies): Game;
```

## Alternative scartate
- G1-A: comandi semantici più una query `hitTest`. Scartata: la priorità tra tocco e selezione finirebbe nell'interfaccia.
- G2-A: vista unica con il messaggio nello stato. Scartata: obbliga a inventare una durata del messaggio.
- G3-B: avvio esplicito della gara. Scartata: se il chiamante dimentica la chiamata, la partita resta ferma.

## Conseguenze
- I tipi di vista e di evento vivono in `src/shared`; `ui` e `render` non importano `game`.
- `shared` contiene anche `COUNTDOWN_MS` (3000) e `DRAG_THRESHOLD` (valore provvisorio: 1 unità logica).
- `app` inoltra i gesti a `game`, accumula gli eventi e li pubblica con la vista (R4 di ADR-001).

## Assunzioni da confermare
- A1. Il colore proprio della goccia selezionata resta selezionabile (requisiti 1.0).
- A3. Il seed è estratto alla creazione del motore.
- A4. Il tempo eccedente la scadenza del conto alla rovescia è scartato.
- A5. I comandi fuori fase sono rifiutati in silenzio.
- A7. Il piazzamento avviene al rilascio del tocco.

## Rimandato a Milestone 5
Valore di `DRAG_THRESHOLD`, area di presa del tocco (provvisoria: il cerchio della goccia, come da requisiti), durata dei messaggi a schermo.