$(window).on('load', _ => {
  var $grid = $('.meme__container').isotope({
    itemSelector: '.meme__item',
    masonry: {
      columnWidth: 50,
      isFitWidth: true
    }
  })

  $('.menu__container__wrap__menu li').on('click', function () {
    let filterValue;
    let menuItem;

    switch (this.firstChild.localName){
      case 'a':
        filterValue = `.${$(this).find('a')[0].id}`;
        menuItem = $(this).find('a')[0];
        break
      case 'i':
        filterValue = `.${$(this).find('i')[0].id}`;
        menuItem = $(this).find('i')[0];
        break
    }

    $(window).on('resize', function(){
      imagesLoaded('.meme__container', function () {
        $grid.isotope({ filter: filterValue, masonry: {columnWidth: 50} });
      })
    })

    if($(menuItem).hasClass('active') && !menuItem ) return $grid.isotope({ filter: '*', masonry: {columnWidth: 50} }); //if active, reset grid
    if(!$(menuItem).hasClass('active') && !menuItem ){
      return $grid.isotope({ filter: filterValue, masonry: {columnWidth: 50} });
    } 
  })

  $('#tag__finder').on('keypress', function (e) {
    if (e.which == 13) {
      const filterValue = `.${$(this)[0].value}`.toLowerCase()
      if (filterValue == '.') return $grid.isotope({ filter: '*', masonry: {columnWidth: 50} }); //empty, reset grid
      $grid.isotope({ filter: filterValue, masonry: {columnWidth: 50} });
    }
  })
})