import { Board } from "../entity/Board";

export interface BoardRepository {
  findAll(): Promise<Board[]>;
  findById(boardId: number): Promise<Board>;
}
