export class Column {
  constructor(
    readonly id: number,
    readonly boardId: number,
    readonly name: string,
    readonly hasEstimation: boolean
  ) {
    if (!name) throw new Error("name is required");
  }
}
