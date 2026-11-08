# Requisiti

## Progetto: Drop Race

Drop-Race è una webapp che simula una gara tra gocce d'acqua su un finestrino.

L'utente prepara i concorrenti e configura le caratteristiche generali del finestrino. Il sistema genera proceduralmente il percorso e avvia una gara automatica.

### Creazione delle gocce

L'utente può:
- Creare da 2 a 8 gocce dinamiche.
- Scegliere liberamente la posizione iniziale di ciascuna goccia.
- Scegliere il colore di ciascuna goccia.

Le gocce dinamiche hanno tutte le stesse proprietà fisiche iniziali.

Il colore è esclusivamente estetico e non influenza la simulazione.

Il posizionamento avviene tramite click o tap sul finestrino, rispettando una distanza minima tra le gocce.

### Configurazione del finestrino

L'utente può configurare:
- Altezza del finestrino.
- Livello degli ostacoli: basso, medio o alto.

La larghezza è fissa.

Il sistema genera automaticamente:
- Posizione e dimensione delle gocce statiche.
- Zone con diversa aderenza.
- Ostacoli.
- Eventuali correnti d'aria.

Le correnti d'aria sono considerate ostacoli e devono interessare tutte le gocce dinamiche nello stesso momento.

L'utente non può scegliere il percorso.

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

La potenza di una goccia dinamica dipende dal numero di gocce statiche inglobate.

Due gocce dinamiche con la stessa potenza non possono inglobarsi.

Se una goccia dinamica ingloba un'altra goccia:
- La goccia inglobata viene eliminata.
- La potenza viene aggiornata secondo le regole definite.
- Non viene riprodotta alcuna animazione di fusione.

ATTENZIONE: la definizione esatta dell'incremento di potenza quando viene inglobata una goccia dinamica deve essere chiarita prima dell'implementazione. Non inventare una regola.

### Boost temporaneo

Ogni inglobamento produce un'accelerazione temporanea.

Esempio:
- Velocità nominale: 1 cm/s.
- Velocità durante il boost: 1,1 cm/s.
- Durata: 200 ms.

Se durante il boost avviene un altro inglobamento:
- Il timer viene azzerato.
- La durata riparte da 200 ms.
- La velocità massima rimane 1,1 cm/s.
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
- Accelerazioni della simulazione.
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
- Inclinazione del finestrino, se prevista dal modello fisico.
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

Prima di implementare il motore fisico, proponi un modello matematico e spiegami le formule utilizzate.

Non inventare proprietà fisiche non concordate senza presentarle prima come decisioni da approvare.

## Decisioni chiarite (v0.1)

- Potenza iniziale di ogni goccia dinamica: 0.
- Inglobare una goccia statica: potenza +1.
- Inglobare una goccia dinamica: P' = P(A) + P(B) + 1.
- Gocce dinamiche di pari potenza: rimbalzano.
- Boost: moltiplicatore x1,1 sulla velocità, 200 ms, timer azzerato a ogni
  nuovo inglobamento, non cumulabile. I valori di velocità negli esempi
  sono esemplificativi.
- La potenza influenza solo l'inglobamento.
- Posizione iniziale: l'utente sceglie solo la x; la quota è fissa,
  dietro una linea di partenza.
- Moto 2D. Gli ostacoli possono rallentare, deviare o bloccare;
  un blocco dura da 1 a 3 secondi (mai permanente).
- Finestrino sempre verticale, nessuna inclinazione.
- Stack: Vite, React, TypeScript, Vitest, npm. Deploy: GitHub Pages.
- OpenCode V1 (1.19.5). Nessuna migrazione a V2 prima della Milestone 10.