<template>
    <div class="container">
        <form method="post" enctype="multipart/form-data">
            <div class="champ">
                <label>Nom du type</label>
                <input
                    type="text"
                    placeholder="Nom du type"
                    v-model="name"
                />
            </div>
            <div class="champ">
                <label>Couleur du type</label>
                <input
                    type="text"
                    placeholder="Couleur du type"
                    v-model="color"
                />
            </div>
            <div class="champ">
                <label>Icone du type (svg ou npg)</label>
                <input
                    type="file"
                />
            </div>
            <div>
                <button class="addType" @click="addCard">Créer le type</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
            }
        },
        methods: {
            async addCard(e) {
                e.preventDefault()

                let formData = new FormData();
                formData.append('name', this.name);

                try {
                await fetch('http://127.0.0.1:3000/types', {
                    method: 'POST',
                    body: formData
                })

                this.message = "Card has been sucessfully created."
                this.$router.push('/types')
            } catch (error) {
                this.message = error.response.data.message
            }
            }
            
        }
    }
</script>

<style>
.container {
    padding: 50px;
    max-width: 50%;
}
    .champ{
        display: flex;
        flex-direction: column;
        padding: 15px 0;
    }
    .champ input {
        margin-top: 5px;
        background-color: #FFF1DB;
        padding: 10px;
        border-radius: 5px;
        border: none;
    }
    .addType{
        margin-top: 50px;
        background-color: #FFF1DB;
        padding: 10px 50px;
        border: none;
        border-radius: 5px;
    }
</style>