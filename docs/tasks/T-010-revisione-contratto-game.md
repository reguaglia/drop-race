# T-010: Revisione del contratto del modulo `game`

Stato: chiuso
Esecutore: code-reviewer
Milestone: 5
Dipendenze: T-009

## Obiettivo
Rivedere il contratto del modulo `game` nell'Esito di T-009 — decisioni G1–G3, tabella «stato × comando», percorso completo, contratto TypeScript e ambiguità A1–A6 — e restituire al massimo 8 voci di revisione con gravità, citazione testuale, punto incriminato e correzione.

## Riferimenti
Perimetro di lettura obbligatorio e chiuso: non leggere i file per intero.
- `docs/tasks/T-009-contratto-game.md`: solo l'Esito (dalla sezione `## Esito` alle ambiguità A1–A6); escludere Revisione e Costo.
- `docs/adr/ADR-001-architettura-iniziale.md`: decisioni R2–R5, struttura e dipendenze, assunzioni A1–A4, «Rimandato»; R1 solo se serve a intendere il flusso del tempo.
- `docs/requirements.md`: solo le sezioni «Creazione delle gocce» e «Svolgimento della gara».
- `docs/acceptance/US-001-creazione-gocce.md`: criteri US-1–US-4 e «Non coperto».
- `docs/tasks/TEMPLATE.md` e `docs/tasks/T-010-revisione-contratto-game.md` (questo task).

## Controlli richiesti
1. Conformità ai requisiti e a US-001, con citazione testuale dei requisiti e dei criteri violati o rispettati.
2. Coerenza interna tra tabella «stato × comando», percorso completo e contratto TypeScript, e coerenza con ADR-001 (R2–R5, A1–A4); le ambiguità A1–A4 di ADR-001 non vanno confuse con le A1–A6 di T-009.
3. Lacune del contratto: gesti o eventi che nessun comando, evento o campo gestisce.
4. Testabilità senza browser: ogni regola rilevante deve essere verificabile con sequenze di comandi/ tempi, senza interfaccia.
5. Confini: nessun riferimento a React o al DOM, nessun valore inventato (soglia, area di presa, durata dei messaggi, avanzo di tempo o altro non fissato dalle fonti).

In fondo all'esito inserire la tabella obbligatoria «scenario → elemento del contratto che lo gestisce», con almeno i seguenti scenari, anche se la cella resta vuota:
- (a) tocco su una goccia già selezionata;
- (b) trascinamento interrotto prima del rilascio;
- (c) conto alla rovescia che scade durante un frame molto lungo;
- (d) fine gara e nuova partita;
- (e) cambio di fase mentre un'altra interazione è in corso.

## Criteri di accettazione
- Massimo 8 voci; nessuna voce fuori dai controlli 1–5.
- Ogni voce contiene: gravità, citazione testuale, punto incriminato, correzione di al massimo 3 righe.
- Gravità Alta solo se il contratto contraddice un requisito, un criterio di US-001, ADR-001 o sé stesso, oppure se esiste uno scenario senza proprietario. Negli altri casi usare Media o Bassa e motivare.
- La tabella «scenario → elemento del contratto che lo gestisce» è presente in fondo all'esito e contiene almeno i cinque scenari indicati.
- Nessuna modifica ai file: l'esito resta integralmente in questo task.
- Non riproporre le ambiguità A1–A6: non sono oggetto della revisione e non vanno risolte né commentate.

## Fuori perimetro
- Modifica di requisiti, roadmap, AGENTS.md, ADR, `docs/acceptance/`, di questo task o di qualunque altro file.
- Codice di implementazione, valori fisici, formule, scelte di interfaccia o nuove regole di simulazione.
- Riproporre o risolvere A1–A6; promuovere il contratto o le correzioni a documento ufficiale.
- Riferimenti a React, DOM o Canvas nel contratto proposto.

## Da decidere
- L'adozione di ciascuna correzione e l'eventuale promozione del contratto riveduto spettano al committente.
- Le ambiguità A1–A6 restano aperte e non sono oggetto di questo task.

## Esito
7 voci, tutte accettate (la 1 declassata a Bassa) e integrate in ADR-002; scenario (b) risolto con pointerCancel

## Revisione
Commento dell'Orchestrator: ho incollato l'output integrale senza modificarlo. Verifica formale: 7 voci (≤8), ciascuna con gravità, punto incriminato, citazione e correzione di al massimo 3 righe; le due voci Alta sono motivate da contraddizione con ADR-001/sé stessa e da scenario senza proprietario; la tabella finale contiene i cinque scenari richiesti. Nessun file è stato modificato e non sono state riproposte A1–A6. Le correzioni e l'eventuale promozione restano da decidere al committente.

## Costo
Deleghe effettuate: 1 (code-reviewer); deleghe a vuoto: 0.
