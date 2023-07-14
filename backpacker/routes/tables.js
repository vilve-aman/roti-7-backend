import express from "express"
import {addDocument, updateDocument, getDocument, getAllDocuments, getDocumentCount} from "../datavault/starkdb.js"

const starkbase = express.Router()


starkbase.post('/getdoc', async (req, res) => {

    console.log(req.body)
    try {
        const collectionId = req.body.collId
        const docId = req.body.docId
        const output = await getDocument(collectionId, docId)
        // console.log(output)
        res.send(output)
    }
    catch(err){
        // console.log("some error")
        res.send(err)
    }
    
})

starkbase.post('/setdoc', async (req, res) => {
    console.log(req.body)
    try {
        const collectionId = req.body.collId
        const docId = req.body.docId
        const obj = req.body.obj
        const output = await addDocument(collectionId, docId, obj)

        res.send(output)
    }
    catch(err){
        // console.log("some error")
        res.send(err)
    }
})


starkbase.post('/updatedoc', async (req, res) => {
    console.log(req.body)
    try {
        const collectionId = req.body.collId
        const docId = req.body.docId
        const obj = req.body.obj
        const output = await updateDocument(collectionId, docId, obj)

        res.send(output)
    }
    catch(err){
        // console.log("some error")
        res.send(err)
    }
})


starkbase.post('/getAll', async (req, res) => {
    console.log(req.body)
    try {
        const collectionId = req.body.collId
        const output = await getAllDocuments(collectionId)

        res.send({"collection" : output})
    }
    catch(err){
        // console.log("some error")
        res.send(err)
    }
})



starkbase.post('/getCount', async (req, res) => {
    console.log(req.body)
    try {
        const collectionId = req.body.collId
        const output = await getDocumentCount(collectionId)

        res.send({"count" : output})
    }
    catch(err){
        // console.log("some error")
        res.send(err)
    }
})




export { starkbase }