<template>
    <div class="container">
        <MenuAbility/>
        <AbilityUpdate/>
    </div>
</template>

<script>
import AbilityUpdate from '../../components/formulaire/AbilityUpdate.vue';
import MenuAbility from '@/components/ability/MenuAbility.vue';

export default{
    components: { AbilityUpdate,MenuAbility }
}

</script>