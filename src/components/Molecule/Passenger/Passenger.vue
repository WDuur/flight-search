<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Divider from 'primevue/divider'
import { usePassengers } from '@/composable/usePassengers'

const { tourGroup } = usePassengers()
const props = defineProps({
  attendeeNumber: {
    type: Number,
    default: 0,
  },
})

const currentMember = computed(() => {
  console.log('props.attendeeNumber', props.attendeeNumber)
  return tourGroup.member[props.attendeeNumber] || {}
})

const headerText = computed(() =>
  props.attendeeNumber === 0
    ? 'Aanvrager'
    : `Deelnemer ${props.attendeeNumber + 1}`
)
</script>

<template>
  <Divider />
  <h2>{{ headerText }}</h2>

  <span class="p-label">
    <label for="firstName">Voornaam:</label>
    <InputText id="firstName" v-model="currentMember.firstName" />
  </span>

  <span class="p-label">
    <label for="lastName">Achternaam:</label>
    <InputText id="lastName" v-model="currentMember.lastName" />
  </span>

  <span v-if="attendeeNumber === 0">
    <span class="p-label">
      <label for="lastName">Adres:</label>
      <InputText id="lastName" v-model="currentMember.address" />
    </span>

    <span class="p-label">
      <label for="lastName">Plaats:</label>
      <InputText id="lastName" v-model="currentMember.city" />
    </span>
  </span>

  <span class="p-label">
    <label for="lastName">Pasport of ID nummer</label>
    <InputText id="lastName" v-model="currentMember.code" />
  </span>
</template>

<style scoped lang="scss">
.p-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 65%;
  }
}
</style>
