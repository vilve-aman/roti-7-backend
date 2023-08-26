import polyline from '@mapbox/polyline'


const processPolyline6 = (batchedDirections) => {

    // // returns an array of lat, lon pairs from polyline6 by passing a precision parameter
    // polyline.decode('cxl_cBqwvnS|Dy@ogFyxmAf`IsnA|CjFzCsHluD_k@hi@ljL', 6);

    // // returns a string-encoded polyline (from coordinate ordered lat,lng)
    // polyline.encode([[38.5, -120.2], [40.7, -120.95], [43.252, -126.453]], 6);

    let allPolyCoordinates = []
    // batchedDirections.polyline.forEach((e) => {
    // });

    for(var i=0; i<batchedDirections.polyline6.length; i++){
        let e = batchedDirections.polyline6[i]
        allPolyCoordinates.push(...polyline.decode(e,6))
    }
    console.log(allPolyCoordinates.length)

    batchedDirections.polyline6 = polyline.encode(allPolyCoordinates, 6)
    return batchedDirections
}


export { processPolyline6 }