import { BoardRepository } from "../../domain/repository/BoardRepository";
import { CardRepository } from "../../domain/repository/CardRepository";
import { ColumnRepository } from "../../domain/repository/ColumnRepository";
import { BoardService } from "../../service/BoardService";
import { CardService } from "../../service/CardService";
import { ColumnService } from "../../service/ColumnService";
import { Http } from "../http/Http";

export class BoardController {
  constructor(
    readonly http: Http,
    readonly boardRepository: BoardRepository,
    readonly columnRepository: ColumnRepository,
    readonly cardRepository: CardRepository
  ) {
    this.http.route("get", "/boards", async () => {
      const boardService = new BoardService(
        this.boardRepository,
        this.columnRepository,
        this.cardRepository
      );
      const boards = await boardService.getBoards();
      return boards;
    });

    this.http.route("get", "/boards/:boardId", async (params: any) => {
      const boardService = new BoardService(
        boardRepository,
        columnRepository,
        cardRepository
      );
      const board = await boardService.getBoard(params.boardId);
      return board;
    });

    this.http.route(
      "get",
      "/boards/:boardId/columns",
      async (params: any, body: any) => {
        const columnService = new ColumnService(columnRepository);
        const columns = await columnService.getColumns(params.boardId);
        return columns;
      }
    );

    this.http.route(
      "get",
      "/boards/:boardId/columns/:columnId",
      async (params: any, body: any) => {
        const columnService = new ColumnService(columnRepository);
        const columns = await columnService.getColumn(params.columnId);
        return columns;
      }
    );

    this.http.route(
      "post",
      "/boards/:boardId/columns",
      async (params: any, body: any) => {
        const columnService = new ColumnService(columnRepository);
        const columnId = await columnService.saveColumn(body);
        return columnId;
      }
    );

    this.http.route(
      "delete",
      "/boards/:boardId/columns/:columnId",
      async (params: any, body: any) => {
        const columnService = new ColumnService(columnRepository);
        await columnService.deleteColumn(params.columnId);
      }
    );

    this.http.route(
      "get",
      "/boards/:boardId/columns/:columnId/cards",
      async (params: IGetCardsParams, body: any) => {
        const cardService = new CardService(cardRepository);
        const cards = await cardService.getCards(+params.columnId);
        return cards;
      }
    );
  }
}

type IGetCardsParams = {
  boardId: string;
  columnId: string;
};
