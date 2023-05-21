import { Column } from "../../domain/entity/Column";
import { ColumnRepository } from "../../domain/repository/ColumnRepository";
import { Connection } from "../database/Connection";

export class ColumnRepositoryDatabase implements ColumnRepository {
  constructor(readonly conn: Connection) {}

  async findAllByBoardId(boardId: number): Promise<Column[]> {
    const columnsData = await this.conn.query(
      'SELECT * FROM "column" WHERE id_board = $1',
      [boardId]
    );
    const columns: Column[] = [];
    for (const columnData of columnsData) {
      columns.push(new Column(columnData.name, columnData.has_estimation));
    }
    return columns;
  }
}
