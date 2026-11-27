# T-015: revisione game — piazzamento

Stato: chiuso
Esecutore: code-reviewer
Milestone: 5
Dipendenze: T-014

## Obiettivo

Rivedere il codice prodotto dal task T-014.

## Riferimenti

Perimetro di lettura (non altro):
- `docs/tasks/T-014-game-piazzamento.md`;
- `src/game/createGame.ts` e `src/game/placement.acceptance.test.ts`;
- `docs/adr/ADR-001-architettura-iniziale.md` e `docs/adr/ADR-002-contratto-game.md`;
- da `docs/requirements.md` solo le sezioni «Creazione delle gocce» e «Svolgimento della gara».

## Criteri di accettazione

- Esegui esclusivamente i controlli seguenti:
  1. conformità al task, agli ADR e ai requisiti, con citazione;
  2. decisioni non scritte in nessun documento che il codice prende da solo;
  3. correttezza e casi limite;
  4. qualità dei test: per ogni gruppo di test, una mutazione che non scoprirebbero;
  5. confini: `game` importa solo `shared`, nessun DOM, nessun `Math.random`, `Date` o timer;
  6. cosa dovrà cambiare in `createGame.ts` per aggiungere la selezione (T-016) e le fasi (T-017).
- Non puoi eseguire comandi: non dichiarare che i test passano o falliscono.
- Output: massimo 8 voci. Ogni voce deve contenere: gravità, citazione o riga, punto incriminato e correzione di al massimo 3 righe.
- Gravità Alta solo se il codice viola un ADR o un requisito, oppure se un test non verifica ciò che dichiara.
- Nessuna modifica ai file.

## Fuori perimetro

- Qualsiasi lettura fuori dal perimetro indicato.
- Esecuzione di comandi (`npm test`, `npm run typecheck`, `npm run build` o altri).
- Modifiche a requisiti, ADR, roadmap, `AGENTS.md`, task o file di codice.
- Approvazione o chiusura del task.

## Da decidere

- Nessuna decisione individuata in fase di creazione; eventuali decisioni emergenti dalla revisione vanno segnalate dal revisore senza risolverle.

## Esito

7 voci, 0 Alta; accolte 2 (con rimedio diverso), 5, 6, 7 e il caso soglia/limite; la 1 rimandata a T-016; 3 e 4 registrate come decisioni in ADR-002. Riferimenti di riga verificati e danni provati a mano

## Revisione

Da registrare dal committente. L'Orchestrator non approva né chiude il task senza conferma esplicita.

## Costo

Deleghe effettuate: 1 (code-reviewer). Deleghe a vuoto: 0. L'unica delega ha restituito output non vuoto, quindi non è stato necessario riprovare.
