<template>
  <div class="skill-card">
    Compétence {{ numSkill }}
    <p>Nom de la compétence : {{ defaultSkill.name }}</p>
    <template v-if="listSkills">
      <select v-model="defaultSkill" @change="updateSkillName">
        <option value="">Choisissez</option>
        <option v-for="skill in listSkills" :key="skill.id" :value="skill">
          {{ skill.name }} : {{ skill.description }}
        </option>
      </select>
    </template>
    <p>Valeur de frappe de la compétence {{ valueSkill }}</p>
    <input type="number" v-model="valueSkill" placeholder="0" />
    <p>Active ou passive ? {{ stateSkill }}</p>
    <input
      v-model="stateSkill"
      type="radio"
      value="Active"
      @change="updateRunicCube($event.target.value)"
    />Active
    <input
      v-model="stateSkill"
      type="radio"
      value="Passive"
      @change="updateRunicCube($event.target.value)"
    />Passive

    <div v-if="stateSkill === 'Active'">
      Veuillez choisir les coûts en cube runique pour utiliser la compétence :
      <Popper
        content="Vous aurez besoin d'utiliser 1 mana par cube runique. 5 manas sont
      donnés à chaque tour, ainsi vous ne pouvez définir que 5 cubes runiques
      par compétence."
        hover
        placement="right"
      >
        <font-awesome-icon :icon="['fas', 'circle-info']" />
      </Popper>
      <div
        v-for="[key, value] in Object.entries(runicCubeCost)"
        :key="key"
        @change="updateRunicCubeColor"
      >
        <template v-if="key !== 'id'">
          <label for="colorInput">{{ key }} : </label>
          <input
            type="number"
            v-model="runicCubeCost[key]"
            name="colorInput"
            placeholder="0"
            min="0"
            max="2"
          />
        </template>
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
      runicCubeCost: {
        id: null,
        blue: 0,
        red: 0,
        yellow: 0,
      },
      listColors: ["Bleu", "Rouge", "Jaune", "Aucune"],
      nbRunicCubes: 5,
      listSkills: null,
      defaultSkill: "",
      stateSkillObject: {
        id: null,
        state: "",
      },
    };
  },
  props: {
    numSkill: Number,
  },
  methods: {
    updateRunicCube(stateValue) {
      this.stateSkillObject.id = this.numSkill;
      this.stateSkillObject.state = stateValue;

      this.$emit("stateAbility", this.stateSkillObject, this.numSkill);
    },
    updateSkillName() {
      this.defaultSkill.numSkill = this.numSkill;

      this.$emit("skillNameChoose", this.defaultSkill, this.numSkill);
    },
    updateRunicCubeColor() {
      this.runicCubeCost.id = this.numSkill;
      this.$emit("runicCubeColor", this.runicCubeCost, this.numSkill);
    },
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
