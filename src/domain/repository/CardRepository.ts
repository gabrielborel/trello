import { Card } from "../entity/Card";

export interface CardRepository {
  findAllByColumnId(columnId: number): Promise<Card[]>;
}
