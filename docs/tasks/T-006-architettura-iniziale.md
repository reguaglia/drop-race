# T-006: Architettura iniziale

Stato: in revisione
Esecutore: architect
Milestone: 4
Dipendenze: nessuna

## Obiettivo
Proporre l'architettura iniziale in tre decisioni, ciascuna con due alternative, trade-off e raccomandazione, da sottoporre al committente.

- D1. Proprietà dello stato e del ciclo di aggiornamento: motore o React, e come l'interfaccia lo osserva (snapshot a bassa frequenza o a ogni frame).
- D2. Contratto del modulo di simulazione: interfaccia TypeScript (solo tipi e firme) che copra creazione della gara, avanzamento a passo fisso, lettura dello stato, generatore pseudo-casuale con seed iniettabile, convenzione delle coordinate, accesso per i test.
- D3. Struttura dei moduli e delle cartelle in `src/` (motore, generatore, interfaccia, rendering) e regole di dipendenza tra loro.

## Riferimenti
- `docs/requirements.md` (v0.8): «Aspetto grafico» (React per interfaccia e stato applicativo; logica di simulazione indipendente dal rendering; Canvas); «Fisica della simulazione» (timestep controllato indipendente dal frame rate; testabilità deterministica; motore come modulo indipendente); «Vincoli tecnici».
- `docs/tasks/roadmap.md`: Milestone 4 (contratto del `SimulationEngine`: interfaccia, generatore con seed iniettabile, snapshot dello stato) e vincoli di processo.
- `docs/tasks/TEMPLATE.md`.

## Criteri di accettazione
- Al massimo 120 righe in totale; per ogni decisione al massimo due alternative.
- Nessun valore fisico e nessun algoritmo di fisica o di generazione (milestone 6 e 7).
- Ogni raccomandazione è motivata con testabilità e determinismo.
- Le ambiguità dei requisiti sono segnalate, non risolte; nessuna libreria esterna senza presentarla come decisione.
- Nessun file creato né modificato oltre al task.

## Fuori perimetro
- Codice, valori fisici, formule, algoritmi di generazione.
- Modifica di requisiti, roadmap, `AGENTS.md`, ADR o altri file.
- Scelte che i requisiti demandano al committente.

## Da decidere
- D1: proprietà dello stato e modalità di osservazione dell'interfaccia.
- D2: forma del contratto del modulo di simulazione.
- D3: struttura di `src/` e regole di dipendenza.
- Promozione delle raccomandazioni approvate in `docs/adr/`.

## Esito

# T-006 — Esito: architettura iniziale (proposta)
Riferimenti: requirements v0.8, roadmap M4. Legenda: S1–S3 = spiegazione (3 righe), F1–F5 = flusso (5 righe). Nessun file creato o modificato; nessuna libreria esterna proposta: ogni aggiunta sarà una decisione separata.

## D1. Proprietà dello stato e ciclo di aggiornamento
**A — Motore proprietario, osservazione a bassa frequenza (raccomandata).**
S1 Il motore possiede lo stato che cambia durante la corsa.
S2 React possiede lo stato dell'interfaccia e riceve snapshot periodici.
S3 Il rendering legge la fotografia e non scrive mai nel motore.
F1 `app` accumula i passi fissi e chiama `engine.advanceStep()`.
F2 Il motore risolve contatto e inglobamento dentro il passo.
F3 Il motore aggiorna stato e snapshot ed emette `absorbed`.
F4 `app` pubblica lo snapshot a React alla cadenza UI concordata.
F5 `render` disegna lo snapshot; la UI mostra l'evento.
Trade-off: + motore headless e deterministico; + UI non altera il passo. − serve un adattatore; − c'è ritardo tra evento e HUD.
**B — React proprietario, aggiornamento a ogni frame.**
S1 React possiede stato applicativo e stato della simulazione.
S2 Il motore è una funzione pura invocata nel ciclo React.
S3 Ogni frame produce un nuovo stato e un ridisegno.
F1 L'effetto React chiama `stepRace(stato)` per ogni passo.
F2 La funzione risolve contatto e inglobamento e restituisce il nuovo stato.
F3 React applica `setState`.
F4 Canvas ridisegna lo stato.
F5 Il ciclo riparte al frame successivo.
Trade-off: + meno strati e UI sempre allineata. − il ritmo dipende da React; − testare il loop completo richiede un harness; − frame persi possono alterare il ritmo.
Raccomandazione: A. Motivo: motore testabile senza DOM e passo fisso indipendente dal frame rate; il determinismo non dipende dallo scheduling di React.

## D2. Contratto del modulo di simulazione
**A — `SimulationEngine` con stato interno e passo esplicito (raccomandata).**
S1 Il motore è un oggetto creato con seed e RNG iniettato.
S2 Possiede lo stato e avanza esattamente un passo fisso per chiamata.
S3 Test e UI leggono snapshot; i test leggono anche lo stato RNG.
F1 Il test crea la gara con `createRace(config, seed, deps)`.
F2 Chiama `advanceStep()` una volta per passo fisso.
F3 Il motore risolve contatto e inglobamento, aggiorna lo stato e restituisce gli eventi.
F4 Il test confronta `getSnapshot()` e `getRngState()` con l'atteso.
F5 La UI legge lo stesso snapshot e non può mutare il motore.
Trade-off: + un solo proprietario, coerente con la roadmap, ordine di risoluzione interno. − stato nascosto; − lo snapshot deve essere immutabile/congelato.
**B — Funzioni pure con stato esplicito.**
S1 La simulazione è una funzione da stato a nuovo stato.
S2 Il chiamante possiede stato e stato RNG.
S3 Ogni passo restituisce uno stato nuovo e immutabile.
F1 Il test chiama `stepRace(stato)` con lo stato esplicito.
F2 La funzione restituisce `{ stato, eventi }`, inglobamento già risolto.
F3 Il test confronta lo stato restituito con la fixture.
F4 L'host conserva lo stato e richiama `stepRace`.
F5 React legge lo stato conservato; il precedente resta intatto.
Trade-off: + stato serializzabile, replay e diff semplici; + nessuno stato nascosto. − copia a ogni passo; − rischio di mutazioni esterne.
Raccomandazione: A. Motivo: il contratto `SimulationEngine` è quello previsto dalla roadmap; i test avanzano di N passi e confrontano snapshot + RNG, senza React.
Contratto proposto (solo tipi e firme):
```ts
// Convenzione: unità logiche; origine alto-sinistra; x→destra, y→basso (verso il traguardo).
// Il centro della goccia è il riferimento. La durata del passo e l'unità di tempo sono da M6.
type LogicalUnit = number;
type Seed = number;
type DropletId = string;
type ColorId = string;
type ObstacleLevel = 'low' | 'medium' | 'high';
interface WindowConfig { readonly width: LogicalUnit; readonly height: LogicalUnit }
interface DropletInit { readonly x: LogicalUnit; readonly colorId: ColorId }
interface RaceConfig { readonly window: WindowConfig; readonly obstacleLevel: ObstacleLevel; readonly droplets: readonly DropletInit[] }
interface RngState { readonly serialized: string } // opaco, serializzabile
interface Rng { next(): number; getState(): RngState }
type RngFactory = (seed: Seed) => Rng;
interface RaceDependencies { readonly createRng: RngFactory } // test iniettano un seed noto
interface DropletView { id: DropletId; kind: 'dynamic' | 'static'; x: LogicalUnit; y: LogicalUnit; radius: LogicalUnit; colorId?: ColorId; blocked?: boolean; power?: number /* interno, non renderizzato */ }
interface ObstacleView { id: string; kind: 'spatial' | 'airflow'; /* geometria: M7 */ }
type RaceOutcome = { kind: 'winner'; dropletId: DropletId } | { kind: 'timeout' };
interface RaceSnapshot {
  readonly tick: number; // passi fisici completati; durata del passo: M6
  readonly window: WindowConfig;
  readonly droplets: readonly DropletView[];
  readonly obstacles: readonly ObstacleView[];
  readonly outcome: RaceOutcome | null;
}
type SimulationEvent =
  | { type: 'absorbed'; absorberId: DropletId; absorbedId: DropletId }
  | { type: 'finished'; outcome: RaceOutcome };
interface SimulationEngine {
  readonly seed: Seed;
  advanceStep(): { snapshot: RaceSnapshot; events: readonly SimulationEvent[] };
  getSnapshot(): RaceSnapshot; // immutabile, per UI e rendering
  getRngState(): RngState; // solo test: replay e confronto
}
function createRace(config: RaceConfig, seed: Seed, deps: RaceDependencies): SimulationEngine;
```

## D3. Struttura di `src/` e regole di dipendenza
**A — A strati per ruolo tecnico (raccomandata).**
S1 Le cartelle seguono il ruolo: dominio, motore, rendering, interfaccia.
S2 `simulation` non importa React, DOM, Canvas, `ui` o `render`.
S3 `app` compone motore, loop e interfaccia.
Struttura: `src/shared`, `src/simulation` (motore, RNG, generatore M7), `src/render`, `src/ui`, `src/app`, `src/main.tsx`.
Dipendenze: `shared ← simulation ← app`; `app → render, ui`; `render/ui → shared`; nessun arco verso `simulation` tranne `app`.
F1 `app` avvia il loop e chiama `simulation`.
F2 Il motore restituisce lo snapshot.
F3 `app` passa lo snapshot a `render`.
F4 `render` disegna su Canvas.
F5 `ui` riceve lo stesso snapshot per i controlli.
Trade-off: + confine verificabile e test headless; + rigenerazione semplice. − più cartelle; − `app` è un punto di composizione.
**B — Per funzionalità.**
S1 Le cartelle seguono le funzionalità del gioco.
S2 Ogni funzionalità contiene motore, rendering, UI e controller.
S3 La condivisione passa solo da `shared`.
Struttura: `src/race/{engine,render,ui,controller}`, `src/configurator/{ui,regole}`, `src/shared`.
F1 Il controller di `race` chiama il proprio engine.
F2 L'engine risolve l'inglobamento.
F3 Il controller passa lo snapshot al render della funzionalità.
F4 Il render disegna.
F5 La UI della funzionalità aggiorna i controlli.
Trade-off: + coesione per funzionalità; − import trasversali; − isolamento del motore meno garantito e test più accoppiati.
Raccomandazione: A. Motivo: rende controllabile che `simulation` non importi React/DOM, consente test del motore senza montare componenti e isola il determinismo.

## Ambiguità rilevate (non risolte)
- «React gestisce lo stato applicativo» non chiarisce se includa lo stato di simulazione; D1 è una proposta, non una modifica dei requisiti.
- Proprietà del countdown (tempo reale) e sua relazione con lo stato della gara: non specificata.
- Unità del tempo simulato: boost in ms, timeout e blocchi in s; il contratto usa `tick` e lascia la conversione a M6.
- Chi genera il seed da entropia e in quale momento (avvio gara/nuova partita): non specificato.
- La potenza è «valore interno» ma serve ai test; non è chiaro se possa comparire in uno snapshot non visualizzato.
- Camera automatica: stato della camera e scelta della goccia in testa sono demandati al rendering o ad `app`? Non specificato.

Commento dell'Orchestrator: esito ricevuto alla prima delega, incollato integralmente. Verifica formale: tre decisioni, due alternative ciascuna, trade-off e raccomandazione presenti; nessun valore fisico né algoritmo; nessuna libreria esterna; nessuna modifica ai file. Il testo dell'esito sta entro 120 righe. Restano da sottoporre al committente le tre raccomandazioni (A, A, A), la promozione in `docs/adr/` e le sei ambiguità segnalate. Non ho verificato nel merito le scelte tecniche: spetta alla revisione e al committente.

## Revisione
Da assegnare dopo l'esito.

## Costo
Deleghe effettuate: 1 (architect, output completo alla prima chiamata; nessuna delega a vuoto)
