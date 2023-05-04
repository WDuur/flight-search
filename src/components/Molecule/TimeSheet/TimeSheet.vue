<script setup lang="ts">
import Card from 'primevue/card'

defineProps({
    flight: {
    type: Object,
    required: true
  }
})

</script>

<template>
    <Card>
        <template #content class="time-sheet__card">
            <!-- <span>{{ flight.departure.passengerLocalTime }}</span> -->
            
            <span>{{ flight.departure.passengerLocalTime }}</span>
            <span class="pi pi-arrow-right icon"></span>
            <span>{{ flight.arrival.passengerLocalTime }}</span>

        </template>
    </Card>
</template>

<style scoped lang="scss">
.icon {
    font-size: 4em;
}
</style>