<template>
<div>
    <MenuSkill/>
    <SkillItem/>
</div>
</template>
<script>
import SkillItem from '@/components/SkillItem.vue';
import MenuSkill from '@/components/Skill/MenuSkill.vue';

export default{
    components: { SkillItem, MenuSkill }
}
</script>
<style>
</style>