<template>
  <div class="types">  
    <div v-for="type in types" :key="type.id">
      {{type.id}}  {{type.name}} <a v-bind:href="'/type/update/'+ type.id">Mettre a jour</a> <button @click="supprimer(type)">Supprimer</button>
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
          types:null,
          selectedType: {}

        }
    },
    mounted() {
      fetch('http://localhost:3000/types')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(response => {
          this.types = response.alltypes;
        })
        .catch(error => {
          error => console.error(error)
        });
    },
    methods: {
      async supprimer(type){
        const id = type.id
        await fetch(`http://localhost:3000/types/${id}`, {
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
</style>
