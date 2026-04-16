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


// add popup to each feature
function popUPinfo(feature, layer) {
  layer.bindPopup(
    feature.properties.NIMI + "<br>" +  feature.properties.TOWERS
);
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


// point circle function
function createCircle(feature, latlng) {
    let options = {
        radius: 5,
        fillColor: 'red',
        fillOpacity: 0.5,
        color: 'red',
        weight: 1,
        opacity: 1,
    }
    return L.circleMarker(latlng, options)
}


// add geoJSON point layer
async function addCelltowersGeoJson(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const markers = L.geoJson(data, {
            pointToLayer: createCircle,
            onEachFeature: popUPinfo
        });
        
        const clusters = L.markerClusterGroup()
        clusters.addLayer(markers);
        clusters.addTo(map);
    } catch (error) {
        console.error("Celltowers loading error", error);
    }
}


addCelltowersGeoJson('js/data/tartu_city_celltowers_edu.geojson');

