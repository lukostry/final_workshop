$(document).ready(function() {
    
    //Adding event listener on internal anchors to enable smooth scrolling

    $("a.internal").on("click", function(e) {
        e.preventDefault();
        
        var dest = $(this).attr("href");
        
        history.pushState(null, null, dest);
        
        //The following function will animate click on an internal anchor within document
        
        function scrollToAnchor() {
            $("html, body").animate ({
                scrollTop: $(dest).offset().top
            }, 1000);
        }
        console.log($(this));
        if ($(this) === $(".slide .internal")) {
            clearProgressBar();
            animateSkills();
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
        
        
            // Jeżeli odtwarzana jest animacja slajdu, to nie podejmujemy żadnych działań.
            if ($group.is(":animated")) {  
              return;
            }
        
        
            if (newIndex > currentIndex) {   // Jeżeli nowy element > bieżący.
                slideLeft = "100%";            // Umieszczenie nowego slajdu po prawej stronie.
                animateLeft = "-100%";         // Animacja bieżącej grupy w lewą stronę.
            } else {                         // W przeciwnym razie.
                slideLeft = "-100%";           // Umieszczenie nowego slajdu po lewej stronie.
                animateLeft = "100%";          // Animacja bieżącej grupy w prawą stronę.
            }
            // Umieszczenie nowego slajdu po lewej (jeśli ma mniejszą wartość indeksu niż bieżący) lub prawej (jeśli ma tę wartość większą).
            $slides.eq(newIndex).css( {left: slideLeft, display: "block"} );
        
            $group.animate({
                left: animateLeft
            }, 500, function() {    // Animacja slajdu
                    $slides.eq(currentIndex).css( {display: "none"} ); // i ukrycie poprzedniego.     
                    $slides.eq(newIndex).css( {left: 0} ); // Ustawienie położenia dla nowego slajdu.
                    $group.css( {left: 0} );               // Ustawienie położenia grupy slajdów.
                
                    $slides.eq(currentIndex).find(".person_name").removeClass("active_person");
                    $slides.eq(newIndex).find(".person_name").addClass("active_person");
                    animateSkills();
                
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
        
        //Part responsible for animating and changing skills of team members
        
        //function responsible for animating skills
        
        function animateSkills() {
            
            //declaring variables
        
            var activePerson = $(".active_person");
            var webDesignSkills = activePerson.data("web-design-skills");
            var graphicDesignSkills = activePerson.data("graphic-skills");
            var htmlSkills = activePerson.data("html-skills"); 
            var uiSkills = activePerson.data("ui-skills");
            
            var skillsDiv = $(".skills");
        
            skillsDiv.each(function() { //for each div which stores data about skills update relevant data based on data-set attributes of active member
                if ($(this).hasClass("web_design")) {
                    $(this).find(".percentage").text(webDesignSkills);
                    $(this).find(".progress_bell").delay(500).animate ({
                        width: webDesignSkills
                    }, 1000);
                }
                if ($(this).hasClass("graphic_design")) {
                    $(this).find(".percentage").text(graphicDesignSkills);
                    $(this).find(".progress_bell").delay(500).animate ({
                        width: graphicDesignSkills
                    }, 1000);
                }
                if ($(this).hasClass("html_skills")) {
                    $(this).find(".percentage").text(htmlSkills);
                    $(this).find(".progress_bell").delay(500).animate ({
                        width: htmlSkills
                    }, 1000);
                }
                if ($(this).hasClass("ui_skills")) {
                    $(this).find(".percentage").fadeOut().delay(2500).text(uiSkills).fadeIn();
                    $(this).find(".progress_bell").delay(500).animate ({
                        width: uiSkills
                    }, 1000);
                }
            });
        }
        
        //Function responsible for clearing progress bar which will be used ater clicking on a relevant anchor
        
        function clearProgressBar() {
            var progressBar = $(".progress_bell");
            progressBar.each(function() {
                $(this).css( {width: "0%"} ); 
            });
        }
        
        animateSkills();
      });

});    