<template>

    <div>
        <h1> Création d'une compétence</h1>
        <form class="form" method="post" enctype="multipart/form-data">
            <div class="form-section">

                <label>Nom de la compétence</label>
                <input
                    type="text"
                    placeholder="Nom de la compétence"
                    v-model="name"
                />
            </div>

            <div class="form-section">

                <label>Couleur du type</label>
                <input
                    type="text"
                    placeholder="Couleur du type"

                    v-model="colortype"
                />

            </div>
            <button @click="addSkyll">Créer le type</button>
          
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                colortype: '',
            }
        },
        methods: {
            async addSkyll(e) {
                e.preventDefault()

                let formData = new FormData();
                formData.append('name', this.name);
                formData.append('colortype', this.colortype);
                try {
                await fetch('http://127.0.0.1:3000/skills', {
                    method: 'POST',
                    body: formData
                })

                this.message = "Skill has been sucessfully created."
                this.$router.push('/skills')
                } catch (error) {
                    this.message = error.response.data.message
                }
            }
            
        }
    }
</script>

<style>

    
    .form-section{ 
        display: flex;
        flex-direction: column;
        max-width: 40%;
        margin: 20px 0;
    }
    .form-section input{
        background-color: #FFF1DB;
        padding: 5px 15px;
        border-radius: 5px;
        border: none;
    }
    .form button {
        background-color: #FFF1DB;
        padding: 5px 15px;
        border-radius: 5px;
        border: none;
        }

</style>