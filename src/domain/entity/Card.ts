export class Card {
  constructor(readonly name: string, readonly estimation: number) {
    if (!name) throw new Error("name is required");
    if (estimation < 0) throw new Error("estimation must be positive");
  }
}
