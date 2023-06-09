import { Column } from "../domain/entity/Column";
import { ColumnRepository } from "../domain/repository/ColumnRepository";

export class ColumnService {
  constructor(readonly columnRepository: ColumnRepository) {}

  async getColumns(boardId: number) {
    const columns = await this.columnRepository.findAllByBoardId(boardId);
    return columns;
  }

  async saveColumn(input: SaveInput): Promise<number> {
    const columnId = await this.columnRepository.save(
      new Column(1, input.boardId, input.name, input.hasEstimation)
    );
    return columnId;
  }

  async getColumn(columnId: number): Promise<Column> {
    const column = await this.columnRepository.findById(columnId);
    return column;
  }

  async deleteColumn(columnId: number): Promise<void> {
    await this.columnRepository.delete(columnId);
  }

  async updateColumn(input: UpdateInput): Promise<void> {
    await this.columnRepository.update(
      new Column(input.id, input.boardId, input.name, input.hasEstimation)
    );
  }
}

type SaveInput = {
  boardId: number;
  name: string;
  hasEstimation: boolean;
};

type UpdateInput = Column;
