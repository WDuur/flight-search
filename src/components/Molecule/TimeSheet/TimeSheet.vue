<script setup lang="ts">
import Card from 'primevue/card'
import TimeLabel from '../../Atom/TimeLabel/TimeLabel.vue'

defineProps({
  flight: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="time-sheet__card">
    <TimeLabel
      :label="`vertrek (${flight.departure.airport.iata})`"
      :time="flight.departure.passengerLocalTime"
    />
    <span class="pi pi-arrow-right icon"></span>
    <TimeLabel
      :label="`aankomst  (${flight.arrival.airport.iata})`"
      :time="flight.arrival.passengerLocalTime"
    />
  </div>
</template>

<style scoped lang="scss">
@import './../../../scss/colors';
.time-sheet {
  &__card {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
  }
}
.icon {
  font-size: 1.5em;
  color: $light-yellow;
}
</style>
