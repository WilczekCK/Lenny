$(window).on('load', _ => {
    var imageModal = imageModal || {};
    imageModal = {
        config: {
            clickableEl: '.meme__item',
            mainContainer: '.meme__modal',
            imageContainer: '.meme__modal__image',
            infoContainer: '.meme__modal__desc',
            ppButton: '.pp__counter',
            actualSiblings: {
                previous: '',
                next: ''
            }
        },
        isLoveButtonClicked: (e) => {
            if (`.${e.target.className}` == `${imageModal.config.ppButton}`) {
                return true;
            }

            return false;
        },
        findImageOnClick: (e) => {
            const path = imageModal.objectPathRecog(e);

            const childImage = $(path).find('img')[0];
            return childImage;
        },
        findDescOnClick: (e) => {
            const path = imageModal.objectPathRecog(e);

            const childDesc = {author_id:$(path).find('h2')[0], pp:$(path).find('.pp_button')[0].innerHTML}
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
        showImage: (itemSelected) => {
            const image = imageModal.findImageOnClick(itemSelected);
            return imageModal.appendImage(image);
        },
        showDesc: (e) => {
            const desc = imageModal.findDescOnClick(e);
            return imageModal.appendDesc(desc);
        },
        checkSiblings: (e) => {
            const path = imageModal.objectPathRecog(e);
            if (path.nextSibling === null || path.nextSibling.nextSibling === null) {
                $('.load__more__memes').trigger('click')
            }

            // if($(path.previousSibling).css('display') != 'block'){
            //     return imageModal.checkSiblings(path.nextSibling)
            // }
            
            imageModal.config.actualSiblings.previous = path.previousSibling;
            imageModal.config.actualSiblings.next = path.nextSibling;
        },
        prepareContainer: (e) => {
            imageModal.clearContainer()
            imageModal.showImage(e)
            imageModal.showDesc(e)
            imageModal.checkSiblings(e)
        },
        objectPathRecog: function (e) {
            //recognize if element is clicked by mouse or 
            //moved by keys.
            let path = $(e)[0].currentTarget;
            if (!$(e)[0].currentTarget) path = $(e)[0];

            return path;
        },
        arrowsNavigation: _ => {
            $(document).on("keydown", (e) => {
                const keyClicked = e.originalEvent.key;
                
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
    $(document).on('click', imageModal.config.clickableEl, (e) => {
        if (!imageModal.isLoveButtonClicked(e) && !isMobile) {
            imageModal.prepareContainer(e);
            imageModal.arrowsNavigation();

            $(imageModal.config.mainContainer).modal({
                fadeDuration: 100
            });
        }
        return 0;
    })

    //listeners
})