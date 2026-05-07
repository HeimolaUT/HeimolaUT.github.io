import { pointsCollection } from "../js/points.js"

function turfFunctions(map) {
    
    //alert("my fun turf project!")
    console.log("my fun turf project on console")
    // define point coordinates
    const pointCoords = [26.71552, 58.37393]
    // define a point
    const myPoint = turf.point(pointCoords)
    // convert the point to geoJSON object
    const geoJSON_point = L.geoJSON(myPoint)
    // add the geoJSON object to the map
    geoJSON_point.addTo(map)

    // define line coordinates
    const lineCoords = [
    [26.71379, 58.37476],
    [26.71554, 58.37349],
    [26.71553, 58.37434],
    [26.71630, 58.37378],
    [26.71473, 58.37407]
    ]
    // define the line object
    const myLine = turf.lineString(lineCoords)
    const geoJSON_line = L.geoJSON(myLine)
    geoJSON_line.addTo(map)


    // define polygon coordinates
    const polygonCoords = [[
    [26.71355, 58.37468],
    [26.71404, 58.37430],
    [26.71433, 58.37429],
    [26.71550, 58.37345],
    [26.71660, 58.37388],
    [26.71615, 58.37420],
    [26.71589, 58.37431],
    [26.71552, 58.37461],
    [26.71521, 58.37496],
    [26.71480, 58.37481],
    [26.71449, 58.37502],
    [26.71355, 58.37468]
    ]]
    // define polygon object
    const myPolygon = turf.polygon(polygonCoords)
    const geoJSON_poly = L.geoJSON(myPolygon)
    geoJSON_poly.addTo(map)

    const coordsPond = [26.71489, 58.37439]
    const pointPond = turf.point(coordsPond)
    const geoJSON_pond = L.geoJSON(pointPond)
    geoJSON_pond.addTo(map)

    const options = { units: 'meters' }

    // replace point1 and point2 with the actual names you used to define your Turf points
    const distance = turf.distance(myPoint, pointPond, options)
    console.log(`distance is ${distance} meters`)
    // round the distance to nearest integer
    const distanceRounded = Math.round(distance)
    // distance is first multiplied by 100, then rounded and divided by 100 to keep two digits after the decimal point
    const roundedToTwoDecimals = Math.round(distance*100)/100
    // compare the results
    console.log(`rounded to nearest integer: ${distanceRounded}`)
    console.log(`rounded to two decimal points: ${roundedToTwoDecimals}`)

    const areaMeasurement = turf.area(myPolygon)
    const areaRounded = Math.round(areaMeasurement)
    console.log(`Area without rounding: ${areaMeasurement}`)
    console.log(`Rounded area is ${areaRounded} square meters`)

    //statue buffer
    const statueBuffer = turf.buffer(myPoint, 20, {units: 'meters'})
    L.geoJSON(statueBuffer).addTo(map)
    //line buffer
    const lineBuffer = turf.buffer(myLine, 20, options)
    L.geoJSON(lineBuffer).addTo(map)
    //polygon buffer
    const polygonBuffer = turf.buffer(myPolygon, 20, options)
    L.geoJSON(polygonBuffer).addTo(map)

    // negative buffer
    const parkBufferNegative = turf.buffer(myPolygon, -10, {units: 'meters'})
    //L.geoJSON(parkBufferNegative).addTo(map)

    // one more point
    const pointCoords2 = [26.71752, 58.37493]
    // define a point
    const myPoint2 = turf.point(pointCoords2)
    // convert the point to geoJSON object
    const geoJSON_point2 = L.geoJSON(myPoint2)
    // add the geoJSON object to the map
    geoJSON_point2.addTo(map)

    // create a feature collection
    const features = turf.featureCollection([myPoint, myPoint2, myLine, myPolygon])
    // create the envelope
    const enveloped = turf.envelope(features)
    // add to map
    L.geoJSON(enveloped).addTo(map)

    //ploting the points.js points
    const points = turf.points(pointsCollection)
    //L.geoJSON(points).addTo(map)
    const pointsWithinBorders = turf.pointsWithinPolygon(points, myPolygon)
    // this should log an object that contains all the features within the park polygon
    console.log(pointsWithinBorders)
    L.geoJSON(pointsWithinBorders).addTo(map)



    map.on('click', function(event) {
        console.log(`[${event.latlng.lng}, ${event.latlng.lat}]`)
    // define coordinates of the point
        let pointCoords = [event.latlng.lng, event.latlng.lat]
    // create a turf point
        let turfPoint = turf.point(pointCoords)
    // convert the point to GeoJSON format and add it to the map
        L.geoJSON(turfPoint).addTo(map)
    })

}

export {turfFunctions}