import { Column } from "../../src/domain/entity/Column";

test("should create a column", () => {
  const column = new Column(1, 1, "To Do", true);
  expect(column.name).toBe("To Do");
  expect(column.hasEstimation).toBeTruthy();
});

test("should not be able to create a column without name", () => {
  expect(() => new Column(1, 1, "", true)).toThrow(
    new Error("name is required")
  );
});
