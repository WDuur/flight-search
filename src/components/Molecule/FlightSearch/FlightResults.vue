<script setup lang="ts">
import Card from 'primevue/card'
import useFlightSearch from '@/composables/useFlightSearch'

const { state, flightResult } = useFlightSearch()
</script>

<template>
    <Card>
        <template #header />
        <template #title> Flight Result {{ state }}</template>
        <template #content>
            <pre>{{ flightResult }}</pre>
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button
                icon="pi pi-times"
                label="Cancel"
                class="p-button-secondary"
                style="margin-left: 0.5em"
            />
        </template>
    </Card>
</template>
