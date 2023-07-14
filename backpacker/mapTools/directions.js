import fetch from 'node-fetch';


const profile = 'mapbox/driving'



const _directionsV5 = async (coordinates) => {
    const accessToken = process.env.ACCESS_TOKEN
    const url = `https://api.mapbox.com/directions/v5/${profile}/${coordinates}?overview=full&geometries=polyline6&access_token=${accessToken}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json();

    // console.log(data.routes[0].geometry)
    return ({
        'waypoints': data.waypoints,
        'code': data.code,
        'uuid': data.uuid,
        'polyline6': data.routes[0].geometry,
    })

}



export { _directionsV5 }