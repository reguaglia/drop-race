import type { DropColorId } from './game-contract';

// «La larghezza è fissa e vale 100 unità logiche.»
export const WINDOW_WIDTH = 100;

// «L'altezza è regolabile dall'utente tra 250 e 1000 unità logiche, con valore predefinito 700.»
export const WINDOW_HEIGHT_MIN = 250;
export const WINDOW_HEIGHT_MAX = 1000;
export const WINDOW_HEIGHT_DEFAULT = 700;

// «Le gocce dinamiche hanno raggio pari a 3 unità logiche.»
export const DROPLET_RADIUS = 3;

// «Avere da 0 a 8 gocce dinamiche nella configurazione; la gara può partire solo con almeno 2.»
// «Il limite di 8 si riferisce alle gocce dinamiche presenti: eliminarne una permette di crearne una nuova.»
export const MIN_DROPLETS = 2;
export const MAX_DROPLETS = 8;

// «la distanza tra i bordi di due gocce dinamiche non può essere inferiore a un raggio (3 unità, cioè 9 unità tra i centri)»
export const MIN_CENTER_DISTANCE = 9;

// «Aggancio: se la x è a meno di 3 unità logiche da un bordo laterale, il centro viene agganciato a x = 3 o x = 97.»
export const SIDE_MARGIN = 3;

// «La linea di partenza si trova a 10 unità logiche dal bordo superiore del finestrino e non è visualizzata.»
export const START_LINE_Y = 10;

// «I centri delle gocce dinamiche si trovano a 7 unità logiche dal bordo superiore»
export const DROPLET_START_Y = 7;

// «Il conto alla rovescia dura 3 secondi e avanza in tempo reale, non in tempo simulato»
export const COUNTDOWN_MS = 3000;

// «altezza (700) e livello degli ostacoli (medio) tornano ai valori predefiniti»
export const DEFAULT_OBSTACLE_LEVEL = 'medium' as const;

// «una palette fissa di 8 colori distinti, definiti dal sistema e coerenti con lo stile cartoon.»
// «Se l'utente piazza una goccia senza aver scelto un colore, le viene assegnato il primo colore della palette non utilizzato dalle gocce presenti.»
// L'ordine è l'ordine di assegnazione; i valori colore sono del rendering e non si decidono qui.
export const PALETTE_COLOR_IDS: readonly [DropColorId, DropColorId, DropColorId, DropColorId, DropColorId, DropColorId, DropColorId, DropColorId] = [
  'color-1',
  'color-2',
  'color-3',
  'color-4',
  'color-5',
  'color-6',
  'color-7',
  'color-8',
];

// «provvisorio, da tarare in M5»
export const DRAG_THRESHOLD = 1;
