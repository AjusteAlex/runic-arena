<template>
  <div class="cards" v-if="card">
      <p>{{card}}</p>
  </div>
</template>

<script>
export default{
    props: {
        name:String
    },
    data() {
        return {
          card:null
        }
    },
    mounted() {
        fetch(`http://localhost:3000/cards`
        .then(response=>response.json())
        .then(response=>this.card = response.data)
        .catch(error=>console.log(error))
        )
    },
}
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
