$('.logged__add__meme').click(_ => {
    $("#modal__add__meme").modal({
        fadeDuration: 100
    });
})

$('.meme__loading__open').click(_ => {
    $(".meme__loading").modal({
        escapeClose: false,
        clickClose: false,
        showClose: false
    });
})

$('.meme__loading__close').click(_ => {
    $.modal.close();
})
//slideshow of memes, disable
$('.popup__image').on($.modal.CLOSE, function(event, modal) {
    $(document).off("keydown");
});