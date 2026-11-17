# Requisiti

Versione: 0.9

Questo documento è la fonte di verità del progetto. Solo il committente può modificarlo.

## Progetto: Drop-Race

Drop-Race è una webapp che simula una gara tra gocce d'acqua su un finestrino.

L'utente prepara i concorrenti e configura le caratteristiche generali del finestrino. Il sistema genera proceduralmente il percorso e avvia una gara automatica.

### Creazione delle gocce

L'utente può:
- Avere da 0 a 8 gocce dinamiche nella configurazione; la gara può partire solo con almeno 2.
- Scegliere la posizione iniziale x di ciascuna goccia; la quota è fissa, dietro una linea di partenza.
- Scegliere il colore di ciascuna goccia.

Il limite di 8 si riferisce alle gocce dinamiche presenti: eliminarne una permette di crearne una nuova.

Le gocce dinamiche hanno tutte le stesse proprietà fisiche iniziali.

Il colore è esclusivamente estetico e non influenza la simulazione.

La scelta del colore avviene tramite una palette fissa di 8 colori distinti, definiti dal sistema e coerenti con lo stile cartoon. Se l'utente piazza una goccia senza aver scelto un colore, le viene assegnato il primo colore della palette non utilizzato dalle gocce presenti. Un colore già utilizzato da una goccia presente non può essere assegnato a un'altra goccia: due gocce presenti hanno sempre colori diversi. I colori già utilizzati dalle gocce presenti non sono selezionabili nella palette.

Il posizionamento avviene tramite click o tap sul finestrino, rispettando una distanza minima tra le gocce.

Le gocce dinamiche hanno raggio pari a 3 unità logiche. Al posizionamento, la distanza tra i bordi di due gocce dinamiche non può essere inferiore a un raggio (3 unità, cioè 9 unità tra i centri). Il vincolo vale solo al piazzamento e solo tra gocce dinamiche.

Del click o tap vale solo la coordinata x.

Un click o tap su un punto libero del finestrino è un tentativo di piazzamento e, se riesce, piazza la goccia all'istante. La goccia nasce con il colore scelto nella palette per la goccia successiva oppure, se nessuno è stato scelto, con il primo colore della palette non utilizzato dalle gocce presenti. Dopo ogni piazzamento riuscito la scelta del colore per la goccia successiva viene rimossa. L'utente può scegliere il colore prima del piazzamento oppure piazzare la goccia e cambiarne il colore successivamente, selezionandola.

Un tentativo di piazzamento è valutato in quest'ordine:
1. Fuori dal finestrino: nessun effetto e nessun messaggio.
2. Con 8 gocce presenti: la goccia non viene creata e l'interfaccia informa che è stato raggiunto il numero massimo.
3. Aggancio: se la x è a meno di 3 unità logiche da un bordo laterale, il centro viene agganciato a x = 3 o x = 97.
4. Distanza minima, verificata sulla posizione dopo l'aggancio: se non è rispettata, la goccia non viene creata e l'interfaccia informa che la posizione è troppo vicina a un'altra goccia.
In tutti gli altri casi la goccia viene creata.

Selezione e modifica. Un click o tap su una goccia dinamica già presente, cioè su un punto interno al suo cerchio, la seleziona; non è un tentativo di piazzamento. È selezionata al massimo una goccia: un secondo click o tap sulla goccia selezionata la deseleziona, e un piazzamento riuscito deseleziona la goccia selezionata. Una goccia selezionata può essere ricolorata, spostata o eliminata. Con una goccia selezionata, la scelta di un colore nella palette ne cambia il colore, purché non sia utilizzato da altre gocce presenti: con 8 gocce presenti il cambio di colore non è possibile. Senza gocce selezionate, la scelta di un colore determina quello della goccia successiva.

Se la scelta di un colore per la goccia successiva coincide con il colore che una goccia selezionata assume in seguito a una ricolorazione, la scelta per la goccia successiva viene rimossa. Un tentativo di piazzamento non riuscito lascia invariate la selezione e la scelta del colore per la goccia successiva.

Lo spostamento avviene tramite trascinamento, che seleziona la goccia trascinata, e segue le stesse regole del piazzamento: del punto di rilascio vale solo la coordinata x, che viene agganciata al bordo se necessario, e la distanza minima tra i bordi delle gocce dinamiche deve restare rispettata. Se il rilascio avviene fuori dal finestrino o in una posizione che, anche dopo l'aggancio, non rispetta la distanza minima, la goccia torna alla posizione che occupava prima del trascinamento; non viene mostrato alcun messaggio.

Il piazzamento, la selezione, lo spostamento, la ricolorazione e l'eliminazione delle gocce sono possibili solo in fase di configurazione, cioè prima dell'inizio del conto alla rovescia.

La linea di partenza si trova a 10 unità logiche dal bordo superiore del finestrino e non è visualizzata. I centri delle gocce dinamiche si trovano a 7 unità logiche dal bordo superiore: con raggio 3, ogni goccia poggia con il bordo inferiore sulla linea di partenza ed è interamente dietro di essa. La fascia di partenza è la zona compresa tra il bordo superiore del finestrino e la linea di partenza, alta 10 unità logiche.

L'indipendenza della densità dalla coordinata x è garantita per costruzione: il generatore estrae le posizioni x degli elementi spaziali generati (gocce statiche, ostacoli, zone di aderenza) da una distribuzione uniforme sulla larghezza del finestrino.

### Configurazione del finestrino

L'utente può configurare:
- Altezza del finestrino.
- Livello degli ostacoli: basso, medio o alto.

Gli «ostacoli spaziali» hanno una posizione sul finestrino e possono rallentare, deviare o bloccare; le correnti d'aria sono ostacoli globali con effetto di spinta. Il livello regola la quantità degli ostacoli spaziali e la frequenza delle correnti.

Il livello degli ostacoli regola la quantità di ostacoli generati: basso, medio e alto corrispondono a quantità crescenti di ostacoli. La ripartizione tra i tipi di effetto (rallentare, deviare, bloccare) non dipende dal livello: tutti e tre i tipi possono comparire a ogni livello, basso compreso. I valori esatti delle quantità per ciascun livello sono definiti dal generatore procedurale.

La larghezza è fissa e vale 100 unità logiche. L'altezza è regolabile dall'utente tra 250 e 1000 unità logiche, con valore predefinito 700. Le unità logiche sono astratte (non centimetri) e vengono scalate alle dimensioni dello schermo mantenendo le proporzioni

Il finestrino è sempre verticale, senza inclinazione.

Il sistema genera automaticamente:
- Posizione e dimensione delle gocce statiche.
- Zone con diversa aderenza.
- Ostacoli.
- Eventuali correnti d'aria.

Le correnti d'aria sono considerate ostacoli e devono interessare tutte le gocce dinamiche nello stesso momento.

Una corrente d'aria è un evento globale temporaneo: quando è attiva, applica a tutte le gocce dinamiche la stessa spinta, definita da un vettore di direzione e intensità, per una durata limitata. L'effetto della spinta sulla velocità di ciascuna goccia dipende dalla direzione del vettore rispetto al moto della goccia e può deviarla o accelerarla.

Le correnti d'aria sono generate proceduralmente insieme al resto del percorso tramite il generatore pseudo-casuale con seed: a parità di seed, gli istanti di attivazione, le durate e i vettori delle correnti sono deterministici.

Le correnti d'aria possono verificarsi a ogni livello di ostacoli, basso compreso; la loro frequenza cresce dal livello basso al livello alto. I valori esatti di intensità, durata e frequenza per ciascun livello sono definiti dal generatore procedurale.

Le correnti d'aria costituiscono una famiglia di ostacoli con effetto proprio, la spinta: la regola sulla ripartizione tra i tipi di effetto degli ostacoli (rallentare, deviare, bloccare) riguarda gli ostacoli spaziali e non si applica alle correnti.

Le correnti d'aria non agiscono sulle gocce bloccate: durante un blocco la goccia resta ferma anche se una corrente è attiva.

Le zone di aderenza sono aree del finestrino, generate proceduralmente insieme al resto del percorso tramite il generatore pseudo-casuale con seed, e restano fisse per tutta la durata della gara. Ogni zona possiede un proprio coefficiente di aderenza, che regola l'attrito al moto: mentre una goccia dinamica si trova dentro una zona più aderente scorre più lentamente, dentro una zona meno aderente più velocemente. Fuori dalle zone si applica l'aderenza di base del finestrino. Le formule che traducono il coefficiente di aderenza in attrito sul moto sono demandate al modello matematico da approvare.

Il numero e la disposizione delle zone sono estratti casualmente col seed, nel rispetto delle condizioni del generatore. I valori esatti dei coefficienti, del numero e della geometria delle zone sono definiti dal generatore procedurale.

L'utente non può scegliere il percorso.

### Movimento e ostacoli

- Le quote si misurano dall'alto verso il basso: una quota maggiore indica una posizione più vicina al traguardo.
- Le gocce dinamiche si muovono in 2D: possono deviare lateralmente.
- I bordi laterali e il bordo superiore del finestrino si comportano come pareti su cui la goccia scivola: quando una goccia dinamica raggiunge uno di questi bordi, la componente della sua velocità perpendicolare al bordo viene azzerata, la componente parallela resta invariata e la goccia non va mai oltre il bordo. Il bordo inferiore non è una parete: è il traguardo, che la goccia dinamica supera completamente per vincere la gara.
- Gli ostacoli, in base al tipo, possono rallentare, deviare o bloccare una goccia.
- Un blocco non è mai permanente. All'inizio di ogni blocco viene estratta casualmente una durata compresa tra 1 e 3 secondi, tramite il generatore pseudo-casuale della simulazione: a parità di seed la sequenza delle durate estratte è deterministica.
- Durante il blocco la goccia resta ferma, con velocità nulla. Alla fine del blocco la goccia riprende la velocità nominale che aveva immediatamente prima dell'inizio del blocco con l'eventuale boost secondo la sezione «Boost temporaneo di
velocità».
- Durante il blocco le regole di contatto e di inglobamento restano valide in entrambe le direzioni: la goccia bloccata può inglobare le gocce con cui viene a contatto e può essere inglobata da una goccia dinamica di potenza superiore.
- Se una goccia bloccata ingloba un'altra goccia, il blocco termina immediatamente, anche se la durata estratta non è ancora scaduta: la goccia riprende il movimento con la velocità che aveva immediatamente prima dell'inizio del blocco e si applicano tutti gli effetti dell'inglobamento. Se una goccia bloccata viene inglobata, il blocco non si trasferisce alla goccia che ingloba.

### Generazione procedurale

Il percorso deve essere generato casualmente a ogni gara.

Condizioni del generatore:
- Nessuna goccia statica, ostacolo o zona di aderenza si trova nella fascia di partenza né nel margine vuoto sotto la linea di partenza, di altezza pari alla distanza minima tra le gocce (3 unità).
- Le gocce statiche non si sovrappongono tra loro.
- La densità degli elementi generati non dipende dalla coordinata x: nessuna posizione orizzontale è favorita per costruzione.
- Non sono richiesti né la simmetria del percorso né un percorso sempre libero: i blocchi sono temporanei.

Deve essere possibile ottenere percorsi differenti mantenendo le stesse impostazioni generali.

In ogni nuova partita il seed del generatore pseudo-casuale viene generato automaticamente dal sistema tramite entropia: l'utente non può vederlo né inserirlo. L'inserimento esplicito di un seed è riservato ai test della simulazione. Non è prevista una garanzia esplicita di diversità del percorso rispetto alla gara precedente: la generazione casuale del seed rende la ripetizione di un percorso identico così improbabile da non richiedere un controllo.

Il percorso comprende gocce statiche che non si muovono e costituiscono elementi dell'ambiente.

Le gocce statiche hanno dimensioni variabili e vengono generate casualmente.

### Tipologie di gocce

Esistono due tipologie di gocce.

GOCCE DINAMICHE:
- Sono i concorrenti.
- Vengono create dall'utente.
- Si muovono autonomamente.
- Possono inglobare gocce statiche e dinamiche.

GOCCE STATICHE:
- Sono elementi del percorso.
- Sono generate proceduralmente.
- Non si muovono.
- Possono essere inglobate da gocce dinamiche.
- Non possono inglobare altre gocce.

Una volta create le gocce non modificano la loro grandezza durante tutta la simulazione.

### Regole di inglobamento

Una goccia dinamica può inglobare:
- Qualsiasi goccia statica.
- Una goccia dinamica esclusivamente quando possiede una potenza superiore.

La potenza è un valore associato a ogni goccia dinamica e serve solo a stabilire chi può inglobare chi.

La potenza non è visualizzata durante la gara: resta un valore interno della simulazione e l'utente ne osserva solo gli effetti, cioè quali gocce inglobano quali.

Calcolo della potenza:
- La potenza iniziale di ogni goccia dinamica è 0.
- Inglobando una goccia statica, la potenza aumenta di 1.
- Inglobando una goccia dinamica B, la goccia dinamica A assume potenza P(A) + P(B) + 1.

Due gocce dinamiche con la stessa potenza non possono inglobarsi: rimbalzano.

Il rimbalzo tra gocce di pari potenza è reciproco e simmetrico, non produce né inglobamento né blocco, e non modifica la potenza. I dettagli del modello, compresa l'eventuale dissipazione di energia, sono demandati al modello matematico da approvare. Nel passo in cui avviene il rimbalzo, le gocce vengono inoltre separate in modo che non risultino a contatto all'inizio del passo successivo.

I rimbalzi vengono risolti dopo tutti gli inglobamenti dello stesso passo di tempo, anch'essi in cascata sequenziale secondo il medesimo criterio di ordinamento: prima il rimbalzo che coinvolge la goccia dinamica più vicina al traguardo e, a parità di quota del centro, quella con coordinata x minore; i contatti vengono riverificati sullo stato aggiornato dopo ogni rimbalzo.

Due gocce sono in contatto quando la distanza tra i loro centri è minore o uguale alla somma dei loro raggi. L'inglobamento è automatico: appena, durante un passo di tempo, una goccia dinamica è in contatto con una goccia che può inglobare, l'inglobamento avviene in quel passo, senza alcuna azione dell'utente.

Se durante uno stesso passo di tempo si presentano più contatti tra gocce che possono inglobarsi, gli inglobamenti vengono risolti in cascata, uno alla volta: si individua la goccia dinamica coinvolta in almeno un contatto inglobabile più vicina al traguardo e, a parità di quota del centro, quella con coordinata x minore; se più contatti inglobabili coinvolgono quella stessa goccia, si risolve per primo il contatto con l'altra goccia più vicina al traguardo e, a parità di quota, quello con l'altra goccia di coordinata x minore; l'inglobamento viene applicato e lo stato aggiornato; i contatti vengono quindi riverificati sullo stato aggiornato e la procedura si ripete finché, nello stesso passo, restano contatti tra gocce che possono inglobarsi. I contatti che coinvolgono gocce già eliminate non sono presi in considerazione.

Se una goccia dinamica ingloba un'altra goccia:
- La goccia inglobata viene eliminata.
- La potenza viene aggiornata come sopra.
- La goccia che ingloba assume la posizione della goccia coinvolta più vicina al traguardo, cioè quella con la quota del centro maggiore: se la goccia inglobata è più vicina al traguardo, la goccia che ingloba ne assume la posizione; se la goccia che ingloba è più vicina al traguardo o le quote sono uguali, mantiene la propria posizione. La regola vale per l'inglobamento di gocce statiche e dinamiche.
- La goccia che ingloba mantiene la propria velocità: non acquisisce la velocità della goccia inglobata, il cui eventuale boost residuo si perde. L'inglobamento produce comunque l'aumento temporaneo di velocità previsto per la goccia che ingloba.
- Non viene riprodotta alcuna animazione di fusione.

### Boost temporaneo di velocità

Ogni inglobamento, di una goccia statica o dinamica, produce un aumento temporaneo di velocità della goccia che ingloba. Il boost è un moltiplicatore ×1,1 applicato alla velocità, con durata 200 ms.

Esempio (valori puramente esemplificativi):
- Velocità nominale: 1 unità/s.
- Velocità durante il boost: 1,1 unità/s.
- Durata: 200 ms.

Se durante il boost avviene un altro inglobamento:
- Il timer viene azzerato.
- La durata riparte da 200 ms.
- Il moltiplicatore massimo rimane ×1,1.
- Non si accumulano ulteriori incrementi di velocità.

Alla fine del boost la velocità torna al valore nominale previsto dalla simulazione.

Il moltiplicatore si applica alla velocità nominale calcolata dal modello, istante per istante: durante il boost la velocità effettiva della goccia è pari alla velocità che la simulazione avrebbe prodotto in quell'istante senza boost, moltiplicata per 1,1. Il moltiplicatore non viene mai applicato a una velocità già moltiplicata.

Il timer del boost è misurato in tempo simulato e continua a scorrere anche mentre la goccia è bloccata: se la durata del blocco supera il residuo del boost, il boost scade durante il blocco. La ripresa del movimento dopo un blocco, per scadenza della durata estratta o per interruzione dovuta a un inglobamento, segue la regola del blocco sulla velocità, letta al netto dello stato di boost alla ripresa: la goccia riprende la velocità nominale che aveva immediatamente prima dell'inizio del blocco, moltiplicata per 1,1 solo se, alla ripresa, il boost è ancora attivo.

### Svolgimento della gara

La sequenza è:

1. L'utente prepara da 2 a 8 gocce dinamiche.
2. Configura altezza e livello degli ostacoli.
3. Il sistema genera il percorso casuale.
4. Parte il conto alla rovescia.
5. Le gocce iniziano a muoversi automaticamente.
6. Vince la prima goccia dinamica che raggiunge la fine del finestrino.

L'avvio della gara è azionato da un controllo dedicato, visibile ma disattivato finché le gocce dinamiche piazzate sono meno di 2. Il controllo diventa attivo quando le gocce sono almeno 2. L'interfaccia può indicare staticamente il numero minimo di gocce richiesto.

Il conto alla rovescia dura 3 secondi e avanza in tempo reale, non in tempo simulato: durante il conto alla rovescia la simulazione fisica non è ancora in esecuzione. Una volta avviato il conto alla rovescia, la gara parte comunque al suo termine: non è previsto annullamento né ritorno alla configurazione.

Durante il conto alla rovescia la configurazione è congelata: non è possibile piazzare, spostare, eliminare o ricolorare gocce, né modificare l'altezza del finestrino o il livello degli ostacoli. Tutti i controlli di configurazione e di modifica delle gocce risultano disattivati dal momento in cui il conto alla rovescia ha inizio fino al termine della gara.

Il traguardo coincide con il bordo inferiore del finestrino. Una goccia dinamica raggiunge il traguardo quando è interamente oltre il bordo inferiore del finestrino: il centro è a una quota pari all'altezza del finestrino più 3 unità logiche.

Se più gocce dinamiche raggiungono il traguardo nello stesso passo di tempo, la gara termina in quel passo e vince la goccia che ha superato maggiormente il traguardo, cioè quella con la quota maggiore. In caso di quota identica, vince la goccia con la coordinata x minore.

La partita termina nel passo di tempo in cui almeno una goccia dinamica raggiunge il traguardo: il vincitore è determinato come sopra e non vengono eseguiti ulteriori passi.

La gara termina anche per timeout: se entro 300 secondi di tempo simulato nessuna goccia dinamica ha raggiunto il traguardo, la gara termina senza vincitore. Il timeout è misurato in tempo simulato, lo stesso tempo in cui sono espresse la durata dei blocchi e del boost, indipendente dal tempo reale.

Non sono previste:
- Pause.
- Accelerazione del tempo di simulazione per l'utente. I test possono far avanzare la simulazione a passi di tempo fissi, indipendenti dal tempo reale.
- Classifiche.
- Statistiche finali.

Dopo la gara viene mostrato il vincitore oppure, in caso di timeout, l'esito di gara senza vincitore; l'utente può iniziare una nuova partita.

La schermata finale ha contenuto essenziale: mostra l'esito — la goccia vincitrice con il suo colore, oppure l'esito di gara senza vincitore in caso di timeout — e il controllo di avvio di una nuova partita, che è l'unico modo per procedere. La schermata appare in sovrimpressione sulla scena della gara, che resta congelata sullo sfondo. La schermata finale resta visibile finché l'utente non avvia una nuova partita.

Ogni nuova partita riparte da zero: l'utente torna alla configurazione iniziale. Gocce, colori, altezza (700) e livello degli ostacoli (medio) tornano ai valori predefiniti e viene generato un nuovo percorso.

## Aspetto grafico

Stile cartoon.

L'interfaccia utente (etichette, pulsanti, messaggi e testi a schermo) è in italiano; non è prevista una scelta di lingua.

L'interfaccia deve essere responsive e funzionare sia su desktop che su smartphone.

Il finestrino è visualizzato scalato sulla larghezza disponibile dello schermo, mantenendo le proporzioni. Se l'altezza scalata supera l'altezza visibile, una camera automatica mostra la porzione di finestrino che contiene la goccia dinamica in testa, cioè quella più vicina al traguardo. Se la goccia in testa viene inglobata, la camera segue la nuova goccia in testa. Quando il finestrino scalato è interamente visibile, la camera non effettua spostamenti. Prima dell'avvio della gara la vista mostra la zona di partenza, nella parte superiore del finestrino. Durante la gara non è previsto scorrimento manuale da parte dell'utente.

Il rendering deve utilizzare HTML Canvas.

React deve occuparsi dell'interfaccia e della gestione dello stato applicativo.

La logica della simulazione deve essere indipendente dal rendering.

## Fisica della simulazione

La fisica deve avere un livello di complessità intermedio.

Non deve essere una simulazione scientifica della fluidodinamica, ma nemmeno una semplice animazione con velocità casuali.

Deve considerare almeno:
- Gravità.
- Attrito.
- Aderenza.
- Inerzia.
- Collisioni.
- Interazioni tra gocce.
- Inglobamenti.
- Ostacoli.
- Correnti d'aria.
- Boost temporaneo.

Il motore fisico deve essere sviluppato come modulo indipendente.

La simulazione deve utilizzare un timestep controllato, indipendente dal frame rate del rendering.

La logica deve essere testabile in modo deterministico.

Prima di implementare il motore fisico va proposto un modello matematico, con le formule spiegate, da approvare.

Non vanno introdotte proprietà fisiche non concordate senza presentarle prima come decisioni da approvare.

## Vincoli tecnici

- Stack: Vite, React, TypeScript, Vitest, npm.
- Deploy: GitHub Pages.

## Punti aperti

- Larghezza massima del finestrino su schermi larghi: Milestone 5.
- Significato di "fisica intermedia" (il modello matematico): Milestone 6.
- Durata tipica di una gara all'altezza predefinita e relazione con il timeout di 300 secondi (obiettivo di taratura del modello): Milestone 6.