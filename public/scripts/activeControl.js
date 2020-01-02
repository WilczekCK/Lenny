$(window).on('load', _ => {
    var activeMenu = activeMenu || {};
    activeMenu = {
        config : {
            menuItems: 'ul.filters li',
            itemsContainer: '.meme__container',
            itemsName: '.meme__item',
            activeName: 'active',
            tags: ['std', 'mania', 'ctb', 'taiko'],
            finder: '#tag__finder',
            fadeSpeed: 300
        },
        isItemActive: (menu_item) => {
            if($(menu_item).hasClass(activeMenu.config.activeName)) return true
            else return false;
        },
        activateItem: (menu_item) => {
            return $(menu_item).addClass(activeMenu.config.activeName);
        },
        disableItem: _ => {
            console.log('shuffle')
            $(activeMenu.config.itemsName).css('display','block');
        },
        removeActiveAll: _ => {
            $(`${activeMenu.config.menuItems} *`).removeClass('active');
        },
        handleTagFinder: _ => {
                        
        },
        clickedMenuItem: (menu_item) => {
            const infoAbout = $(menu_item)[0];
            if(activeMenu.isItemActive(infoAbout)){
                activeMenu.removeActiveAll();
                return 0; //isotopeConfig.js - setup the grid from beginning
            }else{
                activeMenu.removeActiveAll();
                activeMenu.activateItem(menu_item)
                
                if(menu_item === '#tag__finder'){
                    activeMenu.handleTagFinder();
                }
            }

            return 0;
        },
        init: _ => {
            $('ul.filters li').click((e => {
               const focused = `#${$(e.currentTarget)[0].lastChild.id}`;
               activeMenu.clickedMenuItem(focused);
            }))
        }
    }

    activeMenu.init();
})





// $('ul.filters li').click((e => {
//     const focused = $(e.currentTarget)[0].lastChild.id;
//     $('ul.filters *').removeClass('active');

//     switch (focused){
//         case 'std': 
//             $(`a#${focused}`).addClass('active');
//             break;
//         case 'mania':
//             $(`a#${focused}`).addClass('active');
//             break;
//         case 'ctb':
//             $(`a#${focused}`).addClass('active');
//             break;
//         case 'taiko':
//             $(`a#${focused}`).addClass('active');
//             break;
//         case 'tag__finder':
//             if($(`.${focused}`).css('display') == 'none'){
//                 $(`.${focused}`).fadeIn();
//                 $(`#${focused}`).addClass('active');
//             }else{
//                 $(`#${focused}`).addClass('active');
//                 $(`#${focused}`).on('click', _ => {
//                     $(`.${focused}`).fadeOut();
//                     setTimeout(_ => {
//                         $(`#${focused}`).removeClass('active');
//                     }, 500)
//                 });
//             }
//         }

//         if($('#tag__finder').hasClass('active') == false){$('.tag__finder').fadeOut()}
//}));


