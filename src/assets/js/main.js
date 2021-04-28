$(document).ready(function() {
    $('.marcas-slider').slick({
        slidesToShow: 5,
        SlidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        centerMode: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.proyectos-slider').slick({
        slidesToShow: 4,
        SlidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        centerMode: true,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    // Mostrar formulario lateral
    let btnCot = $('.solicitarMenuLateral');
    btnCot.click((e) => {
        $('.overviwe').toggleClass('open-overviwe');
        $('#menuvertical').toggleClass('switch-cotizador');
        e.preventDefault();
    });

    let overviwe = $('.overviwe');
    overviwe.click((e) => {
        $('.overviwe').removeClass('open-overviwe');
        $('#menuvertical').removeClass('switch-cotizador');
        e.preventDefault();
    });

    let botonCerrar = $('.cerrarModal');
    botonCerrar.click((e) => {
        $('.overviwe').removeClass('open-overviwe');
        $('#menuvertical').removeClass('switch-cotizador');
        e.preventDefault();
    });
});

/****Aquí me permite hacer el menú dropdown vertical funcional****/
$(document).ready(function() {
    $('.menuSoluciones li:has(ul)').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('activado')) {
            $(this).removeClass('activado');
            $(this).children('ul').slideUp();
        } else {
            $('.menuSoluciones li ul').slideUp();
            $('.menuSoluciones li').removeClass('activado');
            $(this).addClass('activado');
            $(this).children('ul').slideDown();

        }
    });

    $(".menuSoluciones li ul li a").click(function(e) {
        window.location.href = $(this).attr("href");
    });
});

$(document).ready(function() {
    $('.menuDescubre li:has(ul)').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('activado')) {
            $(this).removeClass('activado');
            $(this).children('ul').slideUp();
        } else {
            $('.menuDescubre li ul').slideUp();
            $('.menuDescubre li').removeClass('activado');
            $(this).addClass('activado');
            $(this).children('ul').slideDown();

        }
    });

    $(".menuDescubre li ul li a").click(function(e) {
        window.location.href = $(this).attr("href");
    });
});

$(document).ready(function() {
    $('.menuCorporacion li:has(ul)').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('activado')) {
            $(this).removeClass('activado');
            $(this).children('ul').slideUp();
        } else {
            $('.menuCorporacion li ul').slideUp();
            $('.menuCorporacion li').removeClass('activado');
            $(this).addClass('activado');
            $(this).children('ul').slideDown();

        }
    });

    $(".menuCorporacion li ul li a").click(function(e) {
        window.location.href = $(this).attr("href");
    });
});


/***** Cambio de botón para seleccionar hoja de vida en Formulario ******/
$(document).ready(function() {
    var file = document.querySelector('#file');

    if(file){
    file.addEventListener('change', function(e) {
        var boxFile = document.querySelector('.boxFile');
        boxFile.classList.remove('attached');
        boxFile.innerHTML = boxFile.getAttribute("data-text");
        if(this.value != '') {
          var allowedExtensions = /(\.pdf|\.docx)$/i;
          if(allowedExtensions.exec(this.value)) {
            boxFile.innerHTML = e.target.files[0].name;
            boxFile.classList.add('attached');
          } else {
            this.value = '';
            alert('El archivo que intentas subir no está permitido.\nLos archivos permitidos son .pdf o .docx');
            boxFile.classList.remove('attached');
          }
        }
      });
    }
});

$(document).ready(function() {
        // Mostrar formulario lateral derecho para enviar curriculum
        let btnAbrirCurri = $('.abrir-curriculum');
        btnAbrirCurri.click((e) => {
            $('.overviwe-curriculum').toggleClass('open-overviwe-curriculum');
            $('#curriculum-sidebar').toggleClass('switch-curriculum');
            console.log("Presionaste el botón de abrir");
            e.preventDefault();
        });

        let overviweCurri = $('.overviwe-curriculum');
        overviweCurri.click((e) => {
            $('.overviwe-curriculum').removeClass('open-overviwe-curriculum');
            $('#curriculum-sidebar').removeClass('switch-curriculum');
            e.preventDefault();
        });

        let botonCerrarCurri = $('.cerrarModal-curriculum');
        botonCerrarCurri.click((e) => {
            $('.overviwe-curriculum').removeClass('open-overviwe-curriculum');
            $('#curriculum-sidebar').removeClass('switch-curriculum');
            e.preventDefault();
        });
});

$(document).ready(function () {
    $(".input-wrapper").click(function (e) {
      console.log("Presionó");
    });
  });