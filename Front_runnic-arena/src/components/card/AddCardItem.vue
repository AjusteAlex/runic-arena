<template>
  <div class="add-card">
    <div
      class="card-container"
      :style="{ backgroundImage: 'url(' + previewImageUrl + ')' }"
    >
      <div class="card-container-top">
        <div class="class_card">
          {{ classCard }}
        </div>
        <div class="card-container-top-section2">
          <div class="type_card">
            <template v-if="typeCard === ''">
              <icon-type-light />
            </template>
            <template v-else-if="typeCard === 'Halo'">
              <icon-type-halo-light />
            </template>
            <template v-else>
              <icon-type-chaos-dark />
            </template>
          </div>

          <div class="polygon">
            <span>{{ nameCard }}</span>
          </div>
          <div class="strength_card circle">
            <span>
              {{ strengthCard }}
            </span>
          </div>
        </div>
      </div>
      <div class="card-container-bottom" v-if="costColors">
        <div class="runic-cubes-per-row">
          <div>
            <div v-for="[key, value] in Object.entries(costColors)" :key="key">
              <template
                v-for="(index, eachColor) in costColors[key]"
                :key="index"
              >
                <template v-for="i in index" :key="i">
                  <template v-if="eachColor !== 'id'">
                    <img
                      :src="runicCubeSvgUrl(eachColor)"
                      alt="Runic cube"
                      v-if="value"
                    />
                  </template>
                </template>
              </template>
            </div>
            <div>
              <div v-for="[key, value] in Object.entries(stateList)" :key="key">
                <template v-if="value.state == 'Passive'">
                  <div>
                    <img
                      src="/src/assets/icons/runicCubes/passive_skill.svg"
                      alt="Runic cube"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="skill-container">
            <div v-for="[key, value] in Object.entries(skillList)" :key="key">
              <p class="small-text">
                {{ value.name }} : {{ value.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form
      id="add-card"
      action="#"
      class="add-card-form-container"
      method="post"
      @submit.prevent="submitForm"
    >
      <template v-if="errors.length">
        <b>Merci de corriger les erreur(s) suivante(s):</b>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </template>
      <p>Nom de la carte : {{ nameCard }}</p>
      <input v-model="nameCard" placeholder="Deòiridh O'Byrnei" />
      <p>Type de la carte : {{ typeCard }}</p>

      <template v-if="listTypesCard">
        <select
          v-model="typeCard"
          @change="selectTypeId($event.target.value)"
          :name="typeCard"
        >
          <option value="">Choisissez</option>
          <option v-for="type in listTypesCard" :key="type.id" :value="type.id">
            {{ type.name }}
          </option>
        </select>
      </template>
      <template v-else>
        <select v-model="typeCard">
          <option value="">Choisissez</option>
          <option>Halo</option>
          <option>Chaos</option>
        </select>
      </template>
      <p>Classe de la carte : {{ classCard }}</p>
      <template v-if="classCard">
        <select
          v-model="classCard"
          @change="selectClasseId($event.target.value)"
          :name="classCard"
        >
          <option value="">Choisissez</option>
          <option
            v-for="classe in listClassesCard"
            :key="classe.id"
            :value="classe.id"
          >
            {{ classe.name }}
          </option>
        </select>
      </template>
      <template v-else>
        <select v-model="classCard">
          <option value="">Choisissez</option>
          <option>Halo</option>
          <option>Chaos</option>
        </select>
      </template>
      <p>Force de la carte : {{ strengthCard }}</p>
      <input type="number" v-model="strengthCard" placeholder="45" />
      <p>Image de la carte :</p>
      <input
        id="img-card"
        accept="image/*"
        type="file"
        @change="uploadImage($event)"
      />
      <SkillCardItem
        v-for="index in nbAbilities"
        :key="index"
        :numSkill="index"
        @runicCubeColor="
          (runicCubeCost, numSkill) =>
            updateRunicCubeColor(runicCubeCost, numSkill)
        "
        @skillNameChoose="
          (defaultSkill, numSkill) =>
            updateSkillNameDescription(defaultSkill, numSkill)
        "
        @stateAbility="
          (stateSkillObject, numSkill) =>
            updateRunicCubePassive(stateSkillObject, numSkill)
        "
      />

      <p>
        <input type="submit" value="Submit" />
        <!-- <button>Créer la carte</button> -->
      </p>
    </form>
  </div>
</template>

<script>
import IconTypeChaosDark from "../icons/type/IconTypeChaosDark.vue";
import IconTypeHaloLight from "../icons/type/IconTypeHaloLight.vue";
import IconTypeLight from "../icons/type/IconTypeLight.vue";
import SkillCardItem from "./SkillCardItem.vue";

export default {
  data() {
    return {
      nameCard: "",
      typeCard: "Halo",
      typeIdCard: null,
      classCard: "MAGE",
      classIdCard: null,
      arrayClassCard: ["MAGE", "ASSASSIN", "ARCHER", "SOIGNEUR", "GUERRIER"],
      strengthCard: "",
      errors: [],
      costColors: [],
      nbAbilities: 3,
      listTypesCard: null,
      listClassesCard: null,
      previewImageUrl: null,
      runicCubeType: "default",
      runicColorList: null,
      trouve: false,
      skillList: [],
      stateList: [],
      img: null,
    };
  },
  computed: {},
  methods: {
    selectClasseId(id) {
      this.classIdCard = id;
      this.classCard = this.listClassesCard.find(
        (object) => object.id == id
      ).name;
    },
    selectTypeId(id) {
      this.classIdCard = id;
      this.classCard = this.listClassesCard.find(
        (object) => object.id == id
      ).name;
    },
    runicCubeSvgUrl(color) {
      return `/src/assets/icons/runicCubes/runic_cube_${color}.svg`;
    },
    updateRunicCubePassive(stateSkillObject, numSkill) {
      if (this.stateList.length > 0) {
        Object.keys(this.stateList).forEach((k, i) => {
          if (this.stateList[k].id === numSkill) {
            this.stateList[k] = stateSkillObject;
            this.trouve = true;
          }
        });
        if (this.trouve == false) {
          this.stateList.push(stateSkillObject);
        }
        this.trouve = false;
      } else {
        this.stateList.push(stateSkillObject);
      }
    },
    updateSkillNameDescription(defaultSkill, numSkill) {
      if (this.skillList.length > 0) {
        console.log(numSkill);
        Object.keys(this.skillList).forEach((k, i) => {
          if (this.skillList[k].numSkill === numSkill) {
            this.skillList[k] = defaultSkill;
            this.trouve = true;
          }
        });
        if (this.trouve == false) {
          this.skillList.push(defaultSkill);
        }
        this.trouve = false;
      } else {
        this.skillList.push(defaultSkill);
      }
    },
    updateRunicCubeColor(newValue, numSkill) {
      if (this.costColors.length > 0) {
        console.log(numSkill);
        Object.keys(this.costColors).forEach((k, i) => {
          if (this.costColors[k].id === numSkill) {
            this.costColors[k] = newValue;
            this.trouve = true;
          }
        });
        if (this.trouve == false) {
          this.costColors.push(newValue);
        }
        this.trouve = false;
      } else {
        this.costColors.push(newValue);
      }
    },
    submitForm() {
      // Valider le formulaire en utilisant vos règles existantes
      this.errors = []; // Effacer toutes les erreurs existantes

      if (!this.nameCard) {
        this.errors.push("Veuillez entrer le nom de la carte");
      }
      if (!this.typeCard) {
        this.errors.push("Veuillez renseigner le type de la carte");
      }
      if (!this.classCard) {
        this.errors.push("Veuillez renseigner la classe de la carte");
      }
      if (!this.strengthCard) {
        this.errors.push(
          "Veuillez renseigner une valeur de force pour la carte"
        );
      } else if (isNaN(this.strengthCard)) {
        this.errors.push("La valeur de force doit être un nombre");
      } else if (this.strengthCard < 0 || this.strengthCard > 100) {
        this.errors.push("La valeur de force doit être entre 0 et 100");
      }

      // Si des erreurs existent, empêcher la soumission du formulaire et afficher les erreurs
      if (this.errors.length > 0) {
        return false;
      }
      console.log("here");
      // Soumettre le formulaire
      this.addCard();
    },
    async addCard() {
      // e.preventDefault();
      let formData = new FormData();
      formData.append("name", this.nameCard);
      formData.append("picture", this.img);
      formData.append("type", this.typeIdCard);
      formData.append("classe", this.classIdCard);
      formData.append("strenght", this.strengthCard);
      // const card = {
      //   name: this.nameCard,
      //   picture: this.img,
      //   type: this.typeCard,
      //   classe: this.classCard,
      //   strenght: this.strengthCard,
      // };
      // try {
      //   await fetch("http://localhost:3000/card", {
      //     method: "POST",
      //     // body: JSON.stringify(card),
      //     body: formData,
      //   });
      //   console.log("dd");
      //   // this.message = "Card has been sucessfully created.";
      //   this.$router.push("/cards");
      // } catch (error) {
      //   console.error(error);
      //   // this.message = error.response.data.message;
      // }
      fetch("http://localhost:3000/card", {
        method: "POST",
        body: formData,
        // body: JSON.stringify(card),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            console.log("dd");
            this.$router.push("/cards");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // addCard() {
    //   const card = {
    //     name: this.nameCard,
    //     type: this.typeCard,
    //     class: this.classCard,
    //     strength: this.strengthCard,
    //   };

    //   fetch("http://localhost:3000/card", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(card),
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error("Network response was not ok");
    //       }
    //       return response.json();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
    uploadImage(e) {
      const image = e.target.files[0];

      this.img = document.getElementById("img-card").files[0];
      console.log(this.img);
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImageUrl = e.target.result;
      };
    },
  },
  mounted() {
    fetch("http://localhost:3000/types")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        this.listTypesCard = response.alltypes;
        this.typeIdCard = this.listTypesCard[0].id;
        this.typeCard = this.listTypesCard[0].name;
      })
      .catch((error) => {
        (error) => console.error(error);
        console.log(error);
      });

    fetch("http://localhost:3000/classes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        this.listClassesCard = response.allclasses;
      })
      .catch((error) => {
        (error) => console.error(error);
        console.log(error);
      });
  },
  components: {
    SkillCardItem,
    IconTypeLight,
    IconTypeHaloLight,
    IconTypeChaosDark,
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .add-card {
    min-height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: 36px;
  }
}

@media (max-width: 768px) {
  .add-card {
    display: flex;
    flex-direction: column;
  }
}

.card-container {
  border: 10px solid var(--beige-light);
  border-radius: 15px;
  width: 20.059rem;
  height: 31.883rem;
  background-color: var(--blue-dark);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.add-card-form-container {
  margin-left: 1.5rem;
}

.add-card-form-container input {
  margin-bottom: 1rem;
}

.add-card-form-container p {
  margin-bottom: 0.5rem;
}

.polygon {
  width: 11rem;
  overflow: hidden;
  height: auto;
  padding-top: 0.313rem;
  padding-bottom: 0.313rem;
  color: var(--beige-light);
  text-align: center;
  padding-right: 20px;
  padding-left: 20px;
  background: var(--grey-dark);
  white-space: initial;
  word-wrap: break-word;

  clip-path: polygon(13% 0, 90% 0, 100% 50%, 91% 100%, 11% 100%, 0% 50%);
}

.card-container-top {
  background: var(--grey-dark-opacity);

  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.625rem;
}

.card-container-top div,
.card-container-top span {
  position: relative;
  z-index: 1;
}

.card-container-top:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  background-color: grey;
  z-index: 0;
}

.class_card {
  color: var(--beige-light);
}

.card-container-top-section2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.circle {
  height: 35px;
  width: 35px;
  margin: 10px;
  background-color: var(--grey-dark);
  border-radius: 50%;
}

.strength_card {
  margin-left: 5px;
  color: var(--beige-light);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-container-name_card {
  background-color: red;
  width: 12.5rem;
  overflow: hidden;
  height: 1%;
}

.type_card {
  margin: 10px;
}

.card-container-bottom {
  display: flex;
  width: auto;
  height: 30%;
  background-color: var(--grey-dark-opacity);
}

.colors-runic-cube-container {
  display: flex;
  flex-direction: row;
}

.runic-cubes-per-row {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  align-items: normal;
  margin: 2px;
}

.runic-cubes-per-row > div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 0.5rem;
}
.runic-cubes-per-row > div > div {
  display: flex;
  flex-direction: row;
}

.skill-container > p {
  text-align: right;
}
</style>
