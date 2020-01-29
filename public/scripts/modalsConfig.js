$('.logged__add__meme').click(_ => {
    $("#modal__selection__meme__type").modal({
        fadeDuration: 100,
        closeExisting: false
    });
})

//slideshow of memes, disable
$('.popup__image').on($.modal.CLOSE, function(event, modal) {
    $(document).off("keydown");
});


//input button in form field
$('button.file__add').on('click', function(){
    $('input.file').trigger('click'); 
 });