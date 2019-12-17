$(document).ready(function(){
    $('.pp_button').on('click', (e) => {
        if($('.menu__meme__button').length == 0) return alert('Only logged users can like memes!')

        const meme_id = $(e.currentTarget).parent().parent().parent()[0].attributes.meme_id.nodeValue;
        fetch(`meme/like/${meme_id}`,{
            method: "post",
        })
    })
})