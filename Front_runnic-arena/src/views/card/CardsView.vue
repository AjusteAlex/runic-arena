<template>
<div>
    <router-link class="link" to="/add-card">Créer une carte</router-link>
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
    .link {
        margin: 50px;
        background-color: #FFF1DB;
        padding: 5px 15px;
        border-radius: 5px;
        border: none;
        display: block;
        width: 150px;
    }   
        
</style>