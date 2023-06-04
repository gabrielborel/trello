import { Card } from "../entity/Card";

export interface CardRepository {
  findAllByColumnId(columnId: number): Promise<Card[]>;
  save(card: Card): Promise<number>;
  findById(cardId: number): Promise<Card>;
  delete(cardId: number): Promise<void>;
  update(card: Card): Promise<void>;
}
