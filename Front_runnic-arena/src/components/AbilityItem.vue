<template>
  <div class="abilities" v-if="abilities">
    <br>
    <div v-for="ability in abilities" :key="ability.id">
      {{ability.id}} {{ability.name}} {{ability.description}} {{ability.value}} {{ability.state}} 
      <a v-bind:href="'/ability/update/'+ ability.id">Mettre a jour</a> 
      <button @click="supprimer(ability)">Supprimer</button>
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
          this.abilities = response.allabilities;
        })
        .catch(error => {
          error => console.error(error)
        });
    },
    methods: {
      async supprimer(ability){
        const id = ability.id
        await fetch(`http://localhost:3000/ability/${id}`, {
          method: "delete"
        })  
        window.location.reload()  
      }
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
