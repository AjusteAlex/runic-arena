<template>
    <div class="container">
        <MenuClass/>
        <ClassItem/>
    </div>

</template>
<script>
import ClassItem from '@/components/ClassItem.vue';
import MenuClass from '@/components/Class/MenuClass.vue';

export default{
    components: { ClassItem, MenuClass }

}
</script>
    
<style>
    .container{
        width: 100%;
    }

</style>