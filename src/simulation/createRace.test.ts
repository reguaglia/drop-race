import { describe, expect, it, vi } from 'vitest';
import type { RaceConfig, RaceDependencies, Rng, RngState } from '../shared/contract';
import {
  DROPLET_RADIUS,
  DROPLET_START_Y,
  MAX_DROPLETS,
  MIN_CENTER_DISTANCE,
  WINDOW_WIDTH,
} from '../shared/constants';
import { createRace } from './createRace';

function makeRng(serialized: string): Rng {
  let state: RngState = { serialized };
  return {
    next(): number {
      return 0.5;
    },
    getState(): RngState {
      state = { serialized: state.serialized };
      return state;
    },
  };
}

function makeConfig(): RaceConfig {
  return {
    windowHeight: 700,
    obstacleLevel: 'medium',
    droplets: [
      { id: 'a', x: 10 },
      { id: 'b', x: 20 },
    ],
  };
}

function makeDeps(createRngImpl?: RaceDependencies['createRng']): RaceDependencies {
  return {
    createRng:
      createRngImpl ??
      (() => makeRng('rng-state')),
  };
}

describe('createRace (T-012 stub, ADR-001 simulation contract)', () => {
  it('produces equal snapshots for same seed and same configuration (ADR-001 invariant 1)', () => {
    const config = makeConfig();
    const deps = makeDeps();

    const engineA = createRace(config, 123, deps);
    const engineB = createRace(config, 123, deps);

    expect(engineA.getSnapshot()).toEqual(engineB.getSnapshot());
    expect(engineA.advance(16)).toEqual(engineB.advance(16));
  });

  it('returns the initial snapshot with no events from advance(16) (T-012 acceptance 3)', () => {
    const engine = createRace(makeConfig(), 9, makeDeps());
    const initialSnapshot = engine.getSnapshot();

    const result = engine.advance(16);

    expect(result.snapshot).toEqual(initialSnapshot);
    expect(result.events).toEqual([]);
  });

  it('keeps getSnapshot equal to the initial snapshot after advance (T-012 acceptance 3; ADR-001 invariant 5)', () => {
    const engine = createRace(makeConfig(), 9, makeDeps());
    const initialSnapshot = engine.getSnapshot();

    engine.advance(16);

    expect(engine.getSnapshot()).toEqual(initialSnapshot);
  });

  it('returns the state supplied by createRng from getRngState before and after advance (T-012 acceptance 3; ADR-001 invariant 1)', () => {
    const rngState: RngState = { serialized: 'injected-rng-state' };
    const rng: Rng = {
      next: () => 0.5,
      getState: () => rngState,
    };
    const deps: RaceDependencies = { createRng: () => rng };
    const engine = createRace(makeConfig(), 9, deps);

    expect(engine.getRngState()).toEqual(rngState);

    engine.advance(16);

    expect(engine.getRngState()).toEqual(rngState);
  });

  it('exposes the seed passed to createRace (ADR-001 SimulationEngine contract)', () => {
    const engine = createRace(makeConfig(), 1234, makeDeps());

    expect(engine.seed).toBe(1234);
  });

  it('calls createRng with the seed (ADR-001 contract/dependencies)', () => {
    const createRng = vi.fn((seed: number) => makeRng(`state-${seed}`));
    const deps = makeDeps(createRng);

    createRace(makeConfig(), 42, deps);

    expect(createRng).toHaveBeenCalledTimes(1);
    expect(createRng).toHaveBeenCalledWith(42);
  });

  it('does not let snapshot mutation alter engine state (ADR-001 invariant 5)', () => {
    const engine = createRace(makeConfig(), 1, makeDeps());
    const snapshot = engine.getSnapshot();

    (snapshot as { tick: number }).tick = 99;
    (snapshot.droplets[0] as { x: number }).x = 999;

    expect(engine.getSnapshot()).toEqual({
      tick: 0,
      windowHeight: 700,
      droplets: [
        {
          id: 'a',
          kind: 'dynamic',
          x: 10,
          y: DROPLET_START_Y,
          radius: DROPLET_RADIUS,
          blocked: false,
          power: 0,
        },
        {
          id: 'b',
          kind: 'dynamic',
          x: 20,
          y: DROPLET_START_Y,
          radius: DROPLET_RADIUS,
          blocked: false,
          power: 0,
        },
      ],
      obstacles: [],
      outcome: null,
    });
  });

  it('throws for NaN, Infinity and negative elapsedMs (ADR-001 A4)', () => {
    const engine = createRace(makeConfig(), 1, makeDeps());

    expect(() => engine.advance(Number.NaN)).toThrow();
    expect(() => engine.advance(Number.POSITIVE_INFINITY)).toThrow();
    expect(() => engine.advance(-1)).toThrow();
  });

  it('never calls Math.random (T-012 stub constraint)', () => {
    const randomSpy = vi.spyOn(Math, 'random');

    const engine = createRace(makeConfig(), 7, makeDeps());
    engine.advance(0);
    engine.advance(16);
    engine.getSnapshot();

    expect(randomSpy).not.toHaveBeenCalled();
    randomSpy.mockRestore();
  });

  it('constants satisfy requirement relations: eight droplets fit in window width', () => {
    expect((MAX_DROPLETS - 1) * MIN_CENTER_DISTANCE + 2 * DROPLET_RADIUS).toBeLessThanOrEqual(
      WINDOW_WIDTH,
    );
  });
});
