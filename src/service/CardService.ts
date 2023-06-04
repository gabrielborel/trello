import { CardRepository } from "../domain/repository/CardRepository";

export class CardService {
  constructor(readonly cardRepository: CardRepository) { }

  async getCards(columnId: number) {
    const cards = await this.cardRepository.findAllByColumnId(columnId);
    return cards;
  }
}
