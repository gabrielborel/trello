import { BoardService } from "../../src/service/BoardService";
import { BoardRepositoryDatabase } from "../../src/infra/repository/BoardRepositoryDatabase";
import { PgPromiseConnection } from "../../src/infra/database/PgPromiseConnection";

test("should list boards", async () => {
  const conn = new PgPromiseConnection();
  const boardsRepository = new BoardRepositoryDatabase(conn);
  const boardService = new BoardService(boardsRepository);
  const boards = await boardService.getBoards();
  expect(boards).toHaveLength(1);
  expect(boards[0].name).toBe("Project One");
});
