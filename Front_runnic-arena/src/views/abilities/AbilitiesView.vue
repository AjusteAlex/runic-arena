<template>
    <div class="container">
        <MenuAbility/>
        <AbilityItem/>
    </div>
</template>
<script>
import AbilityItem from '@/components/AbilityItem.vue';
import MenuAbility from '@/components/Ability/MenuAbility.vue';

export default{
    components: { AbilityItem, MenuAbility }

}
</script>
    
<style>
    .container{
        width: 100%;
    }

</style>