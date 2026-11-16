# T-006: Architettura iniziale

Stato: chiuso
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
Proposta A/A/A rivista in T-007; decisioni approvate R1-R5, registrate in docs/adr/ADR-001-architettura-iniziale.md.

## Revisione
Da assegnare dopo l'esito.

## Costo
Deleghe effettuate: 1 (architect, output completo alla prima chiamata; nessuna delega a vuoto)
