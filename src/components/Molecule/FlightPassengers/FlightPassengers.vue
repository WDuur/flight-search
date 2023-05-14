<script setup lang="ts">
import { ref } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Passenger from '@/components/Molecule/Passenger/Passenger.vue'
import { useFlightSearch } from '@/composable/useFlightSearch'
import { usePassengers } from '@/composable/usePassengers'

const { selected } = useFlightSearch()
const { attendees, tourGroup, applicantData } = usePassengers()

const groupSize = ref<number>(0)

const submitApplicant = () => {
  attendees.value = groupSize.value
  applicantData()
  console.log('save', tourGroup)
}
const submitAttendees = () => {
  console.log('save', tourGroup)
}
</script>

<template>
  <div v-if="selected === 'selected'" class="passengers">
    <h2>Passagiers</h2>

    <form class="search-form" @submit.prevent="submitApplicant">
      <div class="flex align-items-center search-form__wrapper">
        <Passenger :attendeeNumber="0" />
        <span class="p-label">
          <label for="firstName">Email aanvrager:</label>
          <InputText id="firstName" v-model="tourGroup.email" />
        </span>

        <span class="p-label">
          <label for="firstName">Telefoon aanvrager:</label>
          <InputText id="firstName" v-model="tourGroup.phoneNumber" />
        </span>

        <span class="p-label">
          <label for="selectData" class="ml-2">Aantal personen: </label>
          <InputNumber
            v-model="groupSize"
            inputId="attendees"
            mode="decimal"
            showButtons
            :min="0"
            :max="10"
            @change="submitApplicant()"
          />
        </span>
        <Button type="submit" icon="pi pi-chevron-right" aria-label="select" />
      </div>
    </form>

    <form class="search-form" @submit.prevent="submitAttendees">
      <div v-for="index in attendees" :key="index">
        <Passenger :attendeeNumber="index" />
      </div>
      <Button type="submit" icon="pi pi-chevron-right" aria-label="select" />
    </form>
  </div>
</template>

<style scoped lang="scss">
button {
  margin-left: 10px;
}
.p-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .p-inputnumber {
    width: 65%;
  }
  input {
    width: 65%;
  }
}
</style>
