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
      <div class="card-container-bottom">
        <div
          class="colors-runic-cube-container"
          v-for="ability in 3"
          :key="ability"
        >
          <div
            class="runic-cubes-per-row"
            v-for="runicCube in 5"
            :key="runicCube"
          >
            <img :src="runicCubeSvgUrl" alt="Runic cube" />
            <!-- <object type="image/svg+xml" :data="runicCubeSvgUrl"></object> -->
          </div>
        </div>
        <div class="skill-container"></div>
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
        <select v-model="typeCard">
          <option value="">Choisissez</option>
          <option v-for="type in listTypesCard" :key="type.id" :value="type">
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
      <select v-model="classCard">
        <option value="">Choisissez</option>
        <option v-for="item in arrayClassCard" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <p>Force de la carte : {{ strengthCard }}</p>
      <input type="number" v-model="strengthCard" placeholder="45" />
      <p>Image de la carte :</p>
      <input
        id="img-card"
        accept="image/*"
        type="file"
        @change="uploadImage($event)"
      />
      <SkillCardItem v-for="index in 3" :key="index" :numSkill="index" />

      <p>
        <input type="submit" value="Submit" />
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
      classCard: "MAGE",
      arrayClassCard: ["MAGE", "ASSASSIN", "ARCHER", "SOIGNEUR", "GUERRIER"],
      strengthCard: "",
      errors: [],
      listTypesCard: null,
      previewImageUrl: null,
      runicCubeType: "default",
    };
  },
  computed: {
    runicCubeSvgUrl() {
      const defaultCubeType = this.runicCubeType; // supposons que vous ayez une variable defaultCubeType dans votre instance VueJS
      return `/src/assets/icons/runicCubes/runic_cube_${defaultCubeType}.svg`;
    },
  },
  methods: {
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

      // Soumettre le formulaire
      $this.addCard();
    },

    addCard() {
      const card = {
        name: this.nameCard,
        type: this.typeCard,
        class: this.classCard,
        strength: this.strengthCard,
      };

      fetch("http://localhost:3000/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((response) => {
          this.cards = response.allcards;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    uploadImage(e) {
      const image = e.target.files[0];
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
        this.listSkills = response.allskills;
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
  width: auto;
  height: 30%;
  background-color: var(--grey-dark-opacity);
}

.colors-runic-cube-container {
  display: flex;
  flex-direction: row;
}

.runic-cubes-per-row {
  margin: 2px;
}
</style>
