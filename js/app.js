$(document).ready(function() {
    
    //Adding event listener on internal anchors to enable smooth scrolling

    $("a.internal").click(function(e) {
        e.preventDefault();
        
        var dest = $(this).attr("href");
        
        history.pushState(null, null, dest);
        
        //The following function will animate click on an internal anchor within document
        
        function scrollToAnchor() {
            $("html, body").animate ({
                scrollTop: $(dest).offset().top
            }, 1000);
        }
        scrollToAnchor();
    });
    
    
    //Creating sticky menu
    
    var navigationBar = $("nav");
    var menuPosition = navigationBar.offset().top;
    var scrollPosition = $(document).scrollTop();
    
    function checkCurrentPosition() {
        
        if (scrollPosition > menuPosition) {
            navigationBar.addClass("sticky");
//            console.log("Pojechaliśmy za daleko");
        } else {
//            console.log("Wciąż za blisko");
            navigationBar.removeClass("sticky");
        }
    }
    checkCurrentPosition();
    
    $(window).on("scroll", function() {
        scrollPosition = $(document).scrollTop();
//        menuPosition = $(navigationBar).offset().top;
        console.log(scrollPosition);
        console.log(menuPosition);
        checkCurrentPosition();    
    });
    
    
    
});    