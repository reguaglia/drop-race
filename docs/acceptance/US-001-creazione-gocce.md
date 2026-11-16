# US-001 — Creazione delle gocce

Stato: approvata
Requisiti: versione 0.8
Origine: T-004 (storie), T-005 (revisione), riscrittura finale su autorizzazione del committente

Salvo US-4, tutti i criteri valgono in fase di configurazione, cioè prima dell'inizio del conto alla rovescia. Per "punto libero" si intende un punto del finestrino non interno al cerchio di una goccia.

## US-1 — Piazzare una goccia dinamica

Come utente voglio piazzare una goccia dinamica con un click o tap sul finestrino per schierare un concorrente nella posizione x che preferisco.

### Criteri di accettazione

1.1 **Dato** che il click o tap avviene fuori dal finestrino, indipendentemente dal numero di gocce presenti, **quando** viene eseguito, **allora** non viene creata alcuna goccia e non compare alcun messaggio.
> «Fuori dal finestrino: nessun effetto e nessun messaggio.»

1.2 **Dato** che sono presenti 8 gocce dinamiche e il click o tap avviene dentro il finestrino su un punto libero, **quando** viene eseguito, **allora** nessuna goccia viene creata e l'interfaccia informa che è stato raggiunto il numero massimo.
> «Con 8 gocce presenti: la goccia non viene creata e l'interfaccia informa che è stato raggiunto il numero massimo.»

1.3 **Dato** che sono presenti meno di 8 gocce, il click o tap avviene dentro il finestrino su un punto libero a meno di 3 unità logiche da un bordo laterale e la posizione agganciata rispetta la distanza minima, **quando** viene eseguito, **allora** la goccia viene creata con il centro a x = 3 (bordo sinistro) oppure x = 97 (bordo destro).
> «Aggancio: se la x è a meno di 3 unità logiche da un bordo laterale, il centro viene agganciato a x = 3 o x = 97.»

1.4 **Dato** che sono presenti meno di 8 gocce, il click o tap avviene dentro il finestrino su un punto libero e la posizione, dopo l'eventuale aggancio, dista meno di 9 unità tra i centri da una goccia presente, **quando** viene eseguito, **allora** nessuna goccia viene creata e l'interfaccia informa che la posizione è troppo vicina a un'altra goccia.
> «Distanza minima, verificata sulla posizione dopo l'aggancio: se non è rispettata, la goccia non viene creata e l'interfaccia informa che la posizione è troppo vicina a un'altra goccia.»
> «non può essere inferiore a un raggio (3 unità, cioè 9 unità tra i centri)»

1.5 **Dato** che sono presenti meno di 8 gocce, il click o tap avviene dentro il finestrino su un punto libero e la posizione, dopo l'eventuale aggancio, rispetta la distanza minima, **quando** viene eseguito, **allora** la goccia viene creata all'istante.
> «se riesce, piazza la goccia all'istante.»
> «In tutti gli altri casi la goccia viene creata.»

1.6 **Dato** che il click o tap avviene a una quota qualsiasi, **quando** la goccia viene creata, **allora** la quota del click non ha effetto: il suo centro è a 7 unità logiche dal bordo superiore e, con raggio 3, il bordo inferiore poggia sulla linea di partenza (10 unità dal bordo superiore), con la goccia interamente dietro di essa.
> «Del click o tap vale solo la coordinata x.»
> «I centri delle gocce dinamiche si trovano a 7 unità logiche dal bordo superiore»
> «ogni goccia poggia con il bordo inferiore sulla linea di partenza ed è interamente dietro di essa»

1.7 **Dato** che il finestrino è mostrato, **quando** osservo la zona di partenza, **allora** la linea di partenza (a 10 unità logiche dal bordo superiore) non è visualizzata.
> «La linea di partenza si trova a 10 unità logiche dal bordo superiore del finestrino e non è visualizzata.»

## US-2 — Scegliere e cambiare il colore

Come utente voglio scegliere e cambiare il colore di ogni goccia da una palette fissa per distinguere i concorrenti a colpo d'occhio.

### Criteri di accettazione

2.1 **Dato** che la palette è mostrata, **quando** la osservo, **allora** contiene 8 colori distinti definiti dal sistema.
> «una palette fissa di 8 colori distinti, definiti dal sistema»

2.2 **Dato** che un colore è utilizzato da una goccia presente, **quando** la palette è mostrata, **allora** quel colore non è selezionabile.
> «I colori già utilizzati dalle gocce presenti non sono selezionabili nella palette.»

2.3 **Dato** che nessuna goccia è selezionata e ho scelto un colore non utilizzato per la goccia successiva, **quando** una goccia viene creata, **allora** nasce con il colore scelto.
> «La goccia nasce con il colore scelto nella palette per la goccia successiva»

2.4 **Dato** che nessun colore è stato scelto per la goccia successiva, **quando** una goccia viene creata, **allora** riceve il primo colore della palette non utilizzato dalle gocce presenti.
> «se nessuno è stato scelto, con il primo colore della palette non utilizzato dalle gocce presenti»

2.5 **Dato** che avevo scelto un colore per la goccia successiva, **quando** una goccia viene creata, **allora** la scelta viene rimossa: la goccia successiva, senza una nuova scelta, riceve il primo colore non utilizzato dalle gocce presenti.
> «Dopo ogni piazzamento riuscito la scelta del colore per la goccia successiva viene rimossa.»

2.6 **Dato** che una goccia è selezionata e la palette offre un colore non utilizzato da altre gocce, **quando** lo scelgo, **allora** la goccia selezionata assume quel colore.
> «la scelta di un colore nella palette ne cambia il colore, purché non sia utilizzato da altre gocce presenti»

2.7 **Dato** che sono presenti 8 gocce e una è selezionata, **quando** tento di cambiarne il colore, **allora** il suo colore non cambia.
> «con 8 gocce presenti il cambio di colore non è possibile»

## US-3 — Selezionare, spostare ed eliminare le gocce

Come utente voglio selezionare, spostare ed eliminare le gocce già piazzate per correggere la configurazione senza ricominciare.

### Criteri di accettazione

3.1 **Dato** che una goccia è presente, **quando** clicco o tocco un punto interno al suo cerchio, **allora** la goccia viene selezionata, nessun'altra goccia resta selezionata e non viene tentato alcun piazzamento.
> «Un click o tap su una goccia dinamica già presente, cioè su un punto interno al suo cerchio, la seleziona; non è un tentativo di piazzamento.»
> «È selezionata al massimo una goccia»

3.2 **Dato** che una goccia è selezionata, **quando** clicco di nuovo la stessa goccia oppure un piazzamento riesce, **allora** la goccia viene deselezionata.
> «un secondo click o tap sulla goccia selezionata la deseleziona»
> «un piazzamento riuscito deseleziona la goccia selezionata»

3.3 **Dato** che una goccia è presente e il rilascio di un trascinamento è dentro il finestrino, a 3 o più unità logiche da entrambi i bordi laterali, con la distanza minima rispettata, **quando** trascino e rilascio la goccia, **allora** la goccia risulta selezionata e il suo centro si trova alla coordinata x del rilascio, a 7 unità logiche dal bordo superiore.
> «Lo spostamento avviene tramite trascinamento, che seleziona la goccia trascinata»
> «del punto di rilascio vale solo la coordinata x, che viene agganciata al bordo se necessario»

3.4 **Dato** che il rilascio avviene dentro il finestrino a meno di 3 unità logiche da un bordo laterale e la posizione agganciata rispetta la distanza minima, **quando** rilascio, **allora** il centro della goccia è a x = 3 oppure x = 97.
> «il centro viene agganciato a x = 3 o x = 97»

3.5 **Dato** che il rilascio avviene fuori dal finestrino oppure in una posizione che, dopo l'aggancio, non rispetta la distanza minima, **quando** rilascio, **allora** la goccia torna alla posizione che occupava prima del trascinamento e non compare alcun messaggio.
> «Se il rilascio avviene fuori dal finestrino o in una posizione che, anche dopo l'aggancio, non rispetta la distanza minima»
> «la goccia torna alla posizione che occupava prima del trascinamento; non viene mostrato alcun messaggio.»

3.6 **Dato** che sono presenti 8 gocce e una è selezionata, **quando** la elimino, **allora** ne restano 7 e un nuovo piazzamento valido ha effetto.
> «Una goccia selezionata può essere ricolorata, spostata o eliminata.»
> «eliminarne una permette di crearne una nuova.»

3.7 **Dato** che elimino la goccia selezionata, **quando** la palette è mostrata, **allora** il colore che quella goccia usava non risulta più utilizzato ed è di nuovo selezionabile.
> «I colori già utilizzati dalle gocce presenti non sono selezionabili nella palette.»

## US-4 — Configurazione bloccata dopo l'avvio

Come utente voglio che le gocce non cambino dopo l'inizio del conto alla rovescia per correre con la configurazione che ho preparato.

### Criteri di accettazione

4.1 **Dato** che il conto alla rovescia è iniziato o la gara è in corso, **quando** clicco, tocco o trascino sul finestrino oppure uso la palette, **allora** nessuna goccia viene creata, selezionata, spostata, eliminata o ricolorata.
> «non è possibile piazzare, spostare, eliminare o ricolorare gocce»
> «sono possibili solo in fase di configurazione, cioè prima dell'inizio del conto alla rovescia»

## Non coperto

- «Le gocce dinamiche hanno tutte le stesse proprietà fisiche iniziali.»: la verifica dipende dal modello fisico (Punto aperto M6).
- L'irrilevanza del colore sulla simulazione: richiede la simulazione, fuori perimetro.
- Meccanica del trascinamento, area di presa, resa dei messaggi, ordine dei colori della palette, controllo di eliminazione: scelte tecniche e di interfaccia, da delegare ad Architect.