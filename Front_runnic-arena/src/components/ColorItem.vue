<template>
  <div class="colors" v-if="colors">
    <br>
    <div v-for="color in colors" :key="color.id">
      {{color.id}} {{color.color}}
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
          colors:null
        }
    },
    mounted() {
      fetch('http://localhost:3000/color')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(response => {
          this.colors = response.allcolors;
        })
        .catch(error => {
          error => console.error(error)
        });
    }
}
</script>
<style>
@media (min-width: 1024px) {
  .colors {
    min-height: 100vh;
    display: block;
  }
}
</style>
