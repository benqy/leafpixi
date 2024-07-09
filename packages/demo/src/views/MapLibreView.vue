<template>
  <div class="content">
    <div id="map"></div>
  </div>
</template>
<script setup lang="ts">
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { onMounted } from 'vue'
const initMap = () => {
  const map = new maplibregl.Map({
    container: 'map', // container id
    style: {
      version: 8,
      sources: {
        'raster-tiles': {
          type: 'raster',
          tiles: ['https://xxxxxxx/{z}/{y}_{x}.png'],
          bounds: [
            -1.4,
            0, // Southwest coordinates
            0,
            1.4 // Northeast coordinates
          ],
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
  map.on('load', () => {
    map.fitBounds([
      [-1.4, 0], // Southwest coordinates
      [0, 1.4] // Northeast coordinates
    ])
  })
  map.on('click', (e) => {
    console.log(e.lngLat)
  })
  map.on('zoom', () => {
    console.log(map.getZoom())
    // if (map.getZoom() > map.getMaxZoom()) {
    //   map.zoomTo(map.getMaxZoom())
    // }
  })
  map.on('contextmenu', (e) => {
    console.log(e.lngLat)
  })
}

onMounted(() => {
  initMap()
})
</script>
<style scoped>
#map,
.content {
  width: 100vw;
  height: 100vh;
}
</style>
