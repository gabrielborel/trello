import { Column } from "../entity/Column";

export interface ColumnRepository {
  findAllByBoardId(boardId: number): Promise<Column[]>;
}
