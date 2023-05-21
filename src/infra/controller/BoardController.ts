import { BoardService } from "../../service/BoardService";
import { CardService } from "../../service/CardService";
import { ColumnService } from "../../service/ColumnService";
import { Connection } from "../database/Connection";
import { Http } from "../http/Http";
import { BoardRepositoryDatabase } from "../repository/BoardRepositoryDatabase";
import { CardRepositoryDatabase } from "../repository/CardRepositoryDatabase";
import { ColumnRepositoryDatabase } from "../repository/ColumnRepositoryDatabase";

export class BoardController {
  constructor(readonly http: Http, readonly conn: Connection) {
    this.http.route("get", "/boards", async () => {
      const boardRepository = new BoardRepositoryDatabase(conn);
      const boardService = new BoardService(boardRepository);
      const boards = await boardService.getBoards();
      return boards;
    });

    this.http.route(
      "get",
      "/boards/:boardId/columns",
      async (params: any, body: any) => {
        const columnRepository = new ColumnRepositoryDatabase(conn);
        const columnService = new ColumnService(columnRepository);
        const columns = await columnService.getColumns(params.boardId);
        return columns;
      }
    );

    this.http.route(
      "get",
      "/boards/:boardId/columns/:columnId/cards",
      async (params: any, body: any) => {
        const cardRepository = new CardRepositoryDatabase(conn);
        const cardService = new CardService(cardRepository);
        const cards = await cardService.getCards(params.columnId);
        return cards;
      }
    );
  }
}
