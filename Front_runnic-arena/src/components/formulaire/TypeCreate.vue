<template>
    <div>
        <h1>Page Création type</h1>
        <form method="post" enctype="multipart/form-data">
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    v-model="name"
                />
                <input
                    type="text"
                    placeholder="Couleur du type"
                    v-model="colortype"
                />
            </div>
            <div>
                <button @click="addType">Add</button>
            </div>
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
            async addType(e) {
                e.preventDefault()

                let formData = new FormData();
                formData.append('name', this.name);
                formData.append('colortype', this.colortype);
                try {
                await fetch('http://127.0.0.1:3000/types', {
                    method: 'POST',
                    body: formData
                })

                this.message = "Type has been sucessfully created."
                this.$router.push('/types')
            } catch (error) {
                this.message = error.response.data.message
            }
            }
            
        }
    }
</script>