import { Board } from "../src/Board";

test("should create a board", () => {
  const board = new Board("Project One");
  expect(board.name).toBe("Project One");
});

test("should not be able to create a board without name", () => {
  expect(() => new Board("")).toThrow(new Error("name is required"));
});
