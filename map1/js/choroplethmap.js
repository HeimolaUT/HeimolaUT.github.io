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
  L.choropleth(data, {
    valueProperty: 'OBJECTID',
    scale: ['#ffffff', '#ff9900'],
    steps: 5,
    mode: 'q', //q is for quantile and e is for equidistant
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8,
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup('Value: ' + feature.properties.OBJECTID)
    },

  }).addTo(map)
}

// run
addGeoJson('js/data/tartu_city_districts_edu.geojson');
