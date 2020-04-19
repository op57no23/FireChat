<template>
    <div class="Chat">
        <b-container>
            <ChatItem v-for="message in channelMessages" :key=message.id :messageUser="message.user" :user="user" :messageUserName="message.userName" :messageText="message.text" :messageDate="message.date"></ChatItem>

        </b-container>
        <ChatBar @new_message="new_message" :userName="userName" :channel="channel" :user="user"></ChatBar>

    </div>
</template>

<script>
import ChatItem from './ChatItem.vue'
import ChatBar from './ChatBar.vue'

export default {
    components: {
        ChatItem,
        ChatBar
    },
    props: ['channelMessages', 'channel', 'userName', 'user'],
    methods: {
        //propagating emit from chatBar
        new_message: function(message) {
            this.$emit('new_message', message);
        }
    },
    updated: function() {
        //resetting scrolling to bottom after message submit
        this.$nextTick(() => {
            var container = this.$el.querySelector('.container');
            container.scrollTop = container.scrollHeight;
        })
    }
}
</script>

<style>
.Chat .container {
    height: 90%;
    overflow-y: scroll;
}

.ChatBar {
    height: 10%;
    display: flex;
    justify-content: center;
}

.Chat {
    height: 100%;
}

.ChatBar form {
    width: 100%;
}
</style>