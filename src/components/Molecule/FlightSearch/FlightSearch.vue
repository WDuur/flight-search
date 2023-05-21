<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import type { City } from '@/interface/types'

import { useFlightSearch } from '@/composable/useFlightSearch'
import { useTimeline } from '@/composable/useTimeline'

const { state, searchData, searchQuery, selected } = useFlightSearch()
const { selectTimeline } = useTimeline()

const cities: City[] = [
  { name: 'New York', code: 'JFK' },
  { name: 'Pisa', code: 'PSA' },
  { name: 'London Heathrow', code: 'LHR' },
  { name: 'Amsterdam', code: 'AMS' },
  { name: 'Paris', code: 'ORY' },
]

const submitSearch = () => {
  searchQuery()
  selectTimeline(0)
}
</script>

<template>
  <div v-if="selected !== 'selected'" class="search">
    <h2>Vluchten zoeken</h2>

    <form class="search-form" @submit.prevent="submitSearch">
      <div class="flex align-items-center search-form__wrapper">
        <Checkbox
          v-model="searchData.state"
          inputId="selectData"
          name="state"
          value="api"
        />
        <label for="selectData" class="ml-2"> API </label>
      </div>
      <Dropdown
        v-model="searchData.departure"
        id
        :options="cities"
        optionLabel="name"
        placeholder="Van"
        class="search-form__dropdown"
      />

      <Dropdown
        v-model="searchData.arrival"
        :options="cities"
        optionLabel="name"
        placeholder="Naar"
        class="search-form__dropdown"
      />
      <Calendar v-model="searchData.departureDate" class="search-date--input" />
      <Button
        type="submit"
        severity="warning"
        label="Submit"
        class="search-form__submit"
        :disabled="state === 'result'"
      />
    </form>
  </div>
</template>

<style scoped lang="scss">
.search-form {
  display: flex;
  gap: 10px;
  align-content: space-around;
  align-items: start;
  flex-direction: column;
  &__wrapper {
    margin: 20px 0;
  }

  &__datasource {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  &__dropdown {
    width: 100%;
  }
  &__submit {
    max-width: 230px;
    margin: 10px 0 30px;
  }
}
</style>
