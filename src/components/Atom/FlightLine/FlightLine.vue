<script setup lang="ts">
import { computed } from 'vue'
import { calculateTimeInBetween } from '@/utils/TimeInBetween'
import type { TimeInBetween } from '@/interface/types'
import Timeline from 'primevue/timeline'

const props = defineProps({
  departure: {
    type: Object,
    default: {},
  },
  arrival: {
    type: Object,
    default: {},
  },
  stops: {
    type: Number,
    default: 0,
  },
})

const timeInBetween: TimeInBetween = calculateTimeInBetween(
  props.departure.passengerLocalTime,
  props.arrival.passengerLocalTime
)

const airports = (departure: string, arrival: string, stops: number) => {
  const airportArray = []

  airportArray.push({ label: departure, isSelected: true })
  for (let i = 0; i < stops; i++) {
    airportArray.push({ label: '', isSelected: false })
  }
  airportArray.push({ label: arrival, isSelected: true })

  return airportArray
}
// console.log('departure', props.departure)
const events = airports(
  props.departure.airport.iata,
  props.arrival.airport.iata,
  props.stops
)
const flightDuration = computed(() => {
  return `${timeInBetween.flightTime} uur`
})
// console.log(events)
</script>

<template>
  <div class="flight-line">
    <div class="flight-line__time">{{ flightDuration }}</div>
    <Timeline
      :value="events"
      layout="horizontal"
      align="top"
      class="flight-line__timeline"
    >
      <template #marker="slotProps">
        <span
          class="flight-line__timeline-marker"
          :class="{ selected: slotProps.item.isSelected }"
        />
      </template>

      <template #content="slotProps">
        {{ slotProps.item.label }}
      </template>
    </Timeline>
  </div>
</template>

<style scoped lang="scss">
@import '@/scss/colors';
.flight-line {
  font-size: small;
  &__time {
    text-align: center;
  }

  &__timeline {
    &:deep(.p-timeline-event) {
      min-height: initial;
      .p-timeline-event-separator {
        margin-right: 0px !important;
      }
      .p-timeline-event-content {
        padding: 5px 0 0 0;
        font-size: small;
        flex: 0;
      }
      .p-timeline-event {
        &-marker {
          margin-left: 5px;
          background: var(--darkSlateGray);
        }
      }
    }
    &-marker {
      border: 1px solid var(--steelBlue);
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
      margin-left: 5px;
      &.selected {
        background: var(--steelBlue);
      }
    }
  }
}
</style>
