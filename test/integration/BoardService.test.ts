import { BoardService } from "../../src/service/BoardService";
import { BoardRepositoryDatabase } from "../../src/infra/repository/BoardRepositoryDatabase";
import { ColumnRepositoryDatabase } from "../../src/infra/repository/ColumnRepositoryDatabase";
import { CardRepositoryDatabase } from "../../src/infra/repository/CardRepositoryDatabase";
import { PgPromiseConnection } from "../../src/infra/database/PgPromiseConnection";

test("should list boards", async () => {
  const conn = new PgPromiseConnection();
  const boardsRepository = new BoardRepositoryDatabase(conn);
  const columnsRepository = new ColumnRepositoryDatabase(conn);
  const cardsRepository = new CardRepositoryDatabase(conn);
  const boardService = new BoardService(
    boardsRepository,
    columnsRepository,
    cardsRepository
  );
  const boards = await boardService.getBoards();
  expect(boards).toHaveLength(1);
  expect(boards[0].name).toBe("Project One");
  await conn.close();
});

test("should find a board by id", async () => {
  const conn = new PgPromiseConnection();
  const boardsRepository = new BoardRepositoryDatabase(conn);
  const columnsRepository = new ColumnRepositoryDatabase(conn);
  const cardsRepository = new CardRepositoryDatabase(conn);
  const boardService = new BoardService(
    boardsRepository,
    columnsRepository,
    cardsRepository
  );
  const board = await boardService.getBoard(1);
  expect(board.name).toBe("Project One");
  expect(board.columns).toHaveLength(3);
  const [columnOne, columnTwo, columnThree] = board.columns;
  expect(columnOne.name).toBe("To Do");
  expect(columnTwo.name).toBe("Doing");
  expect(columnThree.name).toBe("Done");
  expect(columnOne.estimation).toBe(9);
  expect(columnTwo.estimation).toBe(0);
  expect(columnThree.estimation).toBe(0);
  expect(board.estimation).toBe(9);
  const [cardOneColumnOne, cardTwoColumnOne, cardThreeColumnOne] =
    columnOne.cards;
  expect(cardOneColumnOne.name).toBe("Activity 1");
  expect(cardTwoColumnOne.name).toBe("Activity 2");
  expect(cardThreeColumnOne.name).toBe("Activity 3");
  expect(cardOneColumnOne.estimation).toBe(3);
  expect(cardTwoColumnOne.estimation).toBe(3);
  expect(cardThreeColumnOne.estimation).toBe(3);
  await conn.close();
});
