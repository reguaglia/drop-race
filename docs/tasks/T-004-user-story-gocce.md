# T-004: User story per la creazione delle gocce (requisiti 0.7)

Stato: in revisione
Esecutore: product-owner
Milestone: 4
Dipendenze: nessuna

## Obiettivo
Scrivere le user story con criteri di accettazione per la sezione "Creazione delle gocce" di `docs/requirements.md` (versione 0.7), che sostituiranno quelle in `docs/acceptance/US-001-creazione-gocce.md`, ormai superate dai requisiti aggiornati.

## Riferimenti
- `docs/requirements.md` (versione 0.7), sezione "### Creazione delle gocce": dal titolo "Creazione delle gocce" al titolo "Configurazione del finestrino" (escluso).
- `docs/acceptance/US-001-creazione-gocce.md`: user story da sostituire.
- `docs/tasks/roadmap.md`: Milestone 4 e vincoli di processo.
- `docs/tasks/TEMPLATE.md`: formato dei task.
- `AGENTS.md`.

## Criteri di accettazione
- Da 2 a 4 user story, ciascuna con al massimo 7 criteri.
- Ogni criterio è nella forma Dato/Quando/Allora, ha un risultato osservabile, usa i valori numerici presenti nei requisiti e riporta la citazione testuale breve da cui deriva.
- Ogni criterio è vero in ogni stato che i requisiti ammettono (per esempio con 0, 1 o 8 gocce): niente criteri tautologici né falsi in stati validi.
- Nessun criterio duplicato, nessuna regola inventata, nessun valore non presente nei requisiti.
- Le dipendenze ammesse sono solo verso i Punti aperti ancora presenti in `docs/requirements.md`; per i punti già chiusi non scrivere "Dipende da".
- L'output sta nell'Esito, in blocchi Markdown pronti da copiare; nessun file creato oltre al task.

## Fuori perimetro
- Configurazione del finestrino.
- Generazione procedurale.
- Fisica.
- Avvio e svolgimento della gara.
- Modifica di `docs/requirements.md`, `docs/tasks/roadmap.md`, `AGENTS.md` o di qualsiasi altro file.

## Da decidere
- Promozione delle user story in `docs/acceptance/` in sostituzione di `US-001-creazione-gocce.md`: spetta al committente.
- Domande del product-owner (eventuale aggiornamento dei requisiti a carico del committente):
  1. Con 7 gocce resta un solo colore libero e con 8 gocce nessuno: poiché i colori usati non sono selezionabili, lo scambio di colore tra due gocce non è possibile. È previsto lo scambio, o solo l'assegnazione di colori non utilizzati?
  2. Il messaggio «posizione troppo vicina» è previsto per il piazzamento, non per il rilascio di un trascinamento non valido: va mostrato anche in quel caso?
  3. Un click o tap su una goccia già presente non è disciplinato: avvia un trascinamento o è un tentativo di piazzamento (che fallirebbe per distanza minima, con messaggio)?
- Chiusura del task dopo la revisione del committente.

## Esito

Output integrale del product-owner:

Ho letto `AGENTS.md`, `docs/requirements.md` (versione 0.7) e `docs/tasks/T-004-user-story-gocce.md` (oltre a `docs/tasks/roadmap.md` per i vincoli di processo). Di seguito le 3 user story, limitate alla sezione «Creazione delle gocce».

```markdown
## US-1 — Piazzare una goccia dinamica

Come utente voglio piazzare una goccia dinamica con un click o tap sul finestrino per schierare un concorrente nella posizione x che preferisco.

### Criteri di accettazione

1. Dato che la configurazione contiene meno di 8 gocce dinamiche e la posizione scelta rispetta la distanza minima, quando clicco o tocco all'interno del finestrino, allora la goccia dinamica viene creata contestualmente al click o tap.
   > «La creazione di una goccia dinamica è immediata: il click o tap sul finestrino piazza la goccia all'istante.»

2. Dato che clicco o tocco in un punto qualsiasi del finestrino, quando la goccia viene creata, allora la quota del punto non ha effetto: il suo centro si trova a 7 unità logiche dal bordo superiore e, con raggio 3 unità, la goccia poggia con il bordo inferiore sulla linea di partenza a 10 unità logiche dal bordo superiore, interamente dietro di essa.
   > «Del click o tap vale solo la coordinata x.» — «I centri delle gocce dinamiche si trovano a 7 unità logiche dal bordo superiore: con raggio 3, ogni goccia poggia con il bordo inferiore sulla linea di partenza ed è interamente dietro di essa.»

3. Dato che la coordinata x del click o tap è a meno di 3 unità logiche da un bordo laterale e la posizione agganciata rispetta la distanza minima, quando piazzo la goccia, allora la goccia viene creata con il centro agganciato a 3 unità logiche dal bordo più vicino (x = 3 oppure x = 97).
   > «il suo centro viene agganciato a 3 unità logiche dal bordo più vicino (x = 3 o x = 97)»

4. Dato che la posizione di piazzamento, anche dopo l'eventuale aggancio al bordo, si trova a meno di 9 unità di distanza tra i centri (distanza tra i bordi inferiore a 3 unità) da una goccia dinamica presente, quando clicco o tocco, allora la goccia non viene creata e l'interfaccia informa l'utente che la posizione è troppo vicina a un'altra goccia.
   > «la distanza tra i bordi di due gocce dinamiche non può essere inferiore a un raggio (3 unità, cioè 9 unità tra i centri)» — «se non la rispetta, la goccia non viene creata e l'interfaccia informa l'utente che la posizione è troppo vicina a un'altra goccia»

5. Dato che il click o tap avviene al di fuori del finestrino, quando lo eseguo, allora non viene creato alcun piazzamento e non compare alcun messaggio.
   > «Un click o tap al di fuori del finestrino non produce piazzamenti né messaggi.»

6. Dato che sono già presenti 8 gocce dinamiche, quando tento di posizionarne un'altra, allora la goccia non viene creata e l'interfaccia informa l'utente che è stato raggiunto il numero massimo.
   > «il tentativo di posizionarne un'altra non ha effetto: la goccia non viene creata e l'interfaccia informa l'utente che è stato raggiunto il numero massimo»

7. Dato che il finestrino è mostrato prima della gara, quando osservo la fascia di partenza, allora la linea di partenza a 10 unità logiche dal bordo superiore non è visualizzata.
   > «La linea di partenza si trova a 10 unità logiche dal bordo superiore del finestrino e non è visualizzata.»

Dipende da: Significato di "fisica intermedia" (il modello matematico) — per «Le gocce dinamiche hanno tutte le stesse proprietà fisiche iniziali»: le proprietà e la loro verifica dipendono dal modello, quindi il criterio relativo non è formulato.
```

```markdown
## US-2 — Scegliere e cambiare il colore

Come utente voglio scegliere e cambiare il colore di ogni goccia da una palette fissa per distinguere i concorrenti a colpo d'occhio.

### Criteri di accettazione

1. Dato che devo scegliere un colore, quando apro la palette, allora trovo una palette fissa di 8 colori distinti definiti dal sistema.
   > «La scelta del colore avviene tramite una palette fissa di 8 colori distinti, definiti dal sistema»

2. Dato che la configurazione contiene meno di 8 gocce e nessun colore è selezionato nella palette, quando una goccia viene creata, allora le viene assegnato il primo colore della palette non utilizzato dalle gocce presenti.
   > «se nessun colore è selezionato, con il primo colore della palette non utilizzato dalle gocce presenti»

3. Dato che ho selezionato un colore nella palette, quando una nuova goccia viene creata, allora nasce con il colore selezionato.
   > «La goccia nasce con il colore selezionato nella palette»

4. Dato che una goccia presente usa un colore, quando apro la palette, allora quel colore non è selezionabile.
   > «I colori già utilizzati dalle gocce presenti non sono selezionabili nella palette.»

5. Dato che una goccia è piazzata prima dell'avvio della gara e nella palette è disponibile un colore non utilizzato, quando assegno quel colore alla goccia, allora la goccia assume il nuovo colore.
   > «piazzare la goccia e cambiarne il colore successivamente»
```

```markdown
## US-3 — Spostare ed eliminare le gocce piazzate

Come utente voglio spostare ed eliminare le gocce già piazzate prima dell'avvio della gara per correggere la configurazione senza ricominciare.

### Criteri di accettazione

1. Dato che una goccia dinamica è piazzata prima dell'avvio della gara e il punto di rilascio è interno al finestrino, ad almeno 3 unità logiche dai bordi laterali e a distanza minima rispettata, quando trascino e rilascio la goccia, allora il suo centro si sposta alla coordinata x del punto di rilascio.
   > «Lo spostamento avviene tramite trascinamento e segue le stesse regole del posizionamento: del punto di rilascio vale solo la coordinata x»

2. Dato che una goccia dinamica è piazzata prima dell'avvio della gara, il rilascio avviene a meno di 3 unità logiche da un bordo laterale e la posizione agganciata rispetta la distanza minima, quando rilascio, allora il centro della goccia viene agganciato a 3 unità logiche dal bordo più vicino (x = 3 oppure x = 97).
   > «Il rilascio di un trascinamento segue le stesse regole: la coordinata x viene agganciata al bordo se necessario.»

3. Dato che una goccia dinamica è piazzata prima dell'avvio della gara, quando rilascio il trascinamento fuori dal finestrino, allora la goccia torna alla posizione che occupava prima del trascinamento.
   > «Se il rilascio avviene fuori dal finestrino ... la goccia torna alla posizione che occupava prima del trascinamento.»

4. Dato che una goccia dinamica è piazzata prima dell'avvio della gara e la posizione di rilascio, anche dopo l'aggancio, non rispetta la distanza minima tra i bordi delle gocce dinamiche (3 unità, cioè 9 unità tra i centri), quando rilascio, allora la goccia torna alla posizione che occupava prima del trascinamento.
   > «se la posizione di rilascio, anche dopo l'aggancio, non rispetta la distanza minima, la goccia torna alla posizione che occupava prima del trascinamento»

5. Dato che sono presenti 8 gocce dinamiche prima dell'avvio della gara, quando ne elimino una, allora la configurazione contiene una goccia in meno e il piazzamento di una nuova goccia, in una posizione che rispetta la distanza minima, ha effetto.
   > «Il limite di 8 si riferisce alle gocce presenti: eliminarne una permette di crearne una nuova.»

6. Dato che elimino una goccia prima dell'avvio della gara, quando apro la palette, allora il colore che quella goccia usava torna selezionabile.
   > «I colori già utilizzati dalle gocce presenti non sono selezionabili nella palette.»
```

Note di copertura (nessuna decisione presa):

- Non ho formulato un criterio sul colore «esclusivamente estetico e non influenza la simulazione»: la verifica richiede la simulazione, fuori perimetro.
- Non ho trattato la frase sull'indipendenza della densità dalla coordinata x: appartiene al generatore procedurale, fuori perimetro.

Domande aperte (lacune, non risolte):

1. Con 7 gocce resta un solo colore libero e con 8 gocce nessuno: poiché i colori usati non sono selezionabili, lo scambio di colore tra due gocce non è possibile. È previsto lo scambio, o solo l'assegnazione di colori non utilizzati?
2. Il messaggio «posizione troppo vicina» è previsto per il piazzamento, non per il rilascio di un trascinamento non valido: va mostrato anche in quel caso?
3. Un click o tap su una goccia già presente non è disciplinato: avvia un trascinamento o è un tentativo di piazzamento (che fallirebbe per distanza minima, con messaggio)?

Scelte tecniche lasciate fuori: meccanica e area di presa del trascinamento, ordine e valori della palette, resa dei messaggi, hit-testing del finestrino.

Da delegare ad Architect/Simulation

---

Commento dell'Orchestrator (verifica rispetto ai criteri di accettazione del task): le tre user story rispettano tutti i criteri. Sono 3 storie nell'intervallo 2–4, con 7/5/6 criteri (massimo 7 per storia); ogni criterio è in forma Dato/Quando/Allora con esito osservabile, valori numerici presenti nei requisiti 0.7 (8 gocce, 8 colori, 7 e 10 unità, raggio 3, 9 unità tra i centri, x = 3 o x = 97) e citazione testuale breve, tutte da me verificate sul testo dei requisiti; le precondizioni mantengono ogni criterio vero negli stati ammessi (con 0, 1 o 8 gocce presenti: per esempio US-1.1 e US-2.2 sono condizionate a meno di 8 gocce, US-1.6 a 8 gocce presenti, US-2.5 a un colore disponibile); nessun criterio duplicato; nessun valore inventato. L'unica dipendenza dichiarata («Significato di "fisica intermedia" (il modello matematico)») punta a un Punto aperto ancora presente in `docs/requirements.md`; nessun «Dipende da» verso punti ormai chiusi (distanza minima, linea di partenza, palette, comportamento a 8 gocce). Nessun file creato oltre al task.

Due osservazioni per il committente, nessuna delle quali a mio avviso invalida i criteri:
1. US-2.3 presuppone che al momento della creazione il colore selezionato non sia già usato da una goccia presente: i requisiti non specificano se la selezione resta attiva dopo il piazzamento; l'invariante «due gocce presenti hanno sempre colori diversi» lo implica, ma il meccanismo non è specificato.
2. US-3.6 («il colore ... torna selezionabile») è derivato per complemento dalla regola di esclusione dei colori usati, senza una frase testuale diretta che copra l'eliminazione della goccia.

Le tre domande aperte del product-owner sono riportate anche in «Da decidere».

## Revisione
Non eseguita: il committente ha chiesto di fermarsi dopo la delega.

## Costo
Deleghe effettuate: 1
