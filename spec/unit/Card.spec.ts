import { Card } from "../../src/domain/entity/Card";

describe("Card entity", () => {
  test("should be able to create a card", () => {
    const card = new Card(1, 1, "Activity 1", 3);
    expect(card.name).toBe("Activity 1");
    expect(card.estimation).toBe(3);
  });

  test("should not be able to create a card without a name", () => {
    expect(() => new Card(1, 1, "", 3)).toThrow(new Error("name is required"));
  });

  test("should not be able to create a card with a negative estimation", () => {
    expect(() => new Card(1, 1, "Activity 1", -3)).toThrow(
      new Error("estimation must be positive")
    );
  });
});
