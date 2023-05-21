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
      cards.push(new Card(cardData.name, cardData.estimation));
    }
    return cards;
  }
}
