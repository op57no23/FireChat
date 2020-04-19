<template>
    <div class="Channels">
        <b-row id="channelHeader" class="m-3">
            <h4>Channels</h4>
            <div>
                <b-button variant="outline-dark" v-b-modal.modal-1>
                    <b-icon icon="plus-square"></b-icon>
                </b-button>

                <b-modal id="modal-1" title="New Channel" @hidden="resetModal" @ok="handleOk">
                    <b-form @submit.prevent>
                        <b-form-group id="input-group-1" label="Channel Name" label-for="input-1">
                            <b-form-input id="input-1" v-model="form.channel" type="text" required placeholder="Enter Channel Name"></b-form-input>
                        </b-form-group>
                    </b-form>
                    <div v-if="emptyForm" class="text-danger"> Please enter a channel name </div>

                </b-modal>
            </div>
        </b-row>
        <b-row id="listChannels" class="m-3">
            <b-list-group>
                <b-list-group-item button :class="{ active: activeChannel === channel.id}" @click="get_channel" v-for="channel in channels" :key="channel.id" :id="channel.id">
                    {{channel.name}}
                </b-list-group-item>
            </b-list-group>
        </b-row>


    </div>
</template>

<script>
    import {
        db
    } from '../db'

    export default {
        name: 'Channels',
        data() {
            return {
                channels: [],
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
			//check if channel name input empty	
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
			//validates, creates, and closes modal
            handleOk(evt) {
                evt.preventDefault();
                if (this.validate()) {
                    db.collection('channels').doc().set({
                        name: this.form.channel,
                        messages: []
                    })
                    this.$nextTick(() => {
                        this.$bvModal.hide('modal-1');
                    })
                } else {
                    this.emptyForm = true;
                }

            },
			//sets active channel and updates channel messages data in Layout
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

    .row .m-3 * {
        max-width: 100%;
    }

    .Channels {
        height: 90%;
    }

    #channelHeader {
        height: 10%;
    }

    #listChannels {
        height: 85%;
        overflow-y: scroll;
    }
</style>
