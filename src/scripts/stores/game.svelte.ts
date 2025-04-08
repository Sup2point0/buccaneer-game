import { persisted } from "svelte-persisted-store";

import { HexGrid } from "#scripts/types";


export class Game
{
  /* @ts-ignore */
  grid: HexGrid;

  selected_cell: string | null = $state(null);
  cell_history: string[] = $state([]);

  constructor(options: GameOptions)
  {
    this.create_new(options);
  }

  create_new(options: GameOptions)
  {
    this.grid = new HexGrid(options.rings);
  }

  select_cell(cord: string)
  {
    this.selected_cell = cord;
    this.cell_history.push(cord);
  }
}

export interface GameOptions
{
  rings: number;
}

// export const game = persisted("bucc.game", undefined);
export const game = persisted("bucc.game", new Game({ rings: 3 }));
