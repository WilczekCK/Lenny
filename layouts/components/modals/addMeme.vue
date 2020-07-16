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
                        button(class="modal-default-button" @click="changeModalStatus()")
                            ="CLOSE"
</template>

<script>
export default {
    props: ['modalStatus'],
    data: () => {
        return {
            modalState: false,
        }
    },
    watch: {
        modalStatus: function(){
            this.modalState = this.modalStatus;
        }
    },
    methods:{
        changeModalStatus: async function(){
            this.$emit('childStatusChanged', true)
            this.modalStatus = !this.modalStatus;
        }
    }
}
</script>

<style>

</style>