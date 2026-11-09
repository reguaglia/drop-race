# T-001: User story e criteri di accettazione per la creazione delle gocce

Stato: chiuso
Esecutore: product-owner
Milestone: 4
Dipendenze: nessuna

## Obiettivo
Produrre una user story con criteri di accettazione verificabili per la sezione
"Creazione delle gocce" di `docs/requirements.md`, senza introdurre regole di
prodotto nuove e segnalando le ambiguità come decisioni da prendere.

## Riferimenti
- `docs/requirements.md`:
  - "### Creazione delle gocce": da 2 a 8 gocce dinamiche; scelta della
    posizione iniziale x con quota fissa dietro una linea di partenza; scelta
    del colore; proprietà fisiche iniziali identiche; colore solo estetico;
    posizionamento tramite click o tap rispettando una distanza minima; del
    click/tap vale solo la coordinata x.
  - "### Tipologie di gocce": le gocce dinamiche sono i concorrenti e vengono
    create dall'utente.
  - "### Svolgimento della gara", punto 1: l'utente crea da 2 a 8 gocce
    dinamiche.
  - "## Punti aperti": "Distanza minima tra le gocce: Milestone 4".
- `docs/tasks/roadmap.md`: Milestone 4 (analisi e progettazione) e vincoli di
  processo.
- `docs/tasks/TEMPLATE.md`: formato dei task.
- `AGENTS.md`: i requisiti non si modificano; le ambiguità si segnalano.

## Criteri di accettazione
- [ ] L'output del product-owner contiene le user story nell'Esito, in un blocco
      Markdown pronto da copiare. Nessun file viene creato dall'agente: il
      committente promuove il testo approvato in
      `docs/acceptance/US-001-creazione-gocce.md`.
- [ ] Ogni affermazione della user story e dei criteri è riconducibile a una
      frase di `docs/requirements.md`; nessuna regola di prodotto inventata.
- [ ] I criteri di accettazione coprono almeno: numero minimo e massimo di
      gocce (2–8); scelta della x per ciascuna goccia con quota fissa dietro la
      linea di partenza; scelta del colore; uguaglianza delle proprietà fisiche
      iniziali; irrilevanza del colore sulla simulazione; posizionamento via
      click o tap usando la sola coordinata x; rispetto della distanza minima
      tra le gocce.
- [ ] I criteri sono verificabili e formulati in modo testabile (es.
      Given/When/Then) e indicano il risultato atteso osservabile.
- [ ] Le ambiguità non risolte dai requisiti sono elencate in "Da decidere",
      senza sceglierne il valore.
- [ ] Nessuna modifica a `docs/requirements.md`, `docs/tasks/roadmap.md`,
      `AGENTS.md` o ad altri file fuori dal documento prodotto.
- [ ] Il documento prodotto è in italiano secondo le convenzioni del progetto.
- [ ] Al massimo 8 criteri di accettazione, ciascuno con un risultato osservabile;
      nessun criterio tautologico o ripetuto; nessuna tabella dei riferimenti né
      storico.

## Fuori perimetro
- Implementazione di UI, componenti React, Canvas o logica di simulazione.
- Scelta del valore della distanza minima tra le gocce e delle unità di misura
  della coordinata x: restano decisioni del committente.
- Configurazione del finestrino (altezza, livello ostacoli, larghezza logica).
- Linea di partenza (posizione e visibilità) e modifica/eliminazione delle
  gocce prima dell'avvio: Punti aperti di Milestone 5.
- Modifica di requisiti, roadmap o `AGENTS.md`.

## Da decidere
- Valore della distanza minima tra le gocce e criterio di misura (Punto aperto
  Milestone 4): da definire prima di poter rendere il criterio di accettazione
  verificabile con un numero.
- Comportamento quando il click o tap cade a distanza inferiore al minimo:
  rifiuto del posizionamento, spostamento automatico o altro (non specificato).
- Comportamento per click o tap fuori dai bordi del finestrino o sulla linea di
  partenza (non specificato).
- Se i colori delle gocce debbano essere tutti distinti o possano ripetersi, e
  se esista un colore predefinito (non specificato).
- Se la dimensione visiva delle gocce dinamiche sia uguale per tutte o vari
  (i requisiti parlano di dimensioni variabili solo per le gocce statiche).

## Esito
Promossa in docs/acceptance/US-001-creazione-gocce.md

## Revisione
Nessuna: revisione non ancora eseguita.

## Costo
Deleghe effettuate: 2
