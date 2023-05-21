import { Column } from "../../src/domain/entity/Column";

test("should create a column", () => {
  const column = new Column("To Do", true);
  expect(column.name).toBe("To Do");
  expect(column.hasEstimative).toBeTruthy();
});

test("should not be able to create a column without name", () => {
  expect(() => new Column("", true)).toThrow(new Error("name is required"));
});
