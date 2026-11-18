import type {
  AdvanceResult,
  RaceConfig,
  RaceDependencies,
  RaceSnapshot,
  RngState,
  Seed,
  SimulationEngine,
} from '../shared/contract';
import { DROPLET_RADIUS, DROPLET_START_Y } from '../shared/constants';

function assertValidElapsedMs(elapsedMs: number): void {
  if (!Number.isFinite(elapsedMs) || elapsedMs < 0) {
    throw new Error('elapsedMs must be a finite non-negative number');
  }
}

function cloneSnapshot(snapshot: RaceSnapshot): RaceSnapshot {
  return {
    tick: snapshot.tick,
    windowHeight: snapshot.windowHeight,
    droplets: snapshot.droplets.map((droplet) => ({ ...droplet })),
    obstacles: snapshot.obstacles.map((obstacle) => ({ ...obstacle })),
    outcome: snapshot.outcome === null ? null : { ...snapshot.outcome },
  };
}

export function createRace(
  config: RaceConfig,
  seed: Seed,
  deps: RaceDependencies,
): SimulationEngine {
  const rng = deps.createRng(seed);
  let rngState: RngState = rng.getState();

  const snapshot: RaceSnapshot = {
    tick: 0,
    windowHeight: config.windowHeight,
    droplets: config.droplets.map((droplet) => ({
      id: droplet.id,
      kind: 'dynamic',
      x: droplet.x,
      y: DROPLET_START_Y,
      radius: DROPLET_RADIUS,
      blocked: false,
      power: 0,
    })),
    obstacles: [],
    outcome: null,
  };

  return {
    seed,
    advance(elapsedMs: number): AdvanceResult {
      assertValidElapsedMs(elapsedMs);
      rngState = rng.getState();
      return {
        snapshot: cloneSnapshot(snapshot),
        events: [],
      };
    },
    getSnapshot(): RaceSnapshot {
      return cloneSnapshot(snapshot);
    },
    getRngState(): RngState {
      return rngState;
    },
  };
}
