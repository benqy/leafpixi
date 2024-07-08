<template>
  <div class="content">
    <div id="map"></div>
  </div>
</template>
<script setup lang="ts">
import { Map, TileLayer } from 'leaflet'
import { onMounted } from 'vue'

const initMap = () => {
  const map = new Map('map', {
    attributionControl: false
  }).setView([51.505, -0.09], 13)
  new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map)
  return map
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
