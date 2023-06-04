import { Board } from "../entity/Board";

export interface BoardRepository {
  findAll(): Promise<Board[]>;
  findById(boardId: number): Promise<Board>;
  save(board: Board): Promise<number>;
  update(board: Board): Promise<void>;
  delete(boardId: number): Promise<void>;
}
