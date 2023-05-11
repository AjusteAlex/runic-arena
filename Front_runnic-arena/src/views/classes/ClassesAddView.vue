<template>
    <div class="container">

        <MenuClass/>
        <ClassCreate/>
    </div>
</template>

<script>
import ClassCreate from '@/components/formulaire/ClassCreate.vue';
import MenuClass from '@/components/Class/MenuClass.vue';


export default{
    components: { ClassCreate, MenuClass }

}

</script>

<style>
    .contaner-type {
        width: 100%;
    }
</style>