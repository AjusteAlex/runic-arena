<template>
  <div class="skill-card">
    Compétence {{ numSkill }}
    <p>Nom de la compétence : {{ defaultSkill.name }}</p>
    <template v-if="listSkills">
      <select v-model="defaultSkill">
        <option value="">Choisissez</option>
        <option v-for="skill in listSkills" :key="skill.id" :value="skill">
          {{ skill.name }} : {{ skill.description }}
        </option>
      </select>
    </template>
    <p>Valeur de frappe de la compétence {{ valueSkill }}</p>
    <input type="number" v-model="valueSkill" placeholder="0" />
    <p>Active ou passive ? {{ stateSkill }}</p>
    <input v-model="stateSkill" type="radio" value="Active" />Active
    <input v-model="stateSkill" type="radio" value="Passive" />Passive
    <div v-if="stateSkill === 'Active'">
      Veuillez choisir les coûts en cube runique pour utiliser la compétence :

      <p>
        Vous aurez besoin d'utiliser 1 mana par cube runique. 5 manas sont
        donnés à chaque tour, ainsi vous ne pouvez définir que 5 cubes runiques
        par compétence.
      </p>
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
      listSkills: null,
      defaultSkill: "",
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
  mounted() {
    fetch("http://localhost:3000/skill")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        this.listSkills = response.allskills;
      })
      .catch((error) => {
        (error) => console.error(error);
        console.log(error);
      });
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
