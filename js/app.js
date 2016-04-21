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

        /*console.log(scrollPosition);
        console.log(menuPosition);*/
        
        checkCurrentPosition();    
    });
    
    //Creating slider in our_team section
    
    $(".slide_viewer").each(function() {              // Dla każdej grupy slajdów.
        
        var $group  = $(".slide_group");        // Pobranie elementu o klasie slide-group (kontener).
        var $slides = $group.find(".slide");       // Obiekt jQuery przechowujący wszystkie slajdy.
        var currentIndex = 0;                     // Numer indeksu bieżącego slajdu.
        var nextSlide = $(".next_slide");      //definiuje zmienne przechowujące przyciski
        var prevSlide = $(".prev_slide");
        
        function move(newIndex) {          // Przejście ze starego do nowego slajdu.
            var animateLeft, slideLeft;      // Deklaracja zmiennych.
        
        /*
            // Jeżeli odtwarzana jest animacja slajdu, to nie podejmujemy żadnych działań.
            if ($group.is(':animated')) {  
              return;
            }
        */
        
            if (newIndex > currentIndex) {   // Jeżeli nowy element > bieżący.
                slideLeft = "100%";            // Umieszczenie nowego slajdu po prawej stronie.
                animateLeft = "-100%";         // Animacja bieżącej grupy w lewą stronę.
            } else {                         // W przeciwnym razie.
                slideLeft = '-100%';           // Umieszczenie nowego slajdu po lewej stronie.
                animateLeft = '100%';          // Animacja bieżącej grupy w prawą stronę.
            }
            // Umieszczenie nowego slajdu po lewej (jeśli ma mniejszą wartość indeksu niż bieżący) lub prawej (jeśli ma tę wartość większą).
            $slides.eq(newIndex).css( {left: slideLeft, display: "block"} );
        
            $group.animate({
                left: animateLeft
            }, 500, function() {    // Animacja slajdu
                    $slides.eq(currentIndex).css( {display: 'none'} ); // i ukrycie poprzedniego.     
                    $slides.eq(newIndex).css( {left: 0} ); // Ustawienie położenia dla nowego slajdu.
                    $group.css( {left: 0} );               // Ustawienie położenia grupy slajdów.
                    currentIndex = newIndex;               // Ustawienie zmiennej currentIndex wartości nowego obrazu.
            });
        }
        
        function moveToNextSlide() {                     // Przejście do następnego slajdu
            
              if (currentIndex < ($slides.length - 1)) { // Jeżeli to nie jest ostatni slajd.
                  move(currentIndex + 1);            // Przejście do następnego slajdu.
              } else {                             // W przeciwnym razie.
                  move(0);                           // Przejście do pierwszego slajdu.
              }
        }
        
        function moveToPrevSlide() {                     // Przejście do poprzedniego slajdu
            
              if (currentIndex !== 0) { // Jeżeli to nie jest pierwszy slajd.
                  move(currentIndex - 1);            // Przejście do poprzedniego slajdu.
              } else {                             // W przeciwnym razie.
                  move($slides.length - 1);                           // Przejście do pierwszego slajdu.
              }
        }
        
        nextSlide.on("click", function(e) {
            e.preventDefault();
            moveToNextSlide ();
        });
        
        prevSlide.on("click", function(e) {
            e.preventDefault();
            moveToPrevSlide();
        });
                  
      });
});    