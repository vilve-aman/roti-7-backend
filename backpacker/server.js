import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import express from 'express'
import upload from "express-fileupload"
import { auth } from './routes/authenticate.js'
import { hulkStorage } from './routes/imageuploader.js'
import { starkbase } from "./routes/tables.js"
import { mapbox } from './routes/mapbox.js'


// app initialization
const app = express()
const port = 4000

// middlewares
app.use(express.json());
app.use(upload())

// routes
app.use("/auth", auth)
app.use("/hulkstore", hulkStorage)
app.use('/starkbase', starkbase )
app.use('/mapbox', mapbox)


app.get('/', (req, res) => {
    console.log(req.body)
    res.send('Backpacker is running up here...')

})

app.listen(port,  () => {
    console.log(`Example app listening on port ${port}`)
})





