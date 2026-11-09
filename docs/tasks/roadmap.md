# Roadmap e vincoli di processo

## Vincoli di processo
- Strumento: OpenCode V1 (1.19.5). Nessuna migrazione a V2 prima della Milestone 10.
- Avviare OpenCode con OPENCODE_DISABLE_CLAUDE_CODE=1 per isolare il contesto globale.
- Modello: Big Pickle per tutti gli agenti (gratuito, condizioni e limiti da verificare).
- I requisiti li modifica solo il committente.
- Commit, push e operazioni Git importanti solo con approvazione umana.
- Decisioni tecniche importanti: un file in `docs/adr/`.
- Un task è completato solo dopo test e code review.

## Milestone
1. Preparazione dell'ambiente: completata.
2. Introduzione agli agenti: in corso.
3. Orchestrazione.
4. Analisi e progettazione: Punti aperti marcati M4; contratto del
   `SimulationEngine` (interfaccia, generatore pseudo-casuale con seed
   iniettabile, snapshot dello stato).
5. Primo MVP: setup React/TS/Canvas, responsive, creazione gocce; il motore
   è uno stub dietro l'interfaccia del contratto. Punti aperti marcati M5.
6. Motore fisico: modello matematico approvato (ADR) prima del codice,
   test deterministici. Punti aperti marcati M6.
7. Generazione procedurale con seed. Punti aperti marcati M7.
8. Completamento del gioco: countdown, vincitore, nuova partita.
   Punti aperti marcati M8.
9. Qualità e rilascio: test, review, performance, accessibilità, deploy.
10. Evoluzione del sistema agentico.

## Backlog Milestone 10 (osservazioni raccolte)
- Prompt del Product Owner: severità relativa alla milestone corrente;
  divieto di riformulare i Punti aperti.
- Delega: l'Orchestrator deve riportare integralmente l'output dei subagent.
- Misurare il consumo reale di richieste di Big Pickle.
- Test ripetuti sul comportamento degli agenti (non è deterministico).
- Valutare la migrazione a OpenCode V2.
- Valutare context7 per gli agenti di sviluppo (negato al Product Owner).