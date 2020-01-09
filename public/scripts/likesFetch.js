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
            return $(el.currentTarget)[0].attributes.meme_id.value;
        },
        giveLike: (el) => {
            if($(likesFetch.config.isLogged).length == 0) return $(likesFetch.config.popupNotLogged).modal({
                fadeDuration: likesFetch.config.fadeTime
            });

            fetch(`meme/like/${likesFetch.memeLiked(el)}`,{
                method: "PATCH",
            })
            .then(resp => resp.json())
            .then(resp => {
                let actualLikes = 0;

                if(resp) return $(likesFetch.config.popupGavePP).modal({
                    fadeDuration: likesFetch.config.fadeTime
                });

                actualLikes = parseInt($(el.currentTarget).find(likesFetch.config.counterSelector)[0].innerHTML) + 1;
                $(el.currentTarget).find(likesFetch.config.counterSelector)[0].innerHTML = actualLikes;
            })
        }

    }


    $(document).on('click', likesFetch.config.buttonName , (e) => {
        likesFetch.giveLike(e)
    })
})