import { persisted } from "svelte-persisted-store";
import { writable } from "svelte/store";

import { HexGrid } from "#scripts/types";
import type { LCord, RCord, Cords } from "#scripts/types";

export class Game
{
  /* @ts-ignore */
  grid: HexGrid;

  turn: number = $state(0);
  start_time: number | null = 1744194999511;  // FIXME
  time: number = 0;

  selected_l: LCord | null = $state(null);
  selected_r: RCord | null = $state(null);
  cell_history: Cords[] = $state([]);

  constructor(options: GameOptions)
  {
    this.create_new(options);
  }

  get time_display() {
    let s = Math.round(this.time / 1000);
    let hours = Math.floor(s / 3600);
    let minutes = Math.floor(s / 60) % 60;
    let seconds = s % 60;

    return `${hours}:${minutes.toString().padStart(2, "0")}.${seconds.toString().padStart(2, "0")}`;
  }

  create_new(options: GameOptions)
  {
    this.grid = new HexGrid(options.rings);
  }

  select_cell(cords: Cords)
  {
    this.grid.use_cell(cords);

    let [l, r] = cords;
    this.selected_l = l;
    this.selected_r = r;
    this.cell_history.unshift([l, r]);
    
    this.turn++;
  }
}

export interface GameOptions
{
  rings: number;
}

// export const game = persisted("bucc.game", undefined);
// export const game = persisted("bucc.game", new Game({ rings: 3 }));
export const game = writable(new Game({ rings: 3 }));
