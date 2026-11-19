import { describe, expect, it, vi } from 'vitest';
import type {
  ConfigurationView,
  ConfiguredDropletView,
  DropColorId,
  Game,
  GameDependencies,
  GameEvent,
  GameStep,
  GameView,
  Point,
} from '../shared/game-contract';
import {
  DEFAULT_OBSTACLE_LEVEL,
  DRAG_THRESHOLD,
  DROPLET_RADIUS,
  MAX_DROPLETS,
  MIN_CENTER_DISTANCE,
  PALETTE_COLOR_IDS,
  SIDE_MARGIN,
  WINDOW_HEIGHT_DEFAULT,
  WINDOW_WIDTH,
} from '../shared/constants';
import { createGame } from './createGame';

// All touch coordinates are derived from the requirement constants; none sits
// exactly on a window edge, whose behaviour at the boundary is not specified.
const INSIDE_Y = WINDOW_HEIGHT_DEFAULT / 2;
const TOO_CLOSE_DISTANCE = (DROPLET_RADIUS + MIN_CENTER_DISTANCE) / 2;
const FREE_X = WINDOW_WIDTH - SIDE_MARGIN - MIN_CENTER_DISTANCE / 2;

function makeDeps(): GameDependencies {
  return {
    nextSeed: vi.fn(() => 0),
    race: {
      createRng: () => ({ next: () => 0, getState: () => ({ serialized: 'fake-rng-state' }) }),
    },
  };
}

function makeGame(): Game {
  return createGame(makeDeps());
}

function configurationOf(view: GameView): ConfigurationView {
  if (view.phase !== 'configuring') {
    throw new Error(`expected configuring phase, received ${view.phase}`);
  }
  return view.configuration;
}

function dropletsOf(view: GameView): readonly ConfiguredDropletView[] {
  return configurationOf(view).droplets;
}

function currentIds(game: Game): readonly string[] {
  return dropletsOf(game.getView()).map((droplet) => droplet.id);
}

interface TouchResult {
  readonly down: GameStep;
  readonly up: GameStep;
  readonly events: readonly GameEvent[];
}

function touch(game: Game, x: number, y: number = INSIDE_Y): TouchResult {
  const point: Point = { x, y };
  const down = game.pointerDown(point);
  const up = game.pointerUp(point);
  return { down, up, events: [...down.events, ...up.events] };
}

// Identifiers are taken from the view: no assumption on how they are generated.
function place(game: Game, x: number, y: number = INSIDE_Y): ConfiguredDropletView {
  const before = currentIds(game);
  const result = touch(game, x, y);
  const created = dropletsOf(result.up.view).filter((droplet) => !before.includes(droplet.id));
  expect(created).toHaveLength(1);
  return created[0];
}

// Eight centres spaced by MIN_CENTER_DISTANCE, well inside the window so that
// the border-snap band cannot interfere with the cases.
function placementXs(): number[] {
  const start = (WINDOW_WIDTH - (MAX_DROPLETS - 1) * MIN_CENTER_DISTANCE) / 2;
  return Array.from({ length: MAX_DROPLETS }, (_, index) => start + index * MIN_CENTER_DISTANCE);
}

function fillToLimit(game: Game): void {
  for (const x of placementXs()) {
    place(game, x);
  }
  expect(dropletsOf(game.getView())).toHaveLength(MAX_DROPLETS);
}

function firstUnusedColor(view: GameView): DropColorId | undefined {
  const used = new Set(dropletsOf(view).map((droplet) => droplet.colorId));
  return PALETTE_COLOR_IDS.find((colorId) => !used.has(colorId));
}

describe('T-014 step 1 — placement and colour acceptance (QA, before implementation)', () => {
  it('Stato iniziale: getView returns the configuring phase with default settings', () => {
    const view = makeGame().getView();
    const configuration = configurationOf(view);

    expect(view.phase).toBe('configuring');
    expect(configuration.droplets).toEqual([]);
    expect(configuration.windowHeight).toBe(WINDOW_HEIGHT_DEFAULT);
    expect(configuration.obstacleLevel).toBe(DEFAULT_OBSTACLE_LEVEL);
    expect(configuration.selectedDropletId).toBeNull();
    expect(configuration.nextDropletColorId).toBeNull();
    expect(configuration.canStart).toBe(false);
    expect(configuration.palette.every((entry) => entry.selectable)).toBe(true);
  });

  it('Regola 1: user commands are accepted in the initial configuring phase', () => {
    const game = makeGame();

    expect(game.getView().phase).toBe('configuring');

    const chosen = PALETTE_COLOR_IDS[PALETTE_COLOR_IDS.length - 1];
    const colorStep = game.chooseColor(chosen);
    expect(configurationOf(colorStep.view).nextDropletColorId).toBe(chosen);

    const droplet = place(game, WINDOW_WIDTH / 2);
    expect(droplet.colorId).toBe(chosen);
  });

  it('US-1.1: a touch outside the window creates no droplet and emits no message', () => {
    const outsidePoints: readonly Point[] = [
      { x: -DROPLET_RADIUS, y: INSIDE_Y },
      { x: WINDOW_WIDTH + DROPLET_RADIUS, y: INSIDE_Y },
      { x: WINDOW_WIDTH / 2, y: -DROPLET_RADIUS },
      { x: WINDOW_WIDTH / 2, y: WINDOW_HEIGHT_DEFAULT + DROPLET_RADIUS },
    ];

    for (const point of outsidePoints) {
      const game = makeGame();
      const result = touch(game, point.x, point.y);

      expect(dropletsOf(result.up.view)).toEqual([]);
      expect(result.events).toEqual([]);
      expect(dropletsOf(game.getView())).toEqual([]);
    }
  });

  it('US-1.2: with eight droplets a free-point touch emits dropletLimitReached and creates nothing', () => {
    const game = makeGame();
    fillToLimit(game);

    const result = touch(game, FREE_X);

    expect(dropletsOf(result.up.view)).toHaveLength(MAX_DROPLETS);
    expect(result.events).toEqual([{ type: 'message', message: { type: 'dropletLimitReached' } }]);
  });

  it('US-1.3: a touch near the left border snaps the centre to SIDE_MARGIN', () => {
    const droplet = place(makeGame(), SIDE_MARGIN / 2);

    expect(droplet.x).toBe(SIDE_MARGIN);
  });

  it('US-1.3: a touch near the right border snaps the centre to WINDOW_WIDTH - SIDE_MARGIN', () => {
    const droplet = place(makeGame(), WINDOW_WIDTH - SIDE_MARGIN / 2);

    expect(droplet.x).toBe(WINDOW_WIDTH - SIDE_MARGIN);
  });

  it('US-1.4: a free point closer than MIN_CENTER_DISTANCE emits positionTooClose and creates nothing', () => {
    const game = makeGame();
    const existing = place(game, WINDOW_WIDTH / 2);

    const result = touch(game, existing.x + TOO_CLOSE_DISTANCE);

    expect(dropletsOf(result.up.view)).toHaveLength(1);
    expect(result.events).toEqual([{ type: 'message', message: { type: 'positionTooClose' } }]);
  });

  it('US-1.5: a valid free point creates the droplet on pointerUp', () => {
    const game = makeGame();
    const x = WINDOW_WIDTH / 2;

    const down = game.pointerDown({ x, y: INSIDE_Y });
    expect(dropletsOf(down.view)).toEqual([]);
    expect(down.events).toEqual([]);

    const up = game.pointerUp({ x, y: INSIDE_Y });
    const created = dropletsOf(up.view);
    expect(created).toHaveLength(1);
    expect(created[0].x).toBe(x);
    expect(up.events).toEqual([]);
  });

  it('US-1.6: the y of the touch does not change the resulting x', () => {
    const x = WINDOW_WIDTH / 2;
    const touchYs = [WINDOW_HEIGHT_DEFAULT / 4, (WINDOW_HEIGHT_DEFAULT * 3) / 4];

    for (const y of touchYs) {
      const droplet = place(makeGame(), x, y);
      expect(droplet.x).toBe(x);
    }
  });

  it('US-2.1: the palette exposes the distinct system colours', () => {
    const palette = configurationOf(makeGame().getView()).palette;

    expect(palette).toHaveLength(PALETTE_COLOR_IDS.length);
    expect(new Set(palette.map((entry) => entry.colorId)).size).toBe(palette.length);
    expect(new Set(palette.map((entry) => entry.colorId))).toEqual(new Set(PALETTE_COLOR_IDS));
  });

  it('US-2.2: colours used by present droplets are not selectable', () => {
    const game = makeGame();
    const first = place(game, placementXs()[0]);
    const second = place(game, placementXs()[1]);

    expect(first.colorId).not.toBe(second.colorId);

    const used = new Set([first.colorId, second.colorId]);
    for (const entry of configurationOf(game.getView()).palette) {
      expect(entry.selectable).toBe(!used.has(entry.colorId));
    }
  });

  it('US-2.3: the chosen colour is used by the next created droplet', () => {
    const game = makeGame();
    const chosen = PALETTE_COLOR_IDS[PALETTE_COLOR_IDS.length - 1];

    game.chooseColor(chosen);
    const droplet = place(game, WINDOW_WIDTH / 2);

    expect(droplet.colorId).toBe(chosen);
  });

  it('US-2.4: without a choice each droplet gets the first unused palette colour', () => {
    const game = makeGame();

    placementXs().forEach((x, index) => {
      const droplet = place(game, x);
      expect(droplet.colorId).toBe(PALETTE_COLOR_IDS[index]);
    });
  });

  it('US-2.5: a successful placement clears the choice for the next droplet', () => {
    const game = makeGame();
    const chosen = PALETTE_COLOR_IDS[PALETTE_COLOR_IDS.length - 1];

    game.chooseColor(chosen);
    const first = place(game, placementXs()[0]);
    expect(first.colorId).toBe(chosen);
    expect(configurationOf(game.getView()).nextDropletColorId).toBeNull();

    const expected = firstUnusedColor(game.getView());
    expect(expected).toBeDefined();
    const second = place(game, placementXs()[1]);
    expect(second.colorId).toBe(expected);
    expect(second.colorId).not.toBe(chosen);
  });

  it('Regola 2: a pointerUp within DRAG_THRESHOLD on a free point is a touch that places a droplet', () => {
    const game = makeGame();
    const x = WINDOW_WIDTH / 2;
    const start: Point = { x, y: INSIDE_Y };
    const end: Point = { x, y: INSIDE_Y + DRAG_THRESHOLD / 2 };

    game.pointerDown(start);
    const up = game.pointerUp(end);

    const created = dropletsOf(up.view);
    expect(created).toHaveLength(1);
    expect(created[0].x).toBe(x);
    expect(up.events).toEqual([]);
  });

  it('Regola 4: the droplet limit is evaluated before the minimum distance', () => {
    const game = makeGame();
    fillToLimit(game);
    const tooCloseX = placementXs()[0] + MIN_CENTER_DISTANCE / 2;

    const result = touch(game, tooCloseX);

    expect(dropletsOf(result.up.view)).toHaveLength(MAX_DROPLETS);
    expect(result.events).toEqual([{ type: 'message', message: { type: 'dropletLimitReached' } }]);
  });

  it('Regola 4: an out-of-window point emits no message even with eight droplets', () => {
    const game = makeGame();
    fillToLimit(game);

    const result = touch(game, -DROPLET_RADIUS);

    expect(dropletsOf(result.up.view)).toHaveLength(MAX_DROPLETS);
    expect(result.events).toEqual([]);
  });

  it('Regola 4: the minimum distance is checked after snapping to the border', () => {
    const game = makeGame();
    const nearSnapX = SIDE_MARGIN + MIN_CENTER_DISTANCE - DROPLET_RADIUS / 2;
    place(game, nearSnapX);

    const result = touch(game, SIDE_MARGIN / 2);

    expect(dropletsOf(result.up.view)).toHaveLength(1);
    expect(result.events).toEqual([{ type: 'message', message: { type: 'positionTooClose' } }]);
  });
});
