<template>
    <div>
        <h1> Mise a jour de la compétence</h1>
        <form class="form" @submit.prevent enctype="multipart/form-data">
            <div class="form-section">
                <label>Nom de la compétence</label>
                <input
                    type="text"
                    placeholder="Nom de la compétence"

                    v-model="name"
                />
            </div>
            <div class="form-section">
                <label>Attribue</label>
                <input
                    type="text"
                    placeholder="Attribue"
                    v-model="attribute"
                />
            </div>
            <div class="form-section">
                <label>description</label>
                <input
                    type="text"
                    placeholder="description"
                    v-model="description"
                />
            </div>
            <button @click="updateSkill">Modifier le type</button>

          
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                attribute: '',
                description: ''
            }
        },
        methods: {  
            async updateSkill(){
                const id = this.$route.params.id
                const skillData = {
                    name: this.name,
                    attribute: this.attribute,
                    description: this.description,
                }

               
                await fetch(`http://localhost:3000/skill/${id}`, {
                    method: "put",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(skillData),

                } )
                this.$router.push('/skills')
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