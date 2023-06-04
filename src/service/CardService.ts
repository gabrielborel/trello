import { Card } from "../domain/entity/Card";
import { CardRepository } from "../domain/repository/CardRepository";

export class CardService {
  constructor(readonly cardRepository: CardRepository) {}

  async getCards(columnId: number) {
    const cards = await this.cardRepository.findAllByColumnId(columnId);
    return cards;
  }

  async saveCard(input: SaveInput): Promise<number> {
    const cardId = await this.cardRepository.save(
      new Card(1, input.columnId, input.name, input.estimation)
    );
    return cardId;
  }

  async getCard(cardId: number): Promise<Card> {
    const card = await this.cardRepository.findById(cardId);
    return card;
  }

  async deleteCard(cardId: number): Promise<void> {
    await this.cardRepository.delete(cardId);
  }

  async updateCard(input: UpdateInput): Promise<void> {
    await this.cardRepository.update(input);
  }
}

type SaveInput = {
  columnId: number;
  name: string;
  estimation: number;
};

type UpdateInput = Card;
