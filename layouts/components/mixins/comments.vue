<template lang="pug">
    .comment__feature
      h3="Comments:"
      .comment__feature--list(v-if="this.comments")
        .comment__feature--list__comment(v-for="comment in this.comments")
          .comment__avatar
            img(src="~/assets/img/logo.png")
          .comment__content
            .comment__content__socials
              .comment__content__socials--author {{comment.username}} 
              .comment__content__socials--date {{moment(comment.date)}}
            .comment__content--text  {{comment.content}}
      .comment__feature--noComments(v-else)
        h3="No comments yet - be first to do it!"
      .comment__feature--newComment
</template>

<script>
import moment from "moment";
export default {
  props: ['commentList'],
  data: function() {
    return {
      comments: this.commentList
    }
  },
  methods: {
    moment: function(date){
        const today = moment();
        const incomingDate = moment(date);
        return " · "+incomingDate.from(today);
    }
  }
}
</script>
