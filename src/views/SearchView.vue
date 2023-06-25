<script setup lang="ts">
import FlightSearch from '@/components/Organism/FlightSearch/FlightSearch.vue'
import FlightResults from '@/components/Organism/FlightResults/FlightResults.vue'
import FlightPassengers from '@/components/Organism/FlightPassengers/FlightPassengers.vue'
import FlightOverView from '@/components/Organism/FlightOverview/FlightOverView.vue'
</script>

<template>
  <FlightSearch />
  <FlightResults />
  <FlightPassengers />
  <FlightOverView />
</template>
