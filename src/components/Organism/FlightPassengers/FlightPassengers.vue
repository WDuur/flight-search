<script setup lang="ts">
import { ref, computed } from 'vue'
import { z } from 'zod'
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

/**
 * Sets the value of state to 'passengers'.
 *
 * @return {void}
 */
const submitApplicant = () => {
  if (Object.keys(validationErrors.value).length > 0) {
    // Handle validation errors (e.g., display a message, highlight the fields)
    console.log('erorr: #########', validationErrors.value)
    return
  }
  state.value = 'passengers'
}

/**
 * Restores the flight result, updates the state and selects the 'passengers' timeline.
 *
 * @return {void}
 */
const restoreFlightResult = () => {
  flightResult.value = originalFlightResult.value
  state.value = 'result'
  selectTimeline('passengers')
}

const createValidationSchema = () => {
  return z.object({
    email: z.string().nonempty('Email is verplicht'),
    phone: z.string().nonempty('Adres is verplicht'),
  })
}
const validationErrors = computed(() => {
  try {
    validationSchema.parse({
      email: tourGroup.email,
      phone: tourGroup.phoneNumber,
    })
    return {}
  } catch (error: any) {
    return error.formErrors.fieldErrors
  }
})

const validationSchema = createValidationSchema()
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
        <form
          class="flight-passenger__search"
          @submit.prevent="submitApplicant"
        >
          <Passenger :attendeeNumber="0" />
          <span class="p-label">
            <label class="sr-only" for="email">Email</label>
            <InputText
              id="email"
              v-model="tourGroup.email"
              placeholder="email"
            />
            <small
              v-if="validationErrors.email"
              class="p-error"
              id="text-error"
              >{{ validationErrors.email[0] }}</small
            >
          </span>

          <span class="p-label">
            <label class="sr-only" for="phone">Telefoon</label>
            <InputText
              id="phone"
              v-model="tourGroup.phoneNumber"
              placeholder="Telefoon"
            />
            <small
              v-if="validationErrors.phone"
              class="p-error"
              id="text-error"
              >{{ validationErrors.phone[0] }}</small
            >
          </span>

          <span class="p-label">
            <label class="sr-only" for="selectData">Aantal personen</label>
            <InputNumber
              v-model="attendees"
              inputId="attendees"
              mode="decimal"
              placeholder="aantal"
              prefix="Aantal reisgenoten "
              showButtons
              :min="0"
              :max="3"
              @update:model-value="applicantData()"
            />
          </span>

          <TransitionGroup name="passenger">
            <div
              class="flight-passenger__card"
              v-for="index in attendees"
              :key="index"
            >
              <Passenger :attendeeNumber="index" />
            </div>
          </TransitionGroup>

          <Divider />

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
.passenger-enter-active,
.passenger-leave-active {
  transition: all 0.5s ease;
}
.passenger-enter-from,
.passenger-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
