$(window).on('load', function(){
    var zoomImage = zoomImage || {};
        zoomImage = {
            config:{
                clickableEl: $('.meme__item'),
                fadeSpeed: 300,
            },
            getMemeID: function(){

            }
        }

        $(zoomImage.config.clickableEl).on('click', function(e){
            console.log(e)
        })
})