export class Item
{
  type: ItemType;
  name: string;
  desc: string;
  rules?: string | string[];
  notes?: string | string[];
  tips?: string | string[];
  ex?: string | string[];
  count: ItemCount;
  stand?: boolean;

  constructor(
    type?: ItemType, 
    name?: string, 
    data?: ItemData,
  )
  {
    this.type = type ?? ItemType.Other;
    this.name = name ?? "Unknown Item";
    this.desc = data?.desc ?? "...";
    this.rules = data?.rules;
    this.tips = data?.tips;
    this.ex = data?.ex;
    this.count = data?.count ?? {
      base: 0,
      max: 0,
    };
    this.stand = data?.stand ?? false;
  }
}

interface ItemData {
  desc: string;
  rules?: string | string[];
  notes?: string | string[];
  tips?: string | string[];
  ex?: string | string[];
  count?: ItemCount;
  stand?: boolean;
}

interface ItemCount {
  base: number;
  max: number;
}

export enum ItemType
{
  Number = "Number",
  Function = "Function",
  Action = "Action",
  Other = "Other",
}
