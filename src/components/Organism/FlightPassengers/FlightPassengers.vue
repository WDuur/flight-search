<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Passenger from '@/components/Molecule/Passenger/Passenger.vue'
import { useFlightSearch } from '@/composable/useFlightSearch'
import { usePassengers } from '@/composable/usePassengers'
import { useTimeline } from '@/composable/useTimeline'

const { state, flightResult, originalFlightResult } = useFlightSearch()
const { attendees, tourGroup, applicantData } = usePassengers()
const { selectTimeline } = useTimeline()

const groupSize = ref<number>(0)

const submitApplicant = () => {
  state.value = 'passengers'
  console.log('save', tourGroup)
}

const attendeesSize = () => {
  attendees.value = groupSize.value
  applicantData()
}

const restoreFlightResult = () => {
  flightResult.value = originalFlightResult.value
  state.value = 'result'
  selectTimeline('passengers')
}
</script>

<template>
  <div v-if="state === 'selected'" class="passengers">
    <card>
      <template #title>
        <div class="flight-passenger__header">
          <h2>Passagiers</h2>
          <a
            href="#"
            v-if="state === 'selected'"
            class="restore-search"
            @click="restoreFlightResult()"
          >
            reset vlucht selectie
          </a>
        </div>
      </template>

      <template #content>
        <form class="search-form" @submit.prevent="submitApplicant">
          <Passenger :attendeeNumber="0" />
          <span class="p-label">
            <label class="sr-only" for="email">Email:</label>
            <InputText
              id="email"
              v-model="tourGroup.email"
              placeholder="email"
            />
          </span>

          <span class="p-label">
            <label class="sr-only" for="phone">Telefoon:</label>
            <InputText
              id="phone"
              v-model="tourGroup.phoneNumber"
              placeholder="Adres"
            />
          </span>

          <span class="p-label">
            <label class="sr-only" for="selectData">Aantal personen: </label>
            <InputNumber
              v-model="groupSize"
              inputId="attendees"
              mode="decimal"
              placholder="aantal"
              showButtons
              :min="0"
              :max="10"
              @input="attendeesSize()"
            />
          </span>

          <Divider />

          <div v-for="index in attendees" :key="index">
            <Passenger :attendeeNumber="index" />
          </div>

          <div class="form-passengers__submit">
            <Button
              type="submit"
              label="Verder"
              icon="pi pi-chevron-right"
              aria-label="select"
            />
          </div>
        </form>
      </template>
    </card>
  </div>
</template>

<style scoped lang="scss">
.flight-passenger__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .restore-search {
    cursor: pointer;
    font-size: 14px;
  }
}
button {
  margin-left: 10px;
}
.p-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .p-inputnumber,
  input {
    width: 100%;
  }
}
.form-passengers {
  &__submit {
    display: flex;
    Button {
      margin: 10px auto;
    }
  }
}
</style>
