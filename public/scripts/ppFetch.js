$(document).ready(function(){
    $('.pp_button').on('click', (e) => {
        if($('.menu__meme__button').length == 0) return $('#alert__not__logged').modal({
            fadeDuration: 100
        });

        const meme_id = $(e.currentTarget).parent().parent().parent()[0].attributes.meme_id.nodeValue;
        fetch(`meme/like/${meme_id}`,{
            method: "post",
        })
        .then(resp => resp.json())
        .then(resp => {
            let actualLikes = 0;
            if(resp) return $("#alert__already__gave__pp").modal({
                fadeDuration: 100
            });
            actualLikes = parseInt($(e.currentTarget).find('.pp__counter')[0].innerHTML) + 1;
            $(e.currentTarget).find('.pp__counter')[0].innerHTML = actualLikes;
        })
    })
})