<template>
    <div>
        <MenuType/>
        <TypeCreate/>
    </div>
</template>

<script>
import TypeCreate from '@/components/formulaire/TypeCreate.vue';
import MenuType from '@/components/type/MenuType.vue';

export default{
    components: { TypeCreate, MenuType }
}

</script>