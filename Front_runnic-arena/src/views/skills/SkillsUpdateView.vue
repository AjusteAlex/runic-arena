<template>
    <div class="container">
        <MenuSkill/>
        <SkillUpdate/>

    </div>
</template>

<script>
import SkillUpdate from '../../components/formulaire/SkillUpdate.vue';
import MenuSkill from '@/components/skill/MenuSkill.vue';

export default{
    components: { SkillUpdate,MenuSkill }

}

</script>