export class Board {
  constructor(readonly name: string) {
    if (!name) throw new Error("name is required");
  }
}
