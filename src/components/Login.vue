<template>
<div class = "Login">
    <b-container class = "mt-5">
    <h2> Chatroom </h2>
   <b-form @submit.prevent="login">
      <b-form-group
        id="input-group-1"
        label="Login"
        label-for="input-1"
      >
		<b-form-input
          id="input-1"
          v-model="form.email"
          type="text"
          required
          placeholder="Enter email"
        ></b-form-input>
     
        <b-form-input
          id="input-2"
          v-model="form.password"
          required
          type = "password"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <p>{{error}}</p>
  </b-container>

</div>

</template>


<script>

import firebase from 'firebase/app'
export default {
      data () {
        return {
          form: {
			email: '',
            password: ''

          },
          error: null
        }
      },
      methods: {
		login () {
			firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).catch(function(error) {
  // Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage);
  // ...
}) 
			.then(() => {
				this.$router.push({name: 'chat'});
			})
        }
      }
  }
</script>
