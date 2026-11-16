# T-007: Revisione della proposta di architettura

Stato: in revisione
Esecutore: code-reviewer
Milestone: 4
Dipendenze: T-006

## Obiettivo
Rivedere la proposta di architettura dell'Esito di T-006 (decisioni D1, D2, D3 e contratto TypeScript) rispetto ai requisiti, alla coerenza interna e alla testabilità deterministica, senza modificare file.

## Riferimenti
- `docs/tasks/T-006-architettura-iniziale.md`, solo la sezione "Esito": D1, D2 (incluso il contratto TypeScript), D3, "Ambiguità rilevate" e le righe di commento dell'Orchestrator.
- `docs/requirements.md` (v0.8), solo le sezioni "Aspetto grafico" (righe 230-244), "Fisica della simulazione" (righe 246-272) e "Vincoli tecnici" (righe 274-277).
- `docs/acceptance/US-001-creazione-gocce.md`: tutte le storie US-1, US-2, US-3, US-4.
- `docs/tasks/roadmap.md`: solo la Milestone 4 (righe 17-19) e i vincoli di processo pertinenti (righe 8-11).

## Perimetro di lettura
- Leggere per intero solo la sezione "Esito" di T-006 e `docs/acceptance/US-001-creazione-gocce.md`.
- Non leggere per intero `docs/requirements.md` né `docs/tasks/roadmap.md`: limitarsi alle righe indicate in "Riferimenti".
- Non leggere altri file del repository.

## Controlli
1. Conformità ai requisiti, con citazione testuale di `docs/requirements.md` e di `docs/acceptance/US-001-creazione-gocce.md`.
2. Incoerenze interne tra D1, D2 e D3 e dentro il contratto TypeScript.
3. Testabilità e determinismo senza browser: verificare in particolare se tutto ciò che deve essere deterministico è raggiungibile da un test (stato, RNG, eventi, esito).
4. Copertura: ogni storia di US-001 ha un modulo proprietario nella struttura proposta in D3.
5. Confini di milestone: la proposta non contiene valori fisici né algoritmi (fisica: M6; generazione con seed: M7).

## Criteri di accettazione
- Massimo 8 voci, ciascuna con gravità (Alta, Media, Bassa), citazione testuale, punto incriminato (D1/D2/D3/contratto, con riferimento preciso) e correzione di massimo 3 righe.
- Gravità Alta solo se la proposta viola un requisito, contraddice se stessa o impedisce di soddisfare un criterio di accettazione.
- Ogni voce indica il controllo (1-5) da cui deriva.
- Nessuna modifica ai file; nessuna proposta di nuove librerie.
- Nessuna riformulazione delle decisioni e nessuna decisione al posto del committente.

## Fuori perimetro
- Modifica di T-006, `docs/requirements.md`, `docs/tasks/roadmap.md`, `AGENTS.md`, `docs/acceptance/`, ADR o qualsiasi altro file.
- Scrivere codice, tipi o pseudocodice oltre la correzione richiesta.
- Nuove librerie, nuovi valori fisici, nuovi algoritmi.
- Riaprire le sei "Ambiguità rilevate" in T-006: sono già in "Da decidere".
- Scelte che spettano al committente (adozione di A/B per D1, D2, D3; promozione in `docs/adr/`).

## Da decidere
- Accoglimento delle voci della revisione e correzione della proposta: spetta al committente.
- Adozione delle raccomandazioni D1-A, D2-A, D3-A e promozione in `docs/adr/`: spetta al committente (già in "Da decidere" di T-006).
- Le sei ambiguità segnalate in T-006 restano da decidere: la revisione non le risolve.

## Esito

## Revisione (T-007)

**Perimetro applicato:** T-006, sezione «Esito» (D1, D2 con contratto, D3, ambiguità e commento dell’Orchestrator); `docs/requirements.md` righe 230-244, 246-272, 274-277; `docs/acceptance/US-001-creazione-gocce.md` (US-1–US-4); `docs/tasks/roadmap.md` righe 8-11 e 17-19. Nessun file modificato. Le sei ambiguità di T-006 non sono state riaperte.

**Esito sintetico:** 5 voci: 2 Media, 3 Bassa, 0 Alta. Non ho trovato violazioni testuali dei requisiti nel perimetro né criteri di US-001 impossibili da soddisfare; i rilievi riguardano copertura e coerenza interna.

### 1. [Media] — Controllo 4

- **Citazione:** US-1 1.3: «la goccia viene creata con il centro a x = 3 (bordo sinistro) oppure x = 97 (bordo destro)»; US-2 2.1: «contiene 8 colori distinti definiti dal sistema»; US-3 3.3: «la goccia risulta selezionata e il suo centro si trova alla coordinata x del rilascio».
- **Punto incriminato:** D3-A, riga 131: «`src/shared`, `src/simulation` (motore, RNG, generatore M7), `src/render`, `src/ui`, `src/app`, `src/main.tsx`». Manca un modulo proprietario delle regole di configurazione: piazzamento/aggancio/distanza minima (US-1), palette e colore (US-2), selezione/spostamento/eliminazione (US-3). L’alternativa B prevede `src/configurator/{ui,regole}`; la raccomandata A no. US-4 può essere attribuita a `ui` per i controlli, ma US-1, US-2 e US-3 restano scoperte.
- **Correzione:** Aggiungere a D3-A un modulo `src/config` per le regole di US-1/2/3 (inclusa la palette) e dichiararne le regole di dipendenza, senza introdurre archi `ui/render → simulation`.

### 2. [Media] — Controllo 2

- **Citazione:** D3-A: «nessun arco verso `simulation` tranne `app`» e «`render/ui → shared`»; D2: `RaceConfig`, `RaceSnapshot`, `DropletView`; D2 F5: «La UI legge lo stesso snapshot e non può mutare il motore.»
- **Punto incriminato:** D3-A riga 132 vieta a `render`/`ui` di importare `simulation`, ma D3 non colloca in `shared` i tipi del contratto D2. `ui` deve costruire/leggere `RaceConfig` e `DropletView`; `render` deve leggere `RaceSnapshot`. La regola di dipendenza e il flusso di D2 F5 non sono compatibili senza una collocazione esplicita dei tipi.
- **Correzione:** Dichiarare in D3 che i tipi del contratto D2 vivono in `src/shared` (oppure ammettere `render/ui → simulation/types`).

### 3. [Bassa] — Controllo 2

- **Citazione:** D2: «getSnapshot(): RaceSnapshot; // immutabile, per UI e rendering»; D2-A: «lo snapshot deve essere immutabile/congelato».
- **Punto incriminato:** D2, contratto, `DropletView` e `ObstacleView`: i campi non sono `readonly`; `readonly droplets: readonly DropletView[]` protegge l’array, non i suoi elementi. La promessa di immutabilità non è espressa dai tipi; UI o test possono mutare un elemento dello snapshot.
- **Correzione:** Rendere `readonly` i campi di `DropletView`, `ObstacleView` e delle varianti di `RaceOutcome` (o usare `Readonly<...>`).

### 4. [Bassa] — Controllo 2

- **Citazione:** D1-A F3: «Il motore aggiorna stato e snapshot ed emette `absorbed`.»; F4: «`app` pubblica lo snapshot a React alla cadenza UI concordata.»; F5: «`render` disegna lo snapshot; la UI mostra l’evento.»
- **Punto incriminato:** D1-A F4 pubblica solo lo snapshot; gli eventi restituiti da `advanceStep()` (D2) non hanno un percorso verso `ui`. F5 promette che la UI mostra l’evento, ma il flusso non lo prevede; con osservazione a bassa frequenza gli eventi possono andare persi.
- **Correzione:** In D1-A F4 pubblicare anche gli eventi accumulati tra due aggiornamenti UI (o includerli nello snapshot).

### 5. [Bassa] — Controllo 3

- **Citazione:** D2: `advanceStep(): { snapshot: RaceSnapshot; events: readonly SimulationEvent[] }`; `outcome: RaceOutcome | null`.
- **Punto incriminato:** D2, contratto, `SimulationEngine.advanceStep`: non è definito il comportamento quando `outcome` è già valorizzato. Per un test l’esito non è deterministico: il motore può avanzare ancora, restare fermo o rifiutare. **Nessun requisito citabile nel perimetro:** è un suggerimento tecnico, non una violazione.
- **Correzione:** Specificare il comportamento dopo `outcome !== null` (no-op con snapshot invariato oppure errore), così il test ha un esito atteso.

### Copertura dei controlli

- **Controllo 1:** nessun problema trovato nei riferimenti consentiti: nessuna violazione testuale di «Aspetto grafico», «Fisica della simulazione», «Vincoli tecnici» o US-001.
- **Controllo 2:** voci 2, 3, 4.
- **Controllo 3:** voce 5; la voce 1 ha una ricaduta sulla testabilità headless delle regole di configurazione.
- **Controllo 4:** voce 1.
- **Controllo 5:** nessun problema trovato; il contratto non contiene valori fisici né algoritmi (durata del passo a M6, geometria e generazione a M7).

**Nota:** le correzioni non scelgono tra le alternative A/B di D1, D2, D3 e non promuovono nulla in `docs/adr/`; restano proposte da sottoporre al committente. Le sei ambiguità di T-006 restano in «Da decidere».

Commento dell'Orchestrator: esito ricevuto alla seconda delega; la prima è tornata vuota ed è stata ripetuta una sola volta riprendendo la stessa sessione, come da regola. Ho incollato l'output integrale senza modifiche. Verifica formale: 5 voci (sotto il limite di 8), tutte con gravità, citazione, punto incriminato, correzione entro 3 righe e controllo di riferimento; nessuna gravità Alta, coerentemente con i criteri; nessuna modifica ai file e nessuna libreria proposta. Non ho valutato nel merito le correzioni: restano da sottoporre al committente.

## Costo
Deleghe effettuate: 2 (1 a vuoto: la prima chiamata al code-reviewer è tornata senza output; la seconda, ripresa della stessa sessione, ha prodotto la revisione riportata sopra)
