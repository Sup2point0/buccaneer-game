/** A co-ordinate in the hexagonal grid, defined by a left and right co-ordinate. */
export type Cords = [LCord, RCord];

export enum LCord {
  e = "e",
  phi = "\\phi",
  root2 = "\\sqrt{2}",
  two = "2.0",
  one = "1",
  root3 = "\\sqrt{3}",
  pi = "\\pi",
}

export enum RCord {
  a = "a",
  b = "b",
  c = "c",
  i = "i",
  x = "x",
  y = "y",
  z = "z",
}
