<script setup lang="ts">
import TimeLabel from '../../Atom/TimeLabel/TimeLabel.vue'
import FlightLine from '../../Atom/FlightLine/FlightLine.vue'

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
    <FlightLine
      :departure="flight.departure"
      :arrival="flight.arrival"
      :stops="flight.segmentInfo.numberOfStops"
    />
    <TimeLabel
      :label="`aankomst  (${flight.arrival.airport.iata})`"
      :time="flight.arrival.passengerLocalTime"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/scss/colors';
.time-sheet {
  &__card {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0rem 1rem;
    font-size: 1.5rem;
    gap: 40px;
  }
}
.icon {
  font-size: 1.5em;
  color: var(--light-yellow);
}
</style>
