<template>

    <div>
        <h1> Création d'une capacitée</h1>

        <form class="form" method="post" enctype="multipart/form-data">
            <div class="form-section">
                <label>Nom de la capacitée</label>
                <input
                    type="text"
                    placeholder="Nom de la capacitée"
                    v-model="name"
                />
            </div>
            <div class="form-section">
                <label>description de la capacitée</label>
                <input
                    type="text"
                    placeholder="Nom de la capacitée"
                    v-model="description"
                />
            </div>
            <div class="form-section">
                <label>valeur de la capacitée</label>
                <input
                    type="text"
                    placeholder="valeur de la capacitée"
                    v-model="value"
                />
            </div>
            <div class="form-section">
                <label>Etat de la capacitée</label>
                <input
                    type="text"
                    placeholder="etat de la capacitée"
                    v-model="state"
                />
            </div>
            <button @click="add">Créer capacitée</button>

          
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                description: '',
                value: null,
                state: ''
            }
        },
        methods: {
            async add(e) {
                e.preventDefault()

                let formData = new FormData();
                formData.append('name', this.name);
                formData.append('description', this.description);
                formData.append('value', this.value);
                formData.append('state', this.state);

                try {
                await fetch('http://127.0.0.1:3000/ability', {
                    method: 'POST',
                    body: formData
                })

                this.message = "Ability has been sucessfully created."
                this.$router.push('/abilities')
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