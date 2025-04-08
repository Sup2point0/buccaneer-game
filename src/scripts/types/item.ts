export class Item
{
  type: ItemType;
  name: string;
  desc: string;
  count: number;

  constructor(
    type?: ItemType, 
    name?: string, 
    desc?: string,
    count?: number,
  )
  {
    this.type = type ?? ItemType.Other;
    this.name = name ?? "Unknown Item";
    this.desc = desc ?? "...";
    this.count = count ?? 1;
  }
}

export enum ItemType
{
  Integer,
  Function,
  Expression,
  Other,
}
