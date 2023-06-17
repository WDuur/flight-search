<script setup lang="ts">
import Timeline from 'primevue/timeline'
import type { TimelineItem } from '@/interface/types'

import { useTimeline } from '@/composable/useTimeline'
import { useFlightSearch } from '@/composable/useFlightSearch'

const { state } = useFlightSearch()
const { timeline } = useTimeline()
/**
 * Executes the selectItem function and logs the status of the given TimelineItem.
 *
 * @param {TimelineItem} item - The TimelineItem to log the status of.
 */
const selectItem = (item: TimelineItem) => {
  console.log(item.status)
}
</script>

<template>
  <div class="flight-container__timeline">
    <Timeline :value="timeline" align="right" class="w-full md:w-20rem">
      <template #marker="slotProps">
        <span class="marker" :class="{ selected: slotProps.item.isSelected }" />
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
</template>

<style scoped lang="scss">
.flight-container {
  display: flex;
  grid-gap: 10px;
  &__timeline {
    min-width: 130px;
  }

  .p-component {
    cursor: pointer;
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
