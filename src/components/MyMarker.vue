<!-- src/components/MyMarker.vue -->
<template>
    <h1>marker.vue</h1>
    <div>{{userLocation}}</div>
    <div>{{userGeolocation}}</div>
</template>
<script>
import { inject } from 'vue'

export default {
    setup() {
        const userLocation = inject('location', 'The Universe')
        const userGeolocation = inject('geolocation')
        const updateUserLocation = inject('updateLocation')

        return {
            userLocation,
            userGeolocation,
            updateUserLocation,
        }
    },
}
</script>