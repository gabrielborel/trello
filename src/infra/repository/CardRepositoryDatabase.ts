import { Card } from "../../domain/entity/Card";
import { CardRepository } from "../../domain/repository/CardRepository";
import { Connection } from "../database/Connection";

export class CardRepositoryDatabase implements CardRepository {
  constructor(readonly conn: Connection) {}

  async findAllByColumnId(columnId: number): Promise<Card[]> {
    const cardsData = await this.conn.query(
      "SELECT * FROM card WHERE id_column = $1",
      [columnId]
    );
    const cards: Card[] = [];
    for (const cardData of cardsData) {
      cards.push(
        new Card(
          cardData.id_card,
          cardData.id_column,
          cardData.name,
          cardData.estimation
        )
      );
    }
    return cards;
  }

  async save(card: Card): Promise<number> {
    const [cardData] = await this.conn.query(
      "INSERT INTO card (name, estimation, id_column) VALUES ($1, $2, $3) RETURNING id_card",
      [card.name, card.estimation, card.columnId]
    );
    return cardData.id_card;
  }

  async findById(cardId: number): Promise<Card> {
    const [cardData] = await this.conn.query(
      "SELECT id_card, id_column, name, estimation FROM card WHERE id_card = $1",
      [cardId]
    );
    if (!cardData) throw new Error("card not found");
    return new Card(
      cardData.id_card,
      cardData.id_column,
      cardData.name,
      cardData.estimation
    );
  }

  async delete(cardId: number): Promise<void> {
    await this.conn.query("DELETE FROM card WHERE id_card = $1", [cardId]);
  }

  async update(card: Card): Promise<void> {
    await this.conn.query(
      "UPDATE card SET name = $1, estimation = $2 WHERE id_card = $3",
      [card.name, card.estimation, card.id]
    );
  }
}
