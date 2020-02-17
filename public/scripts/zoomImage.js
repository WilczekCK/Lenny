$(window).on('load', function () {
    var zoomImage = zoomImage || {};
    zoomImage = {
        config: {
            clickableEl: '.meme__item',
            fadeSpeed: 50,
        },
        getMemeID: function (clickedEl) {
            if($(clickedEl)[0].localName == 'i' || $(clickedEl)[0].className == 'pp__amount') return 0;
            //likes click to not open modal
            
            if ($(clickedEl).hasClass('meme__item')) {
                return $(clickedEl).find('.pp__counter')[0].attributes.meme_id.value;
            } else {
                return $(clickedEl.offsetParent).find('.pp__counter')[0].attributes.meme_id.value;
            }
        },
        displayModal: function (memeInfo) {
            $('.meme__info__modal__desc--title').html(memeInfo.title)
            $('.meme__info__modal__desc--author').html(memeInfo.info)
            $('.meme__info__modal__desc--tags').html(`<span>${memeInfo.tags}</span>`)
            $('.meme__info__modal__desc--likes .pp__counter').attr('meme_id', memeInfo.id)
            $('.meme__info__modal__desc--likes .pp__counter').html(memeInfo.likes)

            if(memeInfo.videoLink){
                $('.meme__info__modal__desc--sharebox').html(`<div class="fb-share-button" data-href="https://www.facebook.com/sharer/sharer.php?u=${memeInfo.videoLink}&amp;src=sdkpreparse" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${memeInfo.videoLink}&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>`)
                $('.meme__info__modal__media').html(`<iframe src='${memeInfo.videoLink}' frameborder='0' />`)
            }else{
                $('.meme__info__modal__desc--sharebox').html(`<div class="fb-share-button" data-href="${window.location.href}uploads/${memeInfo.id}.jpg" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${window.location.href}uploads/${memeInfo.id}.jpg&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">SHARE</a></div>`)
                $('.meme__info__modal__media').html(`<img src=/uploads/${memeInfo.id}.jpg />`)
            }
            

            $("#modal__meme__info").modal({
                fadeDuration: zoomImage.config.fadeSpeed
            });
        },
        checkIfVideo: function(memeInfo){
            const detailsSibling = $(memeInfo).siblings()[0];
            if(detailsSibling.localName == 'iframe') return detailsSibling.src;
            else return false;
        },
        getDetailedInfo: function (memeID) {
            const memeDetails = $('.meme__container').find(`[meme_id="${memeID}"]`)[0].offsetParent;
            console.log(memeDetails.children);


            const memeInfo = {
                id: memeID,
                tags: memeDetails.children[0].innerHTML,
                likes: memeDetails.children[1].innerHTML,
                title: memeDetails.children[2].innerHTML,
                info: memeDetails.children[3].innerHTML
            }

            if(zoomImage.checkIfVideo(memeDetails)){
                memeInfo.videoLink = zoomImage.checkIfVideo(memeDetails);
            }

            return memeInfo;
        }
    }

    $(document).on('click', zoomImage.config.clickableEl, function (e) {
        var getMemeID = zoomImage.getMemeID(e.target);
        if(getMemeID == 0) return 0;

        var getMemeInfo = zoomImage.getDetailedInfo(getMemeID)
        zoomImage.displayModal(getMemeInfo);

        //for loading comments - fetches.js
        $('.show__comments').attr('meme_id', getMemeID);
        $('.show__comments').trigger('click', function(){});
    })
})