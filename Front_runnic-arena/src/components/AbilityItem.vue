<template>
  <div class="abilities" v-if="abilities">
    <br>
    <div v-for="ability in abilities" :key="ability.id">
      {{ability.id}} {{ability.name}} {{ability.description}} {{ability.value}} {{ability.state}} 
    </div>
  </div>
</template>

<script>
export default{
    props: {
        name:String
    },
    data() {
        return {
          abilities:null
        }
    },
    mounted() {
      fetch('http://localhost:3000/ability')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(response => {
          this.abilities = response.allabilitys;
        })
        .catch(error => {
          error => console.error(error)
        });
    }
}
</script>
<style>
@media (min-width: 1024px) {
  .abilities {
    min-height: 100vh;
    display: block;
  }
}
</style>
