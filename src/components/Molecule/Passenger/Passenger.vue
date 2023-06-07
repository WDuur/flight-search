<script setup lang="ts">
import { computed } from 'vue'
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
  return tourGroup.member[props.attendeeNumber] || {}
})

const header = computed(() =>
  props.attendeeNumber === 0
    ? 'Aanvrager'
    : `Reisgenoot ${props.attendeeNumber}`
)
</script>

<template>
  <Divider />
  <h3>{{ header }}</h3>
  <span class="p-label">
    <label class="sr-only" for="firstName">Naam</label>
    <InputText
      id="firstName"
      v-model="currentMember.firstName"
      placeholder="Naam"
    />
  </span>

  <span v-if="attendeeNumber === 0">
    <span class="p-label">
      <label class="sr-only" for="address">Adres</label>
      <InputText
        id="address"
        v-model="currentMember.address"
        placeholder="Adres"
      />
    </span>

    <span class="p-label">
      <label class="sr-only" for="city">Plaats</label>
      <InputText id="city" v-model="currentMember.city" placeholder="Plaats" />
    </span>
  </span>

  <span class="p-label">
    <label class="sr-only" for="idnumber">Pasport of ID nummer:</label>
    <InputText
      id="idnumber"
      v-model="currentMember.code"
      placeholder="Pasport of ID nummer"
    />
  </span>
</template>

<style scoped lang="scss">
.p-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 100%;
  }
}
</style>
