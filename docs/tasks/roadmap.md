# Roadmap e vincoli di processo

## Vincoli di processo
- Strumento: OpenCode V1 (1.19.5). Nessuna migrazione a V2 prima della Milestone 10.
- Avviare OpenCode con OPENCODE_DISABLE_CLAUDE_CODE=1 per isolare il contesto globale.
- Modello: Big Pickle per tutti gli agenti (gratuito, condizioni e limiti da verificare).
- I requisiti li modifica solo il committente.
- Gli agenti non producono documenti ufficiali: i deliverable dei subagent restano nell'Esito del task. Li promuove il committente, copiandoli in `docs/acceptance/`, `docs/adr/` o dove serve; promuovere significa approvare. Eccezione: i requisiti, con conferma e lettura del diff prima del commit.
- Gli agenti (developer) possono fare commit, push su branch `task/*` e aprire pull request; `main` è protetta su GitHub. La review finale e il merge su `main` spettano al committente. Le operazioni distruttive richiedono approvazione umana.
- Decisioni tecniche importanti: un file in `docs/adr/`.
- Un task è completato solo dopo test e code review.
- Dipendenze: versioni esatte, mai pubblicate da meno di 14 giorni. `npm install` e ogni modifica a `package.json` sono solo umani.
- `main` è protetta: ogni modifica, anche ai documenti, passa da un branch e da una pull request; il merge è del committente.
- Merge delle pull request: squash and merge, titolo T-0NN: ....

## Milestone
1. Preparazione dell'ambiente: completata.
2. Introduzione agli agenti: completata.
3. Orchestrazione: completata.
4. Analisi e progettazione: Punti aperti marcati M4; contratto del
   `SimulationEngine` (interfaccia, generatore pseudo-casuale con seed
   iniettabile, snapshot dello stato): completata.
5. Primo MVP: setup React/TS/Canvas, responsive, creazione gocce; il motore
   è uno stub dietro l'interfaccia del contratto. Punti aperti marcati M5: in corso.
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
- Tasso di deleghe vuote 4/10, concentrato sul Reviewer con requisiti lunghi; ipotesi: contesto. Test: passargli solo l’estratto rilevante.