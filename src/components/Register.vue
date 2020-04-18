<template>
<div class = "Register">
  <b-container class = "mt-5">
    <h2> Chatroom </h2>
   <b-form @submit.prevent="register">
      <b-form-group
        id="input-group-1"
        label="Register"
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
          v-model="form.name"
          type="text"
          required
          placeholder="Enter Username"
        ></b-form-input>
  
        <b-form-input
          id="input-3"
          v-model="form.password"
          required
          type = "password"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <div class = "mt-4"> Already signed up? <router-link to="/login">Login here</router-link></div>
    <p>{{error}}</p>
  </b-container>

</div>

</template>


<script>
import firebase from 'firebase/app'
import {db} from '../db'

export default {
      data () {
        return {
          form: {
			email: '',
            name: '',
            password: ''
          },
          error: null
        }
      },
      methods: {
        register () {
				firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
	if (errorCode == 'auth/email-already-in-use') {
			alert('That email is already registered. Please login.')
			return false;
	}
	if (errorCode =='auth/invalid-email'){
			alert('Please enter a valid email');
			return false;
	}
   if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
	return false;
				}
				}
				)
			.then(() => {
					db.collection('users').doc().set({name: this.form.name, email: this.form.email});
					this.$router.push({name: 'login'});
			}
					)
        }
  }
}
</script>
<style>
form {
  width: 50%;
  margin: auto;
}
</style>
