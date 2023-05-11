<template>
    <div class="container">
        <MenuAbility/>
        <AbilityCreate/>
    </div>
</template>

<script>
import AbilityCreate from '@/components/formulaire/AbilityCreate.vue';
import MenuAbility from '@/components/ability/MenuAbility.vue';

export default{
    components: { AbilityCreate, MenuAbility }

}

</script>

<style>
    .contaner-type {
        width: 100%;
    }
</style>