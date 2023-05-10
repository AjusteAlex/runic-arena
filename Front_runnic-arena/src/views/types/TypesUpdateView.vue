<template>
    <div class="container">
        <MenuType/>
        <TypeUpdate/>
    </div>
</template>

<script>
import TypeUpdate from '../../components/formulaire/TypeUpdate.vue';
import MenuType from '@/components/type/MenuType.vue';

export default{
    components: { TypeUpdate,MenuType }
}

</script>