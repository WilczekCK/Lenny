$('.logged__add__meme').click(_ => {
    $("#modal__add__meme").modal({
        fadeDuration: 100
    });
})

//slideshow of memes, disable
$('.popup__image').on($.modal.CLOSE, function(event, modal) {
    $(document).off("keydown");
});