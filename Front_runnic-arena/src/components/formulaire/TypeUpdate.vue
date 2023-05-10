<template>
    <div>
        <h1> Mise a jour Type</h1>
        <form class="form" @submit.prevent enctype="multipart/form-data">
            <div class="form-section">
                <label>Nom du type</label>
                <input
                    type="text"
                    placeholder="Name"
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
            <button @click="updateType">Modifier le type</button>
          
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
            async updateType(){
                console.log('ici')
                const id = this.$route.params.id
                const typeData = {
                    name: this.name,
                    colortype: this.colortype,
                }
                console.log(typeData)
               
                await fetch(`http://localhost:3000/types/${id}`, {
                    method: "put",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(typeData),
                } )
                this.$router.push('/types')
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