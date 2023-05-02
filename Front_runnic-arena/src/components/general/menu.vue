<script>
import { RouterLink, RouterView } from 'vue-router';

</script>


  <template>
    <div id="menu">
      <header>
        <div class="menu-titre">
            <h1>Interface <br> administrateur</h1>
        </div>
        <nav>
          <router-link to="/"><img src="/icons/iconecarte.png" />Accueil</router-link>
          <router-link to="/cards"><img src="/icons/Iconecompétences.png" />Cards</router-link>
          <router-link to="/skills"><img src="/icons/Iconetype.png" />Skills</router-link>
          <router-link to="/abilities"><img src="/icons/Star.png" />Abilities</router-link>
          <!-- <router-link to="/colors">Colors</router-link> -->
        </nav>
      </header>
      <RouterView/>
    </div>
  </template>
  
  <style>
    body {
        margin: 0px;
    }
    #menu {
        display: flex;
        flex-direction: row;
        min-height: 100vh;
    }

    header {
        background-color: #2c3e50;
        color: #fff;
        width: 300px;
    }
    .menu-titre{
        min-height: 115px;
        background-color: #0B004E;
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
    }
    nav img {
        padding-right: 25px;
    }

    nav a {
        color: #fff;
        text-decoration: none;
        padding: 10px;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
    }

    nav a:hover {
        background-color: #fff;
        color: #2c3e50;
    }

    .router-link-active {
        background-color: #fff;
        color: #2c3e50;
    }

  </style>
  