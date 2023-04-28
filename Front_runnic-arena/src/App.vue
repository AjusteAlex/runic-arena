<script>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Accueil</router-link>
        <router-link to="/cards">Cards</router-link>
        <router-link to="/skills">Skills</router-link>
        <router-link to="/abilities">Abilities</router-link>
        <router-link to="/colors">Colors</router-link>
      </nav>
    </header>
    <RouterView/>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
