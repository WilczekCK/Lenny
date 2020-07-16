<template lang="pug">
    transition(name="modal" v-if="this.modalState")
        .modal__mask()
            .modal__mask__wrapper
                .modal__mask__wrapper__container
                    .modal__mask__wrapper__container--header
                        slot(class="header")
                            ='default header'
                    .modal__mask__wrapper__container--body
                        slot(class="body")
                            ="default body"
                    .modal__mask__wrapper__container--footer
                        slot(class="footer")
                            ="default footer"
                        button(class="modal-default-button" @click="changeState()")
                            ="CLOSE"
</template>

<script>
export default {
    data: function(){
        return{
            modalState: this.$store.state.addMemeModal
        }
    },
    watch: {
        storeModalState: function(newVal, oldVal){
            this.modalState = newVal;
        }
    },
    computed: {
        storeModalState: function(){
            return this.$store.state.addMemeModal;
        }
    },
    methods:{
        changeState: function(){
            this.$store.commit('addMemeModalTrigger');
            this.modalState = this.$store.state.addMemeModal;
        }
    }
}
</script>

<style>

</style>