import { Board } from "../../domain/entity/Board";
import { BoardRepository } from "../../domain/repository/BoardRepository";
import { Connection } from "../database/Connection";

export class BoardRepositoryDatabase implements BoardRepository {
  constructor(readonly conn: Connection) {}

  async findById(boardId: number): Promise<Board> {
    const [boardData] = await this.conn.query(
      "SELECT * FROM board WHERE id_board = $1",
      [boardId]
    );
    if (!boardData) throw new Error("board not found");
    const board = new Board(boardData.id_board, boardData.name);
    return board;
  }

  async findAll(): Promise<Board[]> {
    const boardsData = await this.conn.query("SELECT * FROM board");
    const boards: Board[] = [];
    for (const boardData of boardsData) {
      boards.push(new Board(boardData.id_board, boardData.name));
    }
    return boards;
  }

  async save(board: Board): Promise<number> {
    const [boardData] = await this.conn.query(
      "INSERT INTO board (name) VALUES ($1) RETURNING id_board",
      [board.name]
    );
    return boardData.id_board;
  }

  async update(board: Board): Promise<void> {
    await this.conn.query("UPDATE board SET name = $1 WHERE id_board = $2", [
      board.name,
      board.id,
    ]);
  }

  async delete(boardId: number): Promise<void> {
    await this.conn.query("DELETE FROM board WHERE id_board = $1", [boardId]);
  }
}
