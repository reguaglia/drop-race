# T-001: User story e criteri di accettazione per la creazione delle gocce

Stato: in corso
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
- [ ] La user story è un file Markdown in `docs/tasks/` (o in `docs/acceptance/`
      se il committente indica quella sede) che identifica ruolo, bisogno e
      valore, riferito alla sola sezione "Creazione delle gocce".
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
- Sede del documento prodotto: `docs/tasks/` o `docs/acceptance/`.

## Esito
**Nota operativa:** in questa sessione dispongo solo di strumenti di lettura (`read`, `glob`, `grep`) e non di un tool di scrittura. Non ho quindi potuto materializzare il file; il contenuto integrale è pronto qui sotto per essere salvato nel percorso indicato.

## (a) Percorso del file

`docs/tasks/US-001-creazione-gocce.md` — **non creato materialmente** per assenza di tool di scrittura; contenuto pronto da salvare.

## (b) Contenuto integrale del documento

```markdown
# US-001 — Creazione delle gocce

Versione: 0.1 (bozza)
Data: 9 novembre 2026
Task di riferimento: T-001
Milestone: 4
Stato: proposta

## Contesto

Drop-Race è una webapp che simula una gara tra gocce d'acqua su un finestrino.
«L'utente prepara i concorrenti» e configura il finestrino; questa user story
riguarda esclusivamente la preparazione dei concorrenti, cioè la sezione
«Creazione delle gocce» di `docs/requirements.md`. Non definisce il finestrino,
il percorso, la fisica, l'avvio o lo svolgimento della gara.

Sede: `docs/tasks/US-001-creazione-gocce.md` (provvisoria, come da incarico; la
sede definitiva resta da decidere).

## Riferimenti ai requisiti

| Sezione | Citazione breve | Uso nel documento |
|---|---|---|
| Creazione delle gocce | «Creare da 2 a 8 gocce dinamiche.» | CA-01, CA-02, CA-03 |
| Creazione delle gocce | «Scegliere la posizione iniziale x di ciascuna goccia; la quota è fissa, dietro una linea di partenza.» | CA-04, CA-05, CA-06, CA-07 |
| Creazione delle gocce | «Scegliere il colore di ciascuna goccia.» | CA-08 |
| Creazione delle gocce | «Le gocce dinamiche hanno tutte le stesse proprietà fisiche iniziali.» | CA-09 |
| Creazione delle gocce | «Il colore è esclusivamente estetico e non influenza la simulazione.» | CA-10 |
| Creazione delle gocce | «Il posizionamento avviene tramite click o tap sul finestrino, rispettando una distanza minima tra le gocce.» | CA-04, CA-11 |
| Creazione delle gocce | «Del click o tap vale solo la coordinata x.» | CA-05 |
| Tipologie di gocce | «Sono i concorrenti.» / «Vengono create dall'utente.» | Contesto, user story |
| Svolgimento della gara, punto 1 | «L'utente crea da 2 a 8 gocce dinamiche.» | CA-01 |

## User story

**Come** utente che prepara i concorrenti, **voglio** creare da 2 a 8 gocce
dinamiche scegliendo per ciascuna la posizione iniziale x e il colore, **così
che** i concorrenti siano pronti per la gara e partano tutti con le stesse
proprietà fisiche iniziali.

**Dipende da:** «Distanza minima tra le gocce» (Punto aperto Milestone 4) per il
criterio sul rispetto della distanza minima; «Posizione e visibilità della linea
di partenza» (Punto aperto Milestone 5) per la verifica della quota dietro la
linea. Questi punti non vengono risolti in questo documento.

## Criteri di accettazione

### CA-01 — Intervallo del numero di gocce

- **Dato** che l'utente sta creando i concorrenti,
- **quando** crea gocce dinamiche,
- **allora** il numero di gocce dinamiche create è compreso tra 2 e 8.

Riferimento: «Creare da 2 a 8 gocce dinamiche.»; «L'utente crea da 2 a 8 gocce
dinamiche.»

### CA-02 — Limite massimo

- **Dato** che l'utente ha creato 8 gocce dinamiche,
- **quando** tenta di crearne una nona,
- **allora** il numero di gocce dinamiche resta 8 e non viene aggiunta alcuna
  goccia.

Riferimento: «Creare da 2 a 8 gocce dinamiche.»

Nota: la modalità di blocco o di segnalazione non è specificata; vedi «Da
decidere».

### CA-03 — Minimo previsto

- **Dato** che l'utente ha creato 2 gocce dinamiche,
- **allora** il numero minimo previsto dai requisiti è raggiunto.

Riferimento: «Creare da 2 a 8 gocce dinamiche.»

Nota: il comportamento quando l'utente tenta di proseguire con meno di 2 gocce
non è specificato; vedi «Da decidere».

### CA-04 — Scelta della x tramite click o tap

- **Dato** il finestrino visualizzato,
- **quando** l'utente esegue un click o un tap in un punto del finestrino con
  coordinata x,
- **allora** la goccia viene posizionata alla coordinata x del punto.

Riferimento: «Scegliere la posizione iniziale x di ciascuna goccia»; «Il
posizionamento avviene tramite click o tap sul finestrino».

Nota: click o tap fuori dai bordi o sulla linea di partenza non sono specificati;
vedi «Da decidere».

### CA-05 — Della posizione conta solo la x

- **Dato** un click o tap con coordinata x e una qualsiasi coordinata y,
- **quando** l'utente posiziona una goccia,
- **allora** la coordinata y del click o tap non determina la posizione: la
  goccia assume la quota fissa e la posizione dipende solo dalla x.

Riferimento: «Del click o tap vale solo la coordinata x.»; «la quota è fissa».

### CA-06 — Quota fissa e uguale per tutte le gocce

- **Dato** un insieme di gocce dinamiche create,
- **quando** vengono create,
- **allora** tutte hanno la stessa coordinata y (quota fissa) e l'utente non
  sceglie la y.

Riferimento: «Scegliere la posizione iniziale x di ciascuna goccia; la quota è
fissa».

### CA-07 — Quota dietro la linea di partenza (sospeso)

**Dipende da:** «Posizione e visibilità della linea di partenza» (Punto aperto
Milestone 5).

Criterio non formulato: la verifica che la quota fissa sia «dietro una linea di
partenza» richiede la definizione della linea di partenza; i requisiti non ne
fissano posizione e visibilità.

Riferimento: «la quota è fissa, dietro una linea di partenza».

### CA-08 — Scelta del colore

- **Dato** una goccia dinamica creata,
- **quando** l'utente sceglie un colore per quella goccia,
- **allora** la goccia assume il colore scelto.

Riferimento: «Scegliere il colore di ciascuna goccia.»

Nota: colori distinti o ripetibili, colore predefinito e modalità di scelta non
sono specificati; vedi «Da decidere».

### CA-09 — Uguaglianza delle proprietà fisiche iniziali

- **Dato** due gocce dinamiche create con coordinate x diverse e colori diversi,
- **quando** vengono create,
- **allora** tutte le loro proprietà fisiche iniziali sono uguali.

Riferimento: «Le gocce dinamiche hanno tutte le stesse proprietà fisiche
iniziali.»

Dipende da: «Significato di "fisica intermedia" (il modello matematico)» (Punto
aperto Milestone 6) per l'elenco delle proprietà fisiche da confrontare.

### CA-10 — Colore irrilevante sulla simulazione

- **Dato** due configurazioni di gocce identiche per numero, x e proprietà
  fisiche, ma con colori diversi,
- **quando** la simulazione viene eseguita a parità di ogni altra condizione,
- **allora** il colore non modifica le proprietà fisiche iniziali né il
  comportamento delle gocce: l'evoluzione simulata è la stessa.

Riferimento: «Il colore è esclusivamente estetico e non influenza la
simulazione.»

Dipende da: «Seed e garanzia di diversità tra gare consecutive» (Punto aperto
Milestone 7) per la verifica riproducibile dell'evoluzione.

### CA-11 — Rispetto della distanza minima (sospeso)

**Dipende da:** «Distanza minima tra le gocce» (Punto aperto Milestone 4) per
valore e criterio di misura; comportamento sotto soglia (vedi «Da decidere»).

Criterio non formulato con una soglia: i requisiti impongono che il
posizionamento «rispetti una distanza minima tra le gocce», ma non ne
definiscono il valore né il criterio di misura. Il vincolo riguarda la goccia da
posizionare rispetto alle gocce già create.

Riferimento: «Il posizionamento avviene tramite click o tap sul finestrino,
rispettando una distanza minima tra le gocce.»

## Da decidere

### Già segnalate in T-001

- Valore della distanza minima tra le gocce e criterio di misura (Punto aperto
  Milestone 4).
- Comportamento quando il click o tap cade a distanza inferiore al minimo.
- Comportamento per click o tap fuori dai bordi del finestrino.
- Comportamento per click o tap sulla linea di partenza.
- Se i colori delle gocce debbano essere tutti distinti o possano ripetersi.
- Se esista un colore predefinito.
- Se la dimensione visiva delle gocce dinamiche sia uguale per tutte o vari.
- Sede definitiva del documento: `docs/tasks/` o `docs/acceptance/`.

### Rilevate in questa analisi

- Comportamento quando l'utente tenta di creare una nona goccia: blocco,
  segnalazione, sostituzione o altro.
- Comportamento quando l'utente tenta di proseguire con meno di 2 gocce.
- Modalità di scelta del colore: palette predefinita o colore libero.
- Momento della creazione: ogni click o tap crea subito una goccia oppure il
  posizionamento richiede una conferma; ordine tra scelta della posizione e
  scelta del colore.

## Non coperto / fuori perimetro

- Implementazione di UI, componenti React, Canvas e logica di simulazione.
- Configurazione del finestrino: altezza, livello degli ostacoli, larghezza
  logica e scalatura.
- Linea di partenza (posizione e visibilità): Punto aperto Milestone 5.
- Modifica ed eliminazione delle gocce prima dell'avvio: Punto aperto
  Milestone 5.
- Percorso procedurale, gocce statiche, ostacoli, correnti d'aria e zone di
  aderenza.
- Fisica, boost, inglobamenti e collisioni: il modello matematico è un Punto
  aperto Milestone 6.
- Avvio della gara, countdown, vincitore e nuova partita: Milestone 8.
- Unità di misura della coordinata x: non decisa in questo documento.
- Valore della distanza minima: Punto aperto Milestone 4, non deciso in questo
  documento.

## Dipendenze dai Punti aperti

| Punto aperto | Milestone | Effetto |
|---|---|---|
| «Distanza minima tra le gocce» | 4 | CA-11 sospeso |
| «Posizione e visibilità della linea di partenza» | 5 | CA-07 sospeso |
| «Significato di "fisica intermedia" (il modello matematico)» | 6 | elenco delle proprietà fisiche per CA-09 |
| «Seed e garanzia di diversità tra gare consecutive» | 7 | verifica riproducibile di CA-10 |
| «Modifica ed eliminazione delle gocce prima dell'avvio» | 5 | fuori perimetro |

## Storico

- 0.1 — 9 novembre 2026 — Prima bozza.
```

## (c) Ambiguità rilevate

**Già presenti nel task T-001:**
1. Valore della distanza minima tra le gocce e criterio di misura (Punto aperto Milestone 4).
2. Comportamento con click o tap a distanza inferiore al minimo.
3. Comportamento con click o tap fuori dai bordi del finestrino.
4. Comportamento con click o tap sulla linea di partenza.
5. Colori distinti o ripetibili.
6. Esistenza di un colore predefinito.
7. Dimensione visiva delle gocce dinamiche uguale o variabile.
8. Sede definitiva del documento (`docs/tasks/` o `docs/acceptance/`).

**Nuove, rilevate in questa analisi:**
9. Comportamento quando si tenta di creare una nona goccia (blocco, segnalazione, sostituzione o altro): il massimo è fissato, la modalità di applicazione no.
10. Comportamento quando si tenta di proseguire con meno di 2 gocce.
11. Modalità di scelta del colore: palette predefinita o colore libero.
12. Momento della creazione: click o tap immediato oppure conferma; ordine tra scelta della posizione e scelta del colore.

## (d) Conferma

Confermo di **non aver modificato alcun file**: non ho eseguito scritture, quindi `docs/requirements.md`, `docs/tasks/roadmap.md`, `docs/tasks/T-001-user-story-gocce.md`, `AGENTS.md` e ogni altro file sono invariati. Confermo inoltre di **non aver scelto valori o criteri** per i Punti aperti: distanza minima e relativo criterio di misura, comportamento sotto soglia, click/tap fuori dai bordi o sulla linea di partenza, colori distinti/ripetibili e colore predefinito, dimensione visiva delle gocce dinamiche, sede definitiva del documento. Il file `docs/tasks/US-001-creazione-gocce.md` non è stato materialmente creato perché la sessione non espone un tool di scrittura.

Da delegare ad Architect/Simulation: unità e mapping della coordinata x, modalità tecnica di verifica del determinismo/seed, implementazione del confronto delle proprietà fisiche.

---

Commento dell'Orchestrator (separato dall'output sopra): la delega ha prodotto il contenuto completo della user story e dei criteri di accettazione, ma il file `docs/tasks/US-001-creazione-gocce.md` non esiste: il product-owner non dispone di strumenti di scrittura e l'ho trascritto qui in attesa di istruzioni. Non ho salvato io il file, perché la sede definitiva è ancora in "Da decidere" e non spetta a me sceglierla. Il product-owner ha inoltre aggiunto quattro ambiguità nuove (punti 9–12); restano tutte decisioni del committente.

## Revisione
Nessuna: revisione non ancora eseguita.

## Costo
Deleghe effettuate: 1
