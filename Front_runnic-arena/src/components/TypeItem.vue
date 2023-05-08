<template>
  <div class="types" v-if="types">
    <a href="/add/type">Créer un type</a>
    
    <div v-for="type in types" :key="type.id">
      {{type.id}}  {{type.name}} 
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
          types:null
        }
    },
    mounted() {
      fetch('http://localhost:3000/types')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('test')
          return response.json();
        })
        .then(response => {
          this.types = response.alltypes;
        })
        .catch(error => {
          error => console.error(error)
        });
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
