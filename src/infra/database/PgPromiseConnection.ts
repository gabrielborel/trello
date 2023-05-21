import pgPromise from "pg-promise";
import { Connection } from "./Connection";

export class PgPromiseConnection implements Connection {
  connection: any;

  constructor() {
    this.connection = pgPromise()(
      "postgres://docker:docker@localhost:5432/trello"
    );
  }

  async query(query: string, params?: any): Promise<any> {
    return this.connection.query(query, params);
  }

  async close(): Promise<void> {
    return await this.connection.$pool.end();
  }
}
