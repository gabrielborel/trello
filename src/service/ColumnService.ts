import { ColumnRepository } from "../domain/repository/ColumnRepository";

export class ColumnService {
  constructor(readonly columnRepository: ColumnRepository) {}

  async getColumns(boardId: number) {
    const columns = await this.columnRepository.findAllByBoardId(boardId);
    return columns;
  }
}
