$(window).on('load', _ => {
    var infiniteScroll = infiniteScroll || {};
    infiniteScroll = {
        loadTimes: 0,
        memesLoad: '',
        howMuchToLoad: 2,
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
                console.log(resp)
                resp.forEach(meme => {
                    console.log(meme)
                    infiniteScroll.memesLoad = infiniteScroll.memesLoad + `
                        <div class="meme__item ${meme.tags}">
                            <img src="/uploads/${meme.id}.jpg"/>
                            <div class="details">
                                <span class="tag">
                                    ${meme.tags}
                                </span>

                                <span class="pp__counter">
                                    <i class="fab fa-pied-piper-pp"></i>
                                    ${meme.likes}
                                </span>

                                <span class="title">
                                    Lorem Ipsum
                                </span>

                                <span class="info">
                                    Made by: ${meme.author_username}
                                </span>
                            </div>
                        </div>
                    `
                });

                infiniteScroll.areMemesAvailable(resp);
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

    $(document).on('click', '.load__more__memes', () => {
        infiniteScroll.loadTimes = infiniteScroll.loadTimes + 1;
        return infiniteScroll.loadMemes(infiniteScroll.loadTimes)
    })
    //Listeners
})