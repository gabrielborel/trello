import { BoardController } from "./infra/controller/BoardController";
import { PgPromiseConnection } from "./infra/database/PgPromiseConnection";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";

const conn = new PgPromiseConnection();
const http = new ExpressAdapter();
new BoardController(http, conn);
http.listen(3000);
