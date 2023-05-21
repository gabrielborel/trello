import { Board } from "../../domain/entity/Board";
import { BoardRepository } from "../../domain/repository/BoardRepository";
import { Connection } from "../database/Connection";

export class BoardRepositoryDatabase implements BoardRepository {
  constructor(readonly conn: Connection) {}

  async findAll(): Promise<Board[]> {
    const boardsData = await this.conn.query("SELECT * FROM board");
    const boards: Board[] = [];
    for (const boardData of boardsData) {
      boards.push(new Board(boardData.name));
    }
    return boards;
  }
}
