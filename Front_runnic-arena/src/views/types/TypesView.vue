<template>
    <div>
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
</style>