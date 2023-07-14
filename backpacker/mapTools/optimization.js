import fetch from 'node-fetch';
const accessToken = process.env.ACCESS_TOKEN



const _submit = async (payload) => {
    const accessToken = process.env.ACCESS_TOKEN

    const url = `https://api.mapbox.com/optimized-trips/v2?access_token=${accessToken}`
    console.log(url)
 
    const options = {
        method: 'post',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    }
    const response = await fetch(url, options);
    const data = await response.json();

    // console.log(data);
    return data.id 
}


const _reqStatus = async (payload) => {
    const accessToken = process.env.ACCESS_TOKEN

    const url = `https://api.mapbox.com/optimized-trips/v2/${payload}?access_token=${accessToken}`

    const options = { method: 'get' }
    const response = await fetch(url, options);

    return response.status
}


const _retriveRoute = async (payload) => {
    const accessToken = process.env.ACCESS_TOKEN

    const url = `https://api.mapbox.com/optimized-trips/v2/${payload}?access_token=${accessToken}`
    const options = { method: 'get' }
    const response = await fetch(url, options);
    const data = await response.json();

    // console.log(data);
    return data

}

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms, `timer for ${ms} ms completed`));
}

const _solveOut = async (submissionId) => {
    let solved = false
    let t=20;
    while(!(solved || t==0)){
        console.log(await sleep(1500))
        let routeStatus = await _reqStatus(submissionId)
        solved = routeStatus == 200 ? true : false ; 
        t--;
    }

    return solved ? true : false 
}


export { _submit, _solveOut, _retriveRoute }