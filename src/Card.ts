export class Card {
  constructor(readonly title: string, readonly estimative: number) {
    if (!title) throw new Error("title is required");
    if (estimative < 0) throw new Error("estimative must be positive");
  }
}
