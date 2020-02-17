$(window).on('load', _ => {
    var infiniteScroll = infiniteScroll || {};
    infiniteScroll = {
        loadTimes: 0,
        memesLoad: '',
        howMuchToLoad: 5,
        loadMoreSelector: $('.load__more__memes'),
        grid: $('.meme__container'),
        loadingScreen: () => {
            $('body').css('overflow', 'hidden');
            myAlertSaving(true, "Wait, loading...", "myalert-info");

            imagesLoaded(infiniteScroll.grid, function () {
                $(infiniteScroll.grid).isotope().on('arrangeComplete', () => {
                    $('body').css('overflow', 'unset');
                    return myAlertSaving(false);
                })
            })
            
        },
        hasScrollbar: () => {
            if ($("body").height() > $(window).height()){
                $(window).scroll(function(){
                    infiniteScroll.scrollRecog.onScroll();
                })
            }else{
                infiniteScroll.loadMemes();
                
                setTimeout(function(){
                    if(infiniteScroll.loadMoreSelector.hasClass('noMemes')) return 0; 
                    //prevent loading memes, when there is no more of them and scroll bar is not visible

                    infiniteScroll.hasScrollbar();
                }, 1000)
            }
        },
        scrollRecog: { 
            scrollTimeout: '',
            onScroll: () => {
                if (infiniteScroll.scrollRecog.scrollTimeout) {
					// clear the timeout, if one is pending
					clearTimeout(infiniteScroll.scrollRecog.scrollTimeout);
					infiniteScroll.scrollRecog.scrollTimeout = null;
				}
				infiniteScroll.scrollRecog.scrollTimeout = setTimeout(infiniteScroll.scrollRecog.scrollHandler, 250);
            },
            scrollHandler: () => {
                if(infiniteScroll.isInViewport()) {
                    infiniteScroll.loadMemes();
                }               
            }
        },
        isInViewport: () => {
            let elementTop = $(infiniteScroll.loadMoreSelector).offset().top;
            let elementBottom = elementTop + $(infiniteScroll.loadMoreSelector).outerHeight();
        
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
                if(infiniteScroll.loadMoreSelector.hasClass('noMemes')) {
                    $('body').css('overflow', 'unset');
                    myAlertSaving(false);
                    return 0;
                }
                else{
                    infiniteScroll.loadMoreSelector.html(`You reached the end of osumemes`).addClass('noMemes')
                    $('body').css('overflow', 'unset');
                    return myAlertSaving(false);
                } 
                
            }
        },
        loadMemes: function () {
            if(infiniteScroll.loadMoreSelector.hasClass('noMemes')) return 0;
            if($('.meme__modal' || $('#modal__add__meme')).css('display') == 'none') return 0;

            infiniteScroll.loadingScreen()
            infiniteScroll.loadTimes = infiniteScroll.loadTimes + 1;

            fetch(`meme/load`, {
                method: "get",
                headers: {
                    loadCount: infiniteScroll.loadTimes,
                    loadElements: infiniteScroll.howMuchToLoad
                }
            })
            .then(resp => resp.json())
            .then(resp => {
                infiniteScroll.memesLoad = '';
                resp.forEach(meme => {
                    infiniteScroll.memesLoad = infiniteScroll.memesLoad + infiniteScroll.recognizeMemeType(meme);
                });

                infiniteScroll.areMemesAvailable(resp);
            })
        },
        tagsSpaceToComma: (tags) => {
            let tagsString = '';

            $(tags).each(index =>{
                tagsString = tagsString + '<div class="tag">'+tags[index]+'</div>'
            })

            return tagsString;
        },
        recognizeMemeType: function (meme){
            if(meme.video_id == null){
                return `<div class="meme__item ${meme.tags}">
                <img src="/uploads/${meme.id}.jpg"/>
                <div class="details">
                    <span>${infiniteScroll.tagsSpaceToComma(meme.tagsDivider)}</span>
                    <span class="pp__counter" meme_id=${meme.id}>
                        <i class="fab fa-pied-piper-pp"></i>
                        <div class="pp__amount">
                            ${meme.likes}
                        </div>
                    </span>

                    <span class="title">
                        ${meme.meme_title}
                    </span>

                    <span class="info">
                        <a href="/profile/${meme.author_id}">
                            Made by: ${meme.author_username}
                        </a>
                    </span>
                </div>
            </div>`
            }else{
                return `<div class="meme__item ${meme.tags}">
                <iframe src='https://www.youtube.com/embed/${meme.video_id}?controls=0&modestbranding=1' frameborder='0' />
                <div class="details">
                    <span>${infiniteScroll.tagsSpaceToComma(meme.tagsDivider)}</span>

                    <span class="pp__counter" meme_id=${meme.id}>
                        <i class="fab fa-pied-piper-pp"></i>
                        <div class="pp__amount">
                            ${meme.likes}
                        </div>
                    </span>

                    <span class="title">
                        ${meme.meme_title}
                    </span>

                    <span class="info">
                        <a href="/profile/${meme.author_id}">
                            Made by: ${meme.author_username}
                        </a>
                    </span>
                </div>
            </div>`
            }
        }
    }

    //Listeners
    infiniteScroll.hasScrollbar();
    
    $(document).on('click', '.load__more__memes', () => {
        return infiniteScroll.loadMemes()
    })

    $(document).on('click', '.menu__container__wrap__menu li a', () => {
        infiniteScroll.hasScrollbar();
    })
    //Listeners
})