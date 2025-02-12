import { describe, it, expect } from "vitest";

export function createBoard(n: number): string[][] {
  let res = [];
  for (let i = 0; i < n; i++) {
    res.push(new Array(n).fill("O"));
  }
  return res;
}

describe("createBoard", () => {
  it("Create a N*N board filled with 'O'", () => {
    const board = createBoard(4);
    console.log(board);
    expect(board.length).toBe(4);
    expect(board.every(row => row.length === 4)).toBe(true);
    expect(board.flat().every(cell => cell === "O")).toBe(true);
  });
});