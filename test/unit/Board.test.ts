import { Board } from "../../src/domain/entity/Board";

test("should create a board", () => {
  const board = new Board(1, "Project One");
  expect(board.name).toBe("Project One");
});

test("should not be able to create a board without name", () => {
  expect(() => new Board(2, "")).toThrow(new Error("name is required"));
});
