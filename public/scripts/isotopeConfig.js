$(window).on('load', _ => {
  var isotopeConf = isotopeConf || {};
  isotopeConf = {
    filterValue: '',
    menuItem: '',
    $grid: $('.meme__container').isotope({
      itemSelector: '.meme__item',
      masonry: {
        columnWidth: 25,
        isFitWidth: true
      }
    }),
    onClick: (item) => {
      switch (item.firstChild.localName){
        case 'a':
          isotopeConf.filterValue = `.${$(item).find('a')[0].id}`;
          isotopeConf.menuItem = $(item).find('a')[0];
          isotopeConf.tagClicked(isotopeConf.filterValue)
          break
        case 'i':
          isotopeConf.filterValue = `.${$(item).find('i')[0].id}`;
          isotopeConf.menuItem = $(item).find('i')[0];
          break
        case 'input':
          break;
      }
    },
    tagClicked: (filterValue) => {
      if($(isotopeConf.menuItem).hasClass('active')){
        return isotopeConf.$grid.isotope({ filter: '*', masonry: {columnWidth: 50} });
      }

      if(!$(isotopeConf.menuItem).hasClass('active')){
        return isotopeConf.$grid.isotope({ filter: filterValue, masonry: {columnWidth: 50} });
      } 
    }
  }



  //listeners
  $('.menu__container__wrap__menu li').on('click', function () {
    isotopeConf.onClick(this);
  })

  $('#tag__finder').on('keypress', function (e) {
    if (e.which == 13) {
      const filterValue = `.${$(this)[0].value}`.toLowerCase()
      if (filterValue == '.') return isotopeConf.$grid.isotope({ filter: '*', masonry: {columnWidth: 50} }); //empty, reset grid
      isotopeConf.$grid.isotope({ filter: filterValue, masonry: {columnWidth: 50} });
    }
  })
})