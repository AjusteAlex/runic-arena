<template>
<div>
    <router-link to="/add-card">Créer une carte</router-link>
    <CardItem/>
</div>
</template>
<script>
import CardItem from '@/components/card/CardItem.vue';
import { RouterLink } from 'vue-router';
export default{
    components: { CardItem }
}
</script>
<style>
</style>