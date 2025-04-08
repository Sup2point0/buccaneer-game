import { LCord, RCord } from "./cords";
import { Item } from "./item";

export class HexCell
{
  l: LCord;
  r: RCord;

  state: HexCellState;
  item: Item | null;

  constructor(l: LCord, r: RCord, item: Item | null = null)
  {
    this.l = l;
    this.r = r;
    this.state = HexCellState.None;
    this.item = item;
  }

  /** Select the cell as the current cell. */
  select()
  {}
}

export enum HexCellState
{
  None,
  Selected,
  Used,
}
