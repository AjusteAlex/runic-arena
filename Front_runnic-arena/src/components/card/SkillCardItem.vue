<template>
  <div class="skill-card">
    Compétence {{ numSkill }}
    <p>Nom de la compétence : {{ nameSkill }}</p>
    <input v-model="nameSkill" placeholder="Deòiridh O'Byrnei"/>
    <p>Valeur de frappe de la compétence {{ valueSkill }}</p>
    <input v-model="valueSkill" placeholder="0"/>
    <p>Active ou passive ? {{ stateSkill }}</p>
    <input v-model="stateSkill" type="radio" value="Active"/>Active
    <input v-model="stateSkill" type="radio" value="Passive"/>Passive
    <div v-if="stateSkill === 'Active'">
      Veuillez choisir les coûts en cube runique pour utiliser la compétence :
      <span
      >Vous aurez besoin d\'utiliser 1 mana par cube runique. 5 manas sont
        donnés à chaque, ainsi vous ne pouvez définir que 5 cubes runiques par
        compétence.</span
      >
      <div v-for="index in nbRunicCubes" :key="index">
        <select v-model="runicCubeCost[index - 1]">
          <option value="">Choisissez</option>
          <option>Bleu</option>
          <option>Rouge</option>
          <option>Jaune</option>
          <option>Aucune</option>
        </select>
      </div>
      <span>
        Coût total en cube runique :
        <span v-for="(cost, index) in runicCubeCost" :key="index">
          {{ cost ? cost : "Aucune" }}
          <template v-if="index !== runicCubeCost.length - 1"> + </template>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nameSkill: "",
      stateSkill: "Active",
      valueSkill: "0",
      runicCubeCost: ["Aucune", "Aucune", "Aucune", "Aucune", "Aucune"],
      nbRunicCubes: 5,
    };
  },
  props: {
    numSkill: Number,
  },
  computed: {
    dynamicModel() {
      return (index) => {
        return `runicCubeCost[${index}]`;
      };
    },
  },
};
</script>
<style>
@media (min-width: 1024px) {
  .skill-card {
    display: block;
  }
}
</style>
