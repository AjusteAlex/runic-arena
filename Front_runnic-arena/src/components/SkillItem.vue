<template>
  <div class="skills" v-if="skills">
    <br>
    <div v-for="skill in skills" :key="skill.id">
      {{skill.id}} {{skill.attribute}} {{skill.name}} {{skill.description}} 
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
          skills:null
        }
    },
    mounted() {
      fetch('http://localhost:3000/skill')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(response => {
          this.skills = response.allskills;
        })
        .catch(error => {
          error => console.error(error)
        });
    }
}
</script>
<style>
@media (min-width: 1024px) {
  .skills {
    min-height: 100vh;
    display: block;
  }
}
</style>
