import { HexCell } from "./hex-cell";
import { LCord, RCord, type Cord } from "./cords";


export class HexGrid
{
  rings: number;

  /** The left-cords in play for this game. */
  l_cords: LCord[];
  /** The right-cords in play for this game. */
  r_cords: RCord[];

  cells: Map<string, HexCell>;

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

    for (let l of this.l_cords) {
      for (let r of this.r_cords) {
        out.set(l+r, new HexCell(l, r));
      }
    }

    return out;
  }

  /** Try to locate the cell at a given cord, if it is defined. */
  get_cell(cord: Cord): HexCell | null
  {
    return this.cells.get(cord[0] + cord[1]) ?? null;
  }
}
