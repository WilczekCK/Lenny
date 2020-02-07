$(document).ready(function(){
    var likesFetch = likesFetch || {};
    likesFetch = {
        config:{
            fadeTime: 300,
            buttonName: '.pp__counter',
            counterSelector: '.pp__amount',
            popupNotLogged: '.alert__not__logged',
            popupGavePP: '.alert__already__gave__pp',
            isLogged: '.logged__add__meme',
        },
        memeLiked: (el) => {
            let getID = $(el.target)[0];
            return $(getID.offsetParent.offsetParent).find(likesFetch.config.buttonName)[0].attributes.meme_id.nodeValue;
        },
        giveLike: (el) => {
            if($(likesFetch.config.isLogged).length == 0) return myAlert("You have to be logged to like memes!", "myalert-danger");
            fetch(`meme/like/${likesFetch.memeLiked(el)}`,{
                method: "PATCH",
            })
            .then(resp => resp.json())
            .then(resp => {
                let actualLikes = 0;
               // if(resp) return myAlert("You already gave PP for this meme!", "myalert-warning");             
                actualLikes = parseInt($('.meme__item').find(`[meme_id="${likesFetch.memeLiked(el)}"]`).find(likesFetch.config.counterSelector)[0].innerHTML) + 1;

                $('body').find(`[meme_id="${likesFetch.memeLiked(el)}"]`).find(likesFetch.config.counterSelector).each(function(){
                    this.innerHTML = actualLikes;
                })
            })
        }

    }


    $(document).on('click', likesFetch.config.buttonName , (e) => {
        likesFetch.giveLike(e)
    })
})