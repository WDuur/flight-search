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
    <label class="sr-only" for="firstName">Voornaam:</label>
    <InputText
      id="firstName"
      v-model="currentMember.firstName"
      placeholder="Voornaam"
    />
  </span>

  <span class="p-label">
    <label class="sr-only" for="lastName">Achternaam:</label>
    <InputText
      id="lastName"
      v-model="currentMember.lastName"
      placeholder="Achternaam"
    />
  </span>

  <span v-if="attendeeNumber === 0">
    <span class="p-label">
      <label class="sr-only" for="address">Adres:</label>
      <InputText
        id="address"
        v-model="currentMember.address"
        placeholder="Adres"
      />
    </span>

    <span class="p-label">
      <label class="sr-only" for="city">Plaats:</label>
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
