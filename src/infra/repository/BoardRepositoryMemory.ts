import { Board } from "../../domain/entity/Board";

export class BoardRepositoryMemory {
  boards: Board[];

  constructor() {
    this.boards = [new Board(1, "Project One")];
  }

  async findAll() {
    return this.boards;
  }
}
