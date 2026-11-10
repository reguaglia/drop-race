# AGENTS.md

## Progetto
Drop-Race: webapp (React + TypeScript + Canvas) che simula una gara tra
gocce d'acqua su un finestrino. La fonte di verità è `docs/requirements.md`.

## Regole
- Prima di lavorare leggi `docs/requirements.md` e i file rilevanti in `docs/`.
- Leggi anche `docs/tasks/roadmap.md` per milestone e vincoli di processo.
- I requisiti li modifica solo il committente; il business-analyst può scriverli in `docs/requirements.md` solo dopo conferma esplicita per ogni modifica.
- Non modificare i requisiti. Se trovi un'ambiguità, segnalala: non decidere.
- Non inventare regole di simulazione: proponile come decisioni da approvare.
- Non implementare nulla che il task assegnato non richieda.
- Non fare commit, push o operazioni Git distruttive senza approvazione esplicita.
- Un task non è completato finché i test non sono stati eseguiti.

## Struttura di docs/
- `adr/`: decisioni tecniche, un file per decisione.
- `tasks/`: task assegnati e relativo stato.
- `acceptance/`: criteri di accettazione.

## Convenzioni
Documenti in italiano; codice e identificatori in inglese.

## Stato attuale
Nessun codice né `package.json`. Non eseguire comandi presunti (`npm`, ecc.) finché non esiste un manifest. Sostituire questa sezione quando c'è il tooling.
Agenti definiti in .opencode/agents/.

## Strumenti
OpenCode V1, non V2. Gli agenti stanno in `.opencode/agents/*.md` e usano la chiave `permission` (singolare). Non usare la sintassi V2.