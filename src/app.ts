import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import siteUtils from './utils/site.utils';
import client from "prom-client";
import appModule from './app.module';

const app = express()

siteUtils(app)
appModule(app)

app.get('/matrics', async (_req: Request, res: Response, _next: NextFunction) => {
     res.set('Content-Type', client.register.contentType);
     res.end(await client.register.metrics());
})
app.use(async (_req: Request, res: Response) => {
     res.status(404).send('This is not the API route you are looking for')
})
app.listen(process.env.PORT as string || 8000, () => {
     console.log("🌐 Server is running on:", `http://localhost:${process.env.PORT as string || 8000}`)
})
