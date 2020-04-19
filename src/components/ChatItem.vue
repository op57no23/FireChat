<template>
    <div class="ChatItem mt-2">
        <!--right side for messages from current use. Hover to show time-->
        <b-row v-if="messageUser === user" id="right">
            <b-col cols="6"></b-col>
            <b-col cols="6" @mouseover="hover=true" @mouseleave="hover=false">
                <small class="font-weight-bolder"> Me </small><br>
                <small v-if="hover"> {{formatDate(messageDate)}}</small>
                <p> {{messageText}} </p>

            </b-col>
        </b-row>
        <!--left side for messages from others. Hover to show time-->
        <b-row v-else id="left">
            <b-col cols="6" @mouseover="hover=true" @mouseleave="hover=false">
                <small class="font-weight-bolder"> {{messageUserName}} </small><br>
                <small v-if="hover"> {{formatDate(messageDate)}} </small>
                <p> {{messageText}} </p>
            </b-col>
            <b-col cols="6"></b-col>
        </b-row>
    </div>

</template>

<script>
export default {
    data() {
        return {
            hover: false,
        }
    },
    methods: {
        //regex to format timestamp
        formatDate: function(date) {
            const dateString = date.toDate().toString().substring(4);
            return /.*(?=:)/.exec(dateString).toString();
        }
    },
    props: ['messageText', 'user', 'messageUser', 'messageDate', 'messageUserName']
}
</script>

<style>
.col {
    min-width: 50%;
}

#right {
    text-align: right;
}

#left {
    text-align: left;
}
</style>