$(window).on('load', _ => {
  var $grid = $('.meme__container').isotope({
    itemSelector: '.meme__item',
    masonry: {
      columnWidth: 40,
      isFitWidth: true
    }
  })

  $('.menu__container__wrap__menu li a').on('click', function () {
    var filterValue = `.${this.id}`;
    $grid.isotope({ filter: filterValue, layoutMode: 'fitRows' });
  })

  $('.tag__finder').on('keypress', function (e) {
    if (e.which == 13) {
      const filterValue = `.${$(this)[0].value}`.toLowerCase()
      $grid.isotope({ filter: filterValue, layoutMode: 'fitRows' });
    }
  })


  //Viewport - check if element is on screen
  $.fn.isInViewport = function () {
    let elementTop = $(this).offset().top;
    let elementBottom = elementTop + $(this).outerHeight();

    let viewportTop = $(window).scrollTop();
    let viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
  };
  //Viewport - check if element is on screen


  //Infinite Scroll
  let loadTimes = 0;

  $(window).scroll(function () {
    if ($('.load__more__memes').isInViewport()) {
      loadTimes = loadTimes + 1;
      return loadMemes(loadTimes)
    }
  });

  function loadMemes(loadTimes) {
    fetch(`meme/load`, {
      method: "post",
      headers: {
        loadCount: loadTimes
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        let elArray = '';
        resp.forEach(meme => {
          elArray = elArray + `<div class="meme__item ${meme.tags}"> 
        <figure class="c4-izmir c4-border-ccc-2 c4-gradient-bottom-left" meme_id=${meme.id}>
          <img src='/uploads/${meme.id}.jpg' />
          <figcaption class="c4-layout-bottom-left">
            <div class="c4-reveal-right">
              <h2>Creator: ${meme.author_username}</h2>  
              <br>
              <div class="pp_button">
                <i class="fas fa-heart"></i>
                <div class="pp__counter" style="float:right">
                  ${meme.likes}
                </div>
              </div>
              <br>
              <div class="tag" style="box-shadow:unset">
                ${meme.tags}
              </div>
            </div>
          </figcaption>
        </figure> 
      </div>`
        });

        if (resp.length != 0) {
          $('.meme__container').isotope('insert', $(elArray));
          imagesLoaded('.meme__container', function () {
            $grid.isotope();
          })
        } else {
          return 0;
        }

      })
  }
  //Infinite Scroll

})