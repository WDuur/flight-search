<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'
import type { City } from '@/interface/types'

import useFlightSearch from '@/composables/useFlightSearch'

const { state, searchData, searchQuery } = useFlightSearch()

const cities: City[] = [
    { name: 'New York', code: 'JFK' },
    { name: 'Pisa', code: 'PSA' },
    { name: 'London Heathrow', code: 'LHR' },
    { name: 'Amsterdam', code: 'AMS' },
    { name: 'Paris', code: 'ORY' },
]

const submitForm = () => {
    searchQuery()
}
</script>

<template>
    <div class="search">
        <h2>Vluchten zoeken: {{ state }}</h2>
        <form @submit.prevent="submitForm">
            <Dropdown
                v-model="searchData.departure"
                id
                :options="cities"
                optionLabel="name"
                placeholder="Van"
                class="search-location--dropdown"
            />

            <Dropdown
                v-model="searchData.arrival"
                :options="cities"
                optionLabel="name"
                placeholder="Naar"
                class="search-location--dropdown"
            />
            <Calendar
                v-model="searchData.departureDate"
                class="search-date--input"
            />
            <Button
                type="submit"
                label="Submit"
                class="search-button--submit"
            />
        </form>
    </div>
</template>

<style scoped lang="scss">
.search {
    display: grid;
    gap: 10px;
    align-content: space-around;
    align-items: start;

    &-location {
        &--dropdown {
            width: 100%;
        }
    }
    &-button {
        &--submit {
            max-width: 230px;
            margin: 10px 0;
        }
    }
}
</style>
