# Requisiti

Versione: 0.5

Questo documento è la fonte di verità del progetto. Solo il committente può modificarlo.

## Progetto: Drop-Race

Drop-Race è una webapp che simula una gara tra gocce d'acqua su un finestrino.

L'utente prepara i concorrenti e configura le caratteristiche generali del finestrino. Il sistema genera proceduralmente il percorso e avvia una gara automatica.

### Creazione delle gocce

L'utente può:
- Creare da 2 a 8 gocce dinamiche.
- Scegliere la posizione iniziale x di ciascuna goccia; la quota è fissa, dietro una linea di partenza.
- Scegliere il colore di ciascuna goccia.

Le gocce dinamiche hanno tutte le stesse proprietà fisiche iniziali.

Il colore è esclusivamente estetico e non influenza la simulazione.

Il posizionamento avviene tramite click o tap sul finestrino, rispettando una distanza minima tra le gocce.

Del click o tap vale solo la coordinata x.

### Configurazione del finestrino

L'utente può configurare:
- Altezza del finestrino.
- Livello degli ostacoli: basso, medio o alto.

La larghezza è fissa. È una larghezza logica, scalata alle dimensioni dello schermo mantenendo le proporzioni.

Il finestrino è sempre verticale, senza inclinazione.

Il sistema genera automaticamente:
- Posizione e dimensione delle gocce statiche.
- Zone con diversa aderenza.
- Ostacoli.
- Eventuali correnti d'aria.

Le correnti d'aria sono considerate ostacoli e devono interessare tutte le gocce dinamiche nello stesso momento.

L'utente non può scegliere il percorso.

### Movimento e ostacoli

- Le gocce dinamiche si muovono in 2D: possono deviare lateralmente.
- Gli ostacoli, in base al tipo, possono rallentare, deviare o bloccare una goccia.
- Un blocco dura da 1 a 3 secondi e non è mai permanente.

### Generazione procedurale

Il percorso deve essere generato casualmente a ogni gara.

Deve essere possibile ottenere percorsi differenti mantenendo le stesse impostazioni generali.

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

### Regole di inglobamento

Una goccia dinamica può inglobare:
- Qualsiasi goccia statica.
- Una goccia dinamica esclusivamente quando possiede una potenza superiore.

La potenza è un valore associato a ogni goccia dinamica e serve solo a stabilire chi può inglobare chi.

Calcolo della potenza:
- La potenza iniziale di ogni goccia dinamica è 0.
- Inglobando una goccia statica, la potenza aumenta di 1.
- Inglobando una goccia dinamica B, la goccia dinamica A assume potenza P(A) + P(B) + 1.

Due gocce dinamiche con la stessa potenza non possono inglobarsi: rimbalzano.

Se una goccia dinamica ingloba un'altra goccia:
- La goccia inglobata viene eliminata.
- La potenza viene aggiornata come sopra.
- Non viene riprodotta alcuna animazione di fusione.

### Boost temporaneo di velocità

Ogni inglobamento, di una goccia statica o dinamica, produce un aumento temporaneo di velocità della goccia che ingloba. Il boost è un moltiplicatore ×1,1 applicato alla velocità, con durata 200 ms.

Esempio (valori puramente esemplificativi):
- Velocità nominale: 1 cm/s.
- Velocità durante il boost: 1,1 cm/s.
- Durata: 200 ms.

Se durante il boost avviene un altro inglobamento:
- Il timer viene azzerato.
- La durata riparte da 200 ms.
- Il moltiplicatore massimo rimane ×1,1.
- Non si accumulano ulteriori incrementi di velocità.

Alla fine del boost la velocità torna al valore nominale previsto dalla simulazione.

### Svolgimento della gara

La sequenza è:

1. L'utente crea da 2 a 8 gocce dinamiche.
2. Configura altezza e livello degli ostacoli.
3. Il sistema genera il percorso casuale.
4. Parte il conto alla rovescia.
5. Le gocce iniziano a muoversi automaticamente.
6. Vince la prima goccia dinamica che raggiunge la fine del finestrino.

Il traguardo coincide con il bordo inferiore del finestrino.

Quando una goccia raggiunge il traguardo, la partita termina immediatamente.

Non sono previste:
- Pause.
- Accelerazione del tempo di simulazione per l'utente. I test possono far avanzare la simulazione a passi di tempo fissi, indipendenti dal tempo reale.
- Classifiche.
- Statistiche finali.

Dopo la gara viene mostrato il vincitore e l'utente può iniziare una nuova partita.

Ogni nuova partita riparte da zero, senza mantenere la configurazione precedente.

## Aspetto grafico

Stile cartoon.

L'interfaccia deve essere responsive e funzionare sia su desktop che su smartphone.

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

- Valore della larghezza logica e intervallo dell'altezza: Milestone 4.
- Distanza minima tra le gocce: Milestone 4.
- Condizioni di equità del generatore: Milestone 4.
- Cosa si azzera a ogni nuova partita: Milestone 4.
- Lingua dell'interfaccia: Milestone 5.
- Posizione e visibilità della linea di partenza: Milestone 5.
- Modifica ed eliminazione delle gocce prima dell’avvio; tentativo di avvio con meno di 2 gocce: Milestone 5.
- Comportamento al tentativo di creare più di 8 gocce: Milestone 5.
- Scelta del colore (palette o libera, duplicati, colore predefinito): Milestone 5.
- Click o tap fuori dai bordi, sulla linea di partenza o troppo vicino a un’altra goccia: Milestone 5.
- Momento della creazione (immediato o con conferma) e ordine posizione/colore: Milestone 5.
- Criterio di traguardo e parità: Milestone 6.
- Geometria e automaticità dell'inglobamento: Milestone 6.
- Collisioni multiple nello stesso istante: Milestone 6.
- Cosa acquisisce la goccia che ingloba (velocità, boost residuo): Milestone 6.
- Modello del rimbalzo tra gocce di pari potenza: Milestone 6.
- Comportamento ai bordi del finestrino: Milestone 6.
- Gara senza vincitore (timeout): Milestone 6.
- Crescita visiva: Milestone 6.
- Significato di "fisica intermedia" (il modello matematico): Milestone 6.
- Semantica del blocco (durata nel range, interazioni durante il blocco): Milestone 6.
- Riferimento del boost (velocità istantanea o nominale) e timer durante il blocco: Milestone 6, nel modello matematico.
- Dimensione delle gocce dinamiche: Milestone 6.
- Seed e garanzia di diversità tra gare consecutive: Milestone 7.
- Livelli di ostacolo: Milestone 7.
- Correnti d'aria: Milestone 7.
- Zone di aderenza: Milestone 7.
- Durata del countdown: Milestone 8.
- Schermata finale: Milestone 8.
- Avvio della gara e modifiche consentite durante il countdown: Milestone 8.
- Visibilità della potenza durante la gara: Milestone 8.