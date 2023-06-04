<script setup lang="ts">
import { computed, ComputedRef } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import type { Flight } from '@/interface/types'

import TimeSheet from '@/components/Molecule/TimeSheet/TimeSheet.vue'
import { useFlightSearch } from '@/composable/useFlightSearch'
import { useTimeline } from '@/composable/useTimeline'

const { state, flightResult, flightRoute, originalFlightResult } =
  useFlightSearch()
const { selectTimeline } = useTimeline()

type showFlightResultType = ComputedRef<boolean>
type resultHeaderType = ComputedRef<string>

const departureDate = (date: string) => {
  const [year, month, day] = date.split('-')
  return `${day}-${month}-${year}`
}
const flightNumber = (iata: String, number: Number) => {
  let textNumber = number.toString()
  return iata + textNumber.padStart(4, '0')
}

const selectFlight = (selectedFlight: Number) => {
  flightResult.value = flightResult.value.filter(
    (flight: any) => flight.flightNumber === selectedFlight
  )
  state.value = 'selected'
  selectTimeline('passengers')
}

const resultHeader: resultHeaderType = computed(() =>
  state.value === 'selected' ? 'Geselecteerd:' : 'Voor u gevonden:'
)

const showFlightResult: showFlightResultType = computed(() => {
  return state.value === 'result' || state.value === 'selected'
})
</script>

<template>
  <div v-if="showFlightResult">
    <h2>{{ resultHeader }}</h2>
    <Card
      v-for="(flight, idx) in flightResult"
      :key="idx"
      class="flight-result"
    >
      <template #title>
        <span class="flight-result__location">
          <span
            v-text="flightNumber(flight.carrierCode.iata, flight.flightNumber)"
          />| {{ flightRoute.from
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
          v-if="state === 'result'"
          icon="pi pi-chevron-right"
          aria-label="select"
          :disabled="state !== 'result'"
          @click="selectFlight(flight.flightNumber)"
        />
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
@import '@/scss/colors';
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
    background: var(--black);
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
</style>
