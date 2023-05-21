import { BoardController } from "./infra/controller/BoardController";
import { PgPromiseConnection } from "./infra/database/PgPromiseConnection";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { BoardRepositoryDatabase } from "./infra/repository/BoardRepositoryDatabase";

const conn = new PgPromiseConnection();
const boardsRepository = new BoardRepositoryDatabase(conn);
const http = new ExpressAdapter();
new BoardController(http, conn, boardsRepository);
http.listen(3000);
process.on("exit", async () => {
  await conn.close();
});
