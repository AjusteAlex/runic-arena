<template>
  <div class="skills" v-if="skills">
    <br>
    <thead>
        <tr>
            <th colspan="2">ID</th>
            <th colspan="2">Attribue</th>
            <th colspan="2">Nom</th>
            <th colspan="2">Description</th>
        </tr>
    </thead>
    <div v-for="skill in skills" :key="skill.id">
      <!-- id : {{skill.id}} Attribue : {{skill.attribute}} Nom : {{skill.name}}  Description : {{skill.description}}  -->
      <tbody>
        <tr>
            <th>{{skill.id}}</th>
            <th> {{skill.attribute}}</th>
            <th> {{skill.name}}</th>
            <th>{{skill.description}} </th>
        </tr>
    </tbody>
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
table,
td {
    border: 1px solid #333;
}
rgb(255, 255, 255)
thead,
tfoot {
    background-color: #333;
    color: #fff;
}

</style>
