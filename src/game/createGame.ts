import type { DropletId, LogicalUnit, ObstacleLevel } from '../shared/contract';
import {
  DEFAULT_OBSTACLE_LEVEL,
  DRAG_THRESHOLD,
  MAX_DROPLETS,
  MIN_CENTER_DISTANCE,
  PALETTE_COLOR_IDS,
  SIDE_MARGIN,
  WINDOW_HEIGHT_DEFAULT,
  WINDOW_WIDTH,
} from '../shared/constants';
import type {
  ConfigurationView,
  ConfiguredDropletView,
  DropColorId,
  Game,
  GameDependencies,
  GameEvent,
  GameMessage,
  GameStep,
  GameView,
  PaletteEntryView,
  Point,
} from '../shared/game-contract';

interface ConfiguredDroplet {
  readonly id: DropletId;
  readonly x: LogicalUnit;
  readonly colorId: DropColorId;
}

function isInsideWindow(point: Point): boolean {
  return (
    point.x >= 0 &&
    point.x <= WINDOW_WIDTH &&
    point.y >= 0 &&
    point.y <= WINDOW_HEIGHT_DEFAULT
  );
}

function snapToBorder(x: LogicalUnit): LogicalUnit {
  if (x < SIDE_MARGIN) {
    return SIDE_MARGIN;
  }
  if (x > WINDOW_WIDTH - SIDE_MARGIN) {
    return WINDOW_WIDTH - SIDE_MARGIN;
  }
  return x;
}

export function createGame(_dependencies: GameDependencies): Game {
  let droplets: readonly ConfiguredDroplet[] = [];
  let nextDropletColorId: DropColorId | null = null;
  let gestureStart: Point | null = null;
  let nextDropletNumber = 1;

  function usedColors(): ReadonlySet<DropColorId> {
    return new Set(droplets.map((droplet) => droplet.colorId));
  }

  function paletteEntries(): readonly PaletteEntryView[] {
    const used = usedColors();
    return PALETTE_COLOR_IDS.map((colorId) => ({
      colorId,
      selectable: !used.has(colorId),
    }));
  }

  function configuration(): ConfigurationView {
    const configuredDroplets: readonly ConfiguredDropletView[] = droplets.map((droplet) => ({
      id: droplet.id,
      x: droplet.x,
      colorId: droplet.colorId,
    }));

    return {
      windowHeight: WINDOW_HEIGHT_DEFAULT,
      obstacleLevel: DEFAULT_OBSTACLE_LEVEL,
      droplets: configuredDroplets,
      selectedDropletId: null,
      nextDropletColorId,
      palette: paletteEntries(),
      canStart: false,
    };
  }

  function view(): GameView {
    return { phase: 'configuring', configuration: configuration() };
  }

  function step(events: readonly GameEvent[] = []): GameStep {
    return { view: view(), events: [...events] };
  }

  function message(type: GameMessage['type']): GameStep {
    return step([{ type: 'message', message: { type } }]);
  }

  return {
    getView: view,

    advance(_elapsedMs: number): GameStep {
      throw new Error('not implemented');
    },

    pointerDown(point: Point): GameStep {
      gestureStart = { x: point.x, y: point.y };
      return step();
    },

    pointerMove(_point: Point): GameStep {
      throw new Error('not implemented');
    },

    pointerUp(point: Point): GameStep {
      const start = gestureStart;
      gestureStart = null;
      if (start === null) {
        return step();
      }

      const distance = Math.hypot(point.x - start.x, point.y - start.y);
      if (distance > DRAG_THRESHOLD) {
        return step();
      }

      if (!isInsideWindow(point)) {
        return step();
      }

      if (droplets.length >= MAX_DROPLETS) {
        return message('dropletLimitReached');
      }

      const x = snapToBorder(point.x);
      if (droplets.some((droplet) => Math.abs(droplet.x - x) < MIN_CENTER_DISTANCE)) {
        return message('positionTooClose');
      }

      const used = usedColors();
      const colorId = nextDropletColorId ?? PALETTE_COLOR_IDS.find((id) => !used.has(id));
      if (colorId === undefined) {
        return step();
      }

      droplets = [...droplets, { id: `droplet-${nextDropletNumber++}`, x, colorId }];
      nextDropletColorId = null;
      return step();
    },

    pointerCancel(): GameStep {
      throw new Error('not implemented');
    },

    chooseColor(colorId: DropColorId): GameStep {
      const isSelectable = paletteEntries().some(
        (entry) => entry.colorId === colorId && entry.selectable,
      );
      if (!isSelectable) {
        return step();
      }

      nextDropletColorId = colorId;
      return step();
    },

    deleteSelectedDroplet(): GameStep {
      throw new Error('not implemented');
    },

    setWindowHeight(_value: LogicalUnit): GameStep {
      throw new Error('not implemented');
    },

    setObstacleLevel(_level: ObstacleLevel): GameStep {
      throw new Error('not implemented');
    },

    startCountdown(): GameStep {
      throw new Error('not implemented');
    },

    startNewGame(): GameStep {
      throw new Error('not implemented');
    },
  };
}
