# ADR-001 — Architettura iniziale

Stato: proposto
Data: 16 novembre 2026
Origine: T-006 (proposta dell'Architect), T-007 (revisione), decisioni R1–R5 del committente
Requisiti: versione 0.8

## Contesto
Il motore deve essere indipendente dal rendering, con timestep fisso indipendente dal frame rate e determinismo testabile; React gestisce interfaccia e stato applicativo, il Canvas disegna. La specifica di riferimento è `docs/acceptance/US-001-creazione-gocce.md`.

## Decisioni
- **R1.** Il motore possiede lo stato della gara e la politica dei passi fissi: riceve il tempo reale trascorso e decide quanti passi eseguire. L'orologio del browser è di `app`, che passa solo il tempo.
- **R2.** Un modulo `game`, in TypeScript puro senza React né DOM, possiede le regole di configurazione (US-1, US-2, US-3) e le fasi (configurazione, conto alla rovescia, gara, esito, nuova partita: US-4). Usa il motore.
- **R3.** Il colore resta fuori dal motore. Il motore riceve per ogni goccia solo un identificativo e la x; la mappa identificativo→colore sta in `game`.
- **R4.** Struttura e dipendenze come sotto. Gli eventi della simulazione (inglobamenti, fine gara) passano da `game` ad `app`, che li accumula tra due pubblicazioni verso React.
- **R5.** Gli snapshot sono immutabili (campi `readonly`; il motore non espone riferimenti al proprio stato). Dopo l'esito, `advance` non modifica nulla e non emette eventi.

## Struttura e dipendenze
- `src/shared`: tipi, costanti dei requisiti (larghezza 100, raggio 3, ...), contratto della simulazione. Non importa nulla.
- `src/simulation`: motore e generatore pseudo-casuale. Importa `shared`.
- `src/game`: regole e fasi. Importa `shared` e `simulation`.
- `src/render`: disegno su Canvas. Importa `shared`.
- `src/ui`: componenti React. Importa `shared`.
- `src/app`: composizione, orologio del browser, adattatore verso React. Non contiene regole.
- Vietato: `simulation` e `game` importano React, DOM o Canvas; `render` e `ui` importano `simulation` o `game`.

## Flusso di un frame
1. Il browser chiama `app` a ogni frame con il tempo reale trascorso.
2. `app` passa il tempo a `game`: nel conto alla rovescia lo scala, in gara lo passa a `simulation`.
3. `simulation` esegue zero o più passi fissi, risolve contatti e inglobamenti e restituisce snapshot ed eventi.
4. `app` fa disegnare a `render` a ogni frame e accumula gli eventi.
5. A frequenza più bassa `app` pubblica vista ed eventi a React (`ui`).

## Contratto della simulazione
```ts
// Convenzione: unità logiche; origine in alto a sinistra; x verso destra,
// y verso il basso (verso il traguardo). "Quota maggiore" = più vicino al traguardo.
export type LogicalUnit = number;
export type Seed = number;
export type DropletId = string;
export type ObstacleLevel = 'low' | 'medium' | 'high';

export interface RaceDropletInit {
  readonly id: DropletId;
  readonly x: LogicalUnit;
}

export interface RaceConfig {
  readonly windowHeight: LogicalUnit;
  readonly obstacleLevel: ObstacleLevel;
  readonly droplets: readonly RaceDropletInit[];
}

export interface RngState {
  readonly serialized: string;
}

export interface Rng {
  next(): number;
  getState(): RngState;
}

export type RngFactory = (seed: Seed) => Rng;

export interface RaceDependencies {
  readonly createRng: RngFactory;
}

export interface DropletView {
  readonly id: DropletId;
  readonly kind: 'dynamic' | 'static';
  readonly x: LogicalUnit;
  readonly y: LogicalUnit;
  readonly radius: LogicalUnit;
  readonly blocked: boolean;
  readonly power: number | null;
}

export interface ObstacleView {
  readonly id: string;
  readonly kind: 'spatial' | 'airflow';
}

export type RaceOutcome =
  | { readonly kind: 'winner'; readonly dropletId: DropletId }
  | { readonly kind: 'timeout' };

export interface RaceSnapshot {
  readonly tick: number;
  readonly windowHeight: LogicalUnit;
  readonly droplets: readonly DropletView[];
  readonly obstacles: readonly ObstacleView[];
  readonly outcome: RaceOutcome | null;
}

export type SimulationEvent =
  | { readonly type: 'absorbed'; readonly absorberId: DropletId; readonly absorbedId: DropletId }
  | { readonly type: 'finished'; readonly outcome: RaceOutcome };

export interface AdvanceResult {
  readonly snapshot: RaceSnapshot;
  readonly events: readonly SimulationEvent[];
}

export interface SimulationEngine {
  readonly seed: Seed;
  advance(elapsedMs: number): AdvanceResult;
  getSnapshot(): RaceSnapshot;
  getRngState(): RngState;
}

export declare function createRace(
  config: RaceConfig,
  seed: Seed,
  deps: RaceDependencies,
): SimulationEngine;
```

## Invarianti verificabili senza browser
1. Stesso seed e stessa sequenza di tempo producono lo stesso snapshot e lo stesso stato del generatore.
2. Suddividere il tempo in chiamate diverse non cambia il risultato: `advance(a)` seguito da `advance(b)` equivale a `advance(a + b)`, entro il limite di recupero per chiamata (M6).
3. Dopo l'esito, `advance` restituisce lo stesso snapshot e nessun evento.
4. Il motore non riceve e non legge colori.
5. Modificare uno snapshot ricevuto non altera lo stato del motore.

## Alternative scartate
- D1-B: React possiede lo stato e chiama una funzione pura a ogni frame. Scartata: il ritmo dipende da React e il ciclo è difficile da testare senza browser.
- D2-B: funzioni pure con stato esplicito. Rivalutabile se serviranno replay o serializzazione dello stato.
- D3-B: cartelle per funzionalità. Scartata: indebolisce l'isolamento del motore.

## Conseguenze
- Le regole di una storia nuova vanno in `game`; se una regola finisce in `app`, manca un modulo.
- Verifica automatica dei confini (tsconfig senza libreria DOM per `simulation` e `game`, controllo degli import): da definire in Milestone 5; nessuna libreria senza approvazione.
- Il contratto di `game` (comandi dell'utente e vista) si definisce all'inizio di M5 sulle storie US-1–US-4.

## Assunzioni da confermare
- A1. La potenza compare nello snapshot, senza essere mostrata all'utente, perché serve ai test.
- A2. La sorgente di entropia per il seed è iniettata da `app`: `game` non chiama né `Math.random` né `crypto`.
- A3. Il conto alla rovescia (tempo reale) è gestito da `game`; durante il conto alla rovescia il motore non esiste ancora.
- A4. `elapsedMs` deve essere finito e non negativo; altrimenti il motore solleva un errore.

## Rimandato
Durata del passo, limite di recupero, unità del tempo (M6); generatore procedurale (M7); contratto di `game` e cadenza di pubblicazione verso React (M5).