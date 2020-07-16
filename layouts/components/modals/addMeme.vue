<template lang="pug">
    transition(name="modal" v-if="this.modalState")
        .modal-mask()
            .modal-wrapper
                .modal-container
                    .modal-header
                        slot(class="header")
                            ='default header'
                    .modal-body
                        slot(class="body")
                            ="default body"
                    .modal-footer
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