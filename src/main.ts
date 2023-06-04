import { BoardController } from "./infra/controller/BoardController";
import { PgPromiseConnection } from "./infra/database/PgPromiseConnection";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { BoardRepositoryDatabase } from "./infra/repository/BoardRepositoryDatabase";
import { CardRepositoryDatabase } from "./infra/repository/CardRepositoryDatabase";
import { ColumnRepositoryDatabase } from "./infra/repository/ColumnRepositoryDatabase";

const conn = new PgPromiseConnection();
const boardsRepository = new BoardRepositoryDatabase(conn);
const columnsRepository = new ColumnRepositoryDatabase(conn);
const cardsRepository = new CardRepositoryDatabase(conn);
const http = new ExpressAdapter();
new BoardController(http, boardsRepository, columnsRepository, cardsRepository);
http.listen(3000);
process.on("exit", async () => await conn.close());
