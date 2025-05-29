import 'dotenv/config'
import express from 'express'
import siteUtils from './utils/site.utils';


const app = express()
siteUtils(app)

app.listen(process.env.PORT as string, () => {
     console.log("🌐 Server is running on:", `http://localhost:${process.env.PORT as string || 8000}`)
})
