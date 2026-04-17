let map = L.map('map').setView([58.373523, 26.716045], 12)
const osm =L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OpenSteetMap contributors',
})

osm.addTo(map)



//default map settings
function defaultMapSettings() {
    map.setView([58.373523, 26.716045], 12)
}


function heatDataConvert(feature) {
  return [
    feature.geometry.coordinates[1],
    feature.geometry.coordinates[0],
    feature.properties.area,
  ]
}


// add geoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url)
  const data = await response.json()
  const heatData = data.features.map(heatDataConvert)
  const heatMap = L.heatLayer(heatData, { radius: 10, blur: 30 })
  heatMap.addTo(map)
}

// run
addGeoJson('js/data/tartu_city_celltowers_edu.geojson');
