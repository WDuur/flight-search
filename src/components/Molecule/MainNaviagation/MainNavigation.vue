<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Zoek vlucht</RouterLink>
            </nav>
        </div>
    </header>
</template>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

nav {
    width: 100%;
    font-size: 16px;
    text-align: center;
    margin-top: 2rem;
}
</style>
