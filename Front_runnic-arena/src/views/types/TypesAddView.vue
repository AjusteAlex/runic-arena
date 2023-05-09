<template>
    <div class="container-type">
        <MenuType/>
        <TypeCreate/>
    </div>
</template>

<script>
import MenuType from '../../components/Type/MenuType.vue'
import TypeCreate from '../../components/formulaire/TypeCreate.vue';
export default{
    components: { MenuType, TypeCreate}
}

</script>

<style>
    .contaner-type {
        width: 100%;
    }
</style>