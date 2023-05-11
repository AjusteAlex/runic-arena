<template>
  <div class="cards" v-if="cards">
    <div v-for="card in cards" :key="card.id">
      {{ card.id }} {{ card.name }} 
      <img class="card-img" v-bind:src="'http://localhost:3000/'+ card.picture "> {{ card.type }}
      {{ card.class }} {{ card.strenght }}
      <button @click="supprimer(card)">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
  data() {
    return {
      cards: null,
    };
  },
  mounted() {
    fetch("http://localhost:3000/card")
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
        (error) => console.error(error);
      });
  },
  methods: {
      async supprimer(card){
        const id = card.id
        await fetch(`http://localhost:3000/card/${id}`, {
          method: "delete"
        })  
        window.location.reload()  
      }
    }
};
</script>
<style>
@media (min-width: 1024px) {
  .cards {
    margin: 50px 0;
    min-height: 100vh;
    display: block;
  }
}
.card-img{
  max-width: 200px;
}
</style>
