import type { LCord, RCord, Cords } from "./cords";
import type { Item } from "./item";


export class HexCell
{
  l: LCord;
  r: RCord;

  used: boolean = $state(false);
  item: Item | null = null;

  constructor(l: LCord, r: RCord)
  {
    this.l = l;
    this.r = r;
  }

  get cords(): Cords {
    return [this.l, this.r];
  }
}
