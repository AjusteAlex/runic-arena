<template>
    <div class="container">

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

<style>
    .contaner-type {
        width: 100%;
    }
</style>