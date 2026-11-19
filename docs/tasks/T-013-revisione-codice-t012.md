# T-013: revisione codice T-012

Stato: chiuso
Esecutore: code-reviewer
Milestone: 5
Dipendenze: T-012

## Obiettivo
Rivedere il codice prodotto dal task T-012.

## Riferimenti

Perimetro di lettura (non altro):
- `docs/tasks/T-012-shared-e-stub.md`;
- `src/shared/constants.ts`, `src/shared/contract.ts`, `src/shared/game-contract.ts`;
- `src/simulation/createRace.ts` e `src/simulation/createRace.test.ts`;
- `docs/adr/ADR-001-architettura-iniziale.md` e `docs/adr/ADR-002-contratto-game.md`;
- da `docs/requirements.md` solo le sezioni «Creazione delle gocce» e «Configurazione del finestrino».

## Criteri di accettazione

- Esegui esclusivamente i controlli seguenti:
  1. conformità al task e agli ADR, con citazione;
  2. ogni costante e la sua citazione coincidono con il testo dei requisiti;
  3. correttezza e casi limite dello stub;
  4. qualità dei test: per ogni test, dire se fallirebbe con un'implementazione rotta e, per i test che passerebbero comunque, descrivere la mutazione che non scoprirebbero;
  5. determinismo e confini: nessun `Math.random`, `Date`, timer, né importazioni vietate da ADR-001;
  6. funzionalità non richieste.
- Non puoi eseguire comandi: non dichiarare che i test passano o falliscono.
- Output: massimo 8 voci. Ogni voce deve contenere: gravità, citazione o riga, punto incriminato, correzione di al massimo 3 righe.
- Gravità Alta solo se il codice viola un ADR o un requisito, oppure se un test non verifica ciò che dichiara.
- Nessuna modifica ai file.

## Fuori perimetro

- Qualsiasi lettura fuori dal perimetro indicato.
- Esecuzione di comandi (`npm test`, `npm run typecheck`, `npm run build` o altri).
- Modifiche a requisiti, ADR, roadmap, `AGENTS.md`, task o file di codice.
- Approvazione o chiusura del task.

## Da decidere

- Eventuale contrasto tra il controllo 2 e il commento `«provvisorio, da tarare in M5»` prescritto da T-012 per `DRAG_THRESHOLD`: se il controllo valga anche per quella costante o solo per le costanti tratte dai requisiti. La decisione spetta al committente; il revisore segnala senza risolvere.

## Esito

6 voci; accolte 5 e 6 più un caso extra sul getRngState; scartate 1-4. Mutazioni verificate a mano.

## Revisione

Da registrare dal committente. L'Orchestrator non approva né chiude il task senza conferma esplicita.

## Costo

Deleghe effettuate: 1. Deleghe a vuoto: 0. L'unica delega ha restituito output non vuoto, quindi non è stato necessario riprovare.
