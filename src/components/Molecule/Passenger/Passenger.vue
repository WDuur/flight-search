<script setup lang="ts">
import { computed } from 'vue'
import { z } from 'zod'
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

const createValidationSchema = () => {
  return z.object({
    firstName: z.string().min(3, { message: 'Naam is verplicht' }),
    address: z.string().nonempty('Adres is verplicht'),
    city: z.string().nonempty('Plaats is verplicht'),
    code: z.string().nonempty('Pasport of ID nummer is verplicht'),
  })
}

const validationErrors = computed(() => {
  try {
    validationSchema.parse({
      firstName: currentMember.value.firstName,
      address: currentMember.value.address,
      city: currentMember.value.city,
      code: currentMember.value.code,
    })
    return {}
  } catch (error: any) {
    return error.formErrors.fieldErrors
  }
})

const validationSchema = createValidationSchema()
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
    <small v-if="validationErrors.firstName" class="p-error" id="text-error">{{
      validationErrors.firstName[0]
    }}</small>
  </span>

  <span v-if="attendeeNumber === 0">
    <span class="p-label">
      <label class="sr-only" for="address">Adres</label>
      <InputText
        id="address"
        v-model="currentMember.address"
        placeholder="Adres"
      />
      <small v-if="validationErrors.address" class="p-error" id="text-error">{{
        validationErrors.address[0]
      }}</small>
    </span>

    <span class="p-label">
      <label class="sr-only" for="city">Plaats</label>
      <InputText id="city" v-model="currentMember.city" placeholder="Plaats" />
    </span>
    <small v-if="validationErrors.city" class="p-error" id="text-error">{{
      validationErrors.city[0]
    }}</small>
  </span>

  <span class="p-label">
    <label class="sr-only" for="idnumber">Pasport of ID nummer:</label>
    <InputText
      id="idnumber"
      v-model="currentMember.code"
      placeholder="Pasport of ID nummer"
    />
    <small v-if="validationErrors.code" class="p-error" id="text-error">{{
      validationErrors.code[0]
    }}</small>
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
