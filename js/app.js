$(document).ready(function() {

    $("a.internal").click(function(e) {
        console.log("działa");
        e.preventDefault();
        var dest = $(this).attr("href");
        
        //The following function will animate click on an internal anchor within document
        
        function scrollToAnchor() {
            $("html, body").animate ({
                scrollTop: $(dest).offset().top
            }, 1000);
        }
        scrollToAnchor();
    });
});    