<template>
  <div class="skills" v-if="skills">
    <thead>
      <tr>
        <th>ID</th>
        <th>Attribut</th>
        <th>Nom</th>
        <th>Description</th>
    </tr>
    </thead>
    <div v-for="skill in skills" :key="skill.id">
      <tbody>
        <tr>
            <td>{{skill.id}}</td>
            <td> {{skill.attribute}}</td>
            <td> {{skill.name}}</td>
            <td>{{skill.description}} </td>
            <a v-bind:href="'/skill/update/'+ skill.id">Mettre a jour</a> 
            <button @click="supprimer(skill)">Supprimer</button>
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
    },
    methods: {
      async supprimer(skill){
        const id = skill.id
        await fetch(`http://localhost:3000/skill/${id}`, {
          method: "delete"
        })  
        window.location.reload()  
      }
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
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
  min-width: 150px;

}

</style>
