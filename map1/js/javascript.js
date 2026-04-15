let map = L.map('map').setView([58.373523, 26.716045], 12)
const osm =L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'OpenSteetMap contributors',
})

osm.addTo(map)


// add popup to each feature
function popUPinfo(feature, layer) {
  layer.bindPopup(feature.properties.NIMI)
}

// get colors from feature property

function getColor(property) {
    if (property > 500) {
        return '#1486ff';
    } else if (property > 200) {
        return '#469cf8';
    } else if (property > 100) {
        return '#76b8ff';
    } else if (property > 50) {
        return '#a1ceff';
    } else {
        return '#c2e0ff';
    }
}
// polygon style
function polygonStyle(feature) {
    return {
        fillColor: getColor(feature.properties.TOWERS),
        fillOpacity: 0.5,
        weight: 1,
        opacity: 1,
        color: 'grey', 
    }
}

// load GeoJSON
async function addDistrictsGeoJson(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        const polygons = L.geoJson(data, {
            onEachFeature: popUPinfo,
            style: polygonStyle,
        });

        polygons.addTo(map); 
    } catch (error) {
        console.error("Geojson loading error:", error);
    }
}

addDistrictsGeoJson('js/data/tartu_city_districts_edu.geojson');

