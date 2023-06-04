import { Column } from "../entity/Column";

export interface ColumnRepository {
  findAllByBoardId(boardId: number): Promise<Column[]>;
  save(column: Column): Promise<number>;
  get(columnId: number): Promise<Column>;
  delete(columnId: number): Promise<void>;
}
