<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import Timeline from 'primevue/timeline'
import FlightSearch from './components/Molecule/FlightSearch/FlightSearch.vue'
import FlightResults from './components/Molecule/FlightResults/FlightResults.vue'
import FlightPassengers from './components/Molecule/FlightPassengers/FlightPassengers.vue'

import type { TimelineItem } from '@/interface/types'
import { useTimeline } from '@/composable/useTimeline'
import { useFlightSearch } from '@/composable/useFlightSearch'

const { state } = useFlightSearch()
const { timeline } = useTimeline()

const selectItem = (item: TimelineItem) => {
  console.log(item.status)
}
</script>

<template>
  <div class="flight-container">
    <div class="flight-container__timeline">
      <Timeline :value="timeline" align="right" class="w-full md:w-20rem">
        <template #marker="slotProps">
          <span
            class="marker"
            :class="{ selected: slotProps.item.isSelected }"
          />
        </template>
        <template #content="slotProps">
          <span
            class="flight-container__timeline--label"
            :class="{ selected: slotProps.item.isSelected }"
            @click="selectItem(slotProps.item)"
            >{{ slotProps.item.status }}</span
          >
        </template>
      </Timeline>
    </div>
    <div class="flight-container__flights">
      {{ state }}
      <FlightSearch />
      <FlightResults />
      <FlightPassengers />
    </div>
  </div>
</template>

<style scoped lang="scss">
.flight-container {
  display: flex;
  grid-gap: 10px;
  &__timeline {
    min-width: 130px;
  }
  &__flights {
    min-width: 50vw;
  }
  &:deep(.p-timeline-event-opposite) {
    display: none;
  }
  &:deep(.p-timeline-event-separator) {
    margin-right: 40px;
  }
  .p-component {
    cursor: pointer;
  }
  &:deep(.p-timeline-event-marker) {
    background: var(--steelBlue);
  }
  .marker {
    border: 2px solid var(--steelBlue);
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    &.selected {
      background: var(--steelBlue);
    }
  }
}
</style>
