import { Card } from "../../src/domain/entity/Card";

test("should be able to create a card", () => {
  const card = new Card("Activity 1", 3);
  expect(card.title).toBe("Activity 1");
  expect(card.estimation).toBe(3);
});

test("should not be able to create a card without a title", () => {
  expect(() => new Card("", 3)).toThrow(new Error("title is required"));
});

test("should not be able to create a card with a negative estimation", () => {
  expect(() => new Card("Activity 1 ", -3)).toThrow(
    new Error("estimation must be positive")
  );
});
