export class Card {
  constructor(readonly title: string, readonly estimation: number) {
    if (!title) throw new Error("title is required");
    if (estimation < 0) throw new Error("estimation must be positive");
  }
}
