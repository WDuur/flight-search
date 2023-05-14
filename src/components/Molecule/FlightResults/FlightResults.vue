<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import type { Flight } from '@/interface/types'

import TimeSheet from '@/components/Molecule/TimeSheet/TimeSheet.vue'
import { useFlightSearch } from '@/composable/useFlightSearch'
import { useTimeline } from '@/composable/useTimeline'

const { state, flightResult, flightRoute, selected } = useFlightSearch()
const { selectTimeline } = useTimeline()

const originalFlightResult = ref<Flight[]>([])

const departureDate = (date: string) => {
  const [year, month, day] = date.split('-')
  return `${day}-${month}-${year}`
}
const flightNumber = (iata: String, number: Number) => {
  return iata + number.toString().padStart(4, '0')
}
const selectFlight = (selectedFlight: Number) => {
  originalFlightResult.value = flightResult.value
  flightResult.value = flightResult.value.filter(
    (flight: any) => flight.flightNumber === selectedFlight
  )
  selected.value = 'selected'
  selectTimeline(1)
}
const restoreFlightResult = () => {
  flightResult.value = originalFlightResult.value
  selected.value = 'idle'
  selectTimeline(1)
}

const hasFlightSelected = computed(() => selected.value === 'selected')
</script>

<template>
  <div v-if="state === 'result'">
    <h2 v-if="!hasFlightSelected">Voor u gevonden:</h2>
    <h2 v-else>Geselecteerd:</h2>
    <Card
      v-for="(flight, idx) in flightResult"
      :key="idx"
      class="flight-result"
    >
      <template #title>
        <span class="flight-result__location">
          <span
            v-text="flightNumber(flight.carrierCode.iata, flight.flightNumber)"
          />
          |
          {{ flightRoute.from
          }}<sub class="code">({{ flight.departure.airport.iata }})</sub> -
          {{ flightRoute.to }}
          <sub class="code">({{ flight.arrival.airport.iata }})</sub>
        </span>
        <span class="flight-result__date">
          <sub class="code">{{ departureDate(flight.departure.date) }}</sub>
        </span>
      </template>
      <template #content>
        <TimeSheet :flight="flight" />
        <Button
          v-if="!hasFlightSelected"
          icon="pi pi-chevron-right"
          aria-label="select"
          @click="selectFlight(flight.flightNumber)"
        />
      </template>
    </Card>
    <a
      href="#"
      v-if="selected === 'selected'"
      class="restore-search"
      @click="restoreFlightResult()"
    >
      reset selectie
    </a>
  </div>
</template>

<style scoped lang="scss">
@import '../../../scss/colors';
sub {
  vertical-align: middle;
  font-size: small;
}
.flight-result {
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
  opacity: 1;
  &:deep(.p-card-body) {
    padding: 0;
  }
  &:deep(.p-card-title) {
    background: $black;
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 3px 10px;
  }
  &:deep(.p-card-content) {
    display: flex;
    justify-content: space-between;
    padding-right: 1rem;
  }
}
.restore-search {
  cursor: pointer;
}
</style>
