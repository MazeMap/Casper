/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    window.doRetweetQuote = function(text){

        var tweetBaseUrl = 'https://twitter.com/intent/tweet?';
        var tweetText = '&text=' + encodeURI(text);
        var tweetVia = '&via=' + 'MazeMap';
        var tweetUrl = '&url=' + encodeURI( document.location.href );
        var tweetLink = tweetBaseUrl  + tweetText + tweetVia + tweetUrl;

        var width  = 575,
            height = 400,
            left   = (window.innerWidth  - width)  / 2,
            top    = (window.innerHeight - height) / 2,
            url    = tweetLink,
            opts   = 'status=1' +
                     ',width='  + width  +
                     ',height=' + height +
                     ',top='    + top    +
                     ',left='   + left;

          window.open(url, 'twitter', opts);

    };
    
    window.findTweetableLinks = function(){

        var links = $("blockquote p a");
        var tweetableLinks = $.grep(links, function(item, i){
            //console.log('@ tweetable link? ', $(item) );
            return $(item).attr('href')==="#tweet";
        });
        
        $.each(tweetableLinks, function(i, elem){
            var text = $(elem).text();
            $(elem).hide();
            $(elem).attr('href', 'https://twitter.com/share');
            $(elem).data('via', 'MazeMap');
            $(elem).data('text', 'This is some text');
            $(elem).data('url', document.location.href);
            $(elem).addClass('twitter-share-button');

//            
//            $(elem).click(function(e){
//                e.preventDefault();
//                window.doRetweetQuote(text);
//                return false;
//            });
        });
        
        //If the twitter API is already defined, then we want to re-load the widgets rendering again
        if(window.twttr && window.twtter.widgets){
            window.twttr.widgets.load();
        }
        
    };
    
    $document.ready(function () {

        window.findTweetableLinks();

//        $(window).on('scroll resize', function(e,a){
//            var top = window.scrollY;
//            var height = window.innerHeight;
//            var speedFactor = 5.1;
//            var topOffset = (top/height)*100 * speedFactor;
//            
//            $('.main-header-content').css({
//                "-webkit-transform":"translateY("+ topOffset +"%)",
//                "-ms-transform":"translateY("+ topOffset +"%)",
//                "transform":"translateY("+ topOffset +"%)"
//              });
//        });
    });
})(jQuery);