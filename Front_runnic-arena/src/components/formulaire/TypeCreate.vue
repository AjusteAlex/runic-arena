<template>
    <div>
        <h1>Page Création type</h1>
        <form>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    v-model="name"
                />
            </div>
            <button @click="postData">Envoyer</button>
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
            postData() {
                const postData = {
                    name: this.name,
                };
                console.log(postData)
                fetch( 'http://localhost:3000/types', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify( postData )
                } )
                // .then( function( response ){
                //     if( response.status != 201 ){
                //         this.fetchError = response.status;
                //     }else{
                //         response.json().then( function( data ){
                //             this.fetchResponse = data;
                //         }.bind(this));
                //     }
                // }.bind(this));
            }
        }
    }
</script>