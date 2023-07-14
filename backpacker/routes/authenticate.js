import express from "express"
import { userlogin, userlogout, userSignup } from '../datavault/auth.js'
const auth = express.Router()

// let email = "hi@123.com"
// let password = "123456"

auth.post('/login', async (req, res) => {

    // console.log(req.body)

    let email = req.body.email
    let password = req.body.password


    try {
        const userdetails = await userlogin(email, password)
        res.send(JSON.stringify(userdetails))
        // console.log(userdetails)
        // res.send("hey there user logged in")
    }
    catch (err) {
        // console.log("got out of try block : ", err)
        res.status(500)
        res.send({"msg" : err})
    }


})

auth.post('/signup', async (req, res) => {

    // console.log(req.body)

    let email = req.body.email
    let password = req.body.password

    try {
        const message = await userSignup(email, password)
        res.send(message)
        // res.send("user signedUp")
    }
    catch (err) {
        // console.log("got out of try block : ", err)
        res.send("Oops Some Error Occured...")
    }
})



auth.post('/logout', async (req, res) => {

    
    // console.log(req.body)
    // let email = req.body.email
    // let password = req.body.password

    try {
        const message = await userlogout()
        res.send(message)
    }
    catch (err) {
        res.send("Oops Some Error Occured...")
    }
})

export { auth }