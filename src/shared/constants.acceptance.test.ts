import { describe, expect, it } from 'vitest';
import {
  COUNTDOWN_MS,
  DEFAULT_OBSTACLE_LEVEL,
  DROPLET_RADIUS,
  DROPLET_START_Y,
  MAX_DROPLETS,
  MIN_CENTER_DISTANCE,
  MIN_DROPLETS,
  PALETTE_COLOR_IDS,
  SIDE_MARGIN,
  START_LINE_Y,
  WINDOW_HEIGHT_DEFAULT,
  WINDOW_HEIGHT_MAX,
  WINDOW_HEIGHT_MIN,
  WINDOW_WIDTH,
} from './constants';

// DRAG_THRESHOLD is deliberately not pinned here: it is provisional
// ("provvisorio, da tarare in M5", ADR-002, "Conseguenze").

describe('Costanti condivise — valori dei requisiti', () => {
  it('Requisiti 1.0: costanti inchiodate ai valori testuali dei requisiti', () => {
    expect(WINDOW_WIDTH).toBe(100); // «La larghezza è fissa e vale 100 unità logiche.»
    expect(WINDOW_HEIGHT_MIN).toBe(250); // «L'altezza è regolabile dall'utente tra 250 e 1000 unità logiche, con valore predefinito 700.»
    expect(WINDOW_HEIGHT_MAX).toBe(1000); // «L'altezza è regolabile dall'utente tra 250 e 1000 unità logiche, con valore predefinito 700.»
    expect(WINDOW_HEIGHT_DEFAULT).toBe(700); // «L'altezza è regolabile dall'utente tra 250 e 1000 unità logiche, con valore predefinito 700.»
    expect(DROPLET_RADIUS).toBe(3); // «Le gocce dinamiche hanno raggio pari a 3 unità logiche.»
    expect(MIN_DROPLETS).toBe(2); // «Avere da 0 a 8 gocce dinamiche nella configurazione; la gara può partire solo con almeno 2.»
    expect(MAX_DROPLETS).toBe(8); // «Avere da 0 a 8 gocce dinamiche nella configurazione; la gara può partire solo con almeno 2.»
    expect(MIN_CENTER_DISTANCE).toBe(9); // «la distanza tra i bordi di due gocce dinamiche non può essere inferiore a un raggio (3 unità, cioè 9 unità tra i centri)»
    expect(SIDE_MARGIN).toBe(3); // «Aggancio: se la x è a meno di 3 unità logiche da un bordo laterale, il centro viene agganciato a x = 3 o x = 97.»
    expect(START_LINE_Y).toBe(10); // «La linea di partenza si trova a 10 unità logiche dal bordo superiore del finestrino e non è visualizzata.»
    expect(DROPLET_START_Y).toBe(7); // «I centri delle gocce dinamiche si trovano a 7 unità logiche dal bordo superiore»
    expect(COUNTDOWN_MS).toBe(3000); // «Il conto alla rovescia dura 3 secondi e avanza in tempo reale, non in tempo simulato» (3 secondi espressi in millisecondi)
    expect(DEFAULT_OBSTACLE_LEVEL).toBe('medium'); // «altezza (700) e livello degli ostacoli (medio) tornano ai valori predefiniti» (nel contratto: 'medium')
    expect(PALETTE_COLOR_IDS).toHaveLength(8); // «una palette fissa di 8 colori distinti, definiti dal sistema e coerenti con lo stile cartoon.»
    expect(new Set(PALETTE_COLOR_IDS).size).toBe(8); // «una palette fissa di 8 colori distinti, definiti dal sistema e coerenti con lo stile cartoon.»
  });
});
