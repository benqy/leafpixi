<template>
  <div class="content">
    <div id="map"></div>
  </div>
</template>
<script setup lang="ts">
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { onMounted } from 'vue'
let map: maplibregl.Map
const initMap = () => {
  map = new maplibregl.Map({
    container: 'map', // container id
    style: {
      version: 8,
      sources: {
        'raster-tiles': {
          type: 'raster',
          tiles: ['https://xxxxxx/{z}/{y}_{x}.png'],
          bounds: [
            -1.4,
            0, // Southwest coordinates
            0,
            1.4 // Northeast coordinates
          ]
        }
      },
      layers: [
        {
          id: 'simple-tiles',
          type: 'raster',
          source: 'raster-tiles'
        }
      ]
    },
    bounds: [
      -1.4,
      0, // Southwest coordinates
      0,
      1.4 // Northeast coordinates
    ],
    attributionControl: false,
    minZoom: 9,
    maxZoom: 13,
    center: [-0.7, 0.7], // starting position
    zoom: 9 // starting zoom
  })
  // map.on('load', () => {
  //   map.fitBounds([
  //     [-1.4, 0], // Southwest coordinates
  //     [0, 1.4] // Northeast coordinates
  //   ])
  // })
  // map.on('click', (e) => {
  //   console.log(e.lngLat)
  // })
  // map.on('zoom', () => {
  //   console.log(map.getZoom())
  //   // if (map.getZoom() > map.getMaxZoom()) {
  //   //   map.zoomTo(map.getMaxZoom())
  //   // }
  // })
  // map.on('contextmenu', (e) => {
  //   console.log(e.lngLat)
  // })
}

const addMarkers = () => {
  const lng = Math.random() * -1.4
  const lat = Math.random() * 1.4
  new maplibregl.Marker()
    .setLngLat([lng, lat])
    .addTo(map)
  // const marker = {
  //   type: 'Feature',
  //   properties: {
  //     message: 'Foo',
  //     iconSize: [60, 60]
  //   },
  //   geometry: {
  //     type: 'Point',
  //     coordinates: [-0.7, 0.7]
  //   }
  // }
  // const el = document.createElement('div')
  // el.className = 'marker'
  // el.style.backgroundImage = `url(https://picsum.photos/${marker.properties.iconSize.join('/')}/)`
  // el.style.width = `${marker.properties.iconSize[0]}px`
  // el.style.height = `${marker.properties.iconSize[1]}px`

  // el.addEventListener('click', () => {
  //   window.alert(marker.properties.message)
  // })

  // // add marker to map
  // new maplibregl.Marker({ element: el }).setLngLat([-0.7, 0.7]).addTo(map)
}

onMounted(() => {
  initMap()
  for(let i =0;i<2000;i++){
    addMarkers()
  }
})
</script>
<style scoped>
#map,
.content {
  width: 100vw;
  height: 100vh;
}
</style>
