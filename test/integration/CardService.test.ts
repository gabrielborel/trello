import { CardService } from "../../src/service/CardService";
import { CardRepositoryDatabase } from "../../src/infra/repository/CardRepositoryDatabase";
import { PgPromiseConnection } from "../../src/infra/database/PgPromiseConnection";

test("should list cards", async () => {
  const conn = new PgPromiseConnection();
  const cardsRepository = new CardRepositoryDatabase(conn);
  const cardService = new CardService(cardsRepository);
  const cards = await cardService.getCards(1);
  expect(cards).toHaveLength(3);
  expect(cards[0].title).toBe("Activity 1");
  expect(cards[1].title).toBe("Activity 2");
  expect(cards[2].title).toBe("Activity 3");
});
