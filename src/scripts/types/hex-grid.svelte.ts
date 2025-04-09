import { HexCell } from "./hex-cell.svelte.ts";
import { LCord, RCord, type Cords } from "./cords";


export class HexGrid
{
  rings: number;

  /** The left-cords in play for this game. */
  l_cords: LCord[];
  /** The right-cords in play for this game. */
  r_cords: RCord[];

  cells: Map<string, HexCell>;
  used: number = $state(0);

  constructor(rings?: number)
  {
    this.rings = rings ?? 3;
    this.l_cords = Object.values(LCord).slice(0, 2*this.rings +1);
    this.r_cords = Object.values(RCord).slice(0, 2*this.rings +1);
    this.cells = this.generate_cells();
  }

  /** Generate a `Map` of cell in the grid. */
  generate_cells(): Map<string, HexCell>
  {
    let out = new Map();

    // FIXME surplus cells generated with this approach
    for (let l of this.l_cords) {
      for (let r of this.r_cords) {
        out.set(`${l}-${r}`, new HexCell(l, r));
      }
    }

    return out;
  }

  /** Try to locate the cell at a given cord, if it is defined. */
  get_cell(cords: Cords): HexCell | null
  {
    return this.cells.get(`${cords[0]}-${cords[1]}`) ?? null;
  }

  /** Mark a cell as used. */
  use_cell(cords: Cords): boolean
  {
    let cell = this.get_cell(cords);
    if (!cell) return false;

    cell.used = true;
    this.used++;
    return true;
  }

  /** Reset a cell to unused. */
  reset_cell(cords: Cords): boolean
  {
    let cell = this.get_cell(cords);
    if (!cell) return false;

    cell.used = false;
    this.used--;
    return true;
  }
}
