<template>
  <div class="content">
    <div id="map"></div>
  </div>
</template>
<script setup lang="ts">
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { onMounted } from 'vue'
import { Application, Graphics, Assets, Sprite } from 'pixi.js'

interface Marker {
  longitude: number
  latitude: number
}

class PixiOverlay {
  private map: maplibregl.Map
  private pixiApp: Application
  private markers: Marker[] = []

  constructor(map: maplibregl.Map) {
    this.map = map
    this.pixiApp = new Application()
    this.init()
  }

  async init() {
    await this.pixiApp.init({
      width: map.getCanvas().clientWidth,
      height: map.getCanvas().clientHeight
      // transparent: true,
      // autoDensity: true,
      // resolution: window.devicePixelRatio || 1
    })
    console.log(this.pixiApp)
    // document.body.appendChild(this.pixiApp.canvas);
    this.syncView()
    map.on('move', () => this.syncView())
    map.on('resize', () => this.onResize())
  }

  addMarker(marker: Marker) {
    this.markers.push(marker)
    this.renderMarkers()
  }

  private renderMarkers() {
    this.pixiApp.stage.removeChildren()
    console.log(this.markers)
    this.markers.forEach(async (marker) => {
      const position = this.map.project(new maplibregl.LngLat(marker.longitude, marker.latitude))
      const texture = await Assets.load('https://pixijs.com/assets/bunny.png')
      const bunny = new Sprite(texture)
      bunny.width = 20
      bunny.height = 20
      // bunny.anchor.set(0.5)
      bunny.on('added', () => {
        console.log('added')
      })
      bunny.x = position.x - this.pixiApp.screen.width / 2
      bunny.y = position.y - this.pixiApp.screen.height / 2
      // const graphics = new Graphics()
      // graphics.beginFill(0xff0000)
      // graphics.drawCircle(
      //   position.x - this.pixiApp.screen.width / 2,
      //   position.y - this.pixiApp.screen.height / 2,
      //   10
      // )
      // graphics.endFill()
      this.pixiApp.stage.addChild(bunny)
    })
  }

  private syncView() {
    const center = this.map.getCenter()
    const position = this.map.project(new maplibregl.LngLat(center.lng, center.lat))
    this.pixiApp.stage.position.set(
      this.pixiApp.screen.width / 2 - position.x,
      this.pixiApp.screen.height / 2 - position.y
    )
    this.pixiApp.stage.scale.set(Math.pow(2, this.map.getZoom() - 1))
    this.renderMarkers()
  }

  private onResize() {
    this.pixiApp.renderer.resize(
      this.map.getCanvas().clientWidth,
      this.map.getCanvas().clientHeight
    )
    this.syncView()
  }
}

let map: maplibregl.Map
const initMap = () => {
  map = new maplibregl.Map({
    container: 'map', // container id
    style: {
      version: 8,
      sources: {
        'raster-tiles': {
          type: 'raster',
          tiles: ['https://ue.17173cdn.com/a/terra/tiles/yysls/3000/{z}/{y}_{x}.png'],
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
  new maplibregl.Marker().setLngLat([lng, lat]).addTo(map)
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
  map.addControl(new maplibregl.FullscreenControl(), 'bottom-right')
  map.addControl(
    new maplibregl.NavigationControl({
      showCompass: false
    }),
    'bottom-right'
  )

  // const pixiOverlay = new PixiOverlay(map)
  // pixiOverlay.addMarker({ longitude: -0.7, latitude: 0.7 })
  map.on('load', async () => {
    const image = await map.loadImage('https://pixijs.com/assets/bunny.png')
    map.addImage('cat', image.data)
    const features: any = []
    for (let i = 0; i < 27000; i++) {
      const lng = Math.random() * -1.4
      const lat = Math.random() * 1.4
      features.push({
        properties: {
          title: 'Foo'
        },
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      })
    
    }
    map.addSource('point', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    })
    map.addLayer({
      id: 'point',
      type: 'symbol',
      source: 'point',
      layout: {
        'icon-image': 'cat',
        'icon-size': 1,
        'icon-allow-overlap': true, // 允许图标重叠
        'text-allow-overlap': true // 允许文本重叠
      },
      minzoom: 9,
      maxzoom: 14
    })
    map.on('click', 'point', (e) => {
      if (e.features && e.features.length > 0) {
        const geometry: any = e.features[0].geometry
        const coordinates: any = geometry.coordinates.slice()
        const feature = e.features[0]
        console.log(coordinates)
        // 在这里处理点击事件，例如显示一个弹窗
        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h3>${feature.properties.title}</h3><p>${coordinates}</p>`)
          .addTo(map)
      }
    })

    // 改善可访问性：当鼠标悬停在点上时，改变鼠标样式
    map.on('mouseenter', 'point', () => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', 'point', () => {
      map.getCanvas().style.cursor = ''
    })
  })
})
</script>
<style scoped>
#map,
.content {
  width: 100vw;
  height: 100vh;
}
</style>
