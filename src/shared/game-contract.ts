import type { LogicalUnit, DropletId, ObstacleLevel, RaceSnapshot, RaceDependencies, Seed } from './contract';
export type DropColorId = string;
export interface Point { readonly x: LogicalUnit; readonly y: LogicalUnit }
export interface ConfiguredDropletView { readonly id: DropletId; readonly x: LogicalUnit; readonly colorId: DropColorId }
export interface PaletteEntryView { readonly colorId: DropColorId; readonly selectable: boolean }
export interface ConfigurationView { readonly windowHeight: LogicalUnit; readonly obstacleLevel: ObstacleLevel; readonly droplets: readonly ConfiguredDropletView[]; readonly selectedDropletId: DropletId | null; readonly nextDropletColorId: DropColorId | null; readonly palette: readonly PaletteEntryView[]; readonly canStart: boolean }
export interface RaceDropletColor { readonly dropletId: DropletId; readonly colorId: DropColorId }
export interface RaceView { readonly snapshot: RaceSnapshot; readonly colors: readonly RaceDropletColor[] }
export type GameOutcomeView = { readonly kind: 'winner'; readonly dropletId: DropletId; readonly colorId: DropColorId } | { readonly kind: 'timeout' };
export type GameView = { readonly phase: 'configuring'; readonly configuration: ConfigurationView } | { readonly phase: 'countdown'; readonly configuration: ConfigurationView; readonly remainingMs: number } | { readonly phase: 'racing'; readonly race: RaceView } | { readonly phase: 'finished'; readonly race: RaceView; readonly outcome: GameOutcomeView };
export type GameMessage = { readonly type: 'dropletLimitReached' } | { readonly type: 'positionTooClose' };
export type GameEvent = { readonly type: 'message'; readonly message: GameMessage } | { readonly type: 'absorbed'; readonly absorberId: DropletId; readonly absorbedId: DropletId } | { readonly type: 'finished'; readonly outcome: GameOutcomeView };
export interface GameStep { readonly view: GameView; readonly events: readonly GameEvent[] }
export interface GameDependencies { readonly nextSeed: () => Seed; readonly race: RaceDependencies }
export interface Game { getView(): GameView; advance(elapsedMs: number): GameStep; pointerDown(point: Point): GameStep; pointerMove(point: Point): GameStep; pointerUp(point: Point): GameStep; pointerCancel(): GameStep; chooseColor(colorId: DropColorId): GameStep; deleteSelectedDroplet(): GameStep; setWindowHeight(value: LogicalUnit): GameStep; setObstacleLevel(level: ObstacleLevel): GameStep; startCountdown(): GameStep; startNewGame(): GameStep }
export declare function createGame(dependencies: GameDependencies): Game;
