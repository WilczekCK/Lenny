$(window).on('load', function () {
    var zoomImage = zoomImage || {};
    zoomImage = {
        config: {
            clickableEl: $('.meme__item'),
            fadeSpeed: 300,
        },
        getMemeID: function (clickedEl) {
            if($(clickedEl)[0].className == 'pp__amount' || $(clickedEl)[0].className == 'meme__container') return 0;
            
            if ($(clickedEl).hasClass('meme__item')) {
                return $(clickedEl).find('.pp__counter')[0].attributes.meme_id.value;
            } else {
                return $(clickedEl.offsetParent).find('.pp__counter')[0].attributes.meme_id.value;
            }
        }
    }

    $(document).on('click', zoomImage.config.clickableEl, function (e) {
        if ($(e.target)) zoomImage.getMemeID(e.target);
    })
})