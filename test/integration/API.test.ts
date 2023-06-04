import app from "supertest";

test("should return boards through the API", async () => {
  const res = await app("http://localhost:3000").get("/boards");
  const boards = res.body;
  const [board] = boards;
  expect(board.name).toBe("Project One");
  expect(board.id).toBe(1);
  expect(boards).toHaveLength(1);
});

test("should return a board through the API", async () => {
  const res = await app("http://localhost:3000").get("/boards/1");
  const board = res.body;
  expect(board.name).toBe("Project One");
  expect(board.id).toBe(1);
});

test("should return columns of a board through the API", async () => {
  const res = await app("http://localhost:3000").get("/boards/1/columns");
  const columns = res.body;
  expect(columns).toHaveLength(3);
  expect(columns[0].name).toBe("To Do");
  expect(columns[0].id).toBe(1);
  expect(columns[1].name).toBe("Doing");
  expect(columns[1].id).toBe(2);
  expect(columns[2].name).toBe("Done");
  expect(columns[2].id).toBe(3);
});

test("should return cards of a column through the API", async () => {
  const res = await app("http://localhost:3000").get(
    "/boards/1/columns/1/cards"
  );
  const cards = res.body;
  expect(cards).toHaveLength(3);
  expect(cards[0].name).toBe("Activity 1");
  expect(cards[0].id).toBe(1);
  expect(cards[1].name).toBe("Activity 2");
  expect(cards[1].id).toBe(2);
  expect(cards[2].name).toBe("Activity 3");
  expect(cards[2].id).toBe(3);
});

test("should save a card through the API", async () => {
  const saveResponse = await app("http://localhost:3000")
    .post("/boards/1/columns")
    .send({
      boardId: 1,
      name: "To Do",
      hasEstimation: true,
    });
  const columnId = saveResponse.body;
  const getResponse = await app("http://localhost:3000").get(
    `/boards/1/columns/${columnId}`
  );
  const column = getResponse.body;
  expect(column.name).toBe("To Do");
  await app("http://localhost:3000").delete(`/boards/1/columns/${columnId}`);
});
