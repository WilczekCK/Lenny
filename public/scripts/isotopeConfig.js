$(window).on('load', _ => {
  var $grid = $('.meme__container').isotope({
    itemSelector: '.meme__item',
    masonry: {
      columnWidth: 50,
      isFitWidth: true
    }
  })

  $('.menu__container__wrap__menu li a').on('click', function () {
    const filterValue = `.${this.id}`;
    const menuItem = $(this)[0];

    if($(menuItem).hasClass('active')) return $grid.isotope({ filter: '*', layoutMode: 'fitRows' }); //if active, reset grid
    $grid.isotope({ filter: filterValue, layoutMode: 'fitRows' });
  })

  $('#tag__finder').on('keypress', function (e) {
    if (e.which == 13) {
      const filterValue = `.${$(this)[0].value}`.toLowerCase()
      if (filterValue == '.') return $grid.isotope({ filter: '*', layoutMode: 'fitRows' }); //empty, reset grid
      $grid.isotope({ filter: filterValue, layoutMode: 'fitRows' });
    }
  })
})