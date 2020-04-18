<template>
	<div class = "Channels">
	<b-row class = "m-3">
		<h4>Channels</h4>
		<div>
		<b-button variant = "outline-dark" v-b-modal.modal-1><b-icon icon="plus-square"></b-icon></b-button>

		<b-modal id="modal-1" title="New Channel" @hidden="resetModal" @ok = "handleOk">
		<b-form @submit.prevent>
      <b-form-group
        id="input-group-1"
        label="Channel Name"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.channel"
          type="text"
          required
          placeholder="Enter Channel Name"
        ></b-form-input>
      </b-form-group>
	</b-form>
	<div v-if="emptyForm" class="text-danger"> Please enter a channel name </div>

		</b-modal>
		</div>
	</b-row>
	<b-row class = "m-3">
		<b-list-group>
			<b-list-group-item button :class = "{ active: activeChannel === channel.id}" @click="get_channel" v-for="channel in channels" :key="channel.id" :id = "channel.id"> 
				{{channel.name}}
			</b-list-group-item>
		</b-list-group>
			<ul v-if="errors">
			<li v-for="error of errors" :key="error">
			{{error.message}}
			</li>
		</ul>
	</b-row>


</div>
</template>

<script>

import {db} from '../db' 

export default {
	name: 'Channels',
	data () {
		return {
			channels: [],
			errors: [],
			emptyForm: false,
			activeChannel: null,
			form: {
					channel: ''
					}
		}
	},
	firestore: {
			channels: db.collection('channels'),
	},
	methods: {
			validate() {
				if (this.form.channel) {
					return true;
				}
				return false;
			},
			resetModal() {
				this.form.channel = '';
				this.emptyForm = false;
      },
			handleOk(evt) {
						evt.preventDefault();
						if (this.validate()) {
							db.collection('channels').doc().set({name: this.form.channel, messages: []}).then(function() {
								this.resetModal();
							})
					.catch(function (error) { this.errors.push(error)});
								this.$nextTick(() => {
									this.$bvModal.hide('modal-1');
								})
					}
						else {
							this.emptyForm = true;
						}
						
			},
			get_channel(evt) {
					this.activeChannel = evt.srcElement.id;
					this.$emit('change_channel', this.activeChannel);
			}
		}
}
</script>

<style>

.text-danger {
	text-align: center;
}
</style>
