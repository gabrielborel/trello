import app from "supertest";

test("should return boards through the API", async () => {
  const res = await app("http://localhost:3000").get("/boards");
  const boards = res.body;
  const [board] = boards;
  expect(board.name).toBe("Project One");
  expect(boards).toHaveLength(1);
});

test("should return columns of a board through the API", async () => {
  const res = await app("http://localhost:3000").get("/boards/1/columns");
  const columns = res.body;
  expect(columns).toHaveLength(3);
  expect(columns[0].name).toBe("To Do");
  expect(columns[1].name).toBe("Doing");
  expect(columns[2].name).toBe("Done");
});

test("should return cards of a column through the API", async () => {
  const res = await app("http://localhost:3000").get(
    "/boards/1/columns/1/cards"
  );
  const cards = res.body;
  expect(cards).toHaveLength(3);
  expect(cards[0].name).toBe("Activity 1");
  expect(cards[1].name).toBe("Activity 2");
  expect(cards[2].name).toBe("Activity 3");
});
