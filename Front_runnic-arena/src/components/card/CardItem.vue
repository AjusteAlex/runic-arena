<template>
  <div class="cards" v-if="cards">
    <div v-for="card in cards" :key="card.id">
      {{ card.id }} {{ card.name }} {{ card.picture }} {{ card.type }}
      {{ card.class }} {{ card.strenght }}
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
};
</script>
<style>
@media (min-width: 1024px) {
  .cards {
    min-height: 100vh;
    display: block;
  }
}
</style>
