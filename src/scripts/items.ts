import { Item } from "#scripts/types";
import { ItemType } from "#scripts/types";


export const Items = {
  // Integers
  add999: new Item(ItemType.Integer, "999"),
  add1999: new Item(ItemType.Integer, "1999"),
  add2999: new Item(ItemType.Integer, "2999"),
  add3999: new Item(ItemType.Integer, "3999"),
  add6999: new Item(ItemType.Integer, "6999"),
  add9999: new Item(ItemType.Integer, "9999"),

  // Functions
  sum: new Item(ItemType.Function, "summation", {
    desc: "Gain points equal to your current score’s digit sum \times 101",
    ex: "Your score is $123$. You gain $(1+2+3) \times 101 = 606$ points.",
    count: { base: 1, max: 3 }
  }),

  mult: new Item(ItemType.Function, "multiplication", {
    desc: "Multiply your score by the Cell Constant",
    tips: [
      String.raw`The Cell Constant is the numerical value along the left side of the grid, such as $\pi$ or $\sqrt{2}$.`,
      "Remember to round your score after multiplying by a non-integer constant.",
    ],
    count: { base: 1, max: 3 }
  }),

  div: new Item(ItemType.Function, "division", {
    desc: "Divide your score by the Cell Constant",
    count: { base: 0, max: 1 }
  }),

  zerodiv: new Item(ItemType.Function, "division by zero", {
    desc: "Your score becomes 0, but when another player obtains this Function, your score becomes double what it was before",
    ex: String.raw`Your score is $3000$. You obtain this Function, so your score becomes $0$. Next turn, another player obtains this Function, so your score becomes $3000 \times 2 = 6000$.`,
    count: { base: 0, max: 1 },
    stand: true
  }),

  exp: new Item(ItemType.Function, "exponentiation", {
    desc: "Raise your score to the power of 0",
    tips: "Yes, this does reduce your score to 0.",
    rules: String.raw`If your score is already $0$, it stays $0$ (rather than becoming $\text{undefined}).`,
    count: { base: 1, max: 1 }
  }),

  recip: new Item(ItemType.Function, "reciprocal", {
    desc: "Swap scores with another player",
    rules: "The other player only needs to tell you their true score once the swap has been finalised.",
    count: { base: 1, max: 2 },
    stand: true
  }),

  log: new Item(ItemType.Function, "logarithm", {
    desc: "Save your score",
    rules: "All your points become saved and your score resets to $0$.",
    tips: "Your saved points can’t be affected by anything. They can’t be stolen or swapped, and you won’t lose them if you’re killed.",
    count: { base: 1, max: 1 }
  }),

  ln: new Item(ItemType.Function, "natural logarithm", {
    desc: "Unsave your score",
    rules: [
      "Your saved score is added to your current score, and your saved score resets to $0$.",
      "If you don’t have a saved score, nothing happens.",
    ],
    count: { base: 1, max: 1 }
  }),

  diff: new Item(ItemType.Function, "differentiation", {
    desc: "Pick the next cell",
    rules: "If more than 1 player obtains this Function in the same turn, the extra players are placed on a waiting list to pick the next cell.",
    count: { base: 1, max: 1 },
    stand: true
  }),

  int: new Item(ItemType.Function, "integration", {
    desc: "Pick another player; gain points equal to their score.",
    count: { base: 1, max: 1 },
    stand: true
  }),

  diff_part: new Item(ItemType.Function, "partial differentiation", {
    desc: "Pick a cell to be marked as unused. If multiple players obtain this in the same turn, nothing happens.",
    rules: "If a player obtains this Function early on in the game, they are put on a waiting list until there are at least 2 cells they can choose from to undo.",
    notes: "The effects that have already happened aren’t undone, the cell just becomes available to be called again.",
    count: { base: 0, max: 1 },
    stand: true
  }),

  sin: new Item(ItemType.Function, "sin", {
    desc: "Steal another player’s points",
    rules: [
      "You gain points equal to that player’s score, and their score resets to $0$.",
      "If this Function is reflected by [reflection in y axis], the activator’s points are stolen by the reflector instead.",
    ],
    count: { base: 1, max: 2 },
    stand: true
  }),

  asin: new Item(ItemType.Function, "arcsin", {
    desc: "Kill another player",
    rules: "That player’s score resets to $0$.",
    count: { base: 1, max: 2 },
    stand: true
  }),

  tan: new Item(ItemType.Function, "tan q", {
    desc: "Gift another player points equal to the Cell Constant \times 101",
    tips: "Remember that player should round their score after applying the effect.",
    count: { base: 1, max: 1 },
    stand: true
  }),

  sec: new Item(ItemType.Function, "secant", {
    desc: "Remove the last digit of your score",
    rules: "If your score is $0$, nothing happens.",
    count: { base: 1, max: 1 },
  }),

  asec: new Item(ItemType.Function, "arcsecant", {
    desc: "Remove the last digit of another player’s score",
    rules: "If that player’s score is $0$, nothing happens.",
    count: { base: 1, max: 1 },
    stand: true
  }),

  csc: new Item(ItemType.Function, "cosecant", {
    desc: "Pick another player; remove the last digit of their score and insert it at the start of your score",
    ex: "Your score is $271$. You pick a player with a score of $1539$. You remove the $9$, so their score becomes $153$, and yours becomes $9271$.",
    count: { base: 0, max: 1 },
    stand: true
  }),

  interp: new Item(ItemType.Function, "interpolation", {
    desc: "Add 1 to each digit of your score",
    rules: "$9$ increments to $0$.",
    ex: "Your score is $9019$. The $9$-s become $0$-s, so your score becomes $0120 = 120$.",
    count: { base: 1, max: 1 }
  }),

  extrap: new Item(ItemType.Function, "extrapolation", {
    desc: "Remove all zero digits from your score, then reorder the remaining digits however you like",
    rules: "You can choose to keep the order unchanged.",
    ex: "Your score is $12050$. Remove the zeroes, giving $125$. Then you can rearrange your score to $521$, $251$, etc.",
    count: { base: 0, max: 1 }
  }),

  trans: new Item(ItemType.Function, "translation", {
    desc: "Move the first digit of your score to the end of your score",
    ex: "Your score is $69420$. The $6$ moves to the end, so your score becomes $94206$.",
    count: { base: 1, max: 1 }
  }),

  palin: new Item(ItemType.Function, "palindrome", {
    desc: "Reverse all non-zero digits of your score, leaving zeroes in place",
    ex: "Your score is 42069. The $4269$ flips to $9624$, so your score becomes $96024$.",
    count: { base: 1, max: 1 }
  }),

  quad: new Item(ItemType.Function, "quadratic formula", {
    desc: "If your score contains a square digit, double your score; otherwise, halve your score",
    ex: "Your score is $4592$. $4$ and $9$ are square, so your score is doubled to $9184$.",
    rules: "The square digits are $0$, $1$, $4$, $9$.",
    count: { base: 0, max: 1 }
  }),

  i: new Item(ItemType.Function, "rotation by i", {
    desc: "You have been rotated into the complex plane – you are unaffected by other players’ effects until another player is rotated into the complex plane",
    tips: "Only 1 player can be in the complex plane at a time.",
    rules: "Other players can still choose to use Items on you, but they will have no effect.",
    count: { base: 0, max: 1 },
    stand: true
  }),

  cancel: new Item(ItemType.Function, "catastrophic cancellation", {
    desc: "Choose another player, and calculate the difference between your scores. The player with the lower score has their score changed to that difference",
    ex: "Your score is $1000$. You pick a player with a score of $9000$. The difference is $9000 - 1000 = 8000$, and your score is lower, so your score becomes $8000$.",
    count: { base: 0, max: 1 },
  }),

  degen: new Item(ItemType.Function, "degenerate case", {
    desc: "Pick a player; choose 1 of their cells to cross out, without applying its effect.",
    rules: [
      "You can’t pick a cell that’s already been crossed out.",
      "When that cell is called out in future, that player doesn’t obtain the Item.",
    ],
    count: { base: 0, max: 1 },
    stand: true
  }),

  // Actions
  inv: new Item(ItemType.Action, "Inverse Function", {
    desc: "Cancel out another player’s Function or Action applied to you.",
    rules: [
      "Activate this is response to a Function or Action.",
      "The Function or Action must either affect you, or have been activated in response to your Function or Action.",
    ],
    count: { base: 1, max: 2 }
  }),

  reflecty: new Item(ItemType.Action, "reflection in y axis", {
    desc: "Reflect a Function or Action back at the activator",
    rules: [
      "Activate this in response to a Function or Action.",
      "The Function or Action must either affect you, or have been activated in response to your Function or Action.",
      "The effect of the Function or Action is applied to the activator by the reflector.",
    ],
    tips: "If a player reflects your Function back at you, you can use this Action to reflect it back at them again.",
    ex: [
      "Another player with a score of $1100$ activates [sec] to try remove the last digit of your score. You activate this Function to reflect it back at them. The effect of [sec] is applied to them instead of you, so their score becomes $110$.",
      "Another player activates [sin] to try steal your points. You activate this Function to reflect it back at them. The effect of [sin] is now applied by you instead of them, so you steal their points.",
    ],
    count: { base: 1, max: 1 }
  }),

  reflectx: new Item(ItemType.Action, "reflection in x axis", {
    desc: "Deflect a Function or Action to another player (other than the activator)",
    rules: [
      "Activate this in response to a Function or Action.",
      "The Function or Action must either affect you, or have been activated in response to your Function or Action.",
    ],
    tips: [
      "If a Function or Action is reflected or deflected to you, you can use this Action to deflect it to another player.",
    ],
    count: { base: 1, max: 1 }
  }),

  negative: new Item(ItemType.Action, "negative multiplication", {
    desc: "When a player steals your points, they lose your points instead of gaining them",
    notes: "Your score still becomes $0$.",
    ex: "Your score is $1000$. Another player with a score of $4000$ tries to steal your points. You activate this Action, so instead of gaining $1000$ points, they lose $1000$ points. Your score becomes $0$, and theirs $4000 - 1000 = 3000$.",
    count: { base: 1, max: 1 }
  }),

  matrix_inverse: new Item(ItemType.Function, "matrix inversion", {
    desc: "",
    count: { base: 0, max: 1 }
  }),

  conjugate: new Item(ItemType.Function, "complex conjugation", {
    desc: "Rotate yourself into the complex plane for this turn",
    rules: [
      "If a player is already in the complex plane, they are removed and are not restored at the end of the turn.",
    ],
    count: { base: 0, max: 1 }
  }),
};
