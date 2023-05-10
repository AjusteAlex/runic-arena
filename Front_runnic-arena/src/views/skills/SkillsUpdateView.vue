<template>
    <div class="container">
        <MenuType/>
        <TypeUpdate/>
    </div>
</template>

<script>
import SkillUpdate from '../../components/formulaire/SkillUpdate.vue';
import MenuSkill from '@/components/skill/MenuSkill.vue';

export default{
    components: { TypeUpdate,MenuType }
}

</script>