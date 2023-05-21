import { ColumnService } from "../../src/service/ColumnService";
import { ColumnRepositoryDatabase } from "../../src/infra/repository/ColumnRepositoryDatabase";
import { PgPromiseConnection } from "../../src/infra/database/PgPromiseConnection";

test("should list columns", async () => {
  const conn = new PgPromiseConnection();
  const columnsRepository = new ColumnRepositoryDatabase(conn);
  const columnService = new ColumnService(columnsRepository);
  const columns = await columnService.getColumns(1);
  expect(columns).toHaveLength(3);
  expect(columns[0].name).toBe("To Do");
  expect(columns[1].name).toBe("Doing");
  expect(columns[2].name).toBe("Done");
});
