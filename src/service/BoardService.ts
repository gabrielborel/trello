import { Board } from "../domain/entity/Board";
import { BoardRepository } from "../domain/repository/BoardRepository";
import { CardRepository } from "../domain/repository/CardRepository";
import { ColumnRepository } from "../domain/repository/ColumnRepository";

export class BoardService {
  constructor(
    readonly boardRepository: BoardRepository,
    readonly columnRepository: ColumnRepository,
    readonly cardRepository: CardRepository
  ) {}

  async getBoards(): Promise<Board[]> {
    const boards = await this.boardRepository.findAll();
    return boards;
  }

  async getBoard(boardId: number): Promise<BoardOutput> {
    const board = await this.boardRepository.findById(boardId);
    const output: BoardOutput = {
      name: board.name,
      estimation: 0,
      columns: [],
    };
    const columns = await this.columnRepository.findAllByBoardId(boardId);
    for (const column of columns) {
      let estimation = 0;
      const columnOutput: ColumnOutput = {
        name: column.name,
        estimation: 0,
        hasEstimation: column.hasEstimation,
        cards: [],
      };
      const cards = await this.cardRepository.findAllByColumnId(column.id);
      for (const card of cards) {
        output.estimation += card.estimation;
        columnOutput.estimation += card.estimation;
        columnOutput.cards.push({
          name: card.name,
          estimation: card.estimation,
        });
      }
      output.estimation += estimation;
      output.columns.push(columnOutput);
    }
    return output;
  }
}

type ColumnOutput = {
  name: string;
  estimation: number;
  hasEstimation: boolean;
  cards: { name: string; estimation: number }[];
};

type BoardOutput = {
  name: string;
  estimation: number;
  columns: ColumnOutput[];
};
