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
  if (board[row][col] === "#") return false;

  for (let i = 0; i < n; i++) {
    if (board[row][i] === "#" || board[i][col] === "#") return false;
  }

  const directions = [[-1, -1], [1, 1], [-1, 1], [1, -1]];

  for (const [dirX, dirY] of directions) {
    for (let i = row, j = col; i >= 0 && i < n && j >= 0 && j < n; i += dirX, j += dirY) {
      if (board[i][j] === "#") return false;
    }
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

export function solveNQueens(n: number): string[][] {
  const results: string[][] = [];
  const board = createBoard(n);

  function solve(row: number): void {
    if (row === n) {
      results.push(board.map(row => row.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(board, row, col, n)) {
        board[row][col] = "#";
        solve(row + 1);
        board[row][col] = "O";
      }
    }
  }

  solve(0);

  return results;
}

describe("solveNQueens", () => {
  it("Have to return all solution for n=4", () => {
    const solutions = solveNQueens(4);
    console.log(solutions);
    expect(solutions.length).toBeGreaterThan(0);
    expect(solutions[0].length).toBe(4);
  });
});