$(document).ready(function () {
    var fetches = fetches || {};
    fetches = {
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


    $(document).on('click', fetches.likesFetch.config.buttonName, (e) => {
        fetches.likesFetch.giveLike(e)
    })
})