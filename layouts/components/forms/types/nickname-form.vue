<template lang="pug">
    .meme__uploader__form(v-if="isPageLoaded")
        h3(v-if="checkIfDelayPassed(nickname_delay)")="You are able to change the nickname!"
        h3(v-else)="You are not able to change the nickname!"
        small="You can do this once a week!"

        label(for="nickname" v-if="checkIfDelayPassed(nickname_delay)")
        input(type="text" v-if="checkIfDelayPassed(nickname_delay)" v-model="nickname" id="nickname" placeholder="Your new nickname!" @change="$emit('inputChanged', {paramToChange: 'nickname', value: nickname})")
    .meme__uploader__form(v-else)
        h3="Wait... loading!"
</template>

<script>
import moment from 'moment'
export default {
    name:'nicknameForm',
    data (){
        return {
            nickname: undefined,
            user_id: this.$route.params.id,
            nickname_delay: null,
            isPageLoaded: false,
        }
    },
    async mounted (){
        await this.$axios
            .get(`/api/users/${this.user_id}`)
            .then(({data}) =>{
                this.nickname_delay = data.data.nickname_delay
            })

        this.isPageLoaded = true;
    },
    methods:{
        refreshInputs () {
            this.$emit('inputChanged', {paramToChange: 'nickname', value: ''}),
            this.nickname = ''
        },
        checkIfDelayPassed (date){
            if(!date || this.$store.state.isLogged.role === 1) return true;
            
            const today = moment();
            return today.isAfter(date);
        },
    }
}
</script>

<style>

</style>