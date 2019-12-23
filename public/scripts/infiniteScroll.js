$(window).on('load', _ => {
    var infiniteScroll = infiniteScroll || {};
    infiniteScroll = {
        loadTimes: 0,
        memesLoad: '',
        howMuchToLoad: 5,
        loadMoreSelector: $('.load__more__memes'),
        grid: $('.meme__container'),
        isInViewport: function(el){
            let elementTop = $(el).offset().top;
            let elementBottom = elementTop + $(el).outerHeight();
        
            let viewportTop = $(window).scrollTop();
            let viewportBottom = viewportTop + $(window).height();
        
            return elementBottom > viewportTop && elementTop < viewportBottom;
        },
        areMemesAvailable: function (dbCallback) {
            if (dbCallback.length != 0) {
                infiniteScroll.grid.isotope('insert', $(infiniteScroll.memesLoad));
                imagesLoaded('.meme__container', function () {
                    infiniteScroll.grid.isotope();
                })
            } else {
                if(infiniteScroll.loadMoreSelector.hasClass('noMemes')) return 0;
                else infiniteScroll.loadMoreSelector.html(`You reached the end of osumemes`).addClass('noMemes')
            }
        },
        loadMemes: function () {
            fetch(`meme/load`, {
                method: "post",
                headers: {
                    loadCount: infiniteScroll.loadTimes,
                    loadElements: infiniteScroll.howMuchToLoad
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                infiniteScroll.memesLoad = '';
                resp.forEach(meme => {
                    infiniteScroll.memesLoad = infiniteScroll.memesLoad + `<div class="meme__item ${meme.tags}"> 
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

                infiniteScroll.areMemesAvailable(resp)
            })
        }
    }

    //Listeners
    $(window).scroll(function () {
        if (infiniteScroll.isInViewport('.load__more__memes')) {
            infiniteScroll.loadTimes = infiniteScroll.loadTimes + 1;
            return infiniteScroll.loadMemes(infiniteScroll.loadTimes)
        }
    });
    //Listeners
})