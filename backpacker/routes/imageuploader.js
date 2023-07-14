import express from "express"
import fs from "fs"
import { adminUpload } from '../datavault/hulkStorage.js'

const hulkStorage = express.Router()


hulkStorage.post('/upload', async (req, res) => {

    // let img = fs.readFileSync("./routes/pho.webp")
    // console.log(img)

    // console.log(req.files.my_image.data , req.body.token)
    try{
               
        if(!(req.files.my_image.data && req.body.token ))    throw("bad request")
        
        // console.log(req.files)
        console.log(req.body)
        
        let img = req.files.my_image.data
        console.log(img)
        const output = await adminUpload(img)
        // console.log(output)
        res.status(200)
        res.send(output)
    }
    catch(err){
        res.status(400)
        res.send({"message" : err})
    }

    // res.send("ullu")



})

// routes/pho.webp
export { hulkStorage }