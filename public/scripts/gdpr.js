$(document).ready(function() {
    var gdpr = gdpr || {};
    gdpr = {
        container: '.gdpr__container',
        closeButton: '.gdpr__container__close',
        daysHold: 7,
        checkCookie: function(){
            if(document.cookie){
                $(gdpr.container).css('display','none');
            }
        },
        setCookie: function(){
            var d = new Date();
            d.setTime(d.getTime() + (gdpr.daysHold*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie =  "gdpr=true;" + expires + ";path=/";
        }
    }


    gdpr.checkCookie();
    $(gdpr.closeButton).on('click', function(){
        gdpr.setCookie();
        $(gdpr.container).fadeOut('300');
    })
})