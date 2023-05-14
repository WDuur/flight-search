<script setup lang="ts">
import Card from 'primevue/card'

defineProps({
  time: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="time-label">
    <div class="time-label__label">{{ label }}:</div>
    <div class="time-label__time">{{ time }} hr</div>
  </div>
</template>

<style scoped lang="scss">
@import './../../../scss/colors';
.time-label {
  display: flex;
  flex-direction: column;
  &__label {
    font-size: small;
  }
}
</style>
