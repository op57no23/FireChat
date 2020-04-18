<template>
<div class="Layout">
<b-container>
<b-row id = "nav">
 <nav class = "navbar navbar-light bg-info">
	<b-navbar-brand>Chatroom</b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav right>
        <b-nav-item-dropdown>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{userName}}</em>
          </template>
          <b-dropdown-item>Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
  </nav>
  </b-row>
 <b-row id = "chatView">
<b-col cols = "3"><Channels @change_channel="change_channel"></Channels></b-col>
<b-col cols = "9">
	<Chat v-if = "current_channel" :channelMessages = "current_channel.messages" :channel = "current_channel.id" :user = "user" :userName="userName"></Chat>
	<h2 v-else>Please select a channel</h2>
</b-col>

</b-row>
 </b-container>  
</div>
</template>

<script>

import Channels from './Channels.vue'
import Chat from './Chat.vue'
import { db } from '../db'
import firebase from 'firebase/app'

const channels = db.collection('channels');



export default {

		data () {
				return {
						user: '', 
						userName: '',
						current_channel: null,
				}
		},
		components: {Channels, Chat},
		methods: {
			change_channel: function(id) {
					this.current_channel = id;
					this.$bind('current_channel', channels.doc(this.current_channel));
				},
},

		beforeCreate: function() {
			firebase.auth().onAuthStateChanged(user => {
						if (user) {
								db.collection('users').where('email','==', user.email).get().then(snapshot => {
									snapshot.forEach(doc => {
											this.userName = doc.get('name');
											this.user = doc.id;
									})	
		})

		}
				
			
				})
				}

		}
</script>
	
<style>

#nav {
	height: 10vh;
}
	
.navbar {
	width: 100%;
}

#chatView {
	height: 90vh;
}

#chatView * {
	margin: auto;
	max-height: 90vh;
}

.Channels {
	overflow-y: scroll;
}
.col-9 {
	height: 100%;
}

.col-9 h2 {
	position: absolute;
	top: 40%;
	left: 30%;	
}

</style>
