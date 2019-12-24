$(document).ready(function(){
    var imageModal = imageModal || {};
    imageModal = {
        config: {
            clickableEl : '.meme__item',
            imageContainer: '.popup__image',
            ppButton: '.pp__counter' 
        },
        isLoveButtonClicked: (e) => {
            if(`.${e.target.className}` == `${imageModal.config.ppButton}`){
                return true;
            }

            return false;
        },
        findImageOnClick: (e) => {
            const clickedEl = e.currentTarget;
            const childImage = $(clickedEl).find('img')[0];
            return childImage;
        },
        appendImage: (image) => {
            $(image).clone().appendTo(imageModal.config.imageContainer);
        },
        clearContainer: _ => {
            $(imageModal.config.imageContainer).html('');
        },
        showImage: (e) => {
            const image = imageModal.findImageOnClick(e);
            imageModal.appendImage(image);
        }
    }

    $(document).on('click', imageModal.config.clickableEl, (e) => {
        console.log(e)
        if(!imageModal.isLoveButtonClicked(e)){
            imageModal.clearContainer();
            imageModal.showImage(e)
            $(imageModal.config.imageContainer).modal({
                fadeDuration: 100
            });
        }

        return 0;
    })
})