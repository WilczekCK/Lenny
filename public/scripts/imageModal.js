$(window).on('load', _ => {
    var imageModal = imageModal || {};
    imageModal = {
        config: {
            clickableEl: '.meme__item',
            mainContainer: '.meme__modal',
            imageContainer: '.meme__modal__image',
            infoContainer: '.meme__modal__desc',
            ppButton: '.pp__counter',
            actualItem: '',
            actualSiblings: {
                previous: '',
                next: ''
            }
        },
        isLoveButtonClicked: (loveIcon) => {
            //recognize, if you clicked in
            //the like icon (trigger to like meme) or image (triggers the modal)
            //prevent turning on pp modal if you already liked the meme

            console.log(loveIcon)
            if (`.${loveIcon.target.offsetParent.className}` == `${imageModal.config.ppButton}`) {
                return true;
            }

            return false;
        },
        findImageOnClick: (meme_image) => {
            const path = imageModal.objectPathRecog(meme_image);

            const childImage = $(path).find('img')[0];
            return childImage;
        },
        findDescOnClick: (meme_desc) => {
            const path = imageModal.objectPathRecog(meme_desc);

            //, pp: $(path).find('.pp__counter')[0].innerHTML - if you want pp to display
            const childDesc = { author_id: $(path).find('.info') }
            return childDesc;
        },
        appendImage: (image) => $(image).clone().appendTo(imageModal.config.imageContainer),
        appendDesc: (desc) => {
            $(desc.pp).clone().appendTo(imageModal.config.infoContainer)
            $(desc.author_id).clone().appendTo(imageModal.config.infoContainer)
        },
        clearContainer: _ => {
            $(imageModal.config.imageContainer).html('');
            $(imageModal.config.infoContainer).html('');
        },
        showImage: (meme_item) => {
            const image = imageModal.findImageOnClick(meme_item);
            return imageModal.appendImage(image);
        },
        showDesc: (meme_item) => {
            const desc = imageModal.findDescOnClick(meme_item);
            return imageModal.appendDesc(desc);
        },
        checkSiblings: (meme_item) => {
            const path = imageModal.objectPathRecog(meme_item);
            imageModal.config.actualItem = $(path);
            imageModal.config.actualSiblings.previous = $(path).prev(":visible");
            imageModal.config.actualSiblings.next = $(path).next(":visible");


            if (typeof $(path).next(":visible").val() == 'undefined') {
                $('.load__more__memes').trigger('click');
                imageModal.config.actualSiblings.next = null;
            } 
            
            if (typeof $(path).prev(":visible").val() == 'undefined') {
                imageModal.config.actualSiblings.previous = null;
            }

        },
        prepareContainer: (meme_container) => {
            imageModal.clearContainer()
            imageModal.showImage(meme_container)
            imageModal.showDesc(meme_container)
            imageModal.checkSiblings(meme_container)
        },
        objectPathRecog: function (meme_item) {
            //recognize if element is clicked by mouse or 
            //moved by keys.
            let path = $(meme_item)[0].currentTarget;
            if (!$(meme_item)[0].currentTarget) path = $(meme_item)[0];

            return path;
        },
        checkIfFetched: () => {
            if($(imageModal.config.actualItem).next(":visible")[0]){
                imageModal.config.actualSiblings.next = $(imageModal.config.actualItem).next(":visible")
            } 
        },
        arrowsNavigation: _ => {
            $(document).off("keydown").on('keydown', (keyboardClick) => {
                const keyClicked = keyboardClick.originalEvent.key;

                if(imageModal.config.actualSiblings.next === null){
                    imageModal.checkIfFetched();
                }

                switch (keyClicked) {
                    case 'ArrowRight':
                        if (imageModal.config.actualSiblings.next === null) return 0;
                        imageModal.prepareContainer(imageModal.config.actualSiblings.next)
                        break;
                    case 'ArrowLeft':
                        if (imageModal.config.actualSiblings.previous === null) return 0;
                        imageModal.prepareContainer(imageModal.config.actualSiblings.previous)
                        break;
                }

            })
        }

    }


    //listeners
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    $(document).on('click', imageModal.config.clickableEl, (clicked_meme) => {
        if (!imageModal.isLoveButtonClicked(clicked_meme) && !isMobile) {
            imageModal.prepareContainer(clicked_meme);
            imageModal.arrowsNavigation(clicked_meme);

            $(imageModal.config.mainContainer).modal({
                fadeDuration: 100
            });
        }
        return 0;
    })

    //listeners
})