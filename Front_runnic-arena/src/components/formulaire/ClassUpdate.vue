<template>
    <div>
        <h1> Mise a jour de la classe</h1>
        <form class="form" @submit.prevent enctype="multipart/form-data">
            <div class="form-section">
                <label>Nom de la classe</label>
                <input
                    type="text"
                    placeholder="Nom de la classe"
                    v-model="name"
                />
            </div>
            <button @click="update">Modifier la classe</button>

          
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
            async update(){
                const id = this.$route.params.id
                const classData = {
                    name: this.name,
                }

                await fetch(`http://localhost:3000/classes/${id}`, {
                    method: "put",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(classData),

                } )
                this.$router.push('/classes')
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