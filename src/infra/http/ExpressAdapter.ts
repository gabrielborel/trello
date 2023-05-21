import { Http } from "./Http";
import express, { Request, Response, Express } from "express";

type Methods = "get" | "post" | "delete" | "patch" | "put";

export class ExpressAdapter implements Http {
  app: Express;

  constructor() {
    this.app = express();
  }

  route(method: Methods, url: string, callback: Function): void {
    this.app[method](url, async (req: Request, res: Response) => {
      const out = await callback(req.params, req.body);
      res.json(out);
    });
  }

  listen(port: number): void {
    this.app.listen(port, () =>
      console.log(`server is running on port ${port}`)
    );
  }
}
