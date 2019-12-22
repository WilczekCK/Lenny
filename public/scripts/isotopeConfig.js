$(window).on('load', _ => {
  //masonry
 // imagesLoaded('.meme__container', function () {
    var $grid = $('.meme__container').isotope({
      itemSelector: '.meme__item',
      masonry: {
        columnWidth: 40,
        isFitWidth: true
        }
    })

    $('.menu__container__wrap__menu li a').on('click', function () {
      var filterValue = `.${this.id}`;
      // use filterFn if matches value
      $grid.isotope({ filter: filterValue, layoutMode: 'fitRows' });
    })
  
    
  $('.tag__finder').on('keypress', function(e){
    if(e.which == 13){
      const filterValue = `.${$(this)[0].value}`.toLowerCase()
      $grid.isotope({ filter: filterValue, layoutMode: 'fitRows' });
    }
  })
 // });
})


let whichClick = 0;
$('.load__more__memes').on('click', _ => {
  whichClick = whichClick + 1;
  fetch(`meme/load`,{
    method: "post",
    headers:{
      loadCount: whichClick
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

  $('.meme__container').isotope( 'insert', $(elArray));
  imagesLoaded('.meme__container', function () {
    $('.meme__container').isotope({})
  })
})


})  