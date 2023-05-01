<template>
  <div class="add-card">
    <p>Nom de la carte : {{ nameCard }}</p>
    <input v-model="nameCard" placeholder="Deòiridh O'Byrnei" />
    <p>Type de la carte : {{ typeCard }}</p>
    <input v-model="typeCard" placeholder="Deòiridh O'Byrnei" />
    <p>Classe de la carte : {{ classCard }}</p>
    <input v-model="classCard" placeholder="Deòiridh O'Byrnei" />
    <p>Force de la carte : {{ strengthCard }}</p>
    <input v-model="strengthCard" placeholder="Deòiridh O'Byrnei" />
    <SkillCardItem v-for="index in 3" :key="index" :numSkill="index" />

    <p>
      <input type="submit" value="Submit" />
    </p>
  </div>
</template>

<script>
import SkillCardItem from "./SkillCardItem.vue";

export default {
  data() {
    return {
      nameCard: "",
      typeCard: "",
      classCard: "",
      strengthCard: "",
    };
  },
  components: { SkillCardItem },
};
</script>

<style>
@media (min-width: 1024px) {
  .add-card {
    min-height: 100vh;
    display: block;
  }
}
</style>
