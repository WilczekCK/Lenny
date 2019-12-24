$(window).on('load', _ => {
    var imageModal = imageModal || {};
    imageModal = {
        config: {
            clickableEl: '.meme__item',
            imageContainer: '.popup__image',
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
        appendImage: (image) => $(image).clone().appendTo(imageModal.config.imageContainer),
        clearContainer: _ => $(imageModal.config.imageContainer).html(''),
        showImage: (e) => {
            const image = imageModal.findImageOnClick(e);
            return imageModal.appendImage(image);
        },
        checkSiblings: (e) => {
            const path = imageModal.objectPathRecog(e);
            if(path.nextSibling !== null && path.nextSibling.nextSibling === null) $('.load__more__memes').trigger('click');

            imageModal.config.actualSiblings.previous = path.previousSibling;
            imageModal.config.actualSiblings.next = path.nextSibling;
        },
        prepareContainer: (e) => {
            imageModal.clearContainer()
            imageModal.showImage(e)
            imageModal.checkSiblings(e)
        },
        objectPathRecog: function (e) {
            //recognize if element is clicked by mouse or 
            //moved by keys.
            let path = $(e)[0].currentTarget;
            if (!$(e)[0].currentTarget) path = $(e)[0];

            return path;
        }

    }


    //listeners

    $(document).on('click', imageModal.config.clickableEl, (e) => {
        if (!imageModal.isLoveButtonClicked(e)) {
            imageModal.prepareContainer(e);

            $(imageModal.config.imageContainer).modal({
                fadeDuration: 100
            });

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

        return 0;
    })

    //listeners
})