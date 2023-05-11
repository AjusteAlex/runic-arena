<template>
    <div>
        <h1> Mise a jour de la capacitée</h1>
        <form class="form" @submit.prevent enctype="multipart/form-data">
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
            <button @click="update">Modifier la capacitée</button>

          
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
            async update(){
                const id = this.$route.params.id
                const abilityData = {
                    name: this.name,
                    description: this.description,
                    value: this.value,
                    state: this.state,
                }

                await fetch(`http://localhost:3000/ability/${id}`, {
                    method: "put",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(abilityData),

                } )
                this.$router.push('/abilities')
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