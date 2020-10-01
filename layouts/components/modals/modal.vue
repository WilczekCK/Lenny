<template lang="pug">
    transition(name="modal" v-if="this.modalState")
        .modal__mask()
            .modal__mask__wrapper
                .modal__mask__wrapper__container
                    button(class="modal-default-button" @click="changeState()")
                        i(class="fas fa-times")
                    .modal__mask__wrapper__container--header
                    .modal__mask__wrapper__container--body
                        formComp
                    .modal__mask__wrapper__container--footer
</template>

<script>
import axios from 'axios'
import formComp from "../forms/main.vue";
export default {
    components: {
        formComp
    },
    data: function(){
        return{
            modalState: this.$store.state.modalState
        }
    },
    watch: {
        storeModalState: function(newVal, oldVal){
            this.modalState = newVal;
        }
    },
    computed: {
        storeModalState: function(){
            return this.$store.state.modalState;
        }
    },
    methods:{
        changeState: function(){
            this.$store.commit('modalToggle', 'avatar');
            this.modalState = this.$store.state.modalState;
        }
    },

}
</script>

<style>

</style>