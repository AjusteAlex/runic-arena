<template>
    <div class="container">

        <MenuSkill/>
        <SkillCreate/>
    </div>
</template>

<script>
import SkillCreate from '@/components/formulaire/SkillCreate.vue';
import MenuSkill from '@/components/Skill/MenuSkill.vue';


export default{
    components: { SkillCreate, MenuSkill }

}

</script>

<style>
    .contaner-type {
        width: 100%;
    }
</style>