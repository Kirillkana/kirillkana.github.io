$(function() {
    // Owl Carousel
    var owl = $(".owl-carousel-main");

    owl.owlCarousel({
        items: 1,
        loop: true,
        dots: true
    });

    $(".owl-carousel-reviews").owlCarousel({
        items:1,
        merge:true,
        loop:false,
        margin:10,
        video:true,
        lazyLoad:false,
        center:true,
        dots:false,
        nav:true,
        navText: ["<  Предыдущий","Следующий  >"]
    });

    $(".owl-instagram").owlCarousel({
        items: 3,
        loop: true,
        margin:15,
        stagePadding: 220,
        responsive:{ //Адаптация в зависимости от разрешения экрана
            0:{
                stagePadding: 50,
            },
            768:{

            },
            1000:{

            }
        }

    });

    $(".overflow-request, .cross-procedure, .close-success-div, .close-procedure-mobile").click(function () {
       $(".overflow-request").fadeOut(300, function () {
           $(".record-request").css('display', 'flex');
           $(".notification-success").css('display', 'none');
       });
    });

    $(".record-request, .notification-success").click(function (e) {
        e.stopPropagation();
    });

    $(".mobile-card-sign-up").click(function () {
        var need_procedure =  $(this).prev().prev().text();
        need_procedure = $.trim(need_procedure);
        $(".change-procedure").css('display', 'none');
        $(".new-arrow-zone").css('pointer-events','inherit');
        $(".delete-procedure").css('display', 'block');
        $('.select-procedure').val(need_procedure);
        $(".overflow-request").css("display", "flex")
            .hide()
            .fadeIn(300);
        $(".default-text-procedure").css('display','none');
    });

    $(".sub-card-procedure").click(function () {
        if ($(window).width() > '768'){
            var need_procedure =  $(this).next().text();
            need_procedure = $.trim(need_procedure);
            $(".change-procedure").css('display', 'none');
            $(".new-arrow-zone").css('pointer-events','inherit');
            $(".delete-procedure").css('display', 'block');
            $('.select-procedure').val(need_procedure);
            $(".overflow-request").css("display", "flex")
                .hide()
                .fadeIn(300);
            $(".default-text-procedure").css('display','none');
        }
    });


    $( document ).ready(function() {

        $("#ajax_form").submit(function (e) {
            e.preventDefault();
            sendAjaxForm('ajax_form', 'php-mail/action_ajax_form.php');
        });

        function sendAjaxForm(ajax_form, url) {
            $.ajax({
                url:     url, //url страницы (action_ajax_form.php)
                type:     "POST", //метод отправки
                dataType: "html", //формат данных
                data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
                success: function(response) { //Данные отправлены успешно
                    $(".record-request").fadeOut(300, function () {
                        $('#ajax_form')[0].reset();
                    });
                    $(".notification-success").css("display", "flex")
                        .hide()
                        .fadeIn(300);
                },
                error: function(response) { // Данные не отправлены

                }
            });
        }
    });

    $(".delete-procedure").click(function () {
       $(this).css('display', 'none');
       $(".change-procedure").css('display', 'block');
       $(".new-arrow-zone").css('pointer-events','none');
       $('.select-procedure').val('Выбрать процедуру');
       $(".default-text-procedure").css('display','flex');
    });

    $('.select-procedure').change(function() {
        $(".change-procedure").css('display', 'none');
        $(".delete-procedure").css('display','block');
        $(".new-arrow-zone").css('pointer-events','inherit');
        $(".new-arrow-zone").css('display','flex');
    });

    $('.select-procedure > option').click(function(){
        $(".select-procedure").blur();
    });

    $(".select-procedure").blur(function () {
        $(".new-arrow-zone").css('display','flex');
    });

    $(".select-procedure").focus(function () {
       $(".new-arrow-zone").css('display','none');
        $(".default-text-procedure").css('display','none');
    });



    var open_mobile_menu = false;

    $(".burger-menu").click(function () {
        if (open_mobile_menu == false){
            $(".overlay-mobile-menu")
                .css("display", "flex")
                .hide()
                .fadeIn(300);
            $('header').css('box-shadow','none');
            $('body').css('overflow', 'hidden');
            open_mobile_menu = true
        }
        else{
            $(".overlay-mobile-menu").fadeOut(300);
            $('header').css('box-shadow','0 0 31px rgba(0, 0, 0, 0.06)');
            $('body').css('overflow', 'inherit')
            open_mobile_menu = false;
        }

        $(".burger-span-1").toggleClass('span-move-1');
        $(".burger-span-2").toggleClass('span-move-2');
        $(".burger-span-3").toggleClass('span-move-3');
    });

    var owl_reviews = $('.owl-carousel-reviews');
    var play_video = false;

    $(".overlay-video").click(function () {
        var $video = $(this).find('.video');
        src = $video.attr('src');
        if (play_video == false){
            $video.attr('src', src + '&autoplay=1');
            play_video = true;
        }
        else{
            jQuery(".video").each(function() {
                jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')});
            play_video = false;
        }
    });

    owl_reviews.on('changed.owl.carousel', function(e) {
        jQuery(".video").each(function() {
            jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')});
    });
});