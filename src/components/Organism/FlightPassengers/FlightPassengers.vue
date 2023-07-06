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

const useValidationError = ref({
  email: [] as (string | undefined)[],
  phoneNumber: [] as (string | undefined)[],
})

/**
 * Submits applicant data if it is valid; otherwise, logs errors and sets validation error state.
 *
 * @return {void}
 */
const submitApplicant = () => {
  const { valid, errors } = validateApplicantData()

  if (valid) {
    state.value = 'passengers'
    return
  }

  useValidationError.value.email = Array.isArray(errors.email)
    ? errors.email
    : [errors.email]
  useValidationError.value.phoneNumber = Array.isArray(errors.phoneNumber)
    ? errors.phoneNumber
    : [errors.phoneNumber]
}

const validateApplicantData = () => {
  const validationSchema = createValidationSchema()
  const { email, phoneNumber } = tourGroup
  const validationErrors = validationSchema.safeParse({
    email,
    phoneNumber,
  })

  const { success } = validationErrors

  return {
    valid: success,
    errors: success ? {} : validationErrors.error?.formErrors.fieldErrors || {},
  }
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
    phoneNumber: z.string().nonempty('Telefoonnummer is verplicht'),
  })
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
              v-if="useValidationError.email"
              class="p-error"
              id="text-error"
              >{{ useValidationError.email[0] }}</small
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
              v-if="useValidationError.phoneNumber"
              class="p-error"
              id="text-error"
              >{{ useValidationError.phoneNumber[0] }}</small
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
