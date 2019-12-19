
$('ul.filters li').click((e => {
    const focused = $(e.currentTarget)[0].lastChild.id;
    $('ul.filters *').removeClass('active');

    switch (focused){
        case 'std':
            $(`a#${focused}`).addClass('active');
            break;
        case 'mania':
            $(`a#${focused}`).addClass('active');
            break;
        case 'ctb':
            $(`a#${focused}`).addClass('active');
            break;
        case 'taiko':
            $(`a#${focused}`).addClass('active');
            break;
        case 'tag__finder':
            if($(`.${focused}`).css('display') == 'none'){
                $(`.${focused}`).fadeIn();
                $(`#${focused}`).addClass('active');
            }else{
                $(`#${focused}`).addClass('active');
                $(`#${focused}`).on('click', _ => {
                    $(`#${focused}`).removeClass('active');
                    $(`.${focused}`).fadeOut();
                });
            }
        }

        if($('#tag__finder').hasClass('active') == false){$('.tag__finder').fadeOut()}
}));


