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

  async saveBoard(name: string): Promise<number> {
    const boardId = await this.boardRepository.save(new Board(1, name));
    return boardId;
  }

  async getBoards(): Promise<BoardsOutput[]> {
    const boards = await this.boardRepository.findAll();
    return boards.map((board) => ({ id: board.id, name: board.name }));
  }

  async getBoard(boardId: number): Promise<BoardOutput> {
    const board = await this.boardRepository.findById(boardId);
    const output: BoardOutput = {
      id: board.id,
      name: board.name,
      estimation: 0,
      columns: [],
    };
    const columns = await this.columnRepository.findAllByBoardId(boardId);
    for (const column of columns) {
      let estimation = 0;
      const columnOutput: ColumnOutput = {
        id: column.id,
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
          id: card.id,
          name: card.name,
          estimation: card.estimation,
        });
      }
      output.estimation += estimation;
      output.columns.push(columnOutput);
    }
    return output;
  }

  async deleteBoard(boardId: number): Promise<void> {
    await this.boardRepository.delete(boardId);
  }

  async updateBoard(input: UpdateInput): Promise<void> {
    await this.boardRepository.update(new Board(input.id, input.name));
  }
}

type UpdateInput = Board;

type BoardsOutput = {
  id: number;
  name: string;
};

type ColumnOutput = {
  id: number;
  name: string;
  estimation: number;
  hasEstimation: boolean;
  cards: { id: number; name: string; estimation: number }[];
};

type BoardOutput = {
  id: number;
  name: string;
  estimation: number;
  columns: ColumnOutput[];
};
