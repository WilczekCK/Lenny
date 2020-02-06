$(window).on('load', function () {
    var zoomImage = zoomImage || {};
    zoomImage = {
        config: {
            clickableEl: '.meme__item',
            fadeSpeed: 300,
        },
        getMemeID: function (clickedEl) {
            if($(clickedEl)[0].className == 'pp__amount') return 0;

            if ($(clickedEl).hasClass('meme__item')) {
                return $(clickedEl).find('.pp__counter')[0].attributes.meme_id.value;
            } else {
                return $(clickedEl.offsetParent).find('.pp__counter')[0].attributes.meme_id.value;
            }
        },
        displayModal: function (memeInfo) {
            $('.meme__info__modal__desc--title').html(memeInfo.title)
            $('.meme__info__modal__desc--author').html(memeInfo.info)
            $('.meme__info__modal__desc--tags').html(memeInfo.tags)
            $('.meme__info__modal__desc--likes').html(memeInfo.likes)
            $('.meme__info__modal__media').html(`<img src=/uploads/${memeInfo.id}.jpg />`)

            $("#modal__meme__info").modal({
                fadeDuration: zoomImage.config.fadeSpeed
            });
        },
        getDetailedInfo: function (memeID) {
            if(memeID == 0) return $.modal.close();
            const memeDetails = $('.meme__container').find(`[meme_id="${memeID}"]`)[0].offsetParent;

            const memeInfo = {
                id: memeID,
                tags: memeDetails.children[0].innerHTML,
                likes: memeDetails.children[1].innerHTML,
                title: memeDetails.children[2].innerHTML,
                info: memeDetails.children[3].innerHTML
            }

            return memeInfo;
        }
    }

    $(document).on('click', zoomImage.config.clickableEl, function (e) {
        var getMemeID = zoomImage.getMemeID(e.target);
        var getMemeInfo = zoomImage.getDetailedInfo(getMemeID)
        
        zoomImage.displayModal(getMemeInfo);
    })
})