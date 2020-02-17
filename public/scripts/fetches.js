$(document).ready(function () {
    var fetches = fetches || {};
    fetches = {
        commentsFetch: {
            config:{ 
                userID: '.userId__comments',
                postCommentButton: '.post__comment',
                postCommentContainer: '.container__comment',
                commentsLoadButton: '.show__comments',
                commentsContainer: '.meme__info__modal__desc--comments--container',
                commentsInput: '.meme__info__modal__desc--comments--input',
            },
            clearCommentContainer: _ => $(fetches.commentsFetch.config.commentsContainer).html(''),
            getComments: (meme_id) => {
                fetches.commentsFetch.clearCommentContainer();
                fetch(`meme/comments/load/${meme_id}`, {
                    method: "GET",
                })
                .then(resp => resp.json())
                .then(resp => {
                    $(resp).each(function(index){
                        $(fetches.commentsFetch.config.commentsContainer).append(`
                            <div class="single__comment" data-comment-id="${resp[index].id}" data-author-id="${resp[index].ingame_id}">
                                <div class="single__comment__avatar" style="background-image:url(https://a.ppy.sh/${resp[index].ingame_id})"></div>
                                    <div class="single__comment__column">
                                        <div class="single__comment__column__username"><a href="/profile/${resp[index].ingame_id}">${resp[index].username}</a> replied:</div>
                                        <div class="single__comment__column__content">${resp[index].content}</div>
                                    </div>
                            </div>
                        `)

                        $('.single__comment').fadeTo('fast', 1);
                    })

                    fetches.commentsFetch.prepareDeleteButtons();
                })
            },
            postComment: (meme_id, comment) => {
                if(fetches.commentsFetch.checkDelayBetweenComments('commentPosted')) return myAlert("You send or tried to comment recently, wait a moment!", "myalert-danger");
                if(comment.length < 5) return myAlert("Your comment is too short!", "myalert-danger");

                fetch(`meme/comments/post/${meme_id}`, {
                    method: "POST",
                    headers:{
                        content: comment
                    }
                })  
                .then(resp => resp.json())
                .then(resp => {
                    //check if is not banned
                    fetches.commentsFetch.setDelayBetweenComments();

                    if(resp){
                        fetches.commentsFetch.clearCommentContainer();
                        fetches.commentsFetch.getComments(meme_id);    
                        return myAlert('You successfully posted a comment!', "myalert-success")
                    }else{
                        return myAlert('You are banned! Unauthorized to do that!', "myalert-danger")
                    }
                })
            
            },
            deleteComment: (comment_id, actual_user) => {
                if (confirm('Are you sure that you want to remove comment?')) {
                    fetch(`meme/comments/delete/${comment_id}`, {
                        method: "DELETE",
                        headers:{
                            comment_id: comment_id,
                            actual_user: actual_user
                        }})
                        .then(resp => resp.json())
                        .then(resp => {
                            //check, if comment which will be deleted is asked by the comment owner
                            if(resp){
                                $(`.single__comment[data-comment-id="${comment_id}"]`).fadeOut();
                                return myAlert('You successfully removed a comment!', "myalert-success")
                            }else{
                                return myAlert('Something gone wrong, unauthorized to do that!', "myalert-danger")
                            }
                        })
                } else {
                    return 0
                }
            },
            setDelayBetweenComments: () => {
                var d = new Date();
                d.setTime(d.getTime() + 30000);
                var expires = "expires="+ d.toUTCString();
                document.cookie =  "commentPosted=true;" + expires + ";path=/";
            },
            checkDelayBetweenComments: (name) => {
               return document.cookie.replace(/(?:(?:^|.*;\s*)commentPosted\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            },
            prepareDeleteButtons: () => {
                //if it's admin
                if($('.modal__selection__admin').length > 0){
                    $('.single__comment__column').append(`
                        <button class="remove__comment">remove comment</button>
                    `);
                }else{
                    var getLoggedUserID = $('.menu__container__wrap__menu__user a').attr('data-attr-user-id');
                    $('.single__comment').each(function () {
                        if(getLoggedUserID == $(this).attr('data-author-id')){
                            $(this).find('.single__comment__column').append(`
                                <button class="remove__comment">remove comment</button>
                            `);
                        }
                    })
                }

            },
            
        },
        likesFetch : {
            config: {
                fadeTime: 300,
                buttonName: '.pp__counter',
                counterSelector: '.pp__amount',
                popupNotLogged: '.alert__not__logged',
                popupGavePP: '.alert__already__gave__pp',
                isLogged: '.logged__add__meme',
            },
            memeLiked: (el) => {
                let getID = $(el.target)[0];
                return $(getID.offsetParent.offsetParent).find(fetches.likesFetch.config.buttonName)[0].attributes.meme_id.nodeValue;
            },
            giveLike: (el) => {
                if ($(fetches.likesFetch.config.isLogged).length == 0) return myAlert("You have to be logged to like memes!", "myalert-danger");
                fetch(`meme/like/${fetches.likesFetch.memeLiked(el)}`, {
                    method: "PATCH",
                })
                    .then(resp => resp.json())
                    .then(resp => {
                        let actualLikes = 0;
                        if (resp) return myAlert("You already gave PP for this meme!", "myalert-warning");
                        actualLikes = parseInt($('.meme__item').find(`[meme_id="${fetches.likesFetch.memeLiked(el)}"]`).find(fetches.likesFetch.config.counterSelector)[0].innerHTML) + 1;

                        $('body').find(`[meme_id="${fetches.likesFetch.memeLiked(el)}"]`).find(fetches.likesFetch.config.counterSelector).each(function () {
                            this.innerHTML = actualLikes;
                        })
                    })
            }
        }
    }


    //likes
    $(document).on('click', fetches.likesFetch.config.buttonName, (e) => {
        fetches.likesFetch.giveLike(e)
    })

    //getcomments
    $(document).on('click', fetches.commentsFetch.config.commentsLoadButton, (e) => {
        let memeID = e.currentTarget.attributes.meme_id.value;
        fetches.commentsFetch.getComments(memeID);
    })

    //removecomment
    $(document).on('click', 'button.remove__comment', (e) =>{
        let parentComment = e.currentTarget.parentNode.parentNode;
        var authorIDComment = $(parentComment).attr('data-author-id')
        fetches.commentsFetch.deleteComment($(parentComment).attr('data-comment-id'), authorIDComment);
    })

    //postcomment
    $(document).on('click', fetches.commentsFetch.config.postCommentButton, (e) => {
        e.preventDefault();
        let comment = $(fetches.commentsFetch.config.postCommentContainer)[0].value;
        let memeID = $(fetches.commentsFetch.config.commentsLoadButton)[0].attributes.meme_id.value;
        
        fetches.commentsFetch.postComment(memeID, comment);
    })


})