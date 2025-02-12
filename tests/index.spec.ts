import { describe, it, expect } from "vitest";

export function createBoard(n: number): string[][] {
  if (n < 1) {
    throw new Error("n must be greater than 0");
  }
  let res = [];
  for (let i = 0; i < n; i++) {
    res.push(new Array(n).fill("O"));
  }
  return res;
}

describe("createBoard", () => {
  it("Throw an error if n is less than 1", () => {
    expect(() => createBoard(0)).toThrowError();
  });

  it("Create a n*n board filled with 'O'", () => {
    const board = createBoard(4);
    console.log(board);
    expect(board.length).toBe(4);
    expect(board.every(row => row.length === 4)).toBe(true);
    expect(board.flat().every(cell => cell === "O")).toBe(true);
  });
});