<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import TimeSheet from '@/components/Molecule/TimeSheet/TimeSheet.vue'
import { useFlightSearch } from '@/composable/useFlightSearch'

const { state, flightResult, searchData, flightRoute } = useFlightSearch()

const departureDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
}

</script>

<template>
    <Card v-for="(flight, idx) in flightResult" :key="idx" class="fr-card">
        <template #title> 
            <span class="fr-card__location">
                {{ flightRoute.from }} <sub class="code">({{ flight.departure.airport.iata }})</sub> - 
                {{ flightRoute.to }} <sub class="code">({{ flight.arrival.airport.iata }})</sub> 
            </span>  
            <span class="fr-card__date">
                <sub class="code">{{ departureDate(flight.departure.date) }}</sub>
            </span>  
        </template>
        <template #content>
            <TimeSheet :flight = 'flight'/>
        </template>
    </Card>
</template>

<style scoped lang="scss">
sub {
    vertical-align: middle;
    font-size: small;
}
.fr-card{
    &:deep(.p-card-title) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    }
}
</style>