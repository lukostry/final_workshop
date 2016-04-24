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
        
        function scrollToAnchorWithCallback() {
            $("html, body").animate ({
                scrollTop: $(dest).offset().top
            }, 1000, function(){
                clearProgressBar();
                animateSkills();
            });
        }
        
        if ($(this).data("team-member")) {
            scrollToAnchorWithCallback();
        } else {
            scrollToAnchor();
        }
        
       
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
                $(this).find(".progress_bell").animate ({
                    width: webDesignSkills
                }, 1000);
            }
            if ($(this).hasClass("graphic_design")) {
                $(this).find(".percentage").text(graphicDesignSkills);
                $(this).find(".progress_bell").animate ({
                    width: graphicDesignSkills
                }, 1000);
            }
            if ($(this).hasClass("html_skills")) {
                $(this).find(".percentage").text(htmlSkills);
                $(this).find(".progress_bell").animate ({
                    width: htmlSkills
                }, 1000);
            }
            if ($(this).hasClass("ui_skills")) {
                $(this).find(".percentage").text(uiSkills);
                $(this).find(".progress_bell").animate ({
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
        
        
      });
    
    //Lazy line painter
        
    /* 
     * Lazy Line Painter - Path Object 
     * Generated using 'SVG to Lazy Line Converter'
     * 
     * http://lazylinepainter.info 
     * Copyright 2013, Cam O'Connell  
     *  
     */ 
     
    var pathObj = {
        "_6svg": {
            "strokepath": [
                {
                    "path": "M63.233,172.136q-20.121-12.087-40.648-23.468T2.464,113.817q0.406-23.467,0-46.935t20.121-34.85Q43.112,20.649,63.233,8.563t40.241,0Q123.6,20.649,144.122,32.031t20.121,34.85q-0.406,23.467,0,46.935t-20.121,34.851q-20.528,11.38-40.648,23.468T63.233,172.136Z",
                    "duration": 600
                },
                {
                    "path": "M101.171,42.29a1.811,1.811,0,0,0-1.989.014L44.807,78.554a1.812,1.812,0,0,0,.333,3.189l14.181,5.674,6.668,11.668a1.813,1.813,0,0,0,1.554.914h0.019a1.816,1.816,0,0,0,1.554-.882l3.765-6.276,17.571,7.027a1.776,1.776,0,0,0,.672.131,1.815,1.815,0,0,0,1.788-1.516l9.063-54.375A1.814,1.814,0,0,0,101.171,42.29ZM49.685,79.658l42-28.005L61.149,84.345a3.57,3.57,0,0,0-.481-0.293ZM62.468,85.62c0-.007-0.009-0.01-0.012-0.017L96.789,48.853,67.52,94.46ZM89.707,95.667L74.226,89.475a3.621,3.621,0,0,0-1.131-.216L96.934,52.3Z",
                    "duration": 1000
                }
            ],
            "dimensions": {
                "width": 167,
                "height": 181
            }
        },
        "_5svg": {
            "strokepath": [
                {
                    "path": "M63.233,172.136q-20.121-12.087-40.648-23.468T2.464,113.817q0.406-23.467,0-46.935t20.121-34.85Q43.112,20.649,63.233,8.563t40.241,0Q123.6,20.649,144.122,32.031t20.121,34.85q-0.406,23.467,0,46.935t-20.121,34.851q-20.528,11.38-40.648,23.468T63.233,172.136Z",
                    "duration": 600
                },
                {
                    "path": "M109.279,44.676A15.483,15.483,0,0,0,98.5,40a11.857,11.857,0,0,0-8.462,3.4L81.217,52.29c-0.027.025-.058,0.042-0.085,0.069s-0.023.033-.037,0.048l0,0L62.376,71.276a7.289,7.289,0,0,0-1.835,3.091l-4.257,15.42A12.471,12.471,0,0,0,56,91.656,6.349,6.349,0,0,0,62.353,98a12.926,12.926,0,0,0,2.1-.34L79.816,93.62a7.3,7.3,0,0,0,3.09-1.841L110.57,63.9C115.6,58.861,115.035,50.422,109.279,44.676ZM85.026,83.13a14.762,14.762,0,0,0-1.3-4.764l17.135-17.134a8.836,8.836,0,0,1-1.786,9.07c-0.014.014-.032,0.023-0.046,0.037l0.023,0.023L85.044,84.481C85.046,84.03,85.067,83.588,85.026,83.13Zm-2.212-6.416a14.908,14.908,0,0,0-6.1-5.838L93.99,53.6a12.517,12.517,0,0,1,6.122,5.814Zm-7.808-6.694a14.441,14.441,0,0,0-5.2-1.085L83.77,54.866a8.7,8.7,0,0,1,8.316-1.924ZM63.555,94.145a8.912,8.912,0,0,1-1.23.229,2.726,2.726,0,0,1-2.7-2.719,9.212,9.212,0,0,1,.184-1.02l1.908-6.913A8.591,8.591,0,0,1,70.3,92.375Zm8.53-2.241a10.12,10.12,0,0,0-3.03-6.955,10.326,10.326,0,0,0-6.825-3.08l1.805-6.539a3.588,3.588,0,0,1,.708-1.241c3.636-2.6,9.227-1.834,13.112,2.054,4.108,4.108,4.744,10.124,1.579,13.717a3.827,3.827,0,0,1-.651.285Zm35.921-30.566-3.053,3.076c0-.409.049-0.8,0.012-1.221a16.012,16.012,0,0,0-15.355-14.21l3-3.027A8.241,8.241,0,0,1,98.5,43.625,12.528,12.528,0,0,1,110.354,54.8,8.305,8.305,0,0,1,108.005,61.337Z",
                    "duration": 1800
                }
            ],
            "dimensions": {
                "width": 167,
                "height": 181
            }
        }
    };
    
    $("#_5svg").lazylinepainter({
        
        "svgData": pathObj,
        "strokeWidth": 3,
        "strokeColor": "#fff",
        "onStart": function(){ //on start of lazy painter animation
                        $("#_6svg svg path").on("mouseenter", function(){
                            //I'm ensuring that the stroke of the icon will change to the same color as the defined in CSS hover rule
                            $("#_6svg svg path").eq(0).attr("stroke", "#9e459a");
                        });
                        $("#_6svg svg path").on("mouseleave", function(){
                            $("#_6svg svg path").eq(0).attr("stroke", "#fff"); //Going back to the original white stroke color on mouseleave
                        });  
                       
                   }
        }).lazylinepainter('paint'); 

});    