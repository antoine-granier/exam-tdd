import exp from "constants";
import { describe, it, expect } from "vitest";

export function createBoard(n: number): string[][] {
  if (n < 1) {
    throw new Error("n must be greater than 0");
  }
  return Array.from({ length: n }, () => Array.from({ length: n }, () => "O"));
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

export function isSafe(board: string[][], row: number, col: number, n: number): boolean {
  if(board[row][col] === "#") return false;
  for (let i = 0; i < n; i++) {
    if (board[row][i] === "#") return false;
    if (board[i][col] === "#") return false;
  }
  for(let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if(board[i][j] === "#") return false;
  }
  for(let i = row, j = col; i < n && j < n; i++, j++) {
    if(board[i][j] === "#") return false;
  }
  for(let i = row, j = col; i >= 0 && j < n; i--, j++) {
    if(board[i][j] === "#") return false;
  }
  for(let i = row, j = col; i < n && j >= 0; i++, j--) {
    if(board[i][j] === "#") return false;
  }
  return true;
}

describe("isSafe", () => {
  it("Verify that Queen position is unsafe", () => {
    let board = createBoard(4);
    board[0][1] = "#";
    console.log(board);
    expect(isSafe(board, 0, 1, 4)).toBe(false);
  });

  it("Verify if position is safe", () => {
    let board = createBoard(4);
    board[1][1] = "#";
    console.log(board);
    expect(isSafe(board, 0, 1, 4)).toBe(false);
    expect(isSafe(board, 1, 0, 4)).toBe(false);
    expect(isSafe(board, 0, 0, 4)).toBe(false);
    expect(isSafe(board, 2, 0, 4)).toBe(false);
    expect(isSafe(board, 2, 3, 4)).toBe(true);
  });
});