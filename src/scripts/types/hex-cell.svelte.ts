import { LCord, RCord } from "./cords";
import { Item } from "./item";


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

  get cords(): string {
    return `${this.l}-${this.r}`;
  }
}
