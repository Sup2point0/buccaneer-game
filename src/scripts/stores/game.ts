import { persisted } from "svelte-persisted-store";

import { HexGrid } from "#scripts/types";
import type { Cord } from "#scripts/types";


export class Game
{
  /* @ts-ignore */
  grid: HexGrid;

  selected_cell = "";
  cell_history: Cord[] = [];

  constructor(options: GameOptions)
  {
    this.create_new(options);
  }

  create_new(options: GameOptions)
  {
    this.grid = new HexGrid(options.rings)
  }
}

export interface GameOptions
{
  rings: number;
}

// export const game = persisted("bucc.game", undefined);
export const game = persisted("bucc.game", new Game({ rings: 3 }));
