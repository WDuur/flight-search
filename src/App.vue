<script setup lang="ts">
import MainNavgation from '@/components/Molecule/MainNavigation/MainNavigation.vue'
import FlightSearch from './components/Organism/FlightSearch/FlightSearch.vue'
import FlightResults from './components/Organism/FlightResults/FlightResults.vue'
import FlightPassengers from './components/Organism/FlightPassengers/FlightPassengers.vue'
import FlightOverView from './components/Organism/FlightOverview/FlightOverView.vue'
</script>

<template>
  <div class="flight-container">
    <MainNavgation />

    <div class="flight-container__flights">
      <FlightSearch />
      <FlightResults />
      <FlightPassengers />
      <FlightOverView />
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

  &:deep(.p-timeline-event-marker) {
    background: var(--steelBlue);
  }
}
</style>
