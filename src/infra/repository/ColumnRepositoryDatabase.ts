import { Column } from "../../domain/entity/Column";
import { ColumnRepository } from "../../domain/repository/ColumnRepository";
import { Connection } from "../database/Connection";

export class ColumnRepositoryDatabase implements ColumnRepository {
  constructor(readonly conn: Connection) {}

  async findById(columnId: number): Promise<Column> {
    const [columnData] = await this.conn.query(
      'SELECT id_column, id_board, name, has_estimation FROM "column" WHERE id_column = $1',
      [columnId]
    );
    if (!columnData) throw new Error("column not found");
    return new Column(
      columnData.id_column,
      columnData.id_board,
      columnData.name,
      columnData.has_estimation
    );
  }

  async save(column: Column): Promise<number> {
    const [columData] = await this.conn.query(
      'INSERT INTO "column" (id_board, name, has_estimation) VALUES ($1, $2, $3) returning id_column',
      [column.boardId, column.name, column.hasEstimation]
    );
    return columData.id_column;
  }

  async findAllByBoardId(boardId: number): Promise<Column[]> {
    const columnsData = await this.conn.query(
      'SELECT * FROM "column" WHERE id_board = $1',
      [boardId]
    );
    const columns: Column[] = [];
    for (const columnData of columnsData) {
      columns.push(
        new Column(
          columnData.id_column,
          columnData.id_board,
          columnData.name,
          columnData.has_estimation
        )
      );
    }
    return columns;
  }

  async delete(columnId: number): Promise<void> {
    await this.conn.query('DELETE FROM "column" WHERE id_column = $1', [
      columnId,
    ]);
  }

  async update(column: Column): Promise<void> {
    await this.conn.query(
      'UPDATE "column" SET name = $1, has_estimation = $2 WHERE id_column = $3',
      [column.name, column.hasEstimation, column.id]
    );
  }
}
