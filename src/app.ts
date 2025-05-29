import 'dotenv/config'
import express from 'express'

const app = express()

app.listen(process.env.PORT as string, () => {
     console.log("🌐 Server is running on:", `http://localhost:${process.env.PORT as string || 8000}`)
})
