$(document).ready(function() {

    //Adding event listener on internal anchors to enable smooth scrolling

    $("a.internal").on("click", function(e) {
        e.preventDefault();

        var dest = $(this).attr("href");

        history.pushState(null, null, dest);

        //The following function will animate click on an internal anchor within document

        function scrollToAnchor(link) {
            var destOffset = $(dest).offset().top;
            var navHeight = parseInt($("nav").outerHeight(true));
            if (link.hasClass("near_scroll")) {
                $("html, body").animate ({
                    scrollTop: destOffset
                }, 1000);
            } else {
                if (!($("nav").hasClass("sticky"))) {
                    destOffset = destOffset - (navHeight*1.6);
                } else {
                    destOffset = destOffset - navHeight;
                }
                $("html, body").animate ({
                    scrollTop: destOffset
                }, 1000);
            }

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
            scrollToAnchor($(dest));
        }


    });


    //Creating sticky menu

    var navigationBar = $("nav");
    var menuPosition = navigationBar.offset().top;
    var scrollPosition = $(document).scrollTop();

    function checkCurrentPosition() {

        if (scrollPosition > menuPosition) {
            navigationBar.addClass("sticky");
            // $("#features").addClass("near_scroll");
//            console.log("Pojechaliśmy za daleko");
        } else {
//            console.log("Wciąż za blisko");
            navigationBar.removeClass("sticky");
            // $("#features").addClass("near_scroll");
        }
    }
    checkCurrentPosition();

    $(window).on("scroll", function() {
        scrollPosition = $(document).scrollTop();

       /* console.log(scrollPosition);
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

    $(".slide_viewer").each(function() {
        var $group  = $(".slide_group");        // Pobranie elementu o klasie slide-group (kontener).
        var $slides = $group.find(".slide");       // Obiekt jQuery przechowujący wszystkie slajdy.
        var visiblePictureIndex = 1;                     // Numer indeksu bieżącego slajdu.
        var nextSlide = $(".next_slide");      //definiuje zmienne przechowujące przyciski
        var prevSlide = $(".prev_slide");

        //creating variables for the first and the last slide
        var copyOfFirstSlide = $slides.eq(0).clone();
        var copyOfLastSlide = $slides.last().clone();

        //Adding clones to DOM
        copyOfFirstSlide.insertAfter($slides.last());
        copyOfLastSlide.insertBefore($slides.first());

        //Adding variable for the slide container with clones

        var allSlidesUpdated = $group.find(".slide");

        //the second slide will be visible

        allSlidesUpdated.eq(1).show();

        nextSlide.on("click", function(e) {
            e.preventDefault();
            // Jeżeli odtwarzana jest animacja slajdu, to nie podejmujemy żadnych działań.
            if ($group.is(":animated")) {
                return;
            }


            var animateLeft, slideLeft;      // Declaring variables responsible for animation

            if (visiblePictureIndex <= $slides.length) {

                slideLeft = "100%";            // Umieszczenie nowego slajdu po prawej stronie.
                animateLeft = "-100%";         // Animacja bieżącej grupy w lewą stronę.

                visiblePictureIndex++;

                // Umieszczenie nowego slajdu po lewej (jeśli ma mniejszą wartość indeksu niż bieżący) lub prawej (jeśli ma tę wartość większą).
                allSlidesUpdated.eq(visiblePictureIndex).css( {left: slideLeft, display: "block"} );

                $group.animate({
                    left: animateLeft
                }, 500, function() {    // Animacja slajdu
                        allSlidesUpdated.eq(visiblePictureIndex - 1).css( {display: "none"} ); // i ukrycie poprzedniego.
                        allSlidesUpdated.eq(visiblePictureIndex).css( {left: 0} ); // Ustawienie położenia dla nowego slajdu.
                        $group.css( {left: 0} );               // Ustawienie położenia grupy slajdów.

                        $(allSlidesUpdated).eq(visiblePictureIndex - 1).find(".person_name").removeClass("active_person");
                        $(allSlidesUpdated).eq(visiblePictureIndex).find(".person_name").addClass("active_person");
                        animateSkills();

                        //kluczowy fragment, gdy index osiąga ostatni element, robię przejście do pierwszego elementu, które trwa 0 sekeund
                        if (visiblePictureIndex === ($slides.length)+1) {
                            visiblePictureIndex = 1;
                            allSlidesUpdated.eq(visiblePictureIndex).css( {left: 0, display: "block"} );
                            allSlidesUpdated.eq($slides.length + 1).css( {display: "none"} );

                            $(allSlidesUpdated).eq($slides.length + 1).find(".person_name").removeClass("active_person");
                            $(allSlidesUpdated).eq(visiblePictureIndex).find(".person_name").addClass("active_person");
                        }
                });


            }

        });

        prevSlide.on("click", function(e) {
            e.preventDefault();
            // Jeżeli odtwarzana jest animacja slajdu, to nie podejmujemy żadnych działań.
            if ($group.is(":animated")) {
                return;
            }

            var animateLeft, slideLeft;      // Declaring variables responsible for animation

            if (visiblePictureIndex >= 1) {

                slideLeft = "-100%";            // Umieszczenie nowego slajdu po lewej stronie.
                animateLeft = "100%";         // Animacja bieżącej grupy w prawą stronę.

                visiblePictureIndex--;

                // Umieszczenie nowego slajdu po lewej
                allSlidesUpdated.eq(visiblePictureIndex).css( {left: slideLeft, display: "block"} );

                $group.animate({
                    left: animateLeft
                }, 500, function() {    // Animacja slajdu
                        allSlidesUpdated.eq(visiblePictureIndex + 1).css( {display: "none"} ); // i ukrycie poprzedniego.
                        allSlidesUpdated.eq(visiblePictureIndex).css( {left: 0} ); // Ustawienie położenia dla nowego slajdu.
                        $group.css( {left: 0} );               // Ustawienie położenia grupy slajdów.

                        $(allSlidesUpdated).eq(visiblePictureIndex + 1).find(".person_name").removeClass("active_person");
                        $(allSlidesUpdated).eq(visiblePictureIndex).find(".person_name").addClass("active_person");
                        animateSkills();

                        //kluczowy fragment, gdy index osiąga ostatni element, robię przejście do pierwszego elementu, które trwa 0 sekeund
                        if (visiblePictureIndex === 0) {
                            visiblePictureIndex = $slides.length;
                            allSlidesUpdated.eq(visiblePictureIndex).css( {left: 0, display: "block"} );
                            allSlidesUpdated.eq(0).css( {display: "none"} );

                            $(allSlidesUpdated).eq(0).find(".person_name").removeClass("active_person");
                            $(allSlidesUpdated).eq(visiblePictureIndex).find(".person_name").addClass("active_person");
                        }
                });


            }

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

    var pathObj0 = {
        "_6svg": {
            "strokepath": [
                {
                    "path": "M63.233,172.136q-20.121-12.087-40.648-23.468T2.464,113.817q0.406-23.467,0-46.935t20.121-34.85Q43.112,20.649,63.233,8.563t40.241,0Q123.6,20.649,144.122,32.031t20.121,34.85q-0.406,23.467,0,46.935t-20.121,34.851q-20.528,11.38-40.648,23.468T63.233,172.136Z",
                    "duration": 1700
                },
                {
                    "path": "M101.171,42.29a1.811,1.811,0,0,0-1.989.014L44.807,78.554a1.812,1.812,0,0,0,.333,3.189l14.181,5.674,6.668,11.668a1.813,1.813,0,0,0,1.554.914h0.019a1.816,1.816,0,0,0,1.554-.882l3.765-6.276,17.571,7.027a1.776,1.776,0,0,0,.672.131,1.815,1.815,0,0,0,1.788-1.516l9.063-54.375A1.814,1.814,0,0,0,101.171,42.29ZM49.685,79.658l42-28.005L61.149,84.345a3.57,3.57,0,0,0-.481-0.293ZM62.468,85.62c0-.007-0.009-0.01-0.012-0.017L96.789,48.853,67.52,94.46ZM89.707,95.667L74.226,89.475a3.621,3.621,0,0,0-1.131-.216L96.934,52.3Z",
                    "duration": 3100
                }
            ],
            "dimensions": {
                "width": 167,
                "height": 181
            }
        }
    };
    var pathObj1 = {
        "_5svg": {
            "strokepath": [
                {
                    "path": "M63.233,172.136q-20.121-12.087-40.648-23.468T2.464,113.817q0.406-23.467,0-46.935t20.121-34.85Q43.112,20.649,63.233,8.563t40.241,0Q123.6,20.649,144.122,32.031t20.121,34.85q-0.406,23.467,0,46.935t-20.121,34.851q-20.528,11.38-40.648,23.468T63.233,172.136Z",
                    "duration": 1700
                },
                {
                    "path": "M109.279,44.676A15.483,15.483,0,0,0,98.5,40a11.857,11.857,0,0,0-8.462,3.4L81.217,52.29c-0.027.025-.058,0.042-0.085,0.069s-0.023.033-.037,0.048l0,0L62.376,71.276a7.289,7.289,0,0,0-1.835,3.091l-4.257,15.42A12.471,12.471,0,0,0,56,91.656,6.349,6.349,0,0,0,62.353,98a12.926,12.926,0,0,0,2.1-.34L79.816,93.62a7.3,7.3,0,0,0,3.09-1.841L110.57,63.9C115.6,58.861,115.035,50.422,109.279,44.676ZM85.026,83.13a14.762,14.762,0,0,0-1.3-4.764l17.135-17.134a8.836,8.836,0,0,1-1.786,9.07c-0.014.014-.032,0.023-0.046,0.037l0.023,0.023L85.044,84.481C85.046,84.03,85.067,83.588,85.026,83.13Zm-2.212-6.416a14.908,14.908,0,0,0-6.1-5.838L93.99,53.6a12.517,12.517,0,0,1,6.122,5.814Zm-7.808-6.694a14.441,14.441,0,0,0-5.2-1.085L83.77,54.866a8.7,8.7,0,0,1,8.316-1.924ZM63.555,94.145a8.912,8.912,0,0,1-1.23.229,2.726,2.726,0,0,1-2.7-2.719,9.212,9.212,0,0,1,.184-1.02l1.908-6.913A8.591,8.591,0,0,1,70.3,92.375Zm8.53-2.241a10.12,10.12,0,0,0-3.03-6.955,10.326,10.326,0,0,0-6.825-3.08l1.805-6.539a3.588,3.588,0,0,1,.708-1.241c3.636-2.6,9.227-1.834,13.112,2.054,4.108,4.108,4.744,10.124,1.579,13.717a3.827,3.827,0,0,1-.651.285Zm35.921-30.566-3.053,3.076c0-.409.049-0.8,0.012-1.221a16.012,16.012,0,0,0-15.355-14.21l3-3.027A8.241,8.241,0,0,1,98.5,43.625,12.528,12.528,0,0,1,110.354,54.8,8.305,8.305,0,0,1,108.005,61.337Z",
                    "duration": 3100
                }
            ],
            "dimensions": {
                "width": 167,
                "height": 181
            }
        }
    };
   var pathObj2 = {
        "_3svg": {
            "strokepath": [
                {
                    "path": "M63.233,172.136q-20.121-12.087-40.648-23.468T2.464,113.817q0.406-23.467,0-46.935t20.121-34.85Q43.112,20.649,63.233,8.563t40.241,0Q123.6,20.649,144.122,32.031t20.121,34.85q-0.406,23.467,0,46.935t-20.121,34.851q-20.528,11.38-40.648,23.468T63.233,172.136Z",
                    "duration": 1700
                },
                {
                    "path": "M108.66,62.385L103.248,61.3a21.5,21.5,0,0,0-.947-2.276l3.064-4.6a3.531,3.531,0,0,0-.441-4.456l-3.4-3.4a3.53,3.53,0,0,0-4.456-.442l-4.6,3.064a21.258,21.258,0,0,0-2.278-.946l-1.083-5.413A3.53,3.53,0,0,0,85.652,40h-4.8a3.53,3.53,0,0,0-3.462,2.84L76.3,48.252a21.318,21.318,0,0,0-2.276.946l-4.6-3.064a3.53,3.53,0,0,0-4.456.442l-3.4,3.4a3.531,3.531,0,0,0-.441,4.456l3.064,4.6a21.1,21.1,0,0,0-.947,2.277L57.84,62.385A3.531,3.531,0,0,0,55,65.847v4.8a3.53,3.53,0,0,0,2.84,3.462L63.252,75.2a21.343,21.343,0,0,0,.947,2.276l-3.064,4.6a3.53,3.53,0,0,0,.441,4.455l3.4,3.4a3.531,3.531,0,0,0,4.456.441l4.6-3.064a21.136,21.136,0,0,0,2.278.946l1.083,5.413a3.53,3.53,0,0,0,3.462,2.84h4.8a3.529,3.529,0,0,0,3.462-2.84L90.2,88.247a21.314,21.314,0,0,0,2.276-.946l4.6,3.064a3.531,3.531,0,0,0,4.456-.441l3.4-3.4a3.53,3.53,0,0,0,.441-4.455l-3.064-4.6a21.333,21.333,0,0,0,.947-2.278l5.412-1.083a3.53,3.53,0,0,0,2.84-3.462v-4.8A3.531,3.531,0,0,0,108.66,62.385Zm-6.1,9.349a3.528,3.528,0,0,0-2.642,2.3,17.621,17.621,0,0,1-.79,1.9,3.529,3.529,0,0,0,.24,3.5l3.064,4.6-3.4,3.4-4.6-3.064a3.535,3.535,0,0,0-3.5-.241,17.685,17.685,0,0,1-1.9.792,3.528,3.528,0,0,0-2.3,2.642l-1.085,5.414h-4.8l-1.083-5.414a3.529,3.529,0,0,0-2.3-2.642,17.7,17.7,0,0,1-1.9-.79,3.531,3.531,0,0,0-3.5.24l-4.6,3.064-3.4-3.4,3.064-4.6a3.537,3.537,0,0,0,.241-3.5,17.8,17.8,0,0,1-.791-1.9,3.528,3.528,0,0,0-2.642-2.3l-5.412-1.084,0-4.8,5.414-1.083a3.527,3.527,0,0,0,2.642-2.3,17.591,17.591,0,0,1,.79-1.9,3.528,3.528,0,0,0-.24-3.5l-3.064-4.6,3.4-3.4,4.6,3.064a3.534,3.534,0,0,0,3.5.241,17.592,17.592,0,0,1,1.9-.792,3.529,3.529,0,0,0,2.3-2.642l1.084-5.413h4.8l1.083,5.414a3.529,3.529,0,0,0,2.3,2.642,17.711,17.711,0,0,1,1.9.789,3.528,3.528,0,0,0,3.5-.239l4.6-3.064,3.4,3.4-3.064,4.6a3.537,3.537,0,0,0-.241,3.5,17.712,17.712,0,0,1,.791,1.9,3.529,3.529,0,0,0,2.642,2.3l5.412,1.084,0,4.8ZM83.25,55.89A12.359,12.359,0,1,0,95.609,68.25,12.361,12.361,0,0,0,83.25,55.89Zm0,23.174A10.815,10.815,0,1,1,94.064,68.25,10.817,10.817,0,0,1,83.25,79.064Zm0-17.877a7.063,7.063,0,1,0,7.062,7.063A7.06,7.06,0,0,0,83.25,61.187Zm0,12.359a5.3,5.3,0,1,1,5.3-5.3A5.3,5.3,0,0,1,83.25,73.546Z",
                    "duration": 3100
                }
            ],
            "dimensions": {
                "width": 167,
                "height": 181
            }
        }
    };
    var pathObj3 = {
         "_1svg": {
             "strokepath": [
                 {
                     "path": "M63.233,172.136q-20.121-12.087-40.648-23.468T2.464,113.818q0.406-23.469,0-46.937t20.121-34.85Q43.112,20.649,63.233,8.563t40.241,0Q123.6,20.649,144.122,32.031t20.121,34.85q-0.406,23.468,0,46.937t-20.121,34.85q-20.528,11.382-40.648,23.468T63.233,172.136Z",
                     "duration": 1700
                 },
                 {
                     "path": "M83.513,44.535c-11.372,0-20.978,6.114-20.978,13.349a0.954,0.954,0,1,0,1.907,0c0-6.1,8.911-11.442,19.071-11.442A0.953,0.953,0,1,0,83.513,44.535Zm0-9.535C66.66,35,53,45.246,53,57.884c0,7.871,5.3,14.81,13.364,18.93,0,0.052-.015.085-0.015,0.141,0,3.419-2.553,7.1-3.677,9.032h0a1.725,1.725,0,0,0,1.587,2.41,4.757,4.757,0,0,1,.486-0.024c5.96-.976,11.575-6.451,12.878-8.04a40.517,40.517,0,0,0,5.885.436c16.851,0,30.514-10.247,30.514-22.885S100.364,35,83.513,35Zm0,41.956a36.91,36.91,0,0,1-5.332-.395,3.7,3.7,0,0,0-.553-0.041,3.814,3.814,0,0,0-2.948,1.395A25.643,25.643,0,0,1,68.8,82.757a14.924,14.924,0,0,0,1.365-5.59c0.011-.123.017-0.246,0.017-0.352a3.816,3.816,0,0,0-2.079-3.4C61.032,69.807,56.814,64,56.814,57.884c0-10.515,11.977-19.07,26.7-19.07s26.7,8.555,26.7,19.07S98.235,76.955,83.513,76.955Z",
                     "duration": 3100
                 }
             ],
             "dimensions": {
                 "width": 167,
                 "height": 181
             }
         }
    };
    var pathObj4 = {

        "_4svg": {
             "strokepath": [
                 {
                     "path": "M63.233,172.136q-20.121-12.087-40.648-23.468T2.464,113.818q0.406-23.469,0-46.937t20.121-34.85Q43.112,20.649,63.233,8.563t40.241,0Q123.6,20.649,144.122,32.031t20.121,34.85q-0.406,23.468,0,46.937t-20.121,34.85q-20.528,11.382-40.648,23.468T63.233,172.136Z",
                     "duration": 1700
                 },
                 {
                     "path": "M102.08,35H65.628A6.628,6.628,0,0,0,59,41.627V81.394a6.628,6.628,0,0,0,6.628,6.628H102.08a6.629,6.629,0,0,0,6.628-6.628V41.627A6.629,6.629,0,0,0,102.08,35Zm3.314,46.4a3.319,3.319,0,0,1-3.314,3.314H65.628a3.319,3.319,0,0,1-3.314-3.314V41.627a3.318,3.318,0,0,1,3.314-3.314H102.08a3.318,3.318,0,0,1,3.314,3.314V81.394Zm-4.971-39.767H67.285a1.656,1.656,0,0,0-1.657,1.657V73.109a1.656,1.656,0,0,0,1.657,1.658h33.138a1.656,1.656,0,0,0,1.657-1.658V43.284A1.656,1.656,0,0,0,100.423,41.627Zm0,1.657V66.265l-5.385-5.851a1.657,1.657,0,0,0-2.485,0L88.241,65.3,75.155,50.473a1.656,1.656,0,0,0-2.485,0l-5.385,6.21v-13.4h33.138ZM67.285,59.19l6.628-7.622,13.365,15.15,0.961,1.091,4.576,5.3H67.285V59.19ZM95.024,73.109l-5.679-6.553L93.8,61.51l6.627,7.257v4.342h-5.4Zm-4.542-16.57a4.971,4.971,0,1,0-4.971-4.971A4.97,4.97,0,0,0,90.482,56.539Zm0-8.285a3.314,3.314,0,1,1-3.314,3.314A3.318,3.318,0,0,1,90.482,48.254Z",
                     "duration": 3100
                 }
             ],
             "dimensions": {
                 "width": 167,
                 "height": 181
             }
         }
    };
    var pathObj5 = {
        "_2svg": {
            "strokepath": [
                {
                    "path": "M63.233,172.136q-20.121-12.087-40.648-23.468T2.464,113.817q0.407-23.467,0-46.935t20.121-34.85Q43.112,20.649,63.233,8.563t40.241,0Q123.6,20.649,144.122,32.031t20.121,34.85q-0.406,23.467,0,46.935t-20.121,34.851q-20.528,11.38-40.648,23.468T63.233,172.136Z",
                    "duration": 1700
                },
                {
                    "path": "M111.441,90.587a51.114,51.114,0,0,0-16.226-6.471,39.725,39.725,0,0,0,6.668-14.3c1.318-5.474.807-16.184-4.45-22.858a15.946,15.946,0,0,0-24.866,0c-5.257,6.673-5.768,17.384-4.45,22.858a39.727,39.727,0,0,0,6.668,14.3,51.125,51.125,0,0,0-16.227,6.471A3.5,3.5,0,0,0,60.5,97h49A3.5,3.5,0,0,0,111.441,90.587Zm-18.975-8.64-0.572.726c-4.173,4.793-9.615,4.793-13.788,0l-0.573-.726A29.914,29.914,0,0,1,71.282,59.81C72.237,52.321,76.529,44.5,85,44.5S97.763,52.321,98.718,59.81A29.919,29.919,0,0,1,92.467,81.947ZM60.5,93.5a47.634,47.634,0,0,1,15.025-5.962l4.348-.942a8.773,8.773,0,0,0,10.254,0l4.348,0.942A47.716,47.716,0,0,1,109.5,93.5h-49Z",
                    "duration": 3100
                }
            ],
            "dimensions": {
                "width": 167,
                "height": 181
            }
        }
    };
    var pathObj6 = {
        "scroller": {
            "strokepath": [
                {
                    "path": "M32.851,87.149Q22.813,81.118,12.572,75.44T2.533,58.053q0.2-11.708,0-23.417T12.572,17.249Q22.813,11.57,32.851,5.541t20.077,0q10.038,6.03,20.28,11.708T83.247,34.636q-0.2,11.709,0,23.417T73.208,75.44q-10.241,5.678-20.28,11.709T32.851,87.149Z",
                    "duration": 3100
                }
            ],
            "dimensions": {
                "width": 86,
                "height": 93
            }
        }
    };


    $("#_6svg").lazylinepainter({

        "svgData": pathObj0,
        "strokeWidth": 3,
        "strokeColor": "#fff",
        "onStart": function(){ //on start of lazy painter animation
                        $("#_6svg").on("mouseover", function(){
                            //I'm ensuring that the stroke of the icon will change to the same color as the defined in CSS hover rule
                            $("#_6svg svg path").eq(0).attr("stroke", "#9e459a");
                        });
                         $("#_6svg").on("mouseout", function(){
                            $("#_6svg svg path").eq(0).attr("stroke", "#fff"); //Going back to the original white stroke color on mouseleave
                        });

                   }
        }).lazylinepainter('paint');

    $("#_5svg").lazylinepainter({

        "svgData": pathObj1,
        "strokeWidth": 3,
        "strokeColor": "#fff",
        "onStart": function(){ //on start of lazy painter animation
                        $("#_5svg").on("mouseover", function(){
                            //I'm ensuring that the stroke of the icon will change to the same color as the defined in CSS hover rule
//                            console.log($(this));
                            $("#_5svg svg path").eq(0).attr("stroke", "#9e459a");
                        });
                        $("#_5svg").on("mouseout", function(){
                            $("#_5svg svg path").eq(0).attr("stroke", "#fff"); //Going back to the original white stroke color on mouseleave
                        });

                   }
        }).lazylinepainter('paint');

    $("#_3svg").lazylinepainter({

        "svgData": pathObj2,
        "strokeWidth": 3,
        "strokeColor": "#fff",
        "onStart": function(){ //on start of lazy painter animation
                        $("#_3svg").on("mouseover", function(){
                            //I'm ensuring that the stroke of the icon will change to the same color as the defined in CSS hover rule
//                            console.log($(this));
                            $("#_3svg svg path").eq(0).attr("stroke", "#9e459a");
                        });
                        $("#_3svg").on("mouseout", function(){
                            $("#_3svg svg path").eq(0).attr("stroke", "#fff"); //Going back to the original white stroke color on mouseleave
                        });

                   }
        }).lazylinepainter('paint');

     $("#_1svg").lazylinepainter({

        "svgData": pathObj3,
        "strokeWidth": 3,
        "strokeColor": "#fff",
        "onStart": function(){ //on start of lazy painter animation
                        $("#_1svg").on("mouseover", function(){
                            //I'm ensuring that the stroke of the icon will change to the same color as the defined in CSS hover rule
//                            console.log($(this));
                             $("#_1svg svg path").eq(0).attr("stroke", "#9e459a");
                        });
                        $("#_1svg").on("mouseout", function(){
                            $("#_1svg svg path").eq(0).attr("stroke", "#fff"); //Going back to the original white stroke color on mouseleave
                        });

                   }
        }).lazylinepainter('paint');

    $("#_4svg").lazylinepainter({

        "svgData": pathObj4,
        "strokeWidth": 3,
        "strokeColor": "#fff",
        "onStart": function(){ //on start of lazy painter animation
                        $("#_4svg").on("mouseover", function(){
                            //I'm ensuring that the stroke of the icon will change to the same color as the defined in CSS hover rule
//                            console.log($(this));
                            $("#_4svg svg path").eq(0).attr("stroke", "#9e459a");
                        });
                        $("#_4svg").on("mouseout", function(){
                            $("#_4svg svg path").eq(0).attr("stroke", "#fff"); //Going back to the original white stroke color on mouseleave
                        });

                   }
        }).lazylinepainter('paint');

    $("#_2svg").lazylinepainter({

        "svgData": pathObj5,
        "strokeWidth": 3,
        "strokeColor": "#fff",
        "onStart": function(){ //on start of lazy painter animation
                        $("#_2svg").on("mouseover", function(){
                            //I'm ensuring that the stroke of the icon will change to the same color as the defined in CSS hover rule
//                            console.log($(this));
                            $("#_2svg svg path").eq(0).attr("stroke", "#9e459a");
                        });
                        $("#_2svg").on("mouseout", function(){
                            $("#_2svg svg path").eq(0).attr("stroke", "#fff"); //Going back to the original white stroke color on mouseleave
                        });

                   }
        }).lazylinepainter('paint');

    $("#scroller").lazylinepainter({

        "svgData": pathObj6,
        "strokeWidth": 3,
        "strokeColor": "#fff",
        "onStart": function(){ //on start of lazy painter animation
                        $("#scroller").on("mouseover", function(){
                            //I'm ensuring that the stroke of the icon will change to the same color as the defined in CSS hover rule
//                            console.log($(this));
                            $("#scroller svg path").eq(0).attr("stroke", "#9e459a");
                        });
                        $("#scroller").on("mouseout", function(){
                            $("#scroller svg path").eq(0).attr("stroke", "#fff"); //Going back to the original white stroke color on mouseleave
                        });

                   }
        }).lazylinepainter('paint');

    //Creating carousel

    $(".carousel").each(function() {              // Dla każdej grupy slajdów.
        var $this   = $(this);                    // Pobranie bieżącej grupy slajdów.
        var $group  = $this.find(".carousel_slide_group"); // Pobranie elementu o klasie slide-group (kontener).
        var $slides = $this.find(".person_image");       // Obiekt jQuery przechowujący wszystkie slajdy.
        var carouselControls = $(".carousel_selector"); // kontrolki
        var currentIndex = 0;                     // Numer indeksu bieżącego slajdu.
        var timeout;                              // Zmienna do przechowywania licznika czasu.

        function move(newIndex) {          // Przejście ze starego do nowego slajdu.
            var animateLeft, slideLeft;      // Deklaracja zmiennych.

            advance();                       // Podczas przejścia slajdów należy ponownie wywołać funkcję advance().

            // Jeżeli wyświetlany jest bieżący slajd lub odtwarzana jest animacja slajdu, to nie podejmujemy żadnych działań.
            if ($group.is(':animated') || currentIndex === newIndex) {
              return;
            }

            $(carouselControls[currentIndex]).removeClass("active_btn"); // Usunięcie klasy z elementu.
            $(carouselControls[newIndex]).addClass("active_btn");        // Dodanie klasy do nowego elementu.

            if (newIndex > currentIndex) {   // Jeżeli nowy element > bieżący.
                slideLeft = '100%';            // Umieszczenie nowego slajdu po prawej stronie.
                animateLeft = '-100%';         // Animacja bieżącej grupy w lewą stronę.
            } else {                         // W przeciwnym razie.
                slideLeft = '-100%';           // Umieszczenie nowego slajdu po lewej stronie.
                animateLeft = '100%';          // Animacja bieżącej grupy w prawą stronę.
            }
            // Umieszczenie nowego slajdu po lewej (jeśli ma mniejszą wartość indeksu niż bieżący) lub prawej (jeśli ma tę wartość większą).
            $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );

            $group.animate( {left: animateLeft}, function() {    // Animacja slajdu
              $slides.eq(currentIndex).css( {display: 'none'} ); // i ukrycie poprzedniego.
              $slides.eq(newIndex).css( {left: 0} ); // Ustawienie położenia dla nowego slajdu.
              $group.css( {left: 0} );               // Ustawienie położenia grupy slajdów.
              currentIndex = newIndex;               // Ustawienie zmiennej currentIndex wartości nowego obrazu.
            });
        }

        function advance() {                     // Ustawienie czasu wyświetlania slajdu.
          clearTimeout(timeout);                 // Wyzerowanie licznika czasu w zmiennej timeout.
          timeout = setTimeout(function() {      // Ustawienie nowego licznika.
              if (currentIndex < ($slides.length - 1)) { // Jeżeli to nie jest ostatni slajd.
                  move(currentIndex + 1);            // Przejście do następnego slajdu.
              } else {                             // W przeciwnym razie.
                  move(0);                           // Przejście do pierwszego slajdu.
              }
          }, 4000);                              // Czas oczekiwania wyrażony w milisekundach
        }

        $.each(carouselControls, function(index) {
            if (index === currentIndex) {
                $(this).addClass("active_btn");
            }
            $(this).on("click", function() {
                move(index);
            });

        });

        advance();                          // Skrypt jest już skonfigurowany, można wywołać funkcję advance().


    });


});
