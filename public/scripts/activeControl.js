$(window).on('load', _ => {
    var activeMenu = activeMenu || {};
    activeMenu = {
        config : {
            menuItems: 'ul.filters li',
            itemsContainer: '.meme__container',
            itemsName: '.meme__item',
            activeName: 'active',
            tags: ['std', 'mania', 'ctb', 'taiko'],
            finderIcon: '#tag__finder__icon',
            finderField: '#tag__finder',
            fadeSpeed: 300
        },
        isItemActive: (menu_item) => {
            if($(menu_item).hasClass(activeMenu.config.activeName)) return true
            else return false;
        },
        activateItem: (menu_item) => {
            return $(menu_item).addClass(activeMenu.config.activeName);
        },
        removeActiveAll: _ => {
            $(`${activeMenu.config.menuItems} *`).removeClass('active');
        },
        handleTagFinder: (menu_item) => {
            if($(menu_item).hasClass('active') && $(activeMenu.config.finderField).css('opacity') == '1'){
                activeMenu.removeActiveAll();
                $(activeMenu.config.finderField).fadeOut(activeMenu.config.fadeSpeed)
            }else{
                activeMenu.removeActiveAll();
                activeMenu.activateItem(activeMenu.config.finderIcon)
                $(activeMenu.config.finderField).fadeIn(activeMenu.config.fadeSpeed)
            }
        },
        clickedMenuItem: (menu_item) => {
            const infoAbout = $(menu_item)[0];

            if(activeMenu.isItemActive(infoAbout)){
                activeMenu.removeActiveAll();
                return 0; //isotopeConfig.js - setup the grid from beginning
            }else{
                if($(activeMenu.config.finderField).css('opacity') == '1') $(activeMenu.config.finderField).fadeOut(activeMenu.config.fadeSpeed);
                activeMenu.removeActiveAll();
                activeMenu.activateItem(menu_item)
            }

            return 0;
        },
        init: _ => {
            $('ul.filters li').click((e => {
               const focused = `#${$(e.currentTarget)[0].firstChild.id}`;
               if(focused === '#tag__finder__icon' || focused == '#tag__finder') return activeMenu.handleTagFinder(focused);
               activeMenu.clickedMenuItem(focused);
            }))
        }
    }

    activeMenu.init();
})
