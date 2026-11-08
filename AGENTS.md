# AGENTS.md

## Progetto
Drop-Race: webapp (React + TypeScript + Canvas) che simula una gara tra
gocce d'acqua su un finestrino. La fonte di verità è `docs/requirements.md`.

## Regole
- Prima di lavorare leggi `docs/requirements.md` e i file rilevanti in `docs/`.
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
Nessun codice né `package.json`. Non eseguire comandi presunti (`npm`, ecc.)
finché non esiste un manifest. Sostituire questa sezione quando c'è il tooling.