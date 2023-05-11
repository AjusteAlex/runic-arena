<template>
    <div class="container">
        <MenuClass/>
        <ClassUpdate/>

    </div>
</template>

<script>
import ClassUpdate from '../../components/formulaire/ClassUpdate.vue';
import MenuClass from '@/components/Class/MenuClass.vue';

export default{
    components: { ClassUpdate,MenuClass }

}

</script>