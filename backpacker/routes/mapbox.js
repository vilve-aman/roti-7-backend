import express from "express";
import { _directionsV5 } from '../mapTools/directions.js'
import { _submit, _solveOut, _retriveRoute } from "../mapTools/optimization.js"

const mapbox = express.Router()


mapbox.post('/optimization', async (req, res) => {

    // let reqObj = {
    //     "version": 1,
    //     "locations": [  "an array that contains all the locations in th problem "  ],
    //     "vehicles":  [  "an array that contains all the vehicles available "      ],
    //     "shipments": [  "an array that constains the stops"   ]
    // }


    // const submissionId = "72118dd7-69ce-46fb-bb30-47eaba48f39a"
    // console.log(submissionId)

    // console.log("req Body : ", req.body)
    console.log("Submitting Problem...")
    const submissionId = await _submit(req.body)
    console.log("Checking solution...")
    const solved = await _solveOut(submissionId)

    if (solved) {
        console.log("retrieving solution...")

        const route = await _retriveRoute(submissionId)
        // console.log(route)
        res.status(200)
        res.send(route)
    }
    else {
        console.log("solution not found...")

        res.status(404)
        res.send({ 'message': 'Opps Your Request seems Complex, currently it cant be solved' })
    }

})




mapbox.post('/direction', async (req, res) => {

    try{

        const coordinates = req.body.coords 
        const directions = await _directionsV5(coordinates)
        
        res.send(directions)
    }
    catch(err){
        res.status(500)
        res.send({'Error Message' : 'Opps something went wrong check Your payload'})
    }
})


export { mapbox }
