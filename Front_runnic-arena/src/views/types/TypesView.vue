<template>
    <div class="container">
        <MenuType/>
        <TypeItem/>
    </div>
</template>
<script>
import TypeItem from '@/components/TypeItem.vue';
import MenuType from '@/components/type/MenuType.vue';

export default{
    components: { TypeItem, MenuType }
}
</script>
    
<style>
    .container{
        width: 100%;
    }
</style>