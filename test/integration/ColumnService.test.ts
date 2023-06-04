import { ColumnService } from "../../src/service/ColumnService";
import { ColumnRepositoryDatabase } from "../../src/infra/repository/ColumnRepositoryDatabase";
import { PgPromiseConnection } from "../../src/infra/database/PgPromiseConnection";
import { Column } from "../../src/domain/entity/Column";

test("should list columns", async () => {
  const conn = new PgPromiseConnection();
  const columnsRepository = new ColumnRepositoryDatabase(conn);
  const columnService = new ColumnService(columnsRepository);
  const columns = await columnService.getColumns(1);
  expect(columns).toHaveLength(3);
  expect(columns[0].name).toBe("To Do");
  expect(columns[1].name).toBe("Doing");
  expect(columns[2].name).toBe("Done");
  await conn.close();
});

test("should be able to create a column", async () => {
  const conn = new PgPromiseConnection();
  const columnsRepository = new ColumnRepositoryDatabase(conn);
  const columnService = new ColumnService(columnsRepository);
  const columnId = await columnService.saveColumn(
    new Column(1, 1, "To Do", true)
  );
  const column = await columnService.getColumn(columnId);
  expect(column.name).toBe("To Do");
  await columnService.deleteColumn(columnId);
  await conn.close();
});
