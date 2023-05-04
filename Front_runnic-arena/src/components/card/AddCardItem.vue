<template>
  <div class="add-card">
    <div class="card-container">
      <div class="card-container-top">
        <div class="class_card">
          {{ classCard }}
        </div>
        <div class="card-container-top-section2">
          <div class="type_card">
            <template v-if="typeCard === ''">
              <icon-type-light/>
            </template>
            <template v-else-if="typeCard === 'Halo'">
              <icon-type-halo-light/>
            </template>
            <template v-else>
              <icon-type-chaos-dark/>
            </template>
          </div>

          <div class="polygon">
            <span>{{ nameCard }}</span>
          </div>
          <span class="strength_card circle">
            {{ strengthCard }}
          </span>
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
      <input v-model="nameCard" placeholder="Deòiridh O'Byrnei"/>
      <p>Type de la carte : {{ typeCard }}</p>
      <select v-model="typeCard">
        <option value="">Choisissez</option>
        <option>Halo</option>
        <option>Chaos</option>
      </select>
      <p>Classe de la carte : {{ classCard }}</p>
      <select v-model="classCard">
        <option value="">Choisissez</option>
        <option v-for="item in arrayClassCard" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <p>Force de la carte : {{ strengthCard }}</p>
      <input v-model="strengthCard" placeholder="Deòiridh O'Byrnei"/>
      <p>Image de la carte : {{ strengthCard }}</p>
      <input
          id="file-input"
          accept="image/*"
          type="file"
          @change="uploadImage($event)"
      />
      <SkillCardItem v-for="index in 3" :key="index" :numSkill="index"/>

      <p>
        <input type="submit" value="Submit"/>
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
      previewImage: null,
    };
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
      } else if (this.form.strengthCard < 0 || this.form.strengthCard > 100) {
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
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },
  },
  mounted() {
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
  }
}

.card-container {
  border: 10px solid #fff1db;
  border-radius: 15px;
  width: 20.059rem;
  height: 31.883rem;
  background-color: #ffe2e2;
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
  width: 12.5rem;
  overflow: hidden;
  height: 1%;
  color: #fff1db;
  padding-right: 20px;
  padding-left: 20px;
  text-align: center;
  background: #1e1e1e;
  clip-path: polygon(13% 0, 90% 0, 100% 50%, 91% 100%, 11% 100%, 0% 50%);
}

.card-container-top {
  background: linear-gradient(to right, transparent, #1e1e1e, transparent);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  color: #fff1db;
}

.card-container-top-section2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.circle {
  height: 25px;
  width: 25px;
  background-color: #1e1e1e;
  border-radius: 50%;
  display: inline-block;
}

.strength_card {
  margin-left: 5px;
  color: #fff1db;
  text-align: center;
}

.card-container-name_card {
  background-color: red;
  width: 12.5rem;
  overflow: hidden;
  height: 1%;
}

.type_card {
  margin-right: 5px;
}
</style>
