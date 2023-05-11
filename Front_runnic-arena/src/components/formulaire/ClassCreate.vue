<template>

    <div>
        <h1> Création d'une classe</h1>

        <form class="form" method="post" enctype="multipart/form-data">
            <div class="form-section">
                <label>Nom de la classe</label>
                <input
                    type="text"
                    placeholder="Nom de la compétence"
                    v-model="name"
                />
            </div>
            <button @click="add">Créer classe</button>

          
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: ''
            }
        },
        methods: {
            async add(e) {
                e.preventDefault()

                let formData = new FormData();
                formData.append('name', this.name);

                try {
                await fetch('http://127.0.0.1:3000/classes', {
                    method: 'POST',
                    body: formData
                })

                this.message = "Class has been sucessfully created."
                this.$router.push('/classes')
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