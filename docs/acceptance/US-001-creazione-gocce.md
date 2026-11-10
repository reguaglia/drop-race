# US-001 — Creazione delle gocce

Stato: approvata
Origine: T-001 v2, corretta secondo la revisione T-002

## User story

Come utente che prepara i concorrenti, voglio creare da 2 a 8 gocce dinamiche scegliendo per ciascuna la posizione iniziale x, con quota fissa dietro la linea di partenza, e il colore, per avere concorrenti pronti che partano con le stesse proprietà fisiche iniziali e con il colore solo estetico.

## Criteri di accettazione

### CA-01 — Numero di gocce minore o uguale a 8

**Dato** che l'utente crea i concorrenti,
**quando** crea gocce dinamiche,
**allora** il numero totale di gocce dinamiche non supera 8.

«Creare da 2 a 8 gocce dinamiche.»

### CA-02 — Posizione tramite click o tap, usando solo la x

**Dato** il finestrino visualizzato,
**quando** l'utente esegue un click o un tap e la goccia viene posizionata,
**allora** la sua coordinata x è quella del punto e la coordinata y del click o tap non incide.

«Del click o tap vale solo la coordinata x.»

### CA-03 — Quota fissa e comune

**Dato** un insieme di gocce dinamiche,
**quando** una goccia dinamica viene creata,
**allora** tutte hanno la stessa coordinata y, fissa e non scelta dall'utente.

«la quota è fissa, dietro una linea di partenza»

La clausola «dietro la linea di partenza» non è formulata come criterio: sospesa finché la Milestone 5 non definisce la linea.

### CA-04 — Scelta del colore

**Dato** una goccia dinamica,
**quando** l'utente sceglie un colore per quella goccia,
**allora** la goccia assume il colore scelto.

«Scegliere il colore di ciascuna goccia.»

### CA-05 — Stesse proprietà fisiche iniziali

**Dato** due gocce dinamiche create con coordinate x diverse e colori diversi,
**quando** vengono create,
**allora** tutte le loro proprietà fisiche iniziali sono uguali.

«Le gocce dinamiche hanno tutte le stesse proprietà fisiche iniziali.»

Dipende da: «Significato di "fisica intermedia" (il modello matematico)» (Punto aperto Milestone 6) per l'elenco delle proprietà fisiche da confrontare.

### CA-06 — Colore irrilevante sulla simulazione

**Dato** due configurazioni identiche per numero, coordinate x e proprietà fisiche, ma con colori diversi,
**quando** viene eseguita la simulazione a parità di ogni altra condizione,
**allora** il colore non modifica le proprietà fisiche né il comportamento delle gocce e l'evoluzione simulata è la stessa con identico stato iniziale e passi di tempo fissi.

«Il colore è esclusivamente estetico e non influenza la simulazione.»; «I test possono far avanzare la simulazione a passi di tempo fissi»; «La logica deve essere testabile in modo deterministico.»

### CA-07 — Distanza minima rispettata

**Dato** un insieme di gocce già posizionate che rispetta la soglia minima vigente,
**quando** l'utente tenta di posizionare una nuova goccia con click o tap,
**allora** al termine del tentativo nessuna coppia di gocce presenti è a distanza inferiore alla soglia minima, qualunque sia il comportamento adottato dal sistema.

«rispettando una distanza minima tra le gocce.»

Dipende da: «Distanza minima tra le gocce» (Punto aperto Milestone 4) per il valore; il comportamento sotto soglia è in «Da decidere».

### CA-08 — Numero di gocce maggiore o uguale a 2

**Dato** che l'utente crea i concorrenti,
**quando** le gocce iniziano a muoversi,
**allora** il numero totale di gocce dinamiche create non è minore di 2.

«Creare da 2 a 8 gocce dinamiche.»

Dipende da: «tentativo di avvio con meno di 2 gocce» (Punto aperto Milestone 5)

## Da decidere

- Valore della distanza minima tra le gocce (Punto aperto Milestone 4); da chiarire anche il criterio di misura (ambiguità derivata, non testo del requisito).
- Comportamento quando il click o tap cade a distanza inferiore alla minima, fuori dai bordi del finestrino o sulla linea di partenza (Punto aperto Milestone 5).
- Posizione e visibilità della linea di partenza (Punto aperto Milestone 5).
- Comportamento al tentativo di creare più di 8 gocce o di avviare con meno di 2 (Punto aperto Milestone 5).
- Modalità di scelta del colore: palette o colore libero, colori distinti o ripetibili, colore predefinito (Punto aperto Milestone 5).
- Momento della creazione, immediato o con conferma, e ordine tra posizione e colore (Punto aperto Milestone 5).
- Dimensione delle gocce dinamiche (Punto aperto Milestone 6).

Da delegare ad Architect/Simulation: unità e mapping della coordinata x, verifica deterministica dell'irrilevanza del colore.