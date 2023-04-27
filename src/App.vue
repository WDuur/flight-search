<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainNavigation from './components/Molecule/MainNaviagation/MainNavigation.vue'
import FlightSearch from './components/Molecule/FlightSearch/FlightSearch.vue'
</script>

<template>
    <div class="container">
        <div class="row-1"><MainNavigation /></div>
        <div class="row-2">
            <FlightSearch />
            <RouterView />
        </div>
    </div>
</template>

<style scoped style="SCSS">
.container {
    display: grid;
    grid-gap: 10px;
}

.row-1 {
    grid-row: 1 / 2;
}

.row-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    grid-row: 2 / 3;
}
</style>
