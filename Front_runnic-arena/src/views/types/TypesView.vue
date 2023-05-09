<template>
<div class="typeview">
    <MenuType/>
    <TypeItem/>
</div>
</template>
<script>
import TypeItem from '../../components/TypeItem.vue';
import MenuType from '../../components/Type/MenuType.vue'
export default{
    components: { TypeItem },
    components: { MenuType }
}
</script>

<style>
.typeview {
    width: 100%;
}
</style>