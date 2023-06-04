<script setup lang="ts">
import Card from 'primevue/card'
import { useFlightSearch } from '@/composable/useFlightSearch'
const { state } = useFlightSearch()
</script>

<template>
  <card v-if="state === 'passengers'">
    <template #title>
      <div class="flight-passenger__header">
        <h2>Boekings overzicht</h2>
      </div>
    </template>

    <template #content> </template>
  </card>
</template>

<style scoped lang="scss"></style>
