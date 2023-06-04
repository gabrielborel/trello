import { CardService } from "../../src/service/CardService";
import { CardRepositoryDatabase } from "../../src/infra/repository/CardRepositoryDatabase";
import { PgPromiseConnection } from "../../src/infra/database/PgPromiseConnection";
import { Card } from "../../src/domain/entity/Card";

describe("Card service", () => {
  test("should list cards", async () => {
    const conn = new PgPromiseConnection();
    const cardsRepository = new CardRepositoryDatabase(conn);
    const cardService = new CardService(cardsRepository);
    const cards = await cardService.getCards(1);
    expect(cards).toHaveLength(3);
    expect(cards[0].name).toBe("Activity 1");
    expect(cards[1].name).toBe("Activity 2");
    expect(cards[2].name).toBe("Activity 3");
    await conn.close();
  });

  test("should create a card", async () => {
    const conn = new PgPromiseConnection();
    const cardsRepository = new CardRepositoryDatabase(conn);
    const cardService = new CardService(cardsRepository);
    const cardId = await cardService.saveCard(new Card(1, 1, "Activity 4", 1));
    const card = await cardService.getCard(cardId);
    expect(card.name).toBe("Activity 4");
    await cardService.deleteCard(cardId);
    await conn.close();
  });

  test("should delete a card", async () => {
    const conn = new PgPromiseConnection();
    const cardsRepository = new CardRepositoryDatabase(conn);
    const cardService = new CardService(cardsRepository);
    const cardId = await cardService.saveCard(new Card(1, 1, "Activity 4", 1));
    await cardService.deleteCard(cardId);
    await expect(cardService.getCard(cardId)).rejects.toThrow();
    await conn.close();
  });

  test("should update a card", async () => {
    const conn = new PgPromiseConnection();
    const cardsRepository = new CardRepositoryDatabase(conn);
    const cardService = new CardService(cardsRepository);
    const cardId = await cardService.saveCard(new Card(1, 1, "Activity 4", 1));
    await cardService.updateCard(new Card(cardId, 1, "Activity 5", 1));
    const card = await cardService.getCard(cardId);
    expect(card.name).toBe("Activity 5");
    await cardService.deleteCard(cardId);
    await conn.close();
  });
});
