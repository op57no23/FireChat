<template>
    <div class="ChatBar">
        <b-form inline @submit.prevent="submitMessage">
            <b-form-input class="flex-fill" v-model="form.chatMessage" placeholder="Type your message"></b-form-input>
            <b-button variant="primary" type="submit">Submit</b-button>
        </b-form>

    </div>
</template>

<script>
    import {
        db,
        Timestamp
    } from '../db'
    import firebase from 'firebase'

    export default {

        data() {
            return {
                form: {
                    chatMessage: ''
                }
            }
        },
        methods: {
            submitMessage: function() {
					//creating new message document
                const messageId = db.collection('messages').doc().id;
                db.collection('messages').doc(messageId).set({
                    user: this.user,
                    userName: this.userName,
                    text: this.form.chatMessage,
                    channel: db.collection('channels').doc(this.channel),
                    date: Timestamp.fromDate(new Date())
                });
				//adding message reference to channel document
                db.collection('channels').doc(this.channel).update({
                    messages: firebase.firestore.FieldValue.arrayUnion(db.collection('messages').doc(messageId))
                });
				//resetting form
                this.form.chatMessage = '';
            }
        },
        props: ['channel', 'user', 'userName']
    }
</script>
