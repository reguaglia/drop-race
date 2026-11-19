// Convenzione: unità logiche; origine in alto a sinistra; x verso destra,
// y verso il basso (verso il traguardo). "Quota maggiore" = più vicino al traguardo.
export type LogicalUnit = number;
export type Seed = number;
export type DropletId = string;
export type ObstacleLevel = 'low' | 'medium' | 'high';

export interface RaceDropletInit {
  readonly id: DropletId;
  readonly x: LogicalUnit;
}

export interface RaceConfig {
  readonly windowHeight: LogicalUnit;
  readonly obstacleLevel: ObstacleLevel;
  readonly droplets: readonly RaceDropletInit[];
}

export interface RngState {
  readonly serialized: string;
}

export interface Rng {
  next(): number;
  getState(): RngState;
}

export type RngFactory = (seed: Seed) => Rng;

export interface RaceDependencies {
  readonly createRng: RngFactory;
}

export interface DropletView {
  readonly id: DropletId;
  readonly kind: 'dynamic' | 'static';
  readonly x: LogicalUnit;
  readonly y: LogicalUnit;
  readonly radius: LogicalUnit;
  readonly blocked: boolean;
  readonly power: number | null;
}

export interface ObstacleView {
  readonly id: string;
  readonly kind: 'spatial' | 'airflow';
}

export type RaceOutcome =
  | { readonly kind: 'winner'; readonly dropletId: DropletId }
  | { readonly kind: 'timeout' };

export interface RaceSnapshot {
  readonly tick: number;
  readonly windowHeight: LogicalUnit;
  readonly droplets: readonly DropletView[];
  readonly obstacles: readonly ObstacleView[];
  readonly outcome: RaceOutcome | null;
}

export type SimulationEvent =
  | { readonly type: 'absorbed'; readonly absorberId: DropletId; readonly absorbedId: DropletId }
  | { readonly type: 'finished'; readonly outcome: RaceOutcome };

export interface AdvanceResult {
  readonly snapshot: RaceSnapshot;
  readonly events: readonly SimulationEvent[];
}

export interface SimulationEngine {
  readonly seed: Seed;
  advance(elapsedMs: number): AdvanceResult;
  getSnapshot(): RaceSnapshot;
  getRngState(): RngState;
}

export declare function createRace(
  config: RaceConfig,
  seed: Seed,
  deps: RaceDependencies,
): SimulationEngine;
