<template>
  <div class="classes">  
    <div v-for="classe in classes" :key="classe.id">
      {{classe.id}}  {{classe.name}} 
      <a v-bind:href="'/classe/update/'+ classe.id">Mettre a jour</a> 
      <button @click="supprimer(classe)">Supprimer</button>
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
          classes:null

        }
    },
    mounted() {
      fetch('http://localhost:3000/classes')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(response => {
          this.classes = response.allclasses;
        })
        .catch(error => {
          error => console.error(error)
        });
    },
    methods: {
      async supprimer(classe){
        const id = classe.id
        await fetch(`http://localhost:3000/classes/${id}`, {
          method: "delete"
        })  
        window.location.reload()  
      }
    }
}
</script>
<style>
@media (min-width: 1024px) {
  .types {
    min-height: 100vh;
    display: block;
  }
}
.types a, button {
  background-color: #FFF1DB;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  margin: 0 5px;
  text-decoration: none;
  color: black;
}
</style>
