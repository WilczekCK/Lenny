<template lang="pug">
    .comment__feature
      .comment__feature--list(v-if="this.comments")
        .comment__feature--list__comment(v-for="comment in this.comments")
          .comment__author {{comment.username}}
          .comment__date {{moment(comment.date)}}
          .comment__content {{comment.content}}
      .comment__feature--noComments(v-else)
        h2="No comments yet"
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
