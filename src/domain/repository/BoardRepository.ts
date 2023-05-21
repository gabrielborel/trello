import { Board } from "../entity/Board";

export interface BoardRepository {
  findAll(): Promise<Board[]>;
}
